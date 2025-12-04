import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComposerFormInputs, QueryKeys, StorageVersion } from "src/types";
import { useComposer } from "./useComposer";
import { useToast } from "./useToast";

import { usePrivyWallet } from "./usePrivyWallet";
import { useGenerateEncryptionKey } from "./useEncryptionKey";
import { usePinataUploader } from "./usePinataUploader";
import { encryptData, getSaltIV } from "@utils/index";
import { v4 as uuidv4 } from "uuid";
import { useGetLinkedUsernameById } from "./useUsernames";
import { useMailBody } from "./useMailBody";
import { MailShareTypes } from "@state/index";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { web3 } from "@coral-xyz/anchor";
import { ComputeBudgetProgram, PublicKey } from "@solana/web3.js";
import { useBalance } from "./useBalance";
import { getErrorMessage } from "@utils/error/getErrorMessage";
import { useLightRpc } from "./useLightRpc";
import {
  confirmTx,
  deriveAddress,
  deriveAddressSeed,
  getDefaultAddressTreeInfo,
  PackedAccounts,
  selectStateTreeInfo,
  SystemAccountMetaConfig,
} from "@lightprotocol/stateless.js";
import { useUpdateCompressedAccount } from "./useUpdateCompressedAccount";
import { useMarkAsPayment } from "./useMarkAsPayment";

type FormPayload = Omit<ComposerFormInputs, "to"> & {
  to: string;
  originalRecipient: string;
};
export const useEmailer = () => {
  const { showToast } = useToast();
  const { address: from } = usePrivyWallet();
  const { mutateAsync } = useGenerateEncryptionKey();
  const { mutateAsync: uploadToPinata } = usePinataUploader();

  const { refetch } = useBalance();
  const { action, ref, updateStatus, collpaseComposer, expandComposer } =
    useComposer();

  const { attachmentRef } = useMailBody(ref);
  const { provider, program } = useGetMailProgramInstance();
  // const connection = useSolanaConnection();
  const { displayName } = useGetLinkedUsernameById(from);

  const queryClient = useQueryClient();

  const IS_FORWARDING = action === MailShareTypes.forward;

  const lightRpc = useLightRpc();

  const { mutateAsync: updateMailStatus } = useUpdateCompressedAccount();
  const { mutateAsync: updateAsPayment } = useMarkAsPayment();
  return useMutation({
    mutationKey: [QueryKeys.MUATATION_SEND_EMAIL],
    mutationFn: async (values: FormPayload) => {
      updateStatus("Preparing your mail");
      collpaseComposer();

      const to = values.to;
      const [user0, user1] =
        from?.toString() >= to?.toString() ? [from, to] : [to, from];
      const key = await mutateAsync(`${user0.toString()}:${user1?.toString()}`);

      const cData = getSaltIV();

      const encrypt = async (content: string) => {
        return encryptData(content, cData.iv, key);
      };

      if (values && values.files && values.files.length > 0) {
        updateStatus("Uploading files");
      }

      /**
       *
       */
      const uuid = uuidv4();
      const attachMentFormData = new FormData();
      type _Attachment = { name: string; size: number; type: string };
      const attachmentFiles: _Attachment[] = [];

      let attachmentHash: string = "";
      if (values.files && values.files.length) {
        values.files.forEach((file) => {
          attachMentFormData.append("file", file, `${uuid}/${file.name}`);
          attachmentFiles.push({
            name: file.name,
            type: file.type,
            size: file.size,
          });
        });

        try {
          const response = await uploadToPinata({
            data: attachMentFormData,
          });
          if (response && response.IpfsHash) {
            attachmentHash = response.IpfsHash;
          }
        } catch {
          throw Error("Failed to upload attachments");
        }
      }

      const body = `${values.body}`;
      const json: Record<string, string | Array<unknown>> = {
        body,
        origin: displayName ?? "",
        recipient:
          values.originalRecipient && values.originalRecipient.indexOf("@") > -1
            ? values.originalRecipient
            : "",
      };

      if (attachmentHash && attachmentFiles.length > 0) {
        json["attachments"] = attachmentFiles.map((name) => {
          return {
            hash: attachmentHash,
            name: name.name,
            meta: {
              ...name,
            },
          };
        });
      }

      if (IS_FORWARDING && attachmentRef && attachmentRef.length > 0) {
        json["attachments"] = [
          ...attachmentRef,
          ...(json["attachments"] ?? []),
        ];
      }
      if (values.solanaPay?.amount && values.solanaPay.tokenaddress) {
        json["solanaPay"] = [values.solanaPay];
      }
      const encryptedContent = await encrypt(`${JSON.stringify(json)}`);

      const textFile = new File([encryptedContent], `${uuid}/body.txt`, {
        type: "text/plain",
      });

      const formData = new FormData();
      formData.append("file", textFile);
      let id: string | undefined;
      try {
        const contentId = await uploadToPinata({
          data: formData,
        });

        id = contentId && contentId.IpfsHash;
      } catch {
        throw Error("Failed to create mail");
      }

      if (!provider || !program) {
        return;
      }

      updateStatus("Sending mail");
      const mailAccount = web3.Keypair.generate();

      /** COMPRESSION STARTS */

      const stateTreeInfos = await lightRpc.getStateTreeInfos();
      const outputStateTreeInfo = selectStateTreeInfo(stateTreeInfos);
      const addressTreeInfo = getDefaultAddressTreeInfo();

      const addressSeed = deriveAddressSeed(
        [
          Buffer.from("compressed-mail"),
          new PublicKey(from).toBuffer(),
          new PublicKey(to).toBuffer(),
          Buffer.from(mailAccount.publicKey?.toString()),
        ],
        program.programId
      );

      const mailAddress = deriveAddress(addressSeed, addressTreeInfo.tree);

      const proofRpcResult = await lightRpc.getValidityProofV0(
        [],
        [
          {
            address: Array.from(mailAddress.toBytes()),
            tree: addressTreeInfo.tree,
            queue: addressTreeInfo.queue,
          },
        ]
      );

      const systemAccountConfig = SystemAccountMetaConfig.new(
        program.programId
      );
      const remainingAccounts =
        PackedAccounts.newWithSystemAccounts(systemAccountConfig);

      const addressMerkleTreePubkeyIndex = remainingAccounts.insertOrGet(
        addressTreeInfo.tree
      );
      const addressQueuePubkeyIndex = remainingAccounts.insertOrGet(
        addressTreeInfo.queue
      );

      const packedAddressTreeInfo = {
        rootIndex: proofRpcResult.rootIndices[0],
        addressMerkleTreePubkeyIndex,
        addressQueuePubkeyIndex,
      };

      const outputMerkleTreeIndex = remainingAccounts.insertOrGet(
        outputStateTreeInfo.tree
      );

      const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000,
      });

      const tx = await program.methods
        .compressedSendMail(
          mailAccount.publicKey.toString(),
          ref || "0",
          new PublicKey(to),
          new PublicKey(from),
          encryptData(values.subject, cData.iv, key),
          "",
          cData.iv,
          "salt!",
          StorageVersion.compressedWeb,
          { 0: proofRpcResult.compressedProof },
          packedAddressTreeInfo,
          outputMerkleTreeIndex
        )
        .accounts({
          signer: from,
        })
        .preInstructions([computeBudgetIx])
        .remainingAccounts(remainingAccounts.toAccountMetas().remainingAccounts)

        .rpc();

      await confirmTx(lightRpc, tx);

      await updateMailStatus({
        from,
        to,
        mail: mailAccount.publicKey.toString(),
        body: id ?? "",
      });

      if (values.solanaPay?.amount && values.solanaPay.tokenaddress) {
        await updateAsPayment({
          from,
          to,
          mail: mailAccount.publicKey.toString(),
        });
      }
    },
    onSuccess: () => {
      showToast("Email sent", {
        type: "success",
      });
      refetch();
    },
    onError: (e) => {
      console.log(e);
      showToast(getErrorMessage(e, "Failed to send mail"), {
        type: "error",
      });
      refetch();
      expandComposer();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
    },
  });
};

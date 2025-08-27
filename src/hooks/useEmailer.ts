import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComposerFormInputs, QueryKeys, StorageVersion } from "src/types";
import { useComposer } from "./useComposer";
import { useToast } from "./useToast";
import { useEmailResolver } from "./useEmailResolver";
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
import { useSolanaConnection } from "./useConnection";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { useBalance } from "./useBalance";
export const useEmailer = () => {
  const { showToast } = useToast();
  const { address: from, wallet } = usePrivyWallet();
  const { mutateAsync: resolveRecepient } = useEmailResolver();
  const { mutateAsync } = useGenerateEncryptionKey();
  const { mutateAsync: uploadToPinata } = usePinataUploader();
  const { sendTransaction } = useSendTransaction();
  const { refetch } = useBalance();
  const {
    thread,
    action,
    ref,

    updateStatus,
    collpaseComposer,
    expandComposer,
  } = useComposer();
  const { context } = useComposer();
  const { attachmentRef } = useMailBody(ref, context);
  const { provider, program, mailAccountAddress } = useGetMailProgramInstance();
  const connection = useSolanaConnection();
  const { account } = useGetLinkedUsernameById(thread);
  const queryClient = useQueryClient();
  const sleep = async (delay: number) => {
    return new Promise((r) => {
      setTimeout(() => {
        r(1);
      }, delay);
    });
  };

  const IS_FORWARDING = action === MailShareTypes.forward;
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_FCM],
    mutationFn: async (values: ComposerFormInputs) => {
      updateStatus("Preparing your mail");
      collpaseComposer();
      const data = await resolveRecepient({ username: values.to });
      if (!data || !data.address || !from) {
        expandComposer();
        showToast("Failed to send", {
          type: "error",
        });
        return;
      }
      const to = data.address;

      const [user0, user1] =
        from?.toString() >= to?.toString() ? [from, to] : [to, from];
      const key = await mutateAsync(`${user0.toString()}:${user1?.toString()}`);

      const cData = getSaltIV();

      const encrypt = async (content: string) => {
        return encryptData(content, cData.iv, key);
      };

      if (values && values.files && values.files.length > 0) {
        updateStatus("Uploading files");
      } else {
        sleep(1500);
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

        const response = await uploadToPinata({
          data: attachMentFormData,
        });
        if (response && response.IpfsHash) {
          attachmentHash = response.IpfsHash;
        }
      }

      const body = `${values.body}`;
      const json: Record<string, any> = {
        body,
        origin: account?.publicKey?.toString() ?? "",
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

      const contentId = await uploadToPinata({
        data: formData,
      });

      const id = contentId && contentId.IpfsHash;
      if (!id) {
        expandComposer();
        showToast("Failed to send email", {
          type: "error",
        });
        return;
      }

      try {
        if (!provider || !program) {
          return;
        }

        updateStatus("Sending mail");
        const mailAccount = web3.Keypair.generate();
        const userPublicKey = provider.publicKey;

        const createMailInstruction = await program.methods
          .createmail(
            encryptData(values.subject, cData.iv, key),
            userPublicKey,
            to,
            "salt!",
            cData.iv,
            StorageVersion.pinata,
            ref || "0"
          )
          .accounts({
            mail: mailAccount.publicKey,
            authority: userPublicKey,
            mailAccountV2: mailAccountAddress,
          })
          .instruction();

        const updateEmailInstruction = await program.methods
          .updatemail(id)
          .accounts({
            mail: mailAccount.publicKey,
            authority: userPublicKey,
          })
          .instruction();

        const transaction = new Transaction().add(
          createMailInstruction,
          updateEmailInstruction
        );

        const latestBlockhash =
          await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = new PublicKey(
          wallet?.address?.toString() as string
        );
        transaction.partialSign(mailAccount);

        await sendTransaction({
          transaction: transaction,
          connection: connection,
          uiOptions: {
            showWalletUIs: !1,
          },
        });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
        showToast("Mail sent successfully", {
          type: "success",
        });
        close();
        refetch();
      } catch {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
        refetch();
        expandComposer();
        showToast("Failed to send mail", {
          type: "error",
        });
      }
    },
  });
};

import { ComputeBudgetProgram, PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FetchAllMailsResult, MailBoxLabels, QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import {
  confirmTx,
  deriveAddress,
  deriveAddressSeed,
  getDefaultAddressTreeInfo,
  PackedAccounts,
  selectStateTreeInfo,
  SystemAccountMetaConfig,
} from "@lightprotocol/stateless.js";
import { useLightRpc } from "@hooks/useLightRpc";
import { useMailBoxContext } from "./useMailBoxContext";
import { useNavigate } from "@tanstack/react-router";
import { dispatchCustomEvent, EventTypes } from "@utils/event";

type Options = {
  body?: string;
  label?: MailBoxLabels;
  from: string;
  to: string;
  mail: string;
};

export const useUpdateCompressedAccount = () => {
  const { program } = useGetMailProgramInstance();
  const { address: _address } = usePrivyWallet();
  const lightRpc = useLightRpc();

  const redirect = () => {
    navigate({ to: `/u/solmail/${context}/all` });
  };
  const clear = (id: string) => {
    queryClient.setQueryData(
      [QueryKeys.MAILBOX, MailBoxLabels.inbox],
      (data: FetchAllMailsResult) => {
        if (!data) return [];
        return data.filter((item) => item.publicKey?.toString() !== id);
      }
    );
    queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
  };

  const queryClient = useQueryClient();

  const { context } = useMailBoxContext();
  const navigate = useNavigate({ from: `/u/solmail/${context}/$id` });

  return useMutation({
    mutationKey: [QueryKeys.MUTATION_UPDATE_COMPRESSED_MAIL],
    mutationFn: async ({ from, to, mail, body, label }: Options) => {
      if (!program || !_address) {
        return;
      }

      const addressSeed = deriveAddressSeed(
        [
          Buffer.from("compressed-mail"),
          new PublicKey(from).toBuffer(),
          new PublicKey(to).toBuffer(),
          Buffer.from(mail),
        ],
        program.programId
      );

      const addressTreeInfo = getDefaultAddressTreeInfo();
      const address = deriveAddress(addressSeed, addressTreeInfo.tree);

      const compressedAccount = await lightRpc.getCompressedAccount(
        Array.from(address.toBytes())
      );
      if (!compressedAccount || !compressedAccount.data) {
        throw new Error(
          "Mail account not found in indexer. Wait longer or check indexer status."
        );
      }

      const currentMailData = program.coder.types.decode(
        "compressedMailData",
        Buffer.from(compressedAccount.data.data)
      );

      const proofRpcResult = await lightRpc.getValidityProofV0(
        [
          {
            hash: compressedAccount.hash,
            tree: compressedAccount.treeInfo.tree,
            queue: compressedAccount.treeInfo.queue,
          },
        ],
        []
      );

      const stateTreeInfos = await lightRpc.getStateTreeInfos();
      const outputStateTreeInfo = selectStateTreeInfo(stateTreeInfos);

      const systemAccountConfig = SystemAccountMetaConfig.new(
        program.programId
      );
      const remainingAccounts =
        PackedAccounts.newWithSystemAccounts(systemAccountConfig);

      const merkleTreePubkeyIndex = remainingAccounts.insertOrGet(
        compressedAccount.treeInfo.tree
      );
      const queuePubkeyIndex = remainingAccounts.insertOrGet(
        compressedAccount.treeInfo.queue
      );
      const outputStateTreeIndex = remainingAccounts.insertOrGet(
        outputStateTreeInfo.tree
      );

      const compressedAccountMeta = {
        treeInfo: {
          rootIndex: proofRpcResult.rootIndices[0],
          proveByIndex: false,
          merkleTreePubkeyIndex,
          queuePubkeyIndex,
          leafIndex: compressedAccount.leafIndex,
        },
        address: compressedAccount.address,
        outputStateTreeIndex,
      };

      const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000,
      });

      if (body) {
        const newLabel = { inbox: {} };
        const tx = await program.methods
          .compressedUpdateMail(
            currentMailData,
            compressedAccountMeta,
            body,
            newLabel,
            address,
            { 0: proofRpcResult.compressedProof }
          )
          .accounts({
            signer: _address,
          })
          .preInstructions([computeBudgetIx])
          .remainingAccounts(
            remainingAccounts.toAccountMetas().remainingAccounts
          )
          .rpc();

        await confirmTx(lightRpc, tx);
      } else {
        const newLabel = { [label ?? "inbox"]: {} };
        const tx = await program.methods
          .compressedUpdateMailLabel(
            currentMailData,
            compressedAccountMeta,
            newLabel,
            address,
            { 0: proofRpcResult.compressedProof }
          )
          .accounts({
            signer: _address,
          })
          .preInstructions([computeBudgetIx])
          .remainingAccounts(
            remainingAccounts.toAccountMetas().remainingAccounts
          )
          .rpc();

        await confirmTx(lightRpc, tx);

        clear(mail);
        dispatchCustomEvent({
          type: EventTypes.status_update,
        });
        redirect();
      }
    },
  });
};

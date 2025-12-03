import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { usePrivyWallet } from "./usePrivyWallet";
import {
  confirmTx,
  deriveAddress,
  deriveAddressSeed,
  getDefaultAddressTreeInfo,
  PackedAccounts,
  selectStateTreeInfo,
  SystemAccountMetaConfig,
} from "@lightprotocol/stateless.js";
import { ComputeBudgetProgram, PublicKey } from "@solana/web3.js";
import { useLightRpc } from "./useLightRpc";

type Payload = {
  from: string;
  to: string;
  mail: string;
};
export const useMarkAsPayment = () => {
  const { program } = useGetMailProgramInstance();
  const { address: _address } = usePrivyWallet();
  const lightRpc = useLightRpc();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_MARK_AS_PAYMENT],
    mutationFn: async ({ from, to, mail }: Payload) => {
      if (!program || !_address) {
        return;
      }

      const addressTreeInfo = getDefaultAddressTreeInfo();
      const addressSeed = deriveAddressSeed(
        [
          Buffer.from("compressed-mail"),
          new PublicKey(from).toBuffer(),
          new PublicKey(to).toBuffer(),
          Buffer.from(mail),
        ],
        program.programId
      );
      const address = deriveAddress(addressSeed, addressTreeInfo.tree);

      const compressedAccount = await lightRpc.getCompressedAccount(
        Array.from(address.toBytes())
      );
      if (!compressedAccount || !compressedAccount.data) {
        throw new Error("Mail account not found in indexer");
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

      const tx = await program.methods
        .compressedMarkMailAsPayment(
          currentMailData,
          compressedAccountMeta,
          address,
          { 0: proofRpcResult.compressedProof }
        )
        .accounts({
          signer: _address,
        })
        .preInstructions([computeBudgetIx])
        .remainingAccounts(remainingAccounts.toAccountMetas().remainingAccounts)
        .rpc();

      await confirmTx(lightRpc, tx);
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { usePrivyWallet } from "./usePrivyWallet";
import { useLightRpc } from "./useLightRpc";
import {
  PackedAccounts,
  SystemAccountMetaConfig,
  confirmTx,
  deriveAddress,
  deriveAddressSeed,
  getDefaultAddressTreeInfo,
  selectStateTreeInfo,
} from "@lightprotocol/stateless.js";
import { ComputeBudgetProgram, PublicKey } from "@solana/web3.js";

export const useCreateCompressedMailbox = () => {
  const { address } = usePrivyWallet();
  const { program } = useGetMailProgramInstance();
  const lightRpc = useLightRpc();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_CREATE_COMPRESSED_ACCOUNT],
    mutationFn: async () => {
      if (!address || !program) {
        return !1;
      }
      const stateTreeInfos = await lightRpc.getStateTreeInfos();
      const outputStateTreeInfo = selectStateTreeInfo(stateTreeInfos);

      const addressTreeInfo = getDefaultAddressTreeInfo();

      const addressSeed = deriveAddressSeed(
        [Buffer.from("mail-accountv2"), new PublicKey(address).toBuffer()],
        program.programId
      );

      const registeredAddress = deriveAddress(
        addressSeed,
        addressTreeInfo.tree
      );

      const proofRpcResult = await lightRpc.getValidityProofV0(
        [],
        [
          {
            address: Array.from(registeredAddress.toBytes()),
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
        .compressedRegister(
          address,
          { 0: proofRpcResult.compressedProof },
          packedAddressTreeInfo,
          outputMerkleTreeIndex
        )
        .accounts({
          signer: address,
        })
        .preInstructions([computeBudgetIx])
        .remainingAccounts(remainingAccounts.toAccountMetas().remainingAccounts)

        .rpc();

      await confirmTx(lightRpc, tx);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

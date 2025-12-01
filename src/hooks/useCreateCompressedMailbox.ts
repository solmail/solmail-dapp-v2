import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { usePrivyWallet } from "./usePrivyWallet";
import { useLightRpc } from "./useLightRpc";
import {
  PackedAccounts,
  SystemAccountMetaConfig,
  confirmTx,
  createRpc,
  deriveAddress,
  deriveAddressSeed,
  getDefaultAddressTreeInfo,
  selectStateTreeInfo,
} from "@lightprotocol/stateless.js";
import { PublicKey } from "@solana/web3.js";

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

      // Get address tree info
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
        [], // No input accounts (creating new account)
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
      let remainingAccounts =
        PackedAccounts.newWithSystemAccounts(systemAccountConfig);

      // Add address tree accounts
      const addressMerkleTreePubkeyIndex = remainingAccounts.insertOrGet(
        addressTreeInfo.tree
      );
      const addressQueuePubkeyIndex = remainingAccounts.insertOrGet(
        addressTreeInfo.queue
      );

      // Create packed address tree info
      const packedAddressTreeInfo = {
        rootIndex: proofRpcResult.rootIndices[0],
        addressMerkleTreePubkeyIndex,
        addressQueuePubkeyIndex,
      };

      // Add output state tree
      const outputMerkleTreeIndex = remainingAccounts.insertOrGet(
        outputStateTreeInfo.tree
      );

      // Set compute budget
      const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000,
      });
    },
  });
};

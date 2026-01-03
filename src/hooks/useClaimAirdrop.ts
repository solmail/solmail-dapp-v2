import { useMutation as useMutationAppolo } from "@apollo/client";
import { CREATE_DECOMPRESS_TRANSACTION } from "@integrations/graphql/mutation/createDecompressTransaction";
import { useMutation } from "@tanstack/react-query";
import {
  ClaimAirdropMutation,
  ClaimAirdropMutationVariables,
  CreateDecompressTransactionMutation,
  CreateDecompressTransactionMutationVariables,
} from "src/gql/graphql";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "./usePrivyWallet";
import { useToast } from "./useToast";
import { deserializeTxFromBase64 } from "@utils/string/deserializeTransaction";
import { useSolanaConnection } from "./useConnection";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { CLAIM_AIRDROP } from "@integrations/graphql/mutation/markClaim";

type MutationPayload = {
  mint: string;
  airdropAddress: string;
};
export const useClaimAirdrop = () => {
  const { address } = usePrivyWallet();
  const { showToast } = useToast();
  const [createDecompressTx] = useMutationAppolo<
    CreateDecompressTransactionMutation,
    CreateDecompressTransactionMutationVariables
  >(CREATE_DECOMPRESS_TRANSACTION);

  const [claimAirdrop] = useMutationAppolo<
    ClaimAirdropMutation,
    ClaimAirdropMutationVariables
  >(CLAIM_AIRDROP);

  const connection = useSolanaConnection();

  const { sendTransaction } = useSendTransaction();

  return useMutation({
    mutationKey: [QueryKeys.MUTATION_CLAIM_AIRDROP],
    mutationFn: async ({ mint, airdropAddress }: MutationPayload) => {
      const { data } = await createDecompressTx({
        variables: {
          wallet: address,
          tokenMint: mint,
          amount: null,
        },
      });

      if (
        data &&
        data.createDecompressInstruction &&
        data.createDecompressInstruction.transaction
      ) {
        const trx = deserializeTxFromBase64(
          data.createDecompressInstruction.transaction
        );

        const signature = await sendTransaction({
          transaction: trx,
          connection,
        });

        await claimAirdrop({
          variables: {
            airdropAddress,
            wallet: address,
            transactionSignature: signature.signature,
          },
        });
      } else {
        throw "";
      }
    },
    onSuccess: () => {
      showToast("Aidrop claimed", {
        type: "success",
      });
    },
    onError: () => {
      showToast("Failed to claim airdrop", {
        type: "error",
      });
    },
  });
};

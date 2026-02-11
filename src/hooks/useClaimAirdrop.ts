import { useMutation as useMutationAppolo } from "@apollo/client";
import { CREATE_DECOMPRESS_TRANSACTION } from "@integrations/graphql/mutation/createDecompressTransaction";
import { useMutation } from "@tanstack/react-query";
import {
  ClaimAirdropMutation,
  ClaimAirdropMutationVariables,
  DecompressMutation,
  DecompressMutationVariables,
} from "src/gql/graphql";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "./usePrivyWallet";
import { useToast } from "./useToast";
import { deserializeTxFromBase64 } from "@utils/string/deserializeTransaction";
import { useSolanaConnection } from "./useConnection";

import { CLAIM_AIRDROP } from "@integrations/graphql/mutation/markClaim";

type MutationPayload = {
  airdropAddress: string;
};
export const useClaimAirdrop = () => {
  const { address, sendTransaction } = usePrivyWallet();
  const { showToast } = useToast();
  const [createDecompressTx] = useMutationAppolo<
    DecompressMutation,
    DecompressMutationVariables
  >(CREATE_DECOMPRESS_TRANSACTION);

  const [claimAirdrop] = useMutationAppolo<
    ClaimAirdropMutation,
    ClaimAirdropMutationVariables
  >(CLAIM_AIRDROP);

  const connection = useSolanaConnection();

  return useMutation({
    mutationKey: [QueryKeys.MUTATION_CLAIM_AIRDROP],
    mutationFn: async ({ airdropAddress }: MutationPayload) => {
      const { data } = await createDecompressTx({
        variables: {
          wallet: address,
          airdropAddress,
        },
      });

      if (
        data &&
        data.createDecompressInstruction &&
        data.createDecompressInstruction.transaction
      ) {
        const trx = deserializeTxFromBase64(
          data.createDecompressInstruction.transaction,
        );

        const signature = await sendTransaction(
          trx,

          connection,
        );

        await claimAirdrop({
          variables: {
            airdropAddress,
            wallet: address,
            transactionSignature: (signature as any).signature,
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

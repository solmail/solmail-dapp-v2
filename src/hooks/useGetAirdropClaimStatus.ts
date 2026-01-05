import { useQuery } from "@apollo/client";
import { CHECK_AIRDROP_CLAIM } from "@integrations/graphql/queries/getStatus";
import {
  CheckAirdropClaimQuery,
  CheckAirdropClaimQueryVariables,
} from "src/gql/graphql";
import { usePrivyWallet } from "./usePrivyWallet";

export const useGetAirdropClaimStatus = (airdropAddress: string) => {
  const { address } = usePrivyWallet();
  const { data, loading, refetch } = useQuery<
    CheckAirdropClaimQuery,
    CheckAirdropClaimQueryVariables
  >(CHECK_AIRDROP_CLAIM, {
    skip: !airdropAddress,
    variables: {
      airdropAddress,
      wallet: address,
    },
  });
  return {
    data: data?.userAirdropEligibility ?? null,
    loading,
    refetch,
  };
};

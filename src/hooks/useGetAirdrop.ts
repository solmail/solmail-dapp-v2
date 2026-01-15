import { useQuery } from "@apollo/client";
import { GET_AIRDROP } from "@integrations/graphql/queries/getAirdrop";
import { GetAirdropQuery, GetAirdropQueryVariables } from "src/gql/graphql";

export const useGetAirdrop = (airdropAddress: string) => {
  const { data, loading } = useQuery<GetAirdropQuery, GetAirdropQueryVariables>(
    GET_AIRDROP,
    {
      skip: !airdropAddress,
      variables: {
        airdropAddress,
      },
    }
  );
  return {
    data: data?.airdrop ?? null,
    loading,
  };
};

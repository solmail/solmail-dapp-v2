import { useQuery } from "@apollo/client";
import { GET_AIRDROP_JOB_STATUS } from "@integrations/graphql/queries/getAirdropJobStatus";
import {
  GetAirdropJobStatusQuery,
  GetAirdropJobStatusQueryVariables,
} from "src/gql/graphql";

export const useGetAirdropJobStatus = (id: string) => {
  return useQuery<GetAirdropJobStatusQuery, GetAirdropJobStatusQueryVariables>(
    GET_AIRDROP_JOB_STATUS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        airdropAddress: id,
      },
    }
  );
};

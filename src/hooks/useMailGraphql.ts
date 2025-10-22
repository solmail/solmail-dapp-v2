import { useQuery } from "@apollo/client";
import { GET_USER_MAILBOX } from "@integrations/graphql/queries/getMailBox";
import { usePrivyWallet } from "./usePrivyWallet";
import { GetUserInboxQueryVariables, MailLabel } from "src/gql/graphql";
import { GetUserInboxResponse } from "src/types";

export const useMailBoxGraphql = () => {
  const { address } = usePrivyWallet();
  const { loading, error, data, refetch } = useQuery<
    GetUserInboxResponse,
    GetUserInboxQueryVariables
  >(GET_USER_MAILBOX, {
    variables: {
      wallet: address,
      excludedLabels: [MailLabel.Spam],
      limit: 20,
    },
  });

  return {
    isLoading: loading,
    error,
    data,
    isRefetching: !1,
    refetch,
  };
};

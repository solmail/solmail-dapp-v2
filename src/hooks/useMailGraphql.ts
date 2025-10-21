import { useQuery } from "@apollo/client";
import { GET_USER_MAILBOX } from "@integrations/graphql/queries/getMailBox";
import { usePrivyWallet } from "./usePrivyWallet";
import {} from "src/gql/graphql";

export const useMailBoxGraphql = () => {
  const { address } = usePrivyWallet();
  const { loading, error, data } = useQuery<any, any>(GET_USER_MAILBOX, {
    variables: {
      wallet: address,
      excludedLabels: ["Spam"],
      limit: 20,
    },
  });
  return {
    loading,
    error,
    data,
  };
};

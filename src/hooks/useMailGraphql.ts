import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_USER_MAILBOX } from "@integrations/graphql/queries/getMailBox";
import { usePrivyWallet } from "./usePrivyWallet";
import {
  GetUserMailsQuery,
  GetUserMailsQueryVariables,
  MailType,
} from "src/gql/graphql";

import { DEFAULT_MAILS_OFFSET, MAILS_PER_PAGE } from "@const/config";
import { MailBoxLabels } from "src/types";

type ApiConfig = Partial<{
  limit: number;
  offset: number;
  type: MailBoxLabels;
}>;
export const useMailBoxGraphql = (config: ApiConfig = {}) => {
  const {
    limit = MAILS_PER_PAGE,
    offset = DEFAULT_MAILS_OFFSET,
    type = MailBoxLabels.inbox,
  } = config;
  const { address } = usePrivyWallet();
  const { loading, error, data, refetch, networkStatus } = useQuery<
    GetUserMailsQuery,
    GetUserMailsQueryVariables
  >(GET_USER_MAILBOX, {
    notifyOnNetworkStatusChange: true,
    variables: {
      wallet: address,
      limit,
      offset,
      type: type as unknown as MailType,
    },
  });

  const isRefetching =
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.setVariables;

  return {
    isLoading: loading,
    error,
    data,
    isRefetching,
    refetch,
  };
};

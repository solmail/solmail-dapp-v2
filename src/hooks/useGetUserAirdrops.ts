import { useQuery } from "@apollo/client";
import { GET_USER_AIRDROPS } from "@integrations/graphql/queries/getAirdrops";
import {
  GetUserAirdropsQuery,
  GetUserAirdropsQueryVariables,
} from "src/gql/graphql";
import { usePrivyWallet } from "./usePrivyWallet";
import { useMemo } from "react";

const AIRDROPS_LIMIT = 16;

type AirdropsQueryOptions = Omit<
  GetUserAirdropsQueryVariables,
  "limit" | "wallet"
>;

type DataObject = {
  data: GetUserAirdropsQuery["userAirdrops"]["items"][number][];
  count: number;
};
export const useGetUserAirdrops = (
  config: AirdropsQueryOptions = { offset: 0 }
) => {
  const { address } = usePrivyWallet();
  const { data, loading, refetch } = useQuery<
    GetUserAirdropsQuery,
    GetUserAirdropsQueryVariables
  >(GET_USER_AIRDROPS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    skip: !address,
    variables: {
      wallet: address,
      limit: AIRDROPS_LIMIT,
      ...config,
    },
  });

  const _data: DataObject = useMemo(() => {
    if (data && data.userAirdrops && data.userAirdrops.items) {
      return {
        data: data.userAirdrops?.items ?? [],
        count: data?.userAirdrops?.total_count ?? 0,
      };
    } else {
      return {
        data: [],
        count: 0,
      };
    }
  }, [data]);

  const offset = config.offset ?? 0;

  return {
    ..._data,
    loading,
    refetch,
    AIRDROPS_LIMIT,
    pages: Math.ceil(_data.count / AIRDROPS_LIMIT),
    page: offset / AIRDROPS_LIMIT + 1,
  };
};

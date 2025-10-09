import { useQuery } from "@tanstack/react-query";
import apiConfig from "@utils/api";
import { getToken } from "@utils/index";
import { AxiosResponse } from "axios";
import { QueryKeys } from "src/types";
import { AuthTokenResponse } from "src/types/token";
import { useAuthStatus } from "./useAuthState";
import { STORAGE_NAME } from "@const/config";

export const useTokenRefresher = (enabled: boolean = !0) => {
  const { update } = useAuthStatus();
  const query = useQuery({
    queryKey: [QueryKeys.TOKEN_REFRESHER],
    refetchInterval: 1000 * 60 * 3,
    refetchOnWindowFocus: !0,
    enabled,
    queryFn: async () => {
      const {
        data,
      }: AxiosResponse<
        AuthTokenResponse & {
          accessToken: string;
        }
      > = await apiConfig<
        AuthTokenResponse & {
          accessToken: string;
        }
      >(
        "wallet-auth?refresh",
        "POST",
        {
          refreshToken: getToken(),
        },
        undefined,
        false,
        {
          "x-request-type": "refresh-token",
        },
        true
      );
      if (data) {
        if (data.refreshToken && data.accessToken) {
          localStorage.setItem(STORAGE_NAME, data.refreshToken);
          update({
            token: data.accessToken,
            isAuthenticated: !0,
          });
        } else {
          localStorage.clear();
          window.location.reload();
        }
      }
      return data;
    },
  });

  return query;
};

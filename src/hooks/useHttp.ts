import axios, {
  type Method,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { useCallback } from "react";
import * as Sentry from "@sentry/react";
import { getConnectedUser } from "@utils/jotai/getUser";
import { getToken } from "@utils/string/token";

export const useHttp = () => {
  const fetch = useCallback(
    async <T>(
      url: string,
      method: Method,
      data?: any,
      params?: any,
      includeAuth: boolean = true,
      requestType?: string,
      withCredentials: boolean = false,
    ): Promise<AxiosResponse<T>> => {
      const token = getToken();

      const instance = axios.create({
        baseURL: import.meta.env.VITE_REWARDS_BACKEND,
        headers: {
          ...(requestType && { "X-Request-Type": requestType }),
          ...(includeAuth &&
            token && {
              Authorization: `bearer ${token}`,
            }),
        },
        withCredentials,
      });

      const config: AxiosRequestConfig = {
        url,
        method,
        ...(data && { data }),
        ...(params && { params }),
      };

      instance.interceptors.request.use(
        (req) => req,
        (error) => Promise.reject(error),
      );

      instance.interceptors.response.use(
        (res) => {
          const cookies = res.headers["set-cookie"];
          if (cookies) {
            cookies.forEach((cookie: string) => {
              document.cookie = cookie;
            });
          }
          return res;
        },
        (error) => {
          const config = error.config;

          const payload = config?.data;

          const headers = config?.headers;

          Sentry.setUser({
            id: getConnectedUser(),
          });
          Sentry.captureException(error, {
            tags: { type: "rewards-api" },
            extra: { payload, headers },
          });
          return Promise.reject(error.response?.data ?? {});
        },
      );

      const response = await instance.request<T>(config);
      return response;
    },
    [],
  );

  return { fetch };
};

import axios from "axios";
import type {
  AxiosInstance,
  Method,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import * as Sentry from "@sentry/react";
import { getConnectedUser, getToken } from "@utils/jotai/getUser";

/**
 * Axios api config to use to call api calls
 * @param url path
 * @param method Method type
 * @param data payload or query param. pass null if its get and when query or path parameters have to be passed
 * @param params query string params
 * @returns api response or error
 */

const SOMETHING_WENT_WRONG = "Something went wrong";

export const apiConfig = async <T>(
  url: string,
  method: Method,
  data?: any,
  params?: any,
  includeAuth?: boolean,
  requestType?: string | Record<string, string>,
  withCredentials?: boolean
): Promise<AxiosResponse<T>> => {
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SOLMAIL_BACKEND_API,
    headers: {
      ...(requestType
        ? typeof requestType === "string"
          ? { "X-Request-Type": requestType }
          : requestType
        : {}),
      ...(includeAuth && {
        Authorization: `${getToken()}`,
      }),
    },
    withCredentials,
  });
  const requestConfig: AxiosRequestConfig = {
    url,
    method,
    ...(data && { data }),
    ...(params && { params }),
  };

  instance.interceptors.request.use(
    (req) => req,
    (error) => Promise.reject(error)
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
      let errorMessage = "";
      if (error.response) {
        errorMessage = `${errorMessage} ${
          error.response.data?.message || error.response.data?.errorMessage
        }`;
      } else if (error.request) {
        errorMessage += SOMETHING_WENT_WRONG;
      } else {
        errorMessage += SOMETHING_WENT_WRONG;
      }

      const config = error.config;

      const payload = config?.data;

      const headers = config?.headers;

      Sentry.setUser({
        id: getConnectedUser(),
      });
      Sentry.captureException(error, {
        tags: { type: "backend-api" },
        extra: { payload, headers },
      });
      localStorage.clear();
      window.location.reload();

      return Promise.reject(errorMessage);
    }
  );

  const response: AxiosResponse<T> = await instance.request<T>(requestConfig);
  return response;
};

export type { AxiosResponse };

export default apiConfig;

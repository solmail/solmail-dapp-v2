import { getDefaultStore } from "jotai";
import { AuthState } from "@state/auth";
import { STORAGE_NAME } from "@const/config";
const store = getDefaultStore();

export const getConnectedUser = (): string => {
  return store.get(AuthState).user ?? "";
};

export const getToken = () => {
  const refreshToken = localStorage.getItem(STORAGE_NAME);
  const store = getDefaultStore();
  const accessToken = (store.get(AuthState).token ?? "").trim();
  return accessToken || refreshToken;
};

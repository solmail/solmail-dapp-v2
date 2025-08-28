import { getDefaultStore } from "jotai";
import { AuthState } from "@state/auth";
const store = getDefaultStore();

export const getConnectedUser = (): string => {
  return store.get(AuthState).user ?? "";
};

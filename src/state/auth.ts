import { getToken } from "@utils/string/token";
import { atom } from "jotai";

export type AuthType = {
  isSignInRequested: boolean;
  isAuthenticated: boolean;
  user: string;
};

export const AuthState = atom<AuthType>({
  isSignInRequested: !1,
  isAuthenticated: !!getToken(),
  user: "",
});

AuthState.debugLabel = "AuthState";

import { getToken } from "@utils/string/token";
import { atom } from "jotai";

export type AuthType = {
  isSignInRequested: boolean;
  isAuthenticated: boolean;
  user: string;
  token: string;
  updatedAt: number;
};

export const AuthState = atom<AuthType>({
  isSignInRequested: !1,
  isAuthenticated: !!getToken(),
  user: "",
  token: "",
  updatedAt: 0,
});

AuthState.debugLabel = "AuthState";

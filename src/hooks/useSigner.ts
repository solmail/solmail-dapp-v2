import { usePrivyWallet } from "@hooks/usePrivyWallet";
import bs58 from "bs58";
import apiConfig, { type AxiosResponse } from "@utils/api";
import { useDisclosure } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";

import { useTransition } from "react";
import { useAuthStatus } from "@hooks/useAuthState";
import { getToken } from "@utils/string/token";
import { AuthTokenResponse } from "src/types/token";
import { useTokenRefresher } from "@hooks/useTokenRefresh";
import { STORAGE_NAME } from "@const/config";

export const useSigner = () => {
  const { address, signMessage } = usePrivyWallet();
  const { isSignInRequested, update } = useAuthStatus();
  const [isPending, start] = useTransition();

  const isAuthDone = !!getToken();
  useTokenRefresher(isAuthDone);
  const { isOpen: isAuthenticated, onOpen } = useDisclosure({
    defaultIsOpen: isAuthDone,
  });

  const setToken = (token: string) => {
    if (token) {
      localStorage.setItem(STORAGE_NAME, token);
    }
  };
  const getNonce = async () => {
    try {
      const { data }: AxiosResponse<{ gmtValue: string; nonce: string }> =
        await apiConfig<{ gmtValue: string; nonce: string }>(
          "/wallet-auth",
          "POST",
          undefined,
          undefined,
          false,
          "generate-nonce",
          true,
        );

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const generateToken = async (nonce: string, gmtValue: string) => {
    try {
      if (!address) return false;
      const signature = await getSignature(nonce);

      if (!signature) return false;
      const publicKey = new PublicKey(address).toBase58();
      const { data }: AxiosResponse<AuthTokenResponse> =
        await apiConfig<AuthTokenResponse>(
          "wallet-auth",
          "POST",
          {
            nonce,
            signature,
            publicKey,
            ...(gmtValue && { gmtValue }),
          },
          undefined,
          false,
          "generate-jwt",
          true,
        );
      if (data.refreshToken) {
        setToken(data.refreshToken);
        update({
          token: data.authToken ?? "",
          updatedAt: new Date().getTime(),
          isAuthenticated: !0,
        });

        onOpen();

        return true;
      }
    } catch {
      return false;
    }
  };

  const getSignature = async (nonce: string) => {
    if (!signMessage) {
      return;
    }
    console.log(signMessage);
    const message = `Sign in with SolMail.\n\nNo password is required.\n\nClick "Sign" or "Approve" only means you have confirmed you own this wallet.\n\nThis request will not initiate any blockchain transaction or cost any gas fee.\n\nNonce: ${nonce}`;
    const messageBytes = new TextEncoder().encode(message);
    const signature = await signMessage({ message: messageBytes });
    return bs58.encode(signature);
  };
  const requestSignIn = async () => {
    if (isPending || isSignInRequested) return;

    start(async () => {
      if (!getToken() && !isAuthenticated) {
        update({
          isSignInRequested: !0,
        });
        const nonce = await getNonce();

        if (!nonce?.nonce) {
          update({
            isAuthenticated: !0,
          });
          onOpen();
          return;
        }
        const auth = await generateToken(nonce.nonce, nonce.gmtValue);
        if (auth) {
          update({
            isAuthenticated: !0,
          });
          onOpen();
          return;
        }
      }
    });
  };

  const clearToken = () => {
    localStorage.removeItem(STORAGE_NAME);
  };

  return {
    getToken,
    clearToken,
    setToken,
    requestSignIn,
    isAuthenticated,
    isAuthenticating: isPending,
  };
};

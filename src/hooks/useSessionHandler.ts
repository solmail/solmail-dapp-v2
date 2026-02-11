import { useSigner } from "@hooks/useSigner";

import { clearStorage } from "@utils/storage/clear";
import { useTransition } from "react";
import { usePrivyWallet } from "./usePrivyWallet";

export const useSessionHandler = () => {
  const { clearToken } = useSigner();

  const { logout, isPrivy } = usePrivyWallet();
  const [isPending, startTransition] = useTransition();
  const onLogout = () => {
    if (isPending) return;
    startTransition(async () => {
      try {
        await logout();
        clearToken();
        if (!isPrivy) {
          clearStorage();
        }
        window.location.reload();
      } catch {
        clearStorage();
        window.location.reload();
      }
    });
  };

  return {
    clearToken,
    onLogout,
    isPending,
  };
};

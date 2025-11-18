import { useSigner } from "@hooks/useSigner";
import { usePrivy } from "@privy-io/react-auth";
import { clearStorage } from "@utils/storage/clear";
import { useTransition } from "react";

export const useSessionHandler = () => {
  const { clearToken } = useSigner();
  const { logout } = usePrivy();
  const [isPending, startTransition] = useTransition();
  const onLogout = () => {
    if (isPending) return;
    startTransition(async () => {
      try {
        await logout();
        clearToken();
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

import { notificationAtom } from "@state/notification";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { messaging } from "@integrations/firebase";
import { getToken } from "firebase/messaging";
import { useFCMTokenHandler } from "@hooks/useFcmTokenHandler";
import { usePrivyWallet } from "./usePrivyWallet";

export const useFCMNotifications = (autoRequest: boolean = !1) => {
  const [{ hasPermisson, isRegistered, ...rest }, set] =
    useAtom(notificationAtom);
  const hasRequested = useRef<boolean>(!1);
  const { mutateAsync } = useFCMTokenHandler();
  const { address } = usePrivyWallet();
  const registerToken = useCallback(async () => {
    set((prev) => ({
      ...prev,
      hasPermisson: !0,
      isRegistering: !0,
    }));
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_SOLMAIL_VAPID,
        serviceWorkerRegistration: registration,
      });

      await mutateAsync({
        action: "register",
        fcmId: token,
        userPubKey: address,
      });

      localStorage.setItem("_i_", token);
      set((prev) => ({
        ...prev,
        isRegistered: !0,
        isRegistering: !1,
      }));
    } catch {
      set((prev) => ({
        ...prev,
        isRegistered: !1,
        isRegistering: !1,
      }));
    }
  }, [address, mutateAsync, set]);

  const requestPemisson = useCallback(async () => {
    if (Notification.permission === "granted") {
      registerToken();
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        registerToken();
      } else {
        set((prev) => {
          return {
            ...prev,
            hasPermisson: !1,
          };
        });
      }
    }
  }, [registerToken, set]);

  const unregister = async () => {
    try {
      const token = localStorage.getItem("_i_")?.trim() ?? "";
      if (token) {
        set((prev) => ({
          ...prev,
          isRegistering: !0,
        }));

        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .getRegistration("/firebase-messaging-sw.js")
            .then((registration) => {
              if (registration) {
                registration.unregister().then(async () => {
                  await mutateAsync({
                    action: "unregister",
                    fcmId: token,
                    userPubKey: address,
                  });
                  localStorage.removeItem("_i_");
                  set((prev) => ({
                    ...prev,
                    isRegistered: !1,
                    isRegistering: !1,
                  }));
                });
              }
            })
            .catch(() => {
              throw "Failed to unregister";
            });
        }
      } else {
        throw "No token";
      }
    } catch {
      console.warn("Failed to unregister token");
    }
  };

  useEffect(() => {
    if (autoRequest && !hasRequested.current) {
      requestPemisson();
    }
  }, [autoRequest, requestPemisson]);

  return {
    hasPermisson,
    isRegistered,
    requestPemisson,
    unregister,
    ...rest,
  };
};

import { notificationAtom } from "@state/notification";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useFCMNotifications = () => {
  const [{ hasRequested, isRegistering }, set] = useAtom(notificationAtom);

  const requestPermisson = useCallback(async () => {
    if (isRegistering) {
      return !0;
    }

    set((prev) => ({
      ...prev,
      hasRequested: !0,
      isRegistering: !0,
    }));

    if (Notification.permission === "granted") {
      registerToken();
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        registerToken();
      } else {
        set((prev) => ({
          ...prev,
          isRegistering: !1,
        }));
      }
    }
  }, [isRegistering, set]);

  const registerToken = () => {};

  return {
    requestPermisson,
    registerToken,
    isRegistering,
    hasRequested,
  };
};

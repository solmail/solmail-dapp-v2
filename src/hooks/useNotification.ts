import { messaging } from "@integrations/firebase";
import { getToken } from "firebase/messaging";
import { useCallback, useRef, useState } from "react";
import { useToast } from "./useToast";
import { config } from "@const/config";
import isFunction from "lodash/isFunction";
import { useFCMTokenHandler } from "./useFcmTokenHandler";
import { usePrivyWallet } from "./usePrivyWallet";
type Config = {
  onSucess?: () => void;
  onReject?: () => void;
};
export const useNotification = (options: Config = {}) => {
  const { onSucess, onReject } = options;
  const { showToast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const { address } = usePrivyWallet();
  const { mutateAsync } = useFCMTokenHandler();
  const shouldShowWelcomeNotification = useRef<boolean>(!1);
  const getTokenFromStorage = () => {
    return localStorage.getItem("fcmtoken") ?? !1;
  };

  const sendSampleNotification = useCallback(
    ({ title, message }: { title: string; message: string }) => {
      if (Notification.permission === "granted") {
        new Notification(title, {
          body: message,
          icon: config.logo,
        });
      }
    },
    []
  );

  const generateToken = useCallback(async () => {
    if (!getTokenFromStorage()) {
      try {
        await navigator.serviceWorker.register(`/firebase-messaging-sw.js`);
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_SOLMAIL_VAPID,
        });

        await mutateAsync({
          action: "register",
          fcmId: token,
          userPubKey: address,
        });

        if (shouldShowWelcomeNotification.current) {
          sendSampleNotification({
            title: "SolMail Ready",
            message:
              "You'll stay updated — notifications will appear for every new mail.",
          });
          shouldShowWelcomeNotification.current = !1;
        }

        setEnabled(true);
      } catch {
        showToast(
          "Failed to register token",
          import.meta.env.VITE_SOLMAIL_VAPID
        );
      }
    }
  }, [address, mutateAsync, sendSampleNotification, showToast]);

  const onGetPermission = useCallback(async () => {
    if (isFunction(onSucess)) {
      onSucess();
    }

    await generateToken();
  }, [generateToken, onSucess]);

  const requestPermisson = useCallback(async () => {
    if (!enabled) {
      if (Notification.permission === "granted") {
        onGetPermission();
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          shouldShowWelcomeNotification.current = !0;
          onGetPermission();
        } else {
          showToast(
            "Looks like notifications are blocked. Don't worry — you can turn them on anytime in your browser settings.",
            {
              type: "error",
            }
          );
        }
      }
    } else {
      if (isFunction(onReject)) {
        onReject();
      }
      setEnabled(false);
    }
  }, [enabled, onGetPermission, onReject, showToast]);

  const register = async () => {
    generateToken();
  };

  return {
    enabled,
    register,
    requestPermisson,
    sendSampleNotification,
  };
};

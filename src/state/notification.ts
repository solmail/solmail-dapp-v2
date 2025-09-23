import { atom } from "jotai";

type NotificationType = {
  hasPermisson: boolean;
  isRegistered: boolean;
  isRegistering: boolean;
};

const id = localStorage.getItem("_i_")?.trim() ?? !1;
export const notificationAtom = atom<NotificationType>({
  hasPermisson: Notification.permission === "granted",
  isRegistered: !!id,
  isRegistering: !1,
});

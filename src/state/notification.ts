import { atom } from "jotai";

type NotificationType = {
  hasRequested: boolean;
  isRegistering: boolean;
};
export const notificationAtom = atom<NotificationType>({
  hasRequested: !1,
  isRegistering: !1,
});

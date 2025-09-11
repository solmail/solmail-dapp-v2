import { atomWithStorage } from "jotai/utils";

export const notificationAtom = atomWithStorage<{
  notificationEnabled: boolean;
  isRegistered: boolean;
  isRegistering: boolean;
  isRequested: boolean;
  permisson: NotificationPermission;
}>("settings:notification", {
  notificationEnabled: false,
  isRegistered: !1,
  isRegistering: !1,
  isRequested: !1,
  permisson: Notification.permission,
});

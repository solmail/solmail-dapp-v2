import { FCM_STORAGE_KEY } from "@const/config";

export const clearStorage = (exclude: string[] = [FCM_STORAGE_KEY]) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !exclude.includes(key)) {
      localStorage.removeItem(key);
      i--;
    }
  }
};

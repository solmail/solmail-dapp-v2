import { STORAGE_NAME } from "@const/config";

export const getToken = (): string | boolean => {
  const val = localStorage.getItem(STORAGE_NAME);
  return val && val.trim() ? val.trim() : !1;
};

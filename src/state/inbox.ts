import { atom } from "jotai";
import { FormattedMailBox } from "src/types";

export const MailListState = atom<FormattedMailBox[]>([]);

export enum MailListStatus {
  "idle",
  "updating",
  "loading",
  "reday",
}

export const MailListStatusState = atom<{ status: MailListStatus }>({
  status: MailListStatus.idle,
});

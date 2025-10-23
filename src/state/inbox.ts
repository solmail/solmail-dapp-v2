import { atom } from "jotai";
import { FormattedMailBox } from "src/types";

export const MailListState = atom<FormattedMailBox[]>([]);

export enum MailListStatus {
  "idle",
  "updating",
  "loading",
  "reday",
}

type State = { status: MailListStatus; hasInboxUpdates: boolean };
export const MailListStatusState = atom<State>({
  status: MailListStatus.idle,
  hasInboxUpdates: !1,
});

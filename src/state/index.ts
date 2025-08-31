import { atom } from "jotai";
import { toast } from "react-toastify";
import { MailBoxLabels } from "src/types";

export type AtomType = {
  isComposerOpen: boolean;
  composerState: string;
  composerCollapsed: boolean;
  thread: string;
  ref: string;
  updatingUsername: boolean;
  action: MailShareTypes;
  context: MailBoxLabels;
  composerProgress: { total: number; current: number };
};

export enum MailShareTypes {
  "reply",
  "forward",
  "none",
}

export const appState = atom<AtomType>({
  isComposerOpen: !1,
  composerCollapsed: !1,
  composerState: "",
  thread: "",
  ref: "",
  action: MailShareTypes.none,
  updatingUsername: !1,
  context: MailBoxLabels.inbox,
  composerProgress: { total: 0, current: 0 },
});

appState.debugLabel = "AppState";

export type UsernameState = {
  isOpen: boolean;
  requestUsernameLink: boolean;
};
export const useNameState = atom<UsernameState>({
  isOpen: !1,
  requestUsernameLink: !1,
});

useNameState.debugLabel = "UsernameModal";

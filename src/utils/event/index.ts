import { MailBoxLabels } from "src/types";

export enum EventTypes {
  "status_update",
  "inbox_force_update",
  "inbox_reset_scroll",
}
export type Payload = {
  type?: EventTypes;
  contextRefresher?: MailBoxLabels;
};
export type CustomEventType = CustomEvent<Payload>;

export const EVENT_NAME = "custom_event_solmail";
export const dispatchCustomEvent = (detail: Payload) => {
  const event = new CustomEvent(EVENT_NAME, { detail });
  window.dispatchEvent(event);
};

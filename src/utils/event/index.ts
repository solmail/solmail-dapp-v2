export enum EventTypes {
  "status_update",
}
export type Payload = {
  type: EventTypes;
};
export type CustomEventType = CustomEvent<Payload>;
export const EVENT_NAME = "custom_event_solmail";
export const dispatchCustomEvent = (detail: Payload & Record<string, any>) => {
  const event = new CustomEvent(EVENT_NAME, { detail });
  window.dispatchEvent(event);
};

export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventName: string | Date,
      params?: Record<string, any>
    ) => void;
  }
}

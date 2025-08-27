import { MutationCacheNotifyEvent, QueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { getDefaultStore } from "jotai";
import { AuthState } from "@state/auth";
export const queryclient = new QueryClient();

const store = getDefaultStore();
queryclient.getMutationCache().subscribe((event: MutationCacheNotifyEvent) => {
  if (event.type === "updated") {
    const error = event?.mutation?.state?.error;
    if (error) {
      const user = store.get(AuthState).user;
      Sentry.setUser({
        id: user,
      });
      Sentry.captureException(error, {
        tags: { type: "mutation" },
        extra: { payload: event?.mutation?.state?.variables },
      });
    }
  }
});

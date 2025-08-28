import { MutationCacheNotifyEvent, QueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { getConnectedUser } from "@utils/jotai/getUser";

export const queryclient = new QueryClient();

queryclient.getMutationCache().subscribe((event: MutationCacheNotifyEvent) => {
  if (event.type === "updated") {
    const error = event?.mutation?.state?.error;

    if (error) {
      Sentry.setUser({
        id: getConnectedUser(),
      });
      Sentry.captureException(error, {
        tags: { type: "mutation" },
        extra: { payload: event?.mutation?.state?.variables },
      });
    }
  }
});

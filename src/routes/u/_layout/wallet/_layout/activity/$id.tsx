import { ActivityPage } from "@screens/wallet/wallet-activitypage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/activity/$id")({
  component: ActivityPage,
});

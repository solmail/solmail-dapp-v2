import { ReceiveScreen } from "@screens/wallet/receive";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/receive/")({
  component: ReceiveScreen,
});

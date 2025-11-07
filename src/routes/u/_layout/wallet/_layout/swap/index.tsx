import { SwapPage } from "@screens/wallet/wallet-swap";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/swap/")({
  component: SwapPage,
});

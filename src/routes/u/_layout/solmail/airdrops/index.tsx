import { Airdrops } from "@screens/airdrops";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/airdrops/")({
  component: Airdrops,
});

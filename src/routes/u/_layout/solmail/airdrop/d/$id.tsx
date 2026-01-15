import { Airdrop } from "@screens/airdrop";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/airdrop/d/$id")({
  component: Airdrop,
});

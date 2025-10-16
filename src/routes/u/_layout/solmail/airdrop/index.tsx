import { AirdropComingSoon } from "@screens/airdrop-coming-soon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/airdrop/")({
  component: AirdropComingSoon,
});

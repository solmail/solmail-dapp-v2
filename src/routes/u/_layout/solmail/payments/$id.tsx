import { SolmailPayments } from "@screens/solmail/payment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/payments/$id")({
  component: SolmailPayments,
});

import { SwapPage } from "@screens/wallet/wallet-swap";
import { NATIVE_MINT } from "@solana/spl-token";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/swap/")({
  component: SwapPage,
  validateSearch: (search) => {
    return {
      out: search.out ?? import.meta.env.VITE_JUPITER_USDC_ADDRESS,
      in: search.in ?? NATIVE_MINT.toString(),
    };
  },
});

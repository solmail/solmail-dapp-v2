import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { JupiterSwapForm } from "src/types/jupiter";
import { usePrivyWallet } from "./usePrivyWallet";

export const useJupiterQuote = (options: JupiterSwapForm) => {
  const { address } = usePrivyWallet();
  return useQuery({
    queryKey: [QueryKeys.JUPITER_QUOTE, options],
    queryFn: async () => {
      const params = new URLSearchParams({
        in: options.in,
        out: options.out,
        taker: address,
        amount: "0",
      });

      const url = `${import.meta.env.VITE_SOLMAIL_JUPITER_ENDPOINT}ultra/v1/order?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch Jupiter quote: ${res.status}`);
      }

      return res.json();
    },
    enabled: !!options.in && !!options.out,
  });
};

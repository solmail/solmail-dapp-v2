import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";

import { usePrivyWallet } from "./usePrivyWallet";
import { JupiterQuoteParams, JupiterQuoteResponse } from "src/types/jupiter";

export const useJupiterQuote = (options: JupiterQuoteParams) => {
  const { address } = usePrivyWallet();
  return useQuery<JupiterQuoteResponse>({
    queryKey: [QueryKeys.JUPITER_QUOTE, options],
    refetchInterval: 3000,
    queryFn: async () => {
      const params = new URLSearchParams({
        inputMint: options.in,
        outputMint: options.out,
        taker: address,
        amount: options.amount.toString(),
      });

      const url = `${import.meta.env.VITE_SOLMAIL_JUPITER_ENDPOINT}ultra/v1/order?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch Jupiter quote: ${res.status}`);
      }

      return res.json();
    },
    enabled: !!options.in && !!options.out && !!options.amount,
  });
};

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";

import { usePrivyWallet } from "./usePrivyWallet";
import { JupiterQuoteParams, JupiterQuoteResponse } from "src/types/jupiter";
import { JUPITER_ENDPOINT } from "@const/config";
import { useJupiterState } from "./useJupiterState";

export const useJupiterQuote = (options: JupiterQuoteParams) => {
  const { address } = usePrivyWallet();
  const { isSwapping } = useJupiterState();
  return useQuery<JupiterQuoteResponse>({
    queryKey: [QueryKeys.JUPITER_QUOTE, options],
    refetchInterval: 3000,
    queryFn: async () => {
      const params = new URLSearchParams({
        inputMint: options.in,
        outputMint: options.out,
        taker: address,
        amount: options.amount ?? 0,
      });

      const url = `${JUPITER_ENDPOINT}ultra/v1/order?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch Jupiter quote: ${res.status}`);
      }

      return res.json();
    },
    enabled:
      !isSwapping &&
      !!(
        options.in &&
        options.out &&
        options.amount &&
        parseFloat(options.amount) > 0
      ),
  });
};

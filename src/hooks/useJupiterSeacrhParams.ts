import { useSearch } from "@tanstack/react-router";
import { Route as WalletSwapRoute } from "@routes/u/_layout/wallet/_layout/swap/index";
import { JupiterSwapFormKeys } from "src/types/jupiter";
export type Params = { token_in: string; token_out: string; selected: string };

export const useGetJupiterSwapParams = (name?: JupiterSwapFormKeys): Params => {
  const { in: token_in = "", out: token_out = "" } = useSearch({
    from: WalletSwapRoute.id,
  });

  const selected = name === JupiterSwapFormKeys.in ? token_in : token_out;

  return {
    token_in,
    token_out,
    selected: selected ?? "",
  };
};

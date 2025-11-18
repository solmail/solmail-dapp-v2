import { createContext } from "react";
import { JupiterSwapFormKeys } from "src/types/jupiter";

type TokenInputContextProps = {
  name: JupiterSwapFormKeys;
};
export const TokenInputContext = createContext<TokenInputContextProps>({
  name: JupiterSwapFormKeys.in,
});

import { jupiterState, JupiterSwapStateProps } from "@state/jupiter";
import { useAtom } from "jotai";

export const useJupiterState = () => {
  const [state, u] = useAtom(jupiterState);
  const update = (state: Partial<JupiterSwapStateProps>) => {
    u((prev) => ({
      ...prev,
      ...state,
    }));
  };
  return {
    ...state,
    update,
  };
};

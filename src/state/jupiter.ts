import { atom } from "jotai";

export type JupiterSwapStateProps = {
  isSwapping: boolean;
  isUpdatingOrder: boolean;
};

export const jupiterState = atom<JupiterSwapStateProps>({
  isSwapping: !1,
  isUpdatingOrder: !1,
});

import { TokenInputContext } from "@components/TokenSwapInput/TokenInputContext";
import { useContext } from "react";

export const useTokenInputContext = () => {
  return useContext(TokenInputContext);
};

import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useToast } from "./useToast";
import { getErrorMessage } from "@utils/error/getErrorMessage";
import { JUPITER_ENDPOINT } from "@const/config";
import { useJupiterState } from "./useJupiterState";

export type JupiterSwapParams = {
  requestId: string;
  signedTransaction: string;
};
export const useJupiterSwapMutation = () => {
  const { showToast } = useToast();
  const { update } = useJupiterState();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_JUPITER_SWAP],
    mutationFn: async (options: JupiterSwapParams) => {
      update({
        isSwapping: !0,
      });
      await fetch(`${JUPITER_ENDPOINT}ultra/v1/execute`, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(options),
      });
      update({
        isSwapping: !1,
      });
    },
    onError: (e) => {
      update({
        isSwapping: !1,
      });
      showToast(getErrorMessage(e, "Failed to swap tokens"), {
        type: "error",
      });
    },
    onSuccess: () => {
      showToast(`Swap successful!`, {
        type: "success",
      });
    },
  });
};

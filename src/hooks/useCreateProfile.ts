import { usePrivy } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "@hooks/useHttp";
import { useToast } from "./useToast";
import { getErrorMessage } from "@utils/error/getErrorMessage";
import { usePrivyWallet } from "./usePrivyWallet";
type Payload = {
  code: string;
};
export const useCreateProfile = () => {
  const { user } = usePrivy();
  const { fetch } = useHttp();
  const { address, isPrivy } = usePrivyWallet();
  const { showToast } = useToast();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_USER_PROFILE],
    mutationFn: async ({ code }: Payload) => {
      await fetch(`/users/signup`, "POST", {
        user_id: isPrivy ? (user?.id ?? "").split(":").pop() : address,
        referral_code: code,
      });
    },
    onError: (e) => {
      showToast(getErrorMessage(e, "Failed to create profile"), {
        type: "error",
      });
    },
  });
};

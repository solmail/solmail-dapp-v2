import { useMutation } from "@tanstack/react-query";
import apiConfig from "@utils/api";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "./usePrivyWallet";
import { useToast } from "./useToast";

export type PayLoad = {
  emailAddress: string;
  isNotificationEnabled: boolean;
};
export const useRegisterV2Mail = () => {
  const { address } = usePrivyWallet();
  const { showToast } = useToast();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_V2_MAIL_REGISTER],
    mutationFn: async (payload: PayLoad) => {
      const res = await apiConfig(
        "/register-web2-email",
        "POST",
        {
          publicKey: address,
          ...payload,
        },
        null,
        true
      );
      return res;
    },
    onError: (e) => {
      const message =
        e && e instanceof Error ? e.message : "Failed to register v2 email";
      showToast(message, {
        type: "error",
      });
    },
    onSuccess: (res: any) => {
      let message = "Mail updated successfully";
      if (res && res.data && res.data.message) {
        message = res.data.message;
      }
      showToast(message, {
        type: "success",
      });
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import apiConfig from "@utils/api";
import { QueryKeys } from "src/types";

type Payload = {
  action: "register" | "unregister";
  userPubKey?: string;
  fcmId?: string;
};
export const useFCMTokenHandler = () => {
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_FCM],
    mutationFn: async (payload: Payload) => {
      const response = await apiConfig("register-fcm-notification", "POST", {
        ...payload,
      });
      return response;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import apiConfig from "@utils/api";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "./usePrivyWallet";

export const useGetUserWeb2Email = () => {
  const { address } = usePrivyWallet();
  return useQuery({
    queryKey: [QueryKeys.WEB_2_MAIL],
    queryFn: async () => {
      const res = await apiConfig<{
        emailAddress: string;
        isNotificationEnabled: boolean;
        isVerified: boolean;
      }>(
        "/register-web2-email",
        "GET",
        undefined,
        {
          publicKey: address ?? "",
        },
        true
      );
      return res.data ?? null;
    },
  });
};

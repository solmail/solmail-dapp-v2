import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useEmailResolver } from "./useEmailResolver";

export const useVerifyUsername = (address: string, username?: string) => {
  const { mutateAsync: resolveEmail } = useEmailResolver();
  const { data, ...query } = useQuery<boolean>({
    queryKey: [QueryKeys.USERNAME_VERIFY, username],
    enabled: !!(username && username.trim()),
    queryFn: async () => {
      try {
        const data = await resolveEmail({
          username: username ?? "",
        });
        if (data && data.address) {
          return data.address?.toString() === address;
        }
        return !1;
      } catch {
        return !1;
      }
    },
  });
  return {
    originalName: (data ? username : !1) || address,
    displayName:
      (data ? username?.slice(0, username.lastIndexOf("@")) : !1) || address,
    data,
    ...query,
  };
};

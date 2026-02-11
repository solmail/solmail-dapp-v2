import { usePrivyWallet } from "./usePrivyWallet";
import { useGetLinkedUsernameById } from "./useUsernames";

export const useMyUsername = () => {
  const { address } = usePrivyWallet();
  return useGetLinkedUsernameById(address);
};

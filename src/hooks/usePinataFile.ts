import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "./useMailBody";
import { PINATA_GATEWAY_URL } from "@const/config";

export const usePinataFile = (id: string) => {
  const { data, isLoading } = useQuery<string>({
    queryKey: ["PINATA_FILE", id],
    enabled: !!id,
    queryFn: async () => {
      const body = await fetchContent(`${PINATA_GATEWAY_URL}${id}`);
      return body;
    },
  });
  return {
    data,
    isLoading,
  };
};

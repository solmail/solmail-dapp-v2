import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { Token } from "src/types/jupiter";

type TokenList = Token[];

export const useJupiterTokens = (q: string = "", name: string = "tokens") => {
  const query = useQuery<TokenList>({
    queryKey: [QueryKeys.JUPITER_TOKENS, name, q],
    refetchOnWindowFocus: !1,
    refetchInterval: 5000,
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SOLMAIL_JUPITER_ENDPOINT}?query=${encodeURIComponent(q)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Jupiter tokens");
      }
      const data = await response.json();
      return data as TokenList;
    },
  });
  return query;
};

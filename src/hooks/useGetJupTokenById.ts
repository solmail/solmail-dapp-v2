import { useMemo } from "react";
import { useJupiterTokens } from "./useJupiterTokens";

export const useGetJupiterTokenById = (id: string | undefined) => {
  const { data, ...props } = useJupiterTokens(id ?? "", id ?? "", !1);
  const token = useMemo(() => {
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  }, [data]);
  return {
    token,
    ...props,
  };
};

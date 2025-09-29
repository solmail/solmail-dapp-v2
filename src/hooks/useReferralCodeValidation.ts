import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "@hooks/useHttp";

export const useRefCodeValidation = () => {
  const { fetch } = useHttp();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_VALIDATE_REF_CODE],
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await fetch<{ status: string; message: string }>(
        `/users/referral-code?code=${code}`,
        "GET"
      );

      if (data && data.status && data.status === "failed") {
        return data.message ?? "Invalid code";
      }
      return !0;
    },
  });
};

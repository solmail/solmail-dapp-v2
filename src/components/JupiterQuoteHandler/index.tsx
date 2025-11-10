import { Flex } from "@chakra-ui/react";
import { useGetJupiterTokenById } from "@hooks/useGetJupTokenById";
import { useJupiterQuote } from "@hooks/useJupiterQuote";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { fromRawAmount, toRawAmount } from "@utils/formating";
import { useEffect, useRef, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  JupiterQuoteParams,
  JupiterSwapForm,
  JupiterSwapFormKeys,
} from "src/types/jupiter";

export const JupiterQuoteHandler: React.FC = () => {
  const [quoteQuery, setQuery] = useState<JupiterQuoteParams>({
    in: "",
    out: "",
    amount: "0",
  });
  const { watch, setValue } = useFormContext<JupiterSwapForm>();
  const tokenIn = watch(JupiterSwapFormKeys.in);
  const { data, isLoading } = useJupiterQuote(quoteQuery);
  const { token_in, token_out } = useGetJupiterSwapParams();
  const { token } = useGetJupiterTokenById(token_in);
  const { token: tokenout } = useGetJupiterTokenById(token_out);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const getQuote = useCallback(async () => {
    if (!token) return;

    setQuery({
      in: token_in,
      out: token_out,
      amount: toRawAmount(tokenIn, token.decimals).toNumber().toString(),
    });
  }, [token, tokenIn, token_in, token_out]);

  useEffect(() => {
    if (!isLoading && data) {
      if (data && data.outAmount && tokenout) {
        setValue(
          JupiterSwapFormKeys.out,
          fromRawAmount(data.outAmount, tokenout.decimals).toString()
        );
      }
    }
  }, [data, isLoading, setValue, tokenout]);
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(getQuote, 800);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [getQuote, tokenIn]);

  return <Flex> </Flex>;
};

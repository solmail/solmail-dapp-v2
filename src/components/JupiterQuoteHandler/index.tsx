import { Box, Button, Flex } from "@chakra-ui/react";
import { useGetJupiterTokenById } from "@hooks/useGetJupTokenById";
import { useJupiterQuote } from "@hooks/useJupiterQuote";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { useJupiterState } from "@hooks/useJupiterState";
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
  const { update, isUpdatingOrder } = useJupiterState();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const getQuote = useCallback(async () => {
    if (!token || !token_in || !token_out) return;
    setQuery({
      in: token_in,
      out: token_out,
      amount: toRawAmount(tokenIn, token.decimals).toNumber().toString(),
    });
  }, [token, tokenIn, token_in, token_out]);

  useEffect(() => {
    if (isLoading && !isUpdatingOrder) {
      update({
        isUpdatingOrder: !0,
      });
    } else {
      if (isUpdatingOrder && !isLoading) {
        update({
          isUpdatingOrder: !1,
        });
      }
    }
  }, [isLoading, isUpdatingOrder, update]);

  useEffect(() => {
    const fieldConfig = {
      shouldDirty: !0,
      shouldValidate: !0,
      shouldTouch: !0,
    };
    if (!isLoading && data) {
      if (data && data.outAmount) {
        if (tokenout) {
          setValue(
            JupiterSwapFormKeys.out,
            fromRawAmount(data.outAmount, tokenout.decimals).toString(),
            fieldConfig
          );
        }
        if (data.transaction) {
          setValue("tx", data.transaction, fieldConfig);
        }
        if (data.requestId) {
          setValue("order", data.requestId, fieldConfig);
        }
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

  return (
    <Box mt={15}>
      <Box w="full">
        <Button
          type="submit"
          colorScheme="green"
          bg="green.500"
          size={"lg"}
          w="full"
        >
          Swap
        </Button>
      </Box>
      <Flex w="100%" mt={2} direction={"column"} fontSize={13}>
        <Flex direction={"row"} w="full" gap={5}>
          <Flex>Price Impact</Flex>
          <Flex>{data?.priceImpact}</Flex>
        </Flex>
        <Flex direction={"row"} w="full" gap={5}>
          <Flex>Slippaget</Flex>
          <Flex>{data?.slippageBps}</Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

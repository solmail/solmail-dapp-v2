import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useGetJupiterTokenById } from "@hooks/useGetJupTokenById";
import { useJupiterQuote } from "@hooks/useJupiterQuote";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { useJupiterState } from "@hooks/useJupiterState";
import { fromRawAmount, toRawAmount } from "@utils/formating";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  JupiterQuoteParams,
  JupiterSwapForm,
  JupiterSwapFormKeys,
} from "src/types/jupiter";

const InfoBlock: React.FC<{
  label: string;
  value: string | number;
  color?: string;
}> = ({ label, value, color }) => {
  return (
    <Flex direction={"row"} w="full" gap={5} justifyContent={"space-between"}>
      <Flex opacity={0.5}>{label}</Flex>
      <Flex color={color}>{value}</Flex>
    </Flex>
  );
};

const initialValue = {
  in: "",
  out: "",
  amount: "0",
};
export const JupiterQuoteHandler: React.FC = () => {
  const [quoteQuery, setQuery] = useState<JupiterQuoteParams>(initialValue);
  const { watch, setValue } = useFormContext<JupiterSwapForm>();
  const tokenIn = watch(JupiterSwapFormKeys.in);
  const { data, isLoading: loading, isFetching } = useJupiterQuote(quoteQuery);
  const { token_in, token_out } = useGetJupiterSwapParams();
  const { token } = useGetJupiterTokenById(token_in);
  const { token: tokenout } = useGetJupiterTokenById(token_out);
  const { update, isUpdatingOrder } = useJupiterState();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoading = useMemo(() => loading || isFetching, [isFetching, loading]);

  const fieldConfig = useMemo(
    () => ({
      shouldDirty: !0,
      shouldValidate: !0,
      shouldTouch: !0,
    }),
    []
  );

  const getQuote = useCallback(async () => {
    if (!token || !token_in || !token_out) return;
    if (tokenIn) {
      setQuery({
        in: token_in,
        out: token_out,
        amount: toRawAmount(tokenIn, token.decimals).toNumber().toString(),
      });
    } else {
      setValue(JupiterSwapFormKeys.out, "", fieldConfig);
      setValue("order", "", fieldConfig);
      setValue("tx", "", fieldConfig);
      setQuery(() => initialValue);
    }
  }, [fieldConfig, setValue, token, tokenIn, token_in, token_out]);

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

  const PRICE_IMPACT = parseFloat(data?.priceImpact?.toFixed(3) ?? "0");

  const amountPerUnit = useMemo(() => {
    const inAmount = fromRawAmount(
      data?.inAmount ?? 0,
      token?.decimals
    ).toNumber();
    const outAmount = fromRawAmount(
      data?.outAmount ?? 0,
      tokenout?.decimals
    ).toNumber();

    return (outAmount / inAmount).toFixed(2);
  }, [data?.inAmount, data?.outAmount, token?.decimals, tokenout?.decimals]);

  const minimumReceived = useMemo(() => {
    return fromRawAmount(
      data?.otherAmountThreshold ?? 0,
      tokenout?.decimals
    ).toNumber();
  }, [data?.otherAmountThreshold, tokenout?.decimals]);

  return (
    <Box mt={15}>
      <Box mb={4}>
        {data?.error && (
          <Alert status="error" borderRadius={10}>
            <AlertIcon />
            <AlertDescription>{data?.error}</AlertDescription>
          </Alert>
        )}
      </Box>
      <Box w="full">
        <Button
          type="submit"
          colorScheme="green"
          bg="green.500"
          size={"lg"}
          w="full"
          isDisabled={!!(data && data?.error)}
        >
          Swap
        </Button>
      </Box>
      {data && data.requestId && (
        <Flex w="100%" mt={2} direction={"column"} fontSize={13}>
          <InfoBlock
            label="Rate"
            value={`1 ${token?.symbol} ≈ ${amountPerUnit} ${tokenout?.symbol}`}
          />
          <InfoBlock
            color={PRICE_IMPACT > 0 ? "green.500" : "red.500"}
            label="Price Impact"
            value={PRICE_IMPACT}
          />
          <InfoBlock
            label="Minimum Received"
            value={`${minimumReceived} ${tokenout?.symbol}`}
          />

          {data?.router && (
            <InfoBlock label="Route" value={data?.router ?? ""} />
          )}
        </Flex>
      )}
    </Box>
  );
};

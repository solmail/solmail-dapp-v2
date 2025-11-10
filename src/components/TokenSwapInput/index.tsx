import {
  Box,
  Flex,
  Input,
  InputProps,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useId, useRef } from "react";

import { TokenSelector } from "./TokenSelector";
import { JupiterTokens } from "@components/JupiterTokens";
import { useNavigate } from "@tanstack/react-router";
import { Route as WalletSwapRoute } from "@routes/u/_layout/wallet/_layout/swap/index";
import { JupiterSwapFormKeys } from "src/types/jupiter";
import { TokenInputContext } from "./TokenInputContext";
import { TokenInputOptions } from "./TokenInputOptions";
import { useFormContext } from "react-hook-form";
import { useJupiterState } from "@hooks/useJupiterState";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
type TokenSwapInputProps = InputProps & {
  label: string;
  name: JupiterSwapFormKeys;
  isPrimaryInput?: boolean;
  showSpinner?: boolean;
};

export const TokenSwapInput: React.FC<TokenSwapInputProps> = ({
  label,
  id,
  isPrimaryInput = !1,
  showSpinner = !1,

  ...props
}) => {
  const uid = useId();
  const fieldId = id || uid;
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen: isFocused, onOpen, onClose } = useDisclosure();

  const {
    isOpen: showTokenSelector,
    onOpen: onOpenTokens,
    onClose: onCloseTokens,
  } = useDisclosure();
  useEffect(() => {
    const input = inputRef.current?.getElementsByTagName("input")[0];

    if (input) {
      input.addEventListener("focus", onOpen);
      input.addEventListener("blur", onClose);
    }
    return () => {
      if (input) {
        input.removeEventListener("focus", onOpen);
        input.removeEventListener("blur", onClose);
      }
    };
  }, [onClose, onOpen]);
  const navigate = useNavigate({ from: WalletSwapRoute.path });
  const { register } = useFormContext();

  const onSelect = (id: string) => {
    onCloseTokens();
    navigate({
      search: (prev: any) => ({
        ...prev,
        [props.name as string]: id,
      }),
    });
  };

  const { isUpdatingOrder } = useJupiterState();
  return (
    <TokenInputContext.Provider
      value={{
        name: props.name,
      }}
    >
      <Box
        w="full"
        bg={isFocused ? "surface.700" : "surface.800"}
        p={5}
        borderRadius={15}
        border="solid 1px"
        borderColor={!isFocused ? "#1b212e" : "#191d27"}
        transition={"all ease .2s"}
        position={"relative"}
        boxShadow={isFocused ? `0px 0px 8px -2px rgb(56 161 105)` : ""}
      >
        {showSpinner && isUpdatingOrder && (
          <Flex
            boxSize={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}
            right={5}
            top={3}
          >
            <Spinner size={"sm"} />
          </Flex>
        )}
        {label && (
          <Box>
            <Box fontWeight={"bold"} as="label" htmlFor={fieldId}>
              {label}
            </Box>
          </Box>
        )}
        <Box position={"relative"} ref={inputRef}>
          {props.isReadOnly && (
            <Box position={"absolute"} zIndex={1} inset={0} />
          )}
          <Input
            fontWeight={"medium"}
            px={0}
            fontSize={20}
            bg="transparent"
            id={fieldId}
            pr={210}
            autoComplete="off"
            {...props}
            {...register(props.name, {
              required: { value: !0, message: "input amount is required" },
            })}
          />
          <Flex
            position={"absolute"}
            right={0}
            top={0}
            bottom={0}
            w={200}
            alignItems={"center"}
            zIndex={2}
          >
            <TokenSelector onOpen={onOpenTokens} />
            <JupiterTokens
              isOpen={showTokenSelector}
              onClose={onCloseTokens}
              onSelect={onSelect}
            />
          </Flex>
        </Box>
        {isPrimaryInput && <TokenInputOptions />}
      </Box>
    </TokenInputContext.Provider>
  );
};

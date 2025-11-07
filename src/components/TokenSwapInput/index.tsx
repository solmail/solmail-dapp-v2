import { Box, Flex, Input, InputProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useId, useRef } from "react";

import { TokenSelector } from "./TokenSelector";
import { JupiterTokens } from "@components/JupiterTokens";

type TokenSwapInputProps = InputProps & {
  label: string;
  symbol: string;
  logo: string;
};

export const TokenSwapInput: React.FC<TokenSwapInputProps> = ({
  label,
  id,
  symbol,
  logo,
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
    const input = inputRef.current;
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
  return (
    <Box
      w="full"
      bg={isFocused ? "surface.700" : "surface.800"}
      p={5}
      borderRadius={15}
      border="solid 1px"
      borderColor={!isFocused ? "#1b212e" : "#191d27"}
      transition={"all ease .2s"}
    >
      {label && (
        <Box>
          <Box fontWeight={"bold"} as="label" htmlFor={fieldId}>
            {label}
          </Box>
        </Box>
      )}
      <Box position={"relative"}>
        <Input
          ref={inputRef}
          fontWeight={"medium"}
          px={0}
          fontSize={20}
          bg="transparent"
          id={fieldId}
          pr={210}
          {...props}
        />
        <Flex
          position={"absolute"}
          right={0}
          top={0}
          bottom={0}
          w={200}
          alignItems={"center"}
        >
          <TokenSelector symbol={symbol} logo={logo} onOpen={onOpenTokens} />
          <JupiterTokens
            isOpen={showTokenSelector}
            onClose={onCloseTokens}
            name={props.name}
          />
        </Flex>
      </Box>
    </Box>
  );
};

import { Box, Input, InputProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useId, useRef } from "react";

type TokenSwapInputProps = InputProps & {
  label: string;
};
export const TokenSwapInput: React.FC<TokenSwapInputProps> = ({
  label,
  id,
  ...props
}) => {
  const uid = useId();
  const fieldId = id || uid;
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen: isFocused, onOpen, onClose } = useDisclosure();
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
          {...props}
        />
      </Box>
    </Box>
  );
};

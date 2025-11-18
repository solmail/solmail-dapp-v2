import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";

import { useJupiterTokens } from "@hooks/useJupiterTokens";
import { JupiterTokenCard } from "./TokenCard";
import { useRef, useState } from "react";
import { useTokenInputContext } from "@hooks/useTokenInputContext";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";

import { JupiterSwapFormKeys } from "src/types/jupiter";

export const JupiterTokens: React.FC<
  Omit<ModalProps, "children"> & {
    onSelect: (id: string) => void;
  }
> = ({ onSelect, ...props }) => {
  const { name } = useTokenInputContext();
  const [query, setQuery] = useState<string>("");
  const { data } = useJupiterTokens(query, name);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { selected } = useGetJupiterSwapParams(name);
  const { token_in, token_out } = useGetJupiterSwapParams();
  const disable = name === JupiterSwapFormKeys.in ? token_out : token_in;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setQuery(e.target.value ?? ""), 850);
  };

  return (
    <Modal isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent right={"-25px"} position={"relative"}>
        <ModalCloseButton />
        <ModalHeader>Tokens</ModalHeader>
        <ModalBody pt={0} pb={10}>
          <Stack>
            <Flex>
              <Input
                placeholder="Search"
                onChange={onChangeHandler}
                p={3}
                fontSize={12}
              />
            </Flex>
            <Flex direction={"column"} h="60vh">
              <CustomScrollbarWrapper>
                <Flex direction={"column"}>
                  {data &&
                    data.length > 0 &&
                    data.map((token) => {
                      return (
                        <JupiterTokenCard
                          {...token}
                          key={token.id?.toString()}
                          onSelect={onSelect}
                          isActive={!!(token.id?.toString() === selected)}
                          shouldDisable={disable === token.id?.toString()}
                        />
                      );
                    })}
                </Flex>
              </CustomScrollbarWrapper>
            </Flex>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

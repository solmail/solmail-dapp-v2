import { chakra, Flex, Icon, Image } from "@chakra-ui/react";
import { useGetJupiterTokenById } from "@hooks/useGetJupTokenById";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { useTokenInputContext } from "@hooks/useTokenInputContext";
import { MdKeyboardArrowDown } from "react-icons/md";

type TokenSelectorProps = {
  onOpen: () => void;
};
export const TokenSelector: React.FC<TokenSelectorProps> = ({ onOpen }) => {
  const { name } = useTokenInputContext();
  const { selected } = useGetJupiterSwapParams(name);
  const { token } = useGetJupiterTokenById(selected);
  return (
    <Flex
      direction={"row"}
      gap={1}
      alignItems={"center"}
      bg="surface.500"
      w="100%"
      borderRadius={"30px"}
      p={2}
      position={"relative"}
      cursor={"pointer"}
      _hover={{
        bg: "surface.400",
      }}
      onClick={onOpen}
    >
      <Flex w="30px" minW={"30px"}>
        {token?.icon && (
          <Image
            borderRadius={"full"}
            boxSize={"30px"}
            src={token?.icon ?? ""}
          />
        )}
      </Flex>
      <Flex position={"relative"} h="100%" flex={"auto"} mr="10px" w="100%">
        <chakra.span
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          maxW={140}
          fontSize={13}
        >
          {token?.symbol}
        </chakra.span>
      </Flex>
      <Flex
        position={"absolute"}
        right={0}
        top={0}
        bottom={0}
        alignItems={"center"}
        w="20px"
      >
        <Icon as={MdKeyboardArrowDown} />
      </Flex>
    </Flex>
  );
};

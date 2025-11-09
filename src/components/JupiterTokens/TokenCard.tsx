import { Flex, Image } from "@chakra-ui/react";
import { useJupiterBalance } from "@hooks/useJupiterBalance";
import { formatUsdValue } from "@utils/formating";
import { isFunction } from "lodash";
import { Token } from "src/types/jupiter";

export const JupiterTokenCard: React.FC<
  Token & {
    onSelect: (id: string) => void;
  }
> = ({ icon, symbol, name, usdPrice, id, onSelect }) => {
  const { formatted } = useJupiterBalance(id);
  const onClickHandler = () => {
    if (isFunction(onSelect)) {
      onSelect(id);
    }
  };

  return (
    <Flex
      direction={"row"}
      p={2}
      alignItems={"center"}
      transition={"all ease .2s"}
      borderRadius={5}
      cursor={"pointer"}
      _hover={{
        bg: "surface.500",
      }}
      onClick={onClickHandler}
    >
      <Flex>
        <Image src={icon} boxSize={"40px"} borderRadius={"50%"} />
      </Flex>
      <Flex px={2} direction={"column"}>
        <Flex fontWeight={"medium"}>{symbol}</Flex>
        <Flex fontSize={12} opacity={0.5}>
          {name}
        </Flex>
      </Flex>
      <Flex px={2} direction={"column"} alignItems={"flex-end"} flex={"auto"}>
        <Flex fontWeight={"medium"} fontSize={13}>
          {formatted}
        </Flex>
        <Flex fontSize={12} opacity={0.5}>
          {formatUsdValue(usdPrice)}
        </Flex>
      </Flex>
    </Flex>
  );
};

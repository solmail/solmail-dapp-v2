import { Flex, Image } from "@chakra-ui/react";
import { useJupiterBalance } from "@hooks/useJupiterBalance";
import { formatTokenBalance, formatUsdValue } from "@utils/formating";
import { Token } from "src/types/jupiter";

export const JupiterTokenCard: React.FC<Token> = ({
  icon,
  symbol,
  name,
  usdPrice,
  id,
  decimals,
}) => {
  const { data } = useJupiterBalance(id);
  console.log(data);
  return (
    <Flex
      direction={"row"}
      p={2}
      alignItems={"center"}
      transition={"all ease .2s"}
      borderRadius={5}
      cursor={"pointer"}
      data-yup={usdPrice}
      data-oops
      _hover={{
        bg: "surface.500",
      }}
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
          {formatTokenBalance({
            rawAmount: data ?? 0,
            decimals,
            compact: !0,
            suffix: symbol,
          })}
        </Flex>
        <Flex fontSize={12} opacity={0.5}>
          {formatUsdValue(usdPrice)}
        </Flex>
      </Flex>
    </Flex>
  );
};

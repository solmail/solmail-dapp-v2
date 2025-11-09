import { Button, Flex } from "@chakra-ui/react";
import { useJupiterBalance } from "@hooks/useJupiterBalance";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { useTokenInputContext } from "@hooks/useTokenInputContext";

export const TokenInputOptions: React.FC = () => {
  const { name } = useTokenInputContext();
  const { selected } = useGetJupiterSwapParams(name);
  const { formatted } = useJupiterBalance(selected);
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      gap={1}
      mb={3}
    >
      <Flex fontSize={13}>{formatted}</Flex>
      <Flex direction={"row"} gap={1}>
        <Button borderRadius={20} fontSize={12} py={1} size={"sm"}>
          Half
        </Button>
        <Button borderRadius={20} fontSize={12} py={1} size={"sm"}>
          Max
        </Button>
      </Flex>
    </Flex>
  );
};

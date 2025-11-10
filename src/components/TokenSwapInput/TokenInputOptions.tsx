import { Button, Flex } from "@chakra-ui/react";
import { useJupiterBalance } from "@hooks/useJupiterBalance";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { useTokenInputContext } from "@hooks/useTokenInputContext";

import { useFormContext } from "react-hook-form";
import { JupiterSwapForm, JupiterSwapFormKeys } from "src/types/jupiter";
import BigNumber from "bignumber.js";
import { formatTokenBalance, toRawAmount } from "@utils/formating";
import { useGetJupiterTokenById } from "@hooks/useGetJupTokenById";
import { BASE_TOKEN } from "@const/tokens";

export const TokenInputOptions: React.FC = () => {
  const { name } = useTokenInputContext();
  const { selected } = useGetJupiterSwapParams(name);
  const { token } = useGetJupiterTokenById(selected);
  const { formatted, data } = useJupiterBalance(selected);
  const { setValue } = useFormContext<JupiterSwapForm>();
  const onClickAutoFill = (percentage: number) => {
    const balanceLamports = new BigNumber(data ?? 0);
    let lamportsToUse = balanceLamports
      .multipliedBy(percentage)
      .dividedBy(100)
      .integerValue(BigNumber.ROUND_DOWN);

    if (selected === BASE_TOKEN.address) {
      lamportsToUse = lamportsToUse.minus(toRawAmount(0.01, 9));
    }

    setValue(
      JupiterSwapFormKeys.in,
      formatTokenBalance({
        rawAmount: lamportsToUse.toString(),
        decimals: token?.decimals ?? 0,
      })
    );
  };
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
        <Button
          onClick={() => onClickAutoFill(50)}
          borderRadius={20}
          fontSize={12}
          py={1}
          size={"sm"}
        >
          Half
        </Button>
        <Button
          onClick={() => onClickAutoFill(100)}
          borderRadius={20}
          fontSize={12}
          py={1}
          size={"sm"}
        >
          Max
        </Button>
      </Flex>
    </Flex>
  );
};

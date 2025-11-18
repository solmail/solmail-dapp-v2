import { Box, chakra, Flex, Icon } from "@chakra-ui/react";
import { JupiterQuoteHandler } from "@components/JupiterQuoteHandler";
import { TokenSwapInput } from "@components/TokenSwapInput";
import { useGetJupiterSwapParams } from "@hooks/useJupiterSeacrhParams";
import { useNavigate } from "@tanstack/react-router";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IoSwapVertical } from "react-icons/io5";
import { JupiterSwapForm, JupiterSwapFormKeys } from "src/types/jupiter";
import { Route as WalletSwapRoute } from "@routes/u/_layout/wallet/_layout/swap/index";
import { deserializeTxFromBase64 } from "@utils/string/deserializeTransaction";
import { useSignTransaction } from "@privy-io/react-auth/solana";
import { useSolanaConnection } from "@hooks/useConnection";
import { useJupiterSwapMutation } from "@hooks/useJupiterSwapMutation";
import { useQueryClient } from "@tanstack/react-query";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { QueryKeys } from "src/types";

const DEFAULTS = {
  in: "",
  out: "",
  tx: "",
  order: "",
};
export const SwapPage: React.FC = () => {
  const methods = useForm<JupiterSwapForm>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: DEFAULTS,
  });

  const { signTransaction } = useSignTransaction();
  const { address } = usePrivyWallet();
  const { mutateAsync } = useJupiterSwapMutation();
  const { token_in, token_out } = useGetJupiterSwapParams();
  const navigate = useNavigate();
  const connection = useSolanaConnection(!0);
  const queryClient = useQueryClient();
  const reset = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.JUPITER_SOL_BALANCE, address, token_in],
    });
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.JUPITER_SOL_BALANCE, address, token_out],
    });
    methods.reset(DEFAULTS, {});
    navigate({
      to: WalletSwapRoute.to,
    });
  };

  const onSubmitHandler: SubmitHandler<JupiterSwapForm> = async ({
    tx,
    order,
  }) => {
    const txn = deserializeTxFromBase64(tx);

    const signedTransaction = await signTransaction({
      transaction: txn,
      connection: connection,
      uiOptions: {
        showWalletUIs: !1,
      },
    });

    const serializedSignedTransaction = signedTransaction.serialize();
    const transaction = Buffer.from(serializedSignedTransaction).toString(
      "base64"
    );

    const request = {
      requestId: order,
      signedTransaction: transaction,
    };

    await mutateAsync(request);
    reset();
  };
  const onToggle = () => {
    navigate({
      to: WalletSwapRoute.to,
      search: {
        in: token_out,
        out: token_in,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Box
        w="100%"
        maxW={500}
        mx="auto"
        as="form"
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        <Box my={4}>
          <chakra.span fontWeight={"bold"} fontSize={20}>
            Swap
          </chakra.span>
        </Box>
        <Box mb={2} w="100%" position={"relative"}>
          <TokenSwapInput
            label="You Pay"
            placeholder="0.00"
            name={JupiterSwapFormKeys.in}
            isPrimaryInput
            autoFocus={true}
            tabIndex={1}
          />
          <Flex
            position={"absolute"}
            left={0}
            right={0}
            aria-label="Rotate"
            boxSize={"50px"}
            zIndex={1}
            bottom={"-20px"}
            mx={"auto"}
            bg="surface.300"
            borderRadius={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={20}
            cursor={"pointer"}
            transition={"all ease .2s"}
            data-group
            onClick={onToggle}
          >
            <Icon
              as={IoSwapVertical}
              transition={"all ease .2s"}
              _groupHover={{
                opacity: 0.8,
                transform: `scale(1.1)`,
              }}
            />
          </Flex>
        </Box>
        <Box w="100%" position={"relative"}>
          <TokenSwapInput
            label="You Receive"
            placeholder="0.00"
            name={JupiterSwapFormKeys.out}
            isReadOnly
            tabIndex={2}
            showSpinner
          />
        </Box>

        <Box w="full">
          <JupiterQuoteHandler />
        </Box>
      </Box>
    </FormProvider>
  );
};

import { Box, Button, chakra, Flex } from "@chakra-ui/react";
import { TokenSwapInput } from "@components/TokenSwapInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IoSwapVertical } from "react-icons/io5";
import { JupiterSwapForm, JupiterSwapFormKeys } from "src/types/jupiter";

export const SwapPage: React.FC = () => {
  const methods = useForm<JupiterSwapForm>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      in: "",
      out: "",
    },
  });

  const onSubmitHandler: SubmitHandler<JupiterSwapForm> = () => {};

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
            boxSize={"40px"}
            zIndex={1}
            bottom={"-20px"}
            mx={"auto"}
            bg="green.500"
            borderRadius={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={20}
            cursor={"pointer"}
            transition={"all ease .2s"}
            _hover={{
              bg: "green.600",
            }}
          >
            <IoSwapVertical />
          </Flex>
        </Box>
        <Box w="100%" position={"relative"}>
          <TokenSwapInput
            label="You Receive"
            placeholder="0.00"
            name={JupiterSwapFormKeys.out}
            isReadOnly
            tabIndex={2}
          />
        </Box>
        <Box mt={15}>
          <Button type="submit" colorScheme="green" size={"lg"} w="full">
            Swap
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

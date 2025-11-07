import { Box, chakra, Flex, IconButton } from "@chakra-ui/react";
import { TokenSwapInput } from "@components/TokenSwapInput";
import { IoSwapVertical } from "react-icons/io5";

export const SwapPage: React.FC = () => {
  return (
    <Box w="100%" maxW={500} mx="auto">
      <Box my={4}>
        <chakra.span fontWeight={"bold"} fontSize={20}>
          Swap
        </chakra.span>
      </Box>
      <Box mb={2} w="100%" position={"relative"}>
        <TokenSwapInput label="You Pay" placeholder="0.00" />
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
        <TokenSwapInput label="You Receive" placeholder="0.00" />
      </Box>
    </Box>
  );
};

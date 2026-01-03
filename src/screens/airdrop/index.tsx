import { chakra, Container, Flex } from "@chakra-ui/react";

export const Airdrop: React.FC = () => {
  return (
    <Container w="full" py={3}>
      <Flex w="full" justifyContent={"space-between"}>
        <Flex direction={"column"}>
          <Flex>
            <chakra.span fontWeight={"bold"} fontSize={18}>
              Project name here
            </chakra.span>
          </Flex>
          <Flex>1 Day ago</Flex>
        </Flex>
      </Flex>

      <Flex mt={5}>
        <iframe
          width="100%"
          height="400"
          src="https://birdeye.so/tv-widget/GMzuntWYJLpNuCizrSR7ZXggiMdDzTNiEmSNHHunpump?chain=solana&viewMode=pair&chartInterval=15&chartType=Candle&chartTimezone=Asia%2FCalcutta&chartLeftToolbar=show&theme=dark"
          allowFullScreen
        ></iframe>
      </Flex>
    </Container>
  );
};

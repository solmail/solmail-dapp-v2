import { Flex, Heading, Text } from "@chakra-ui/react";

export const AirdropComingSoon: React.FC = () => {
  return (
    <Flex
      w="100%"
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex mb={2} alignItems={"center"} justifyContent={"center"}>
        <Heading textAlign={"center"} bg="solana" bgClip={"text"} fontSize={30}>
          SolMail Airdrops — Coming Soon
        </Heading>
      </Flex>
      <Flex direction={"column"} maxW={600} mx="auto">
        <Text textAlign={"center"}>
          Discover a new way for projects to connect with real users. Soon,
          you’ll start receiving exclusive token airdrops from top projects
          right inside your SolMail inbox — complete with messages from your
          favorite projects. No bots. No spam. Just real rewards for real users.
        </Text>
        <Text textAlign={"center"}>
          Stay tuned. Your next airdrop might be waiting in your inbox.
        </Text>
      </Flex>
    </Flex>
  );
};

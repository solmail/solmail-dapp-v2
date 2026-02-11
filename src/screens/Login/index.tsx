import { Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { SocialShare } from "@components/SocialShare";
import { PRIVACY_POLICY_LINK, TERMS_AND_CONDITIONS_LINK } from "@const/config";
import { useEffect } from "react";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
export const Login: React.FC = () => {
  const { login } = usePrivy();

  const clearWorkers = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
        console.log("All service workers unregistered.");
      });
    }
  };
  useEffect(() => {
    clearWorkers();
  }, []);

  return (
    <Flex p={5} w="100%" direction={"column"}>
      <Flex
        flex={"auto"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <WalletModalButton />
        <Flex bg="solana" bgClip={"text"} fontSize={23} mb={3}>
          Inbox. Identity. Influence
        </Flex>
        <Flex my={2}>
          <Button
            onClick={login}
            size={"lg"}
            borderRadius={"25px"}
            variant={"solana"}
          >
            Connect Wallet
          </Button>
        </Flex>
      </Flex>
      <Flex direction={"column"} alignItems={"center"} w="100%">
        <SocialShare />
      </Flex>
      <Flex
        alignItems={"center"}
        gap={{ md: 5, base: 3 }}
        rowGap={0}
        fontSize={13}
        justifyContent={"center"}
        opacity={0.5}
        flexWrap={"wrap"}
      >
        <Flex>Solmail © {new Date().getFullYear()}</Flex>
        <Flex>
          <ChakraLink href={TERMS_AND_CONDITIONS_LINK} target="_blank">
            Terms & Conditions
          </ChakraLink>
        </Flex>
        <Flex>
          <ChakraLink href={PRIVACY_POLICY_LINK} target="_blank">
            Privacy policy
          </ChakraLink>
        </Flex>
      </Flex>
    </Flex>
  );
};

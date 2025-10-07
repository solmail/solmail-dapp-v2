import {
  Container,
  Flex,
  Link as ChakraLink,
  Icon,
  VStack,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import { useSolanaConnection } from "@hooks/useConnection";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { usePrivyWallet } from "@hooks/usePrivyWallet";

import IDL from "@integrations/idl/index";
import { useSignTransaction } from "@privy-io/react-auth/solana";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Link } from "@tanstack/react-router";
import { isValidUrl } from "@utils/string";
import { useMemo } from "react";

import { TbExternalLink } from "react-icons/tb";

const Card: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const isUrlString = isValidUrl(value);
  return (
    <Flex
      w="100%"
      direction={"column"}
      fontSize={12}
      as={isUrlString ? LinkBox : "div"}
    >
      <Flex mt={5} fontWeight={"bold"}>
        {label}
      </Flex>
      <Flex>{value}</Flex>
      {isUrlString && <LinkOverlay target="_blank" href={encodeURI(value)} />}
    </Flex>
  );
};

const Test: React.FC = () => {
  const { program } = useGetMailProgramInstance();
  const { address: privyAddress } = usePrivyWallet();
  const privyPubkey = new PublicKey(privyAddress);
  const connection = useMemo(
    () =>
      new Connection(
        `https://mainnet.helius-rpc.com/?api-key=d82720bd-e0cb-4205-9da9-99664eeabc84`
      ),
    []
  );
  const { signTransaction: signWithPrivy } = useSignTransaction();

  const onClickHandler = async () => {
    if (!program || !connection) return;

    try {
      // 1️⃣ Build your main instruction
      const phantom = (window as any).solana;
      if (!phantom?.isPhantom) throw new Error("Phantom wallet not found");
      await phantom.connect();
      const phantomPubkey = new PublicKey(phantom.publicKey.toString());
      const instruction = await program.methods
        .createUsernameSeeker("abs")
        .accounts({
          authority: privyPubkey,
          domainOwner: phantomPubkey,
          usernameAccount: privyPubkey,
          rateLimit: privyPubkey,
          marketplaceSettings: privyPubkey,
          skrDomainAccount: privyPubkey,
          systemProgram: program.programId,
        } as any)
        .instruction();

      // 2️⃣ Connect to Phantom wallet

      console.log("🟣 Phantom connected:", phantomPubkey.toBase58());

      // const dummyIx = SystemProgram.transfer({
      //   fromPubkey: privyPubkey,
      //   toPubkey: phantomPubkey,
      //   lamports: 0,
      // });

      // 4️⃣ Build transaction
      const tx = new Transaction().add(instruction);
      const { blockhash } = await connection.getLatestBlockhash("finalized");
      tx.recentBlockhash = blockhash;
      tx.feePayer = privyPubkey;

      // 5️⃣ Sign with Privy embedded wallet
      const privySigned = await signWithPrivy({ connection, transaction: tx });
      console.log("✅ Privy signed");

      // 6️⃣ Sign with Phantom wallet
      console.log("Trying to signin");
      const fullySigned = await phantom.signTransaction(privySigned);
      console.log("✅ Phantom signed");

      // 7️⃣ Send the combined transaction
      const signature = await connection.sendRawTransaction(
        fullySigned.serialize(),
        { skipPreflight: false }
      );

      console.log("🚀 Transaction sent:", signature);
    } catch (err) {
      console.error("❌ Transaction failed:", err);
    }
  };

  return (
    <Flex>
      <Button onClick={onClickHandler}>Sign with Privy + Phantom</Button>
    </Flex>
  );
};
export const Status: React.FC = () => {
  return (
    <Container py={15}>
      <Flex direction={"column"}>
        <Test />
        <VStack>
          <Card label="Build" value={import.meta.env.MODE} />
          <Card
            label="Privy App ID"
            value={import.meta.env.VITE_SOLMAIL_PRIVY_APP_ID}
          />

          <Card label="Cluster" value={import.meta.env.VITE_SOLMAIL_CLUSTER} />
          <Card label="Mail program ID" value={IDL.address} />
          <Card
            label="Solmail Contract"
            value={import.meta.env.VITE_SOLMAIL_CONTRACT_ADDRESS}
          />
          <Card
            label="Pinata Gateway"
            value={import.meta.env.VITE_SOLMAIL_PINATA_BASE_URL}
          />
          <Card label="RPC" value={import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT} />
          <Card
            label="RPC API Key"
            value={import.meta.env.VITE_SOLMAIL_RPC_API_KEY}
          />
          <Card
            label="Quicknode"
            value={import.meta.env.VITE_QUICKNODE_BASE_URL}
          />
          <Card
            label="Price API"
            value={import.meta.env.VITE_SOLMAIL_JUPITER_PRICE_API}
          />
          <Card
            label="Sentry"
            value={import.meta.env.VITE_SOLMAIL_SENTRY_DSN}
          />
          <Card label="Rewards" value={import.meta.env.VITE_REWARDS_BACKEND} />
          <Card
            label="Backend"
            value={import.meta.env.VITE_SOLMAIL_BACKEND_API}
          />
          <Card
            label="Graphql Server"
            value={import.meta.env.VITE_SOLMAIL_GRAPHQL_ENDPOINT}
          />
        </VStack>
        <Flex my={8}>
          <ChakraLink
            alignItems={"center"}
            as={Link}
            to={"/"}
            textDecoration={"underline"}
            display={"inline-flex"}
            _hover={{
              opacity: 0.8,
            }}
          >
            Continue application <Icon ml={2} as={TbExternalLink} />
          </ChakraLink>
        </Flex>
      </Flex>
    </Container>
  );
};

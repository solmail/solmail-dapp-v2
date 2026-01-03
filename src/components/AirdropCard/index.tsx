import {
  Box,
  chakra,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

import { useTokenMeta } from "@hooks/useTokensOwned";
import { formatKMBCompact, fromRawAmount } from "@utils/formating";
import { formatTime } from "@utils/time";

import { GetUserAirdropsQuery } from "src/gql/graphql";

type AirdropItem = GetUserAirdropsQuery["userAirdrops"]["items"][number];

const BadgeAirdrop: React.FC<{ label: string; isClaimed: boolean }> = ({
  label,
  isClaimed,
}) => {
  return (
    <chakra.span color={isClaimed ? "green.500" : ""} fontSize={10}>
      {label}
    </chakra.span>
  );
};

export const AirdropCard: React.FC<AirdropItem> = ({
  token_mint,
  distributed_at,
  amount,
  claim_status,
  airdrop_address,
  name,
}) => {
  const { token } = useTokenMeta(token_mint);
  const isClaimed = claim_status.toLowerCase() === "claimed";
  return (
    <Flex
      as={LinkBox}
      border="1px solid transparent"
      borderRadius="10px"
      bgGradient="solanaBg"
      p={0}
      role="group"
    >
      <Flex
        direction="column"
        w="full"
        p={3}
        borderRadius="10px"
        bg="surface.500"
        transition="background-color 0.2s ease"
        _groupHover={{ bg: isClaimed ? "surface.500" : "transparent" }}
        boxShadow={isClaimed ? "inset 0px 0px 64px 0px #1efa9b0f" : ""}
      >
        <Text mb={2} fontWeight="bold">
          {name}
        </Text>

        <Flex align="center" gap={3}>
          <Box boxSize={"40px"} bg="surface.900" borderRadius={"full"}>
            {token?.logo && (
              <Image
                src={token?.logo}
                boxSize="40px"
                borderRadius="full"
                fallbackSrc="/token-placeholder.svg"
              />
            )}
          </Box>

          <Flex direction="column">
            <Text>{token?.symbol ?? "NoName"}</Text>
            <Text
              fontSize="10px"
              opacity={0.5}
              maxW={"100px"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {token?.name ?? "[Token Name]"}
            </Text>
          </Flex>

          <Flex ml="auto" direction="column" align="flex-end">
            <Text fontWeight="semibold">
              {formatKMBCompact(
                fromRawAmount(amount, token?.decimals ?? 9).toString()
              )}
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={3}
        >
          <Flex fontSize="12px" opacity={0.7}>
            {formatTime(distributed_at * 1000)}
          </Flex>

          <BadgeAirdrop isClaimed={isClaimed} label={claim_status} />
        </Flex>

        <LinkOverlay as={Link} to={`/u/solmail/airdrop/d/${airdrop_address}`} />
      </Flex>
    </Flex>
  );
};

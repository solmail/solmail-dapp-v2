import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useClaimAirdrop } from "@hooks/useClaimAirdrop";
import { useGetAirdrop } from "@hooks/useGetAirdrop";
import { useGetAirdropClaimStatus } from "@hooks/useGetAirdropClaimStatus";
import { useTokenMeta } from "@hooks/useTokensOwned";
import { useParams } from "@tanstack/react-router";
import { formatKMBCompact, fromRawAmount } from "@utils/formating";
import { shortenPrincipalId } from "@utils/string";
import { getSolScanTxUrl } from "@utils/string/getSolscanUrl";
import { formatTime } from "@utils/time";
import { FiExternalLink } from "react-icons/fi";

export const ClaimCard: React.FC<{ disable: boolean }> = ({ disable }) => {
  const { id } = useParams({ from: `/u/_layout/solmail/airdrop/d/$id` });
  const { data: airdrop } = useGetAirdrop(id);
  const { token } = useTokenMeta(airdrop?.token_mint);
  const { mutateAsync, isPending } = useClaimAirdrop();
  const { data, refetch } = useGetAirdropClaimStatus(id);

  const onClickHandler = async () => {
    if (isPending) return;
    await mutateAsync({ airdropAddress: id });
    refetch();
  };
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      data-id={id}
      py={5}
      w="100%"
      gap={5}
    >
      <GridItem>
        <Flex direction={"row"} gap={2}>
          <Flex minW={"40px"} boxSize={"40px"} borderRadius={"full"}>
            <Image
              borderRadius={"full"}
              boxSize={"40px"}
              src={token?.logo}
              alt={token?.name}
            />
          </Flex>
          <Flex direction={"column"}>
            <Flex fontWeight={"bold"}>{token?.symbol}</Flex>
            <Flex
              fontSize={12}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              maxW={"150px"}
              display={"inline-block"}
            >
              {token?.name}
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex
          direction={"column"}
          alignItems={{
            base: "",
            md: "center",
          }}
        >
          <Flex fontWeight={"bold"}>Created at</Flex>
          <Flex> {formatTime((airdrop?.created_at ?? 0) * 1000)}</Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex
          direction={"column"}
          alignItems={{
            base: "",
            md: "flex-end",
          }}
        >
          <Flex fontWeight={"bold"}>Amount</Flex>
          <Flex>
            {`${formatKMBCompact(
              fromRawAmount(
                airdrop?.amount_per_user ?? 0,
                token?.decimals ?? 9
              ).toString()
            )}
           `}
          </Flex>
        </Flex>
      </GridItem>

      <GridItem
        colSpan={{
          base: 1,
          md: 3,
        }}
      >
        {!data?.has_claimed && (
          <Button isDisabled={disable} w="full" onClick={onClickHandler}>
            Claim Now
            {isPending && <Spinner ml={2} />}
          </Button>
        )}

        {data?.has_claimed && (
          <Flex direction={"column"}>
            <Flex>
              <Alert
                status="success"
                borderRadius={5}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <AlertIcon />
                Airdrop claimed
              </Alert>
            </Flex>
            <Flex>
              {data?.claim_transaction_signature && (
                <Flex
                  py={2}
                  fontSize={12}
                  alignItems={"center"}
                  w="full"
                  justifyContent={"center"}
                >
                  Claimed {formatTime((data?.claimed_at ?? 0) * 1000)}
                  <Link
                    href={getSolScanTxUrl(
                      data?.claim_transaction_signature ?? ""
                    )}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    textDecoration={"underline"}
                    target="_blank"
                    mx={1}
                  >
                    {shortenPrincipalId(
                      data?.claim_transaction_signature ?? ""
                    )}
                    <Icon as={FiExternalLink} />
                  </Link>
                </Flex>
              )}
            </Flex>
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
};

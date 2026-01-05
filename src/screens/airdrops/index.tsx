import {
  chakra,
  Flex,
  Box,
  Container,
  Grid,
  GridItem,
  Spinner,
  Button,
  Icon,
} from "@chakra-ui/react";
import { AirdropCard } from "@components/AirdropCard";
import { Pagination } from "@components/Pagination/inddex";
import { keyframes } from "@emotion/react";
import { useGetUserAirdrops } from "@hooks/useGetUserAirdrops";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BiBullseye } from "react-icons/bi";
import { HiOutlineExternalLink, HiOutlineRefresh } from "react-icons/hi";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

type OptionProps = {
  children: string;
  value: string;
  onChangeHandler: (value: string) => void;
};
const Option: React.FC<OptionProps> = ({
  children,
  value,
  onChangeHandler,
}) => {
  const isSelected = value === children;
  const onClickHandler = () => {
    onChangeHandler(children);
  };
  return (
    <Flex
      px={2}
      py={1}
      fontSize={13}
      display={"inline-flex"}
      borderRadius={5}
      cursor={"pointer"}
      transition={"all ease .2s"}
      bgGradient={isSelected ? "solanaBg2" : ""}
      onClick={onClickHandler}
      _hover={{
        opacity: 0.5,
      }}
    >
      {children}
    </Flex>
  );
};

const OPTIONS = ["All", "Unclaimed", "Claimed"];
export const Airdrops: React.FC = () => {
  const [value, setValue] = useState<string>(OPTIONS[0]);
  const [offset, set] = useState<number>(0);
  const filter = useMemo(() => {
    if (value.toLocaleLowerCase() === "all") {
      return {
        offset,
      };
    } else {
      return {
        offset,
        claimed: value.toLocaleLowerCase() === "claimed" ? !0 : !1,
      };
    }
  }, [offset, value]);
  const { data, loading, refetch, pages, page, AIRDROPS_LIMIT } =
    useGetUserAirdrops(filter);

  const onNextHandler = () => {
    set((prev) => prev + AIRDROPS_LIMIT);
  };

  const onPrevHandler = () => {
    set((prev) => prev - AIRDROPS_LIMIT);
  };
  return (
    <Container maxW={"full"} py={3}>
      <Box>
        <chakra.span fontWeight={"bold"} fontSize={18}>
          Airdrops
        </chakra.span>
      </Box>
      <Box
        w="100%"
        mb={5}
        borderBottom="solid 1px"
        borderBottomColor={"surface.900"}
      >
        <Flex direction={"row"} gap={3} my={3} alignItems={"center"}>
          {OPTIONS.map((option) => {
            return (
              <Option value={value} onChangeHandler={setValue}>
                {option}
              </Option>
            );
          })}

          <Flex
            alignItems={"center"}
            ml={10}
            fontSize={13}
            cursor={"pointer"}
            transition={"all ease .2s"}
            _hover={{
              opacity: 0.5,
            }}
            onClick={() => refetch()}
            color={"solana.end"}
          >
            Refresh
            <Icon
              animation={loading ? `${spin} 1s linear infinite` : ""}
              ml={1}
              as={HiOutlineRefresh}
            />
          </Flex>
        </Flex>
      </Box>

      <Box w="100%">
        {!loading && data && data.length > 0 && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={5}
          >
            {data.map((airdrop) => {
              return (
                <GridItem key={airdrop.airdrop_address}>
                  <AirdropCard {...airdrop} />
                </GridItem>
              );
            })}
          </Grid>
        )}

        {loading && (
          <Flex minH="30vh" alignItems={"center"} justifyContent={"center"}>
            <Spinner />
          </Flex>
        )}

        {!loading && (!data || !data.length) && (
          <Flex
            direction={"column"}
            w="full"
            alignItems={"center"}
            justifyContent={"center"}
            minH={"30vh"}
          >
            <Flex>
              <Icon as={BiBullseye} fontSize={30} />
            </Flex>
            <Flex my={2}>No aidrops available now</Flex>
            <Flex my={3}>
              <Button
                as={Link}
                target="_blank"
                colorScheme="green"
                bg="green.500"
                to={`${import.meta.env.VITE_SOLMAIL_MAIL_DOT_FUN}airdrop/dashboard`}
              >
                Create airdrop
                <Icon as={HiOutlineExternalLink} ml={2} />
              </Button>
            </Flex>
          </Flex>
        )}

        {pages > 1 && (
          <Flex mt={5} w="full">
            <Pagination
              pages={pages}
              page={page}
              onNext={onNextHandler}
              onPrev={onPrevHandler}
              hasNext={page !== pages}
              hasPrev={page > 1}
            />
          </Flex>
        )}
      </Box>
    </Container>
  );
};

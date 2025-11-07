import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import { LuQrCode } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";

import { Link, Outlet, useLocation } from "@tanstack/react-router";
import isFunction from "lodash/isFunction";

import { CustomScrollbarWrapper } from "@components/ScrollWrapper";

import { TiThListOutline } from "react-icons/ti";
import { usePortfolioValue } from "@hooks/usePortfolioValue";
import { formatUsdValue } from "@utils/formating";
import { IoSwapHorizontalOutline } from "react-icons/io5";

const MenuButton: React.FC<{
  name: string;
  icon: IconType;
  link?: string;
  id: string;
  onClick?: () => void;
}> = ({ name, icon, onClick, link, id }) => {
  const { pathname } = useLocation();
  const onClickHandler = () => {
    if (isFunction(onClick)) {
      onClick();
    }
  };

  const isActive = pathname.indexOf(id) > -1;

  return (
    <Flex
      direction={"column"}
      boxSize={"70px"}
      bg={"surface.600"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={5}
      fontSize={13}
      transition={"all ease .2s"}
      onClick={onClickHandler}
      position={"relative"}
      borderBottom={"solid 4px"}
      borderBottomColor={isActive ? "green.500" : "transparent"}
      _hover={{
        bg: "surface.700",
      }}
      cursor={"pointer"}
      as={LinkBox}
    >
      <Flex my={2} color={"green.500"}>
        <Icon fontSize={25} as={icon} />
      </Flex>
      <Flex>{name}</Flex>
      {link && <LinkOverlay as={Link} to={link} />}
    </Flex>
  );
};
export const WalletLayout: React.FC = () => {
  const { usd, isLoading, solana } = usePortfolioValue();

  return (
    <Flex as={Container} maxW={"100%"} py={5} w="100%">
      <CustomScrollbarWrapper>
        <Box
          borderRadius={10}
          pb={15}
          borderBottom={"solid 1px"}
          borderBottomColor={"#1a1d27"}
          maxW={500}
          mx="auto"
          bg="#1a1d27"
        >
          <Flex
            direction={"column"}
            alignItems={"center"}
            w="100%"
            py={5}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <chakra.span fontWeight={"bold"} fontSize={25}>
                <Skeleton
                  startColor="surface.900"
                  endColor="surface.300"
                  minW={50}
                  isLoaded={!isLoading}
                >
                  {formatUsdValue(usd)}
                </Skeleton>
              </chakra.span>
              {solana && solana.address && (
                <Flex>
                  <Skeleton isLoaded={!isLoading}>
                    {`1 ${solana?.symbol} ≈ ${formatUsdValue(solana?.price?.usdPrice ?? 0)}`}
                  </Skeleton>
                </Flex>
              )}
            </Flex>
          </Flex>

          <Box w="100%">
            <HStack align={"center"} justifyContent={"center"}>
              <MenuButton
                name="Overview"
                icon={TiThListOutline}
                link="/u/wallet/activity/assets"
                id="assets"
              />
              <MenuButton
                id="receive"
                name="Receive"
                icon={LuQrCode}
                link="/u/wallet/receive"
              />
              <MenuButton
                name="Send"
                icon={FiArrowUpRight}
                link="/u/wallet/pay"
                id="pay"
              />
              <MenuButton
                name="Swap"
                icon={IoSwapHorizontalOutline}
                link="/u/wallet/swap"
                id="swap"
              />
            </HStack>
          </Box>
        </Box>
        <Box maxW={500} mx="auto" my={5}>
          <Outlet />
        </Box>
      </CustomScrollbarWrapper>
    </Flex>
  );
};

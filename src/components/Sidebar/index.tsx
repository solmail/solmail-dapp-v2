import {
  Box,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Image,
  VStack,
  chakra,
  Link as ChakraLink,
  Tooltip,
  useDisclosure,
  useOutsideClick,
  useBreakpointValue,
} from "@chakra-ui/react";
import { config, ENABLE_USERNAME_CLAIM } from "@const/config";
import { MENU } from "@const/menu";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { BsPlusCircleFill } from "react-icons/bs";

import { isActive } from "@utils/index";
import type { MenuConfig } from "src/types";

import JupiterLogo from "@assets/jupiter.svg";

import { LINKS } from "@const/links";
import { ClipboardText } from "@components/ClipboardText";
import { getSolscanAddress } from "@utils/string/getSolscanUrl";
import { useEffect, useMemo, useRef } from "react";
import { MenuHeader } from "@components/MenuHeader";
import noop from "lodash/noop";

import { DOMAINS } from "@const/domain";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useUsernamePopup } from "@hooks/useUsernamePopup";
import { SocialShare } from "@components/SocialShare";

export const Sidebar: React.FC = () => {
  const { onOpen } = useUsernamePopup();
  const router = useRouter();
  const { pathname } = useLocation();
  const selectedmenu = useMemo(() => {
    const menu = MENU.find((menu) => pathname.indexOf(menu.id) > -1);
    return menu || MENU[0];
  }, [pathname]);
  const { address } = usePrivyWallet();
  const { username, isLoading, hasUserNames, isFetched } =
    useGetLinkedUsernameById(address);
  const hasChildMenu =
    selectedmenu && selectedmenu.submenu && selectedmenu.submenu.length > 0;

  const { onOpen: onOpenMenu, onClose: onCloseMenu, isOpen } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: onCloseMenu,
  });

  const isSmallDevice = useBreakpointValue({ base: !0, md: !1 });

  const onClickHandler = (shouldRedirect: boolean) => {
    if (!isSmallDevice) {
      return;
    }

    if (!shouldRedirect) {
      onOpenMenu();
    }
  };

  useEffect(() => {
    const unsubscribe = router.subscribe(
      "onBeforeNavigate",
      ({ fromLocation, toLocation }) => {
        if (!fromLocation) return;
        const fromUrl =
          fromLocation.pathname + fromLocation.search + fromLocation.hash;
        const toUrl = toLocation.pathname + toLocation.search + toLocation.hash;

        if (fromUrl !== toUrl) {
          onCloseMenu();
        }
      },
    );
    return () => {
      unsubscribe();
    };
  }, [onCloseMenu, router]);

  return (
    <Flex
      ref={ref}
      w={{
        base: "50px",
        ...(hasChildMenu ? { md: "300px" } : {}),
      }}
      maxW={{
        base: "50px",
        ...(hasChildMenu ? { md: "300px" } : {}),
      }}
      direction={"row"}
      bg="surface.100"
      position={"relative"}
    >
      <Flex
        w={{
          base: "50px",
        }}
        direction={"column"}
        bg="surface.400"
      >
        <VStack align={"center"} px={"8px"} py={"10px"}>
          <Flex my={"8px"}>
            <Link to={"/"}>
              <Image src={config.logo} w="28px" />
            </Link>
          </Flex>
          {MENU.map((menu) => {
            if (menu.skipRender) {
              return null;
            }
            const active = isActive(menu.id, pathname);
            return (
              <Flex key={menu.id}>
                <Tooltip label={menu.name}>
                  <ChakraLink
                    opacity={active ? 0.3 : 1}
                    as={Link}
                    py={2}
                    to={menu.link}
                    onClick={() => onClickHandler(!active)}
                  >
                    <Icon fontSize={19} as={menu.icon} />
                  </ChakraLink>
                </Tooltip>
              </Flex>
            );
          })}
        </VStack>
      </Flex>
      <Flex
        hidden={!hasChildMenu}
        direction={"column"}
        p={5}
        pb={3}
        display={{
          base: isOpen ? "flex" : "none",
          md: "flex",
        }}
        position={{
          md: "static",
          base: "absolute",
        }}
        left={{
          base: "50px",
          md: "initial",
        }}
        bottom={0}
        top={0}
        zIndex={1}
        bg="surface.100"
        w={{
          base: "250px",
          md: "initial",
        }}
      >
        <MenuHeader {...selectedmenu} />
        <Flex direction={"column"} flex={"auto"}>
          <VStack align={"start"} gap={1} my={3} mt={0} w="100%">
            {selectedmenu?.submenu?.map((menu) => {
              return <SidebarMenu key={menu.id} {...menu} />;
            })}
          </VStack>
          {ENABLE_USERNAME_CLAIM &&
            isFetched &&
            !hasUserNames &&
            !username &&
            !isLoading && (
              <Flex
                align={"start"}
                borderTop={"solid 1px"}
                borderTopColor={"surface.300"}
                py={3}
                px={3}
                direction={"column"}
              >
                <Flex direction={"column"}>
                  <Flex fontSize={14} opacity={0.5}>
                    Create username
                  </Flex>
                  <Flex
                    cursor={"pointer"}
                    alignItems={"center"}
                    mb={5}
                    transition={"all ease .2s"}
                    _hover={{
                      opacity: 0.5,
                    }}
                    onClick={onOpen}
                    fontWeight={"bold"}
                    color={"solana.middle"}
                  >
                    {DOMAINS.DEFAULT}
                    <Icon fontSize={12} ml={2} as={BsPlusCircleFill} />
                  </Flex>
                </Flex>
              </Flex>
            )}
        </Flex>

        <SidebarFooter />
      </Flex>
    </Flex>
  );
};

const SidebarFooter: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      borderTop={"solid 1px"}
      pt={3}
      borderTopColor={"surface.300"}
    >
      <SocialShare />
      <Flex alignItems={"center"} fontSize={13} gap={2}>
        <ChakraLink
          as={Link}
          to={getSolscanAddress(config.SOLMAIL_CONTRACT, "mainnet")}
          display={"inline-flex"}
          alignItems={"center"}
          target="_blank"
        >
          <Image boxSize={"13px"} mr={1} src={config.logo} />
          <chakra.span textDecoration={"underline"}>Solmail</chakra.span>
        </ChakraLink>
        <chakra.span>
          <ClipboardText>{config.SOLMAIL_CONTRACT}</ClipboardText>
        </chakra.span>
        <chakra.span>
          <ChakraLink href={LINKS.jupiter} target="_blank">
            <Image boxSize={"13px"} borderRadius={"50%"} src={JupiterLogo} />
          </ChakraLink>
        </chakra.span>
      </Flex>
      <Flex mt={1} opacity={0.7} fontSize={12}>
        Solmail © {new Date().getFullYear()} All rights reserved.
      </Flex>
    </Flex>
  );
};

const SidebarMenu: React.FC<MenuConfig> = ({
  name,
  link,
  icon,
  id,
  onClick,
}) => {
  const { pathname } = useLocation();
  const _isActive = isActive(id, pathname);
  return (
    <LinkBox
      bg={_isActive ? "surface.300" : ""}
      w="100%"
      borderRadius={10}
      display={"flex"}
      alignItems={"center"}
      px={3}
      py={"10px"}
      transition={"all ease .5s"}
      onClick={onClick || noop}
      data-group
      _hover={{
        bg: !_isActive ? "surface.200" : "",
      }}
    >
      <chakra.span
        position={"relative"}
        zIndex={1}
        display={"inline-flex"}
        alignItems={"center"}
      >
        <Icon
          _groupHover={{
            color: _isActive ? "" : "solana.middle",
          }}
          as={icon}
          mr={2}
          color={_isActive ? "solana.end" : ""}
        />
        <Box
          as="span"
          color={_isActive ? "solana.end" : ""}
          transition={"all ease .2s"}
          _groupHover={{
            color: _isActive ? "" : "solana.middle",
          }}
        >
          {name}
        </Box>
      </chakra.span>
      {!_isActive && (
        <chakra.span
          borderRadius={10}
          position={"absolute"}
          inset={0}
          transition={"all ease .2s"}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          bgGradient="solanaBg"
        ></chakra.span>
      )}
      <LinkOverlay zIndex={3} as={Link} to={link} />
    </LinkBox>
  );
};

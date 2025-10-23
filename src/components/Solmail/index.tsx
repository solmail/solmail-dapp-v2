import {
  Flex,
  IconButton,
  Spinner,
  SlideFade,
  Icon,
  Alert,
  Box,
  AlertTitle,
  CloseButton,
  chakra,
} from "@chakra-ui/react";
import { Inbox, type InboxRef } from "@components/Inbox";
import { MailPreview } from "@components/MailPreview";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { useComposer } from "@hooks/useComposer";

import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { MailListStatusState, MailListStatus } from "@state/inbox";
import { dispatchCustomEvent, EventTypes } from "@utils/event";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { TbReload } from "react-icons/tb";
export const Solmail: React.FC = () => {
  const { update } = useComposer();
  const { context, id } = useMailBoxContext();

  const [{ status, hasInboxUpdates }, set] = useAtom(MailListStatusState);
  const isPending = status === MailListStatus.updating;
  const inbox = useRef<InboxRef>(null);

  const onRefresh = () => {
    if (!isPending && inbox && inbox.current) {
      inbox.current.refresh();
    }
  };

  useEffect(() => {
    update((prev) => ({
      ...prev,
      context,
    }));
  }, [context, update]);

  const { onOpen, isOpen } = useComposer();

  const onClickForceUpdate = () => {
    dispatchCustomEvent({
      type: EventTypes.inbox_force_update,
    });
  };

  const onClose = () => {
    set((prev) => ({
      ...prev,
      hasInboxUpdates: !1,
    }));
  };

  return (
    <Flex w="100%" direction={"row"}>
      <Flex
        direction={"column"}
        width={{ base: "100%", md: "350px" }}
        bg="surface.400"
        borderRight={"solid 1px"}
        borderRightColor={"surface.400"}
        borderBottomLeftRadius={21}
        display={{
          base: id ? "none" : "flex",
          md: "flex",
        }}
      >
        <Flex
          borderBottom={"solid 1px"}
          borderBottomColor={"surface.500"}
          px={5}
          py={3}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Flex
            fontWeight={"medium"}
            fontSize={18}
            textTransform={"capitalize"}
          >
            {context}
          </Flex>
          <Flex>
            <IconButton
              bg="transparent !important"
              aria-label="Refresh"
              icon={<TbReload />}
              size={"sm"}
              onClick={onRefresh}
              _hover={{
                opacity: 0.5,
              }}
            />
          </Flex>
        </Flex>
        {hasInboxUpdates && (
          <Flex>
            <Alert status="success">
              <Box>
                <AlertTitle>New Mail</AlertTitle>
                <Box fontSize={13}>
                  You’ve got new messages —
                  <chakra.span
                    onClick={onClickForceUpdate}
                    _hover={{
                      opacity: 0.8,
                    }}
                    ml={1}
                    textDecoration={"underline"}
                    cursor={"pointer"}
                  >
                    click here to view them.
                  </chakra.span>
                </Box>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
              />
            </Alert>
          </Flex>
        )}
        <Flex flex={"auto"} position={"relative"}>
          <Flex position={"absolute"} inset={0}>
            <Flex
              position={"absolute"}
              right={0}
              left={0}
              top={5}
              alignItems={"center"}
              sx={{
                "> div": {
                  width: "100%",
                },
              }}
            >
              <SlideFade in={isPending} unmountOnExit offsetY={"-20px"}>
                <Flex justifyContent={"center"} alignItems={"center"} w="100%">
                  <Flex
                    bg="green.500"
                    zIndex={1}
                    borderRadius={15}
                    px={2}
                    py={"3px"}
                    alignItems={"center"}
                    mx="auto"
                    display={"inline-flex"}
                    color={"light.100"}
                    fontSize={14}
                  >
                    Updating
                    <Spinner mx={1} size={"sm"} />
                  </Flex>
                </Flex>
              </SlideFade>
            </Flex>

            <CustomScrollbarWrapper>
              <Inbox ref={inbox} />
            </CustomScrollbarWrapper>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flex={"auto"}
        display={{
          base: id ? "flex" : "none",
          md: "flex",
        }}
      >
        <MailPreview />
      </Flex>
      <Flex
        bg="solana"
        boxSize={"50px"}
        position={"absolute"}
        right={"30px"}
        bottom={"30px"}
        borderRadius={"50%"}
        alignItems={"center"}
        color={"light.100"}
        justifyContent={"center"}
        onClick={() => onOpen()}
        transform={`scale(${isOpen ? "0" : "1"})`}
        display={{ base: "flex", md: "none" }}
      >
        <Icon fontSize={22} as={HiOutlinePlus} />
      </Flex>
    </Flex>
  );
};

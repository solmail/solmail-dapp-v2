import { forwardRef, useImperativeHandle } from "react";
import { Box, Button, Flex, Spinner, VStack } from "@chakra-ui/react";
import { MailCard } from "@components/MailCard";
import { useGetInbox } from "@hooks/useGetInbox";
import { useMailBoxContext } from "@hooks/useMailBoxContext";

export interface InboxRef {
  refresh: () => void;
}

export const Inbox = forwardRef<InboxRef>((_, ref) => {
  const { context } = useMailBoxContext();
  const {
    mail,
    isLoading,
    refetch,
    page,
    pages,
    onPrev,
    hasPrev,
    hasNext,
    onNext,
  } = useGetInbox(context);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refetch();
    },
  }));

  return (
    <Box w="100%">
      <Box pt={2}>
        {isLoading && (!mail || !mail.length) && (
          <Flex minH={"50vh"} justifyContent={"center"} alignItems={"center"}>
            <Spinner />
          </Flex>
        )}

        {mail && mail.length > 0 && (
          <VStack w="100%" overflow={"hidden"} h="100%" px={2} gap={2}>
            {mail.map((item) => (
              <MailCard key={`${context}_${item.id?.toString()}`} {...item} />
            ))}
          </VStack>
        )}

        {pages > 1 && (
          <Flex direction={"column"} px={5} alignItems={"center"} mt={3}>
            <Flex gap={1}>
              <Button onClick={onPrev} isDisabled={!hasPrev} size={"sm"}>
                Prev
              </Button>

              <Button onClick={onNext} isDisabled={!hasNext} size={"sm"}>
                Next
              </Button>
            </Flex>
            <Flex fontSize={12} mt={1}>
              page {page} of {pages}
            </Flex>
          </Flex>
        )}

        {!isLoading && (!mail || !mail.length) && (
          <Flex
            alignItems={"center"}
            opacity={0.5}
            justifyContent={"center"}
            minH={"38vh"}
          >
            Mail list is currently empty.
          </Flex>
        )}
      </Box>
    </Box>
  );
});

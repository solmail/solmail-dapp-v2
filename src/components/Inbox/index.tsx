import { forwardRef, useImperativeHandle } from "react";
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import { MailCard } from "@components/MailCard";
import { useGetInbox } from "@hooks/useGetInbox";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { Pagination } from "@components/Pagination/inddex";

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
          <Pagination
            hasNext={hasNext}
            hasPrev={hasPrev}
            onPrev={onPrev}
            onNext={onNext}
            page={page}
            pages={pages}
          />
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

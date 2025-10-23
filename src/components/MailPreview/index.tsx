import { Box, Fade, Flex, Icon } from "@chakra-ui/react";
import { MailActions } from "@components/MailActions";
import { MailMeta } from "@components/MailMeta";
import { MailPreviewAttachments } from "@components/MailPreviewAttchments";
import { MailPreviewHeader } from "@components/MailPreviewHeader";
import { PaymentRequests } from "@components/PaymentRequest";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";

import { useUpdateMailStatus } from "@hooks/useUpdateMailStatus";

import { useEffect } from "react";
import { RiChatSmileFill } from "react-icons/ri";

export const MailPreview: React.FC = () => {
  const { id } = useMailBoxContext();

  const {
    subject,
    content,
    textContent,
    attachments,
    isLoading,
    payments,
    mail,
  } = useMailBody(id && id !== "all" ? id : undefined);
  const { onUpdate } = useUpdateMailStatus(mail?.uid);

  useEffect(() => {
    if (mail && !mail.markAsRead) {
      onUpdate();
    }
  }, [mail, onUpdate]);
  return (
    <Flex w="full" direction={"column"}>
      {id && !isLoading && (
        <>
          <Flex
            data-header
            bg="surface.300"
            borderBottom="solid 1px"
            borderBottomColor={"surface.600"}
          >
            <MailPreviewHeader />
          </Flex>
          <Flex flex={"auto"} direction={"column"} position={"relative"}>
            <Flex position={"absolute"} inset={0}>
              <CustomScrollbarWrapper>
                <Fade in key={id}>
                  <Box w="full" mt={4} px={5}>
                    <Box maxW="600" w="full" mx="auto">
                      <Box my={2} fontWeight={"medium"} fontSize={18}>
                        {subject}
                      </Box>
                      {textContent && (
                        <Box
                          sx={{
                            "*": {
                              maxWidth: "100% !important",
                            },

                            h1: {
                              fontSize: "2em",
                            },
                            h2: {
                              fontSize: "1.5em",
                            },
                            h3: {
                              fontSize: "1.17em",
                            },
                            ol: {
                              ml: "15px",
                              my: 3,
                            },
                            p: {
                              my: 1,
                            },
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              content && content.length ? content : textContent,
                          }}
                          whiteSpace={"pre-wrap"}
                          lineHeight={"1.6"}
                        ></Box>
                      )}
                      {payments && payments.length > 0 && <PaymentRequests />}
                      {attachments && attachments.length > 0 && (
                        <MailPreviewAttachments />
                      )}
                      <MailMeta />
                      <Flex gap={2} display={{ base: "flex", md: "none" }}>
                        <MailActions />
                      </Flex>
                    </Box>
                  </Box>
                </Fade>
              </CustomScrollbarWrapper>
            </Flex>
          </Flex>
        </>
      )}

      {!id && (
        <Flex
          h="full"
          justifyContent={"center"}
          alignItems={"center"}
          minH={"50vh"}
          direction={"column"}
        >
          <Flex fontSize={50} mb={2}>
            <Icon fontSize={25} as={RiChatSmileFill} />
          </Flex>
          <Flex opacity={0.5}>No Mail Selected</Flex>
        </Flex>
      )}
    </Flex>
  );
};

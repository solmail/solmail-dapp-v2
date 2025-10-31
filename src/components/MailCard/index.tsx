import {
  Badge,
  Box,
  chakra,
  Fade,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Attachment } from "@components/Attachment";
import { Avatar } from "@components/Avatar";
import { CustomSkeleton } from "@components/CustomSkeleton";
import { SolanaPayRequest } from "@components/SolanaPayRequest";
import { UserDisplayName } from "@components/UserDisplayName";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";

import { usePaymentStatus } from "@hooks/usePaymentStatus";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { Link } from "@tanstack/react-router";
import { trim } from "@utils/string";
import { formatTime } from "@utils/time";
import { BiSolidUpArrowSquare, BiSolidDownArrowSquare } from "react-icons/bi";

import { MailBoxLabels, type FormattedMailBox } from "src/types";

const PaymentStatusBadge: React.FC<{ id: string }> = ({ id }) => {
  const { address } = usePrivyWallet();
  const { payments, mail } = useMailBody(id);
  const { data: isDone } = usePaymentStatus(id, payments[0] ?? {});
  const isPaymentRequesting = mail?.to?.toString() === address?.toString();

  return (
    <Badge
      fontWeight={"normal"}
      p={"2px"}
      px={2}
      colorScheme={isDone ? "green" : "red"}
      fontSize={9}
    >
      {!isDone
        ? "Pending"
        : isPaymentRequesting
          ? "Payment Done"
          : "Payment Received"}
    </Badge>
  );
};
export const MailCard: React.FC<FormattedMailBox> = ({ ...props }) => {
  const { from, createdAt, id, to, markAsRead } = props;

  const { context, id: contextId } = useMailBoxContext();
  const isRead = markAsRead || context === MailBoxLabels.outbox;
  const { address: myAddress } = usePrivyWallet();
  const {
    textContent,
    hasSmartView,
    isLoading: isMailBoxLoading,
    isInternalMail,
    subject,
  } = useMailBody(id);

  const addres =
    myAddress.toString() === to?.toString() ? from?.toString() : to?.toString();
  const isActive = contextId && contextId === id;

  const hasPendingState = isMailBoxLoading;

  return (
    <Flex as={Fade} in delay={0.1} w="100%">
      <Box
        p={2}
        w="full"
        pl="50px"
        position={"relative"}
        cursor={"pointer"}
        transition={"all ease .2s"}
        borderRadius={10}
        fontSize={14}
        as={LinkBox}
        fontWeight={!isRead ? "600" : ""}
        opacity={!isRead ? 1 : 0.5}
        pr={5}
        bg={isActive ? "surface.800" : ""}
        _hover={{
          bg: "surface.800",
        }}
      >
        <Avatar
          top={2}
          left={"10px"}
          name={addres}
          isInternalMail={isInternalMail}
        />
        <Flex mb={"2px"} justifyContent={"space-between"}>
          <Flex>
            <UserDisplayName address={addres} />
          </Flex>
          <Flex fontSize={12} alignItems={"center"}>
            {formatTime(Number(createdAt) * 1000)}
          </Flex>
        </Flex>
        {subject && (
          <Box
            maxW={"100%"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            <CustomSkeleton isLoading={isMailBoxLoading}>
              <chakra.span
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                w={"100%"}
                whiteSpace={"nowrap"}
              >
                {subject}
              </chakra.span>
            </CustomSkeleton>
          </Box>
        )}
        <Box>
          {context === MailBoxLabels.payment && <PaymentStatusBadge id={id} />}
        </Box>
        {context !== MailBoxLabels.payment && (
          <Box fontSize={12}>
            <CustomSkeleton isLoading={hasPendingState}>
              <chakra.span
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                w={"100%"}
                whiteSpace={"nowrap"}
              >
                {trim(
                  textContent,
                  hasSmartView ? 30 : 60,
                  "...",
                  "(No content)"
                )}
              </chakra.span>
            </CustomSkeleton>
          </Box>
        )}
        {hasSmartView && <SmartView id={id} />}
        <LinkOverlay as={Link} to={`/u/solmail/${context}/${id.toString()}`} />
      </Box>
    </Flex>
  );
};
const MAX_ATTACHMENTS_TO_SHOW = 1;
const SmartView: React.FC<{ id: string }> = ({ id }) => {
  const { context } = useMailBoxContext();
  const { attachments, payments, mail } = useMailBody(id);
  const { address } = usePrivyWallet();
  const isRequestingPayment = mail?.from?.toString() === address;
  return (
    <Flex
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      alignItems={"center"}
      mt={1}
    >
      {context === MailBoxLabels.payment && (
        <Icon
          mr={1}
          fontSize={18}
          color={isRequestingPayment ? "green.500" : "red.500"}
          as={
            isRequestingPayment ? BiSolidDownArrowSquare : BiSolidUpArrowSquare
          }
        />
      )}
      {payments && payments.length > 0 && payments[0] && (
        <SolanaPayRequest
          amount={payments[0]?.amount}
          token={payments[0]?.tokenaddress}
        />
      )}

      {attachments.length > 0 &&
        attachments
          .slice(0, MAX_ATTACHMENTS_TO_SHOW)
          .map((attachment, index) => {
            return (
              <Attachment
                name={attachment.name}
                key={attachment.name + index}
              />
            );
          })}

      {attachments && attachments.length > MAX_ATTACHMENTS_TO_SHOW && (
        <Flex
          bg="surface.600"
          fontSize={12}
          p="3px"
          px="8px"
          borderRadius={"5"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          +1
        </Flex>
      )}
    </Flex>
  );
};

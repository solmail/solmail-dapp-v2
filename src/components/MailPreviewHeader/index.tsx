import { chakra, Flex } from "@chakra-ui/react";
import { Avatar } from "@components/Avatar";
import { ClipboardText } from "@components/ClipboardText";
import { MailActions } from "@components/MailActions";

import { DOMAINS } from "@const/domain";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { usePrivyWallet } from "@hooks/usePrivyWallet";

import { useGetLinkedUsernameById } from "@hooks/useUsernames";

import { shortenPrincipalId } from "@utils/string";
import { format } from "@utils/time";

import { MailBoxLabels } from "src/types";

export const MailPreviewHeader: React.FC = () => {
  const { context, id } = useMailBoxContext();
  const { address: myAddress } = usePrivyWallet();
  const { isInternalMail } = useMailBody(id);

  const { mail } = useMailBody(id);
  const label =
    context === MailBoxLabels.payment
      ? myAddress === mail?.from?.toString()
        ? "To"
        : "From"
      : context !== MailBoxLabels.outbox
        ? "From"
        : "To";
  const address =
    context === MailBoxLabels.payment
      ? mail?.from?.toString() === myAddress
        ? mail.to.toString()
        : mail?.from?.toString()
      : context !== MailBoxLabels.outbox
        ? mail?.from?.toString()
        : mail?.to?.toString();
  const { displayName } = useGetLinkedUsernameById(address);

  return (
    <Flex px={5} py={"7px"} w="full" direction={"row"} gap={3}>
      <Flex boxSize={"40px"}>
        <Avatar
          boxSize={"40px"}
          name={address?.toString() ?? ""}
          position={"initial"}
          isInternalMail={isInternalMail}
        />
      </Flex>

      <Flex direction={"column"} flex={"auto"}>
        <Flex>
          <chakra.span mr={1}>{label}</chakra.span>

          <ClipboardText
            textToCopy={displayName}
            trim={!1}
          >{`<${shortenPrincipalId(displayName, 4, DOMAINS.DEFAULT.length)}>`}</ClipboardText>
        </Flex>
        <Flex opacity={0.6} fontSize={13}>
          {format(Number(mail?.createdAt ?? 0) * 1000)}
        </Flex>
      </Flex>
      <Flex gap={1} display={{ base: "none", md: "flex" }}>
        <MailActions />
      </Flex>
    </Flex>
  );
};

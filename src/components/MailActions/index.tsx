import { IconButton, Tooltip } from "@chakra-ui/react";
import { MailOptionRenderer } from "@components/MailOptionRenderer";
import { useComposer } from "@hooks/useComposer";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";

import { useUpdateCompressedAccount } from "@hooks/useUpdateCompressedAccount";
import { MailShareTypes } from "@state/index";
import { IoIosShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiReplyFill, RiSpam3Fill } from "react-icons/ri";
import { MailBoxLabels } from "src/types";

export const MailActions: React.FC = () => {
  const { id } = useMailBoxContext();
  const { onOpen } = useComposer();

  const { mail } = useMailBody(id);
  const mailConfig = () => {
    return {
      thread: mail?.from?.toString() ?? "",
      ref: mail?.id?.toString() ?? "",
    };
  };

  const { mutateAsync, isPending } = useUpdateCompressedAccount();

  const onStatusUpdate = async (label: MailBoxLabels) => {
    await mutateAsync({
      label,
      from: mail?.from?.toString() ?? "",
      to: mail?.to?.toString() ?? "",
      mail: mail?.uid ?? "",
    });
  };
  const onReplay = () => {
    onOpen({
      ...mailConfig(),
      action: MailShareTypes.reply,
    });
  };

  const onForward = () => {
    onOpen({
      ...mailConfig(),
      action: MailShareTypes.forward,
    });
  };

  return (
    <>
      <MailOptionRenderer
        renderWhen={[
          MailBoxLabels.inbox,
          MailBoxLabels.spam,
          MailBoxLabels.payment,
        ]}
      >
        <Tooltip label="Reply" placement="auto">
          <IconButton
            size={"sm"}
            aria-label="Reply"
            icon={<RiReplyFill />}
            onClick={onReplay}
          />
        </Tooltip>
      </MailOptionRenderer>

      <MailOptionRenderer
        renderWhen={[
          MailBoxLabels.inbox,
          MailBoxLabels.outbox,
          MailBoxLabels.trash,
          MailBoxLabels.spam,
          MailBoxLabels.payment,
        ]}
      >
        <Tooltip label="Forward" placement="auto">
          <IconButton
            size={"sm"}
            aria-label="Forward"
            icon={<IoIosShareAlt />}
            onClick={onForward}
          />
        </Tooltip>
      </MailOptionRenderer>

      <MailOptionRenderer
        renderWhen={[
          MailBoxLabels.inbox,
          MailBoxLabels.spam,
          MailBoxLabels.payment,
        ]}
      >
        <Tooltip placement="auto" label="Delete" isDisabled={isPending}>
          <IconButton
            onClick={() => onStatusUpdate(MailBoxLabels.trash)}
            size={"sm"}
            aria-label="Delete"
            icon={<MdDelete />}
            disabled={isPending}
          />
        </Tooltip>
      </MailOptionRenderer>

      <MailOptionRenderer
        renderWhen={[
          MailBoxLabels.inbox,
          MailBoxLabels.trash,
          MailBoxLabels.payment,
        ]}
      >
        <Tooltip placement="auto" label="Mark as spam" isDisabled={isPending}>
          <IconButton
            onClick={() => onStatusUpdate(MailBoxLabels.spam)}
            size={"sm"}
            aria-label="Spam"
            icon={<RiSpam3Fill />}
            disabled={isPending}
          />
        </Tooltip>
      </MailOptionRenderer>
    </>
  );
};

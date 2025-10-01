import { IconButton, Tooltip } from "@chakra-ui/react";
import { MailOptionRenderer } from "@components/MailOptionRenderer";
import { useComposer } from "@hooks/useComposer";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useLabelIndexUpdate } from "@hooks/useMailIndexUpdate";
import { MailShareTypes } from "@state/index";
import { IoIosShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiReplyFill, RiSpam3Fill } from "react-icons/ri";
import { MailBoxLabels, MailLabelIndex } from "src/types";

export const MailActions: React.FC = () => {
  const { context, id } = useMailBoxContext();
  const { onOpen } = useComposer();
  const { isPending, mutateAsync } = useLabelIndexUpdate(id ?? "");
  const { mail } = useMailBody(id, context);
  const mailConfig = () => {
    return {
      thread: mail?.from?.toString() ?? "",
      ref: mail?.id?.toString() ?? "",
    };
  };

  const onStatusUpdate = async (status: MailLabelIndex) => {
    await mutateAsync({ index: status });
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
          MailBoxLabels.outbox,
          MailBoxLabels.spam,
          MailBoxLabels.payment,
        ]}
      >
        <Tooltip placement="auto" label="Delete" isDisabled={isPending}>
          <IconButton
            onClick={() => onStatusUpdate(MailLabelIndex.trash)}
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
            onClick={() => onStatusUpdate(MailLabelIndex.spam)}
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

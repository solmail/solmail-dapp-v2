import { Flex } from "@chakra-ui/react";
import { DownloadbleAttachment } from "@components/DownloadbleAttachment";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";

export const MailPreviewAttachments: React.FC = () => {
  const { id } = useMailBoxContext();
  const { attachments } = useMailBody(id);
  return (
    <Flex direction={"row"} flexWrap={"wrap"} gap={3} mt={5}>
      {attachments.map((attachment, index) => {
        return (
          <DownloadbleAttachment
            name={attachment.name}
            path={attachment.path}
            key={attachment.name + index}
          />
        );
      })}
    </Flex>
  );
};

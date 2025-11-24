import { Flex } from "@chakra-ui/react";
import { formatFileSize } from "@utils/file";
import { getByteSize } from "@utils/string/getByteSize";
import { useFormContext } from "react-hook-form";
import { ComposerFormInputs } from "src/types";

export const MailSizeInfo: React.FC = () => {
  const { watch } = useFormContext<ComposerFormInputs>();
  const body = watch("body");

  return (
    <Flex
      fontSize={12}
      opacity={0.5}
      alignItems={"center"}
      justifyContent={"flex-end"}
      flex={"auto"}
    >
      {formatFileSize(getByteSize(body))}
    </Flex>
  );
};

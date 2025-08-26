import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Setting: React.FC<{
  title: string;
  info?: string;
  children?: ReactNode;
}> = ({ children, title, info }) => {
  return (
    <Flex flexDirection={"row"} gap={2} w="100%">
      <Flex direction={"column"} flex={"auto"}>
        <Flex fontWeight={"bold"}>{title}</Flex>
        {info && (
          <Flex fontSize={13} opacity={0.5}>
            {info}
          </Flex>
        )}
      </Flex>
      {children && <Flex alignItems={"center"}>{children}</Flex>}
    </Flex>
  );
};

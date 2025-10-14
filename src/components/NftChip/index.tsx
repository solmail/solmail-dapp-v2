import { BoxProps, chakra, Icon } from "@chakra-ui/react";
import { RiNftFill } from "react-icons/ri";

export const NftChip: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <chakra.span
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      px={1}
      borderRadius={5}
      {...props}
      color={"blue.500"}
    >
      <Icon as={RiNftFill} />
    </chakra.span>
  );
};

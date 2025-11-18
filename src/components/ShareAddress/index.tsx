import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

import { SharedAddress } from "@components/SharedAddress";

export const ShareAddress: React.FC<Omit<ModalProps, "children">> = ({
  ...props
}) => {
  return (
    <Modal isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalCloseButton />
        <ModalHeader textAlign={"center"}>Deposit Tokens</ModalHeader>
        <ModalBody pt={0} pb={10}>
          <SharedAddress />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

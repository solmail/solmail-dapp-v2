import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";

export const MigrationWarning: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const { exportWallet } = usePrivyWallet();
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader color={"yellow.500"}>
          Export Your Wallet Now
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0} mb={5}>
          <Flex w="100%" fontSize={13}>
            <Box>
              <Box color={"red.500"}>
                We’re migrating away from Privy embedded wallets. Please export
                your private key to avoid losing access to your funds. Go to
                <Box
                  as="strong"
                  color={"red.400"}
                  style={{ paddingLeft: 3, paddingRight: 3 }}
                >
                  Account Settings → Export Private Key
                </Box>{" "}
                and store it securely.
              </Box>
            </Box>
          </Flex>
          <Flex w="full" mt={5}>
            <Button
              onClick={exportWallet}
              w="full"
              bg="red.500"
              _hover={{
                bg: "red.400",
              }}
              size={"sm"}
            >
              Export Wallet Now
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

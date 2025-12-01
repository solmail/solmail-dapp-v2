import {
  Button,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tooltip,
  type ModalProps,
} from "@chakra-ui/react";
import { ClipboardText } from "@components/ClipboardText";
import { keyframes } from "@emotion/react";
import { useBalance } from "@hooks/useBalance";
import { useCreateCompressedMailbox } from "@hooks/useCreateCompressedMailbox";

import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSessionHandler } from "@hooks/useSessionHandler";
import { isFunction } from "lodash";
import { useMemo } from "react";
import { FaLightbulb } from "react-icons/fa6";
import { GrRefresh } from "react-icons/gr";
import { RiShutDownLine } from "react-icons/ri";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
export const RequestAccountCreation: React.FC<
  Omit<ModalProps, "children"> & {
    onSuccess: () => void;
    isRefetching: boolean;
  }
> = ({ isRefetching: checkingMailAccountStatus, onSuccess, ...props }) => {
  const { mutateAsync, isPending } = useCreateCompressedMailbox();
  const { formattedBalance, isRefetching, refetch } = useBalance();
  const { wallet } = usePrivyWallet();
  const [disabled, tooltip] = useMemo(() => {
    const balance = parseFloat(formattedBalance);
    if (balance > 0) {
      return [!1, ""];
    } else {
      return [!0, "Insufficient balance"];
    }
  }, [formattedBalance]);
  const { onLogout, isPending: isSigningOut } = useSessionHandler();
  const onClickHandler = async () => {
    try {
      const res = await mutateAsync();
      if (res) {
        if (isFunction(onSuccess)) {
          refetch();
          onSuccess();
        }
      }
    } catch {
      return;
    }
  };

  return (
    <Modal isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader textAlign={"center"}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Flex>Create Mailbox</Flex>
            <Flex>
              <Button
                onClick={onLogout}
                size={"sm"}
                rightIcon={<RiShutDownLine />}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalBody pt={0}>
          <Flex direction={"column"}>
            <Flex
              alignItems={"center"}
              color={"green.500"}
              justifyContent={"center"}
            >
              <ClipboardText>{wallet?.address ?? ""}</ClipboardText>
            </Flex>
            <Flex
              fontWeight={"bold"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              Available Balance
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"}>
              {formattedBalance}
              <IconButton
                ml={2}
                aria-label="Refresh"
                icon={<GrRefresh />}
                size={"sm"}
                onClick={() => refetch()}
                animation={
                  isRefetching ? `${spin} 1s linear infinite` : undefined
                }
              />
            </Flex>
            <Flex pt={5} alignItems={"center"} justifyContent={"center"}>
              <Tooltip label={tooltip} isDisabled={!disabled}>
                <Button
                  colorScheme="green"
                  disabled={disabled}
                  onClick={onClickHandler}
                >
                  {isPending || checkingMailAccountStatus || isSigningOut ? (
                    <Spinner size={"sm"} />
                  ) : (
                    "Create Mailbox"
                  )}
                </Button>
              </Tooltip>
            </Flex>

            <Flex direction={"column"} alignItems={"center"} my={4} mt={6}>
              <Flex fontWeight={"bold"}>
                Deposit SOL to Activate Your Mailbox
              </Flex>
              <Flex mt={1} opacity={0.6} textAlign={"center"} fontSize={13}>
                Your SolMail wallet is now ready — powered by Privy!. To create
                your mailbox and start sending messages, please deposit a small
                amount of SOL
              </Flex>
              <Flex
                mt={3}
                fontSize={13}
                color={"yellow.500"}
                alignItems={"center"}
              >
                <Icon as={FaLightbulb} fontSize={10} mr={1} />
                Minimum required: 0.02 Sol
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

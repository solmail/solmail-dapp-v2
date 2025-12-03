import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  VStack,
  Tooltip,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { USERNAME_SWITCH_INFO } from "@const/info";
import { useLinkUsernameToCompressedMailbox } from "@hooks/useLinkUsernameToCompressedMailbox";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useUsernameUpdateStatus } from "@hooks/useUsername";
import { useGetMyUsernames } from "@hooks/useUsernames";
import { PublicKey } from "@solana/web3.js";

import isFunction from "lodash/isFunction";
import { useMemo, useState } from "react";

type LinkableMail = {
  username: string;
  domain: string;
  mailbox: PublicKey | null;
  account: PublicKey;
  onUpdate: () => void;
  updatePending: boolean;
  updateStatus: (s: boolean) => void;
  linkedUsername: string | null;
};
export const LinkableMail: React.FC<LinkableMail> = ({
  username,
  domain,
  mailbox,
  onUpdate,
  linkedUsername,
}) => {
  const { address } = usePrivyWallet();
  const isLinked = address && address === mailbox?.toString();
  const { mutateAsync, isPending } = useLinkUsernameToCompressedMailbox();
  const { updatingUsername } = useUsernameUpdateStatus();

  const onLinkHandler = async (isUnlink: boolean = false) => {
    if (updatingUsername) {
      return;
    }
    await mutateAsync({
      username,
      unlink: linkedUsername,
      isUnlinkOnly: isUnlink,
    });

    if (isFunction(onUpdate)) {
      onUpdate();
    }
  };

  const onUnlinkHandler = () => {
    onLinkHandler(!0);
  };
  return (
    <Flex w="100%" direction={"row"}>
      <Flex direction={"column"} flex={"auto"} h="100%">
        <Flex
          w="100%"
          color={isLinked ? "green.500" : ""}
          alignItems={"center"}
          h="100%"
        >
          {username}@{domain}
        </Flex>
        {isLinked && (
          <Flex my={"2px"}>
            <Badge
              textTransform={"none"}
              fontWeight={"normal"}
              fontSize={12}
              colorScheme="green"
            >
              Linked
            </Badge>
          </Flex>
        )}
      </Flex>
      <Flex data-key={updatingUsername ? "updating" : "not-updating"}>
        <Tooltip
          isDisabled={!updatingUsername}
          hasArrow
          label="Update is in progress"
        >
          {!isLinked && (
            <Button onClick={() => onLinkHandler()} size={"sm"}>
              Link {isPending && <Spinner ml={1} size={"sm"} />}
            </Button>
          )}

          {isLinked && (
            <Button variant={"red"} size={"sm"} onClick={onUnlinkHandler}>
              Unlink {isPending && <Spinner ml={1} size={"sm"} />}
            </Button>
          )}
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export const LinkUserName: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader>
          Link username
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0} mb={5}>
          <Flex w="100%">
            <UsernameLinkBox />
          </Flex>
          <Flex mt={5}>
            <Alert status="info" borderRadius={5} fontSize={12}>
              <AlertIcon />
              {USERNAME_SWITCH_INFO}
            </Alert>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const UsernameLinkBox: React.FC<{ onUpdate?: () => void }> = ({
  onUpdate,
}) => {
  const { address } = usePrivyWallet();
  const { usernames } = useGetMyUsernames(address);
  const [isUpdating, setIsUpdating] = useState<boolean>(!1);
  const onUpdateHandler = () => {
    if (isFunction(onUpdate)) {
      onUpdate();
    }
  };

  const activeUsername = useMemo(() => {
    return usernames
      .filter(({ account }) => {
        return account?.mailbox?.toString() === address?.toString();
      })
      .at(0);
  }, [address, usernames]);

  return (
    <Flex direction={"column"} w="100%">
      {usernames && (
        <VStack w="100%" minH={"50vh"}>
          <CustomScrollbarWrapper>
            <VStack w="100%" gap={2}>
              {usernames.map(({ account, publicKey }) => {
                return (
                  <LinkableMail
                    key={publicKey?.toString()}
                    username={account.username}
                    domain={account.domain}
                    mailbox={account.mailbox}
                    account={publicKey}
                    onUpdate={onUpdateHandler}
                    updateStatus={setIsUpdating}
                    updatePending={isUpdating}
                    linkedUsername={activeUsername?.account?.username ?? null}
                  />
                );
              })}
            </VStack>
          </CustomScrollbarWrapper>
        </VStack>
      )}
      {(!usernames || !usernames.length) && <Flex>No usernames avalable</Flex>}
    </Flex>
  );
};

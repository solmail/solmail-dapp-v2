import { Button, Flex, Icon, Input, useDisclosure } from "@chakra-ui/react";
import { Setting } from "@components/SettingsContainer";
import { useGetUserWeb2Email } from "@hooks/useGetUserWeb2Email";
import { AddWeb2Email } from "./AddEmail";
import { AiOutlineEdit } from "react-icons/ai";
export const Web2Notifications: React.FC = () => {
  const { data, refetch } = useGetUserWeb2Email();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: !1 });
  const onCloseHandler = () => {
    refetch();
    onClose();
  };
  return (
    <Flex w="100%" direction={"column"}>
      <AddWeb2Email isOpen={isOpen} onClose={onCloseHandler} />
      <Setting
        title="Web2 Notification"
        info="Stay updated even outside the app. With Web2 notifications enabled, you'll receive alerts directly in your regular email inbox whenever there's a new message or important activity on Solana Mail."
      >
        {!data?.emailAddress && (
          <Flex>
            <Button onClick={onOpen} size={"sm"}>
              Add Email
            </Button>
          </Flex>
        )}
      </Setting>
      <Flex my={2}>
        {data?.emailAddress && (
          <Input
            p={5}
            h="auto"
            as={Flex}
            placeholder="Email address"
            bg="surface.600"
            readOnly
            direction={"column"}
            position={"relative"}
            cursor={"pointer"}
            onClick={onOpen}
            data-group
          >
            <Flex>{data?.emailAddress ?? ""}</Flex>
            {data?.isVerified && (
              <Flex color={"green.500"} fontSize={12}>
                Verified
              </Flex>
            )}
            {!data?.isVerified && (
              <Flex color={"yellow.500"} fontSize={12}>
                We've sent a verification link to your email
              </Flex>
            )}

            <Flex
              w="50px"
              alignItems={"center"}
              justifyContent={"center"}
              position={"absolute"}
              right={0}
              top={0}
              bottom={0}
              transition={"all ease .2s"}
              _groupHover={{
                opacity: 0.8,
              }}
            >
              <Icon as={AiOutlineEdit} />
            </Flex>
          </Input>
        )}
      </Flex>
    </Flex>
  );
};

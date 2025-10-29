import {
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MailBoxLabels,
  ResolveEmail,
  type ComposerFormInputs,
  type SolanaPayPayload,
} from "src/types";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { Subject } from "./Subject";
import { FieldWrapper } from "@components/Field";
import { trim } from "@utils/index";

import { useMailBody, Attachment, useBalance } from "@hooks/index";

import "react-quill/dist/quill.snow.css";
import QuillEditor from "./Quill";
import { IoSend } from "react-icons/io5";
import { Attachments } from "./Attachments";
import { useEffect, useState, useTransition } from "react";

import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { EditorToolbar } from "./EditorToolbar";
import { useComposer } from "@hooks/useComposer";
import { AttachmentsList } from "./AttachmentsList";
import { RequestSolanaPay } from "@components/RequestSolanaPay";

import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { MailShareTypes } from "@state/index";
import { MAXIMUM_MAIL_SUBJECT_LENGTH, NO_BALANCE_LABEL } from "@const/config";
import { useEmailer } from "@hooks/useEmailer";
import { ChipInput } from "@components/ChipInput";
import { useEmailResolver } from "@hooks/useEmailResolver";

import { FiMinimize2 } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { dispatchCustomEvent } from "@utils/event";

export const ComposerLegacy: React.FC = () => {
  const {
    thread,
    action,
    ref,
    onClose: closeComposer,
    minimize,
  } = useComposer();
  const [sharedAttachments, setSharedAttachments] = useState<Attachment[]>([]);
  const [isComposerReady, setComposerState] = useState<boolean>(!1);
  const { mutateAsync } = useEmailer();

  const { mutateAsync: resolveRecepient } = useEmailResolver();

  const {
    subject,
    isLoading: isMailLoading,
    content,
    attachments,
  } = useMailBody(ref);

  const {
    account: _account,
    displayName,
    isLoading,
  } = useGetLinkedUsernameById(thread);

  const methods = useFormContext<ComposerFormInputs>();

  useEffect(() => {
    if (isComposerReady) {
      return;
    }
    if (thread && !isLoading && !isMailLoading) {
      if (action === MailShareTypes.reply) {
        methods.setValue(
          "to",
          _account && _account.publicKey ? [displayName] : [thread],
          {
            shouldValidate: !0,
          }
        );
        methods.setValue(
          "subject",
          trim(`Re : ${subject ?? ""}`, MAXIMUM_MAIL_SUBJECT_LENGTH)
        );
      }

      if (action === MailShareTypes.forward) {
        methods.setValue(
          "subject",
          trim(`Forward : ${subject ?? ""}`, MAXIMUM_MAIL_SUBJECT_LENGTH)
        );
        methods.setValue("body", content, {
          shouldValidate: !0,
        });

        if (attachments && attachments.length > 0) {
          setSharedAttachments(attachments);
        }
        set(new Date().getTime());
      }
      setComposerState(!0);
    }
  }, [
    _account,
    action,
    attachments,
    content,
    displayName,
    isComposerReady,
    isLoading,
    isMailLoading,
    methods,
    subject,
    thread,
  ]);

  const [id, set] = useState(0);
  const { hasEnoughBalance } = useBalance(undefined, 0.01021728);

  const { composerCollapsed, composerMinimised, update } = useComposer();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const _resolveRecipients = async (to: string[]) => {
    const address: ResolveEmail[] = [];
    let status = !0;
    let count = 0;
    for (let i = 0; i < to.length; i++) {
      const resolvedAddress = await resolveRecepient({
        username: to[i],
      });
      address.push({
        message: resolvedAddress?.message ?? "",
        status: resolvedAddress?.status || !1,
        resolvedAddress: resolvedAddress?.address?.toString() ?? "",
        username: to[i],
      });
      status = status && !!resolvedAddress?.status;
      if (status) {
        count++;
      }
    }
    return { address, status, count };
  };
  const [isPending, startTranstion] = useTransition();
  const onSubmit: SubmitHandler<ComposerFormInputs> = async ({
    to,
    ...values
  }) => {
    startTranstion(async () => {
      const { address, status, count } = await _resolveRecipients(to);
      if (!status) {
        methods.setValue("recipientValidation", address, {
          shouldValidate: !0,
        });
        return;
      }
      update((prev) => ({
        ...prev,
        composerCollapsed: !0,
      }));

      for (let i = 0; i < address.length; i++) {
        if (!address[i].status) continue;
        update((prev) => ({
          ...prev,
          composerProgress: {
            total: count,
            current: prev.composerProgress.current + 1,
          },
        }));

        try {
          await mutateAsync({ ...values, to: address[i].resolvedAddress });
        } catch {
          continue;
        }
      }
      setTimeout(() => {
        dispatchCustomEvent({
          contextRefresher: MailBoxLabels.outbox,
        });
      });
      closeComposer();
    });
  };

  const handleChange = (value: string) => {
    methods.setValue("body", value);
  };

  const addSolanaPay = (payload: SolanaPayPayload) => {
    methods.setValue("solanaPay", payload);
    onClose();
  };

  methods.watch(["to"]);
  if (composerCollapsed || composerMinimised) {
    return null;
  }

  const onRemoveSharedAttachment = (index: number) => {
    setSharedAttachments((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <Flex
        direction={"column"}
        px="5"
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        mx={"auto"}
        borderTopRadius={15}
        zIndex={500}
        w="100%"
        minH={"80vh"}
        h="100%"
      >
        <Flex direction={"column"}>
          <Flex
            borderBottom={"solid 1px"}
            borderBottomColor={"surface.700"}
            direction={"row"}
            justifyContent={"space-between"}
            py={3}
            mx="-20px"
            px="20px"
            bg="surface.500"
            borderTopRadius={10}
          >
            <Flex alignItems={"center"} fontSize={16}>
              <chakra.span fontWeight={"600jekej"}>
                Compose new message
              </chakra.span>
            </Flex>
            <Flex gap={3}>
              <IconButton
                size={"sm"}
                aria-label="Minimise"
                onClick={minimize}
                icon={<FiMinimize2 />}
              ></IconButton>
              <IconButton
                size={"sm"}
                aria-label="Close"
                onClick={closeComposer}
                icon={<CgClose />}
              ></IconButton>

              <Button
                {...(!isPending ? { rightIcon: <IoSend /> } : {})}
                size={"sm"}
                variant={"green"}
                type="submit"
                colorScheme="red"
                isDisabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? "Send" : NO_BALANCE_LABEL}
                {isPending && <Spinner size={"sm"} ml={2} />}
              </Button>
            </Flex>
          </Flex>
          <Flex w="100%" direction={"column"}>
            <Flex mt={3}>
              <ChipInput name="to" />
            </Flex>
            <Flex mt={3}>
              <FieldWrapper name="subject" hasPadding={!1}>
                <Subject />
              </FieldWrapper>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <EditorToolbar />
        </Flex>
        <Flex flex={"auto"} direction={"column"} position={"relative"}>
          <Flex position={"absolute"} inset={0}>
            <CustomScrollbarWrapper>
              <Box w="100%" px={1}>
                <QuillEditor key={id} onChange={handleChange} />
              </Box>
              <Box w="100%">
                <AttachmentsList
                  sharedAttachments={sharedAttachments}
                  onRemove={onRemoveSharedAttachment}
                />
              </Box>
            </CustomScrollbarWrapper>
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          <Attachments onOpenSolanaPay={onOpen} />
        </Flex>
      </Flex>
      <RequestSolanaPay
        onSubmit={addSolanaPay}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

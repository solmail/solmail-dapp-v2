import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  Switch,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { useGetUserWeb2Email } from "@hooks/useGetUserWeb2Email";
import { PayLoad, useRegisterV2Mail } from "@hooks/useRegisterV2Mail";
import { isFunction } from "lodash";
import { useEffect, useId } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export const AddWeb2Email: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const { isOpen: isEditMode, onOpen } = useDisclosure();
  const { mutateAsync, isPending } = useRegisterV2Mail();
  const onSubmitHandler: SubmitHandler<PayLoad> = async ({
    emailAddress,
    isNotificationEnabled,
  }) => {
    if (isPending) return;
    await mutateAsync({
      emailAddress,
      isNotificationEnabled,
    });
    if (isFunction(onClose)) {
      onClose();
    }
  };

  const { data } = useGetUserWeb2Email();
  const methods = useForm<PayLoad>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      emailAddress: "",
      isNotificationEnabled: false,
    },
  });

  useEffect(() => {
    if (data && data.emailAddress) {
      onOpen();
      methods.setValue("emailAddress", data.emailAddress);
      methods.setValue("isNotificationEnabled", data.isNotificationEnabled);
    }
  }, [data, methods, onOpen]);

  const id = useId();
  return (
    <Modal isCentered size={"md"} {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader>
          {`${isEditMode ? "Update" : "Add"} email`}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <FormProvider {...methods}>
            <Flex
              as="form"
              id={id}
              onSubmit={methods.handleSubmit(onSubmitHandler)}
              position={"relative"}
            >
              {isPending && (
                <Flex
                  position={"absolute"}
                  zIndex={1}
                  inset={0}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Spinner />
                </Flex>
              )}
              <VStack gap={2} w="100%">
                <FieldWrapper
                  label="Email"
                  id="emailAddress"
                  name="emailAddress"
                  hasPadding={!1}
                >
                  <Input
                    placeholder="Email"
                    {...methods.register("emailAddress", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </FieldWrapper>
                <Flex w="100%">
                  <FormControl display="flex" alignItems="center" w="100%">
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Enable alert
                    </FormLabel>
                    <Switch
                      size={"lg"}
                      id="email-alerts"
                      colorScheme="green"
                      isChecked={methods.watch("isNotificationEnabled")}
                      onChange={(e) =>
                        methods.setValue(
                          "isNotificationEnabled",
                          e.target.checked
                        )
                      }
                    />
                  </FormControl>
                </Flex>
              </VStack>
            </Flex>
          </FormProvider>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button size={"sm"} onClick={onClose}>
            Cancel
          </Button>
          <Button size={"sm"} variant="green" type="submit" form={id}>
            {isEditMode ? "Update" : "Add Email"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import { Flex, Icon } from "@chakra-ui/react";
import { ComposerLegacy } from "@components/Composer/Legacy";
import { MultiMailLoader } from "@components/MultiMailLoader";
import { useComposer } from "@hooks/useComposer";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { ComposerFormInputs } from "src/types";

const initialValues = {
  to: [],
  subject: "",
  body: "",
  files: [],
};

export const Composer: React.FC = () => {
  const {
    isOpen,
    composerCollapsed,
    minimize,
    composerMinimised,
    expand,
    onClose,
  } = useComposer();
  const methods = useForm<ComposerFormInputs>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      ...initialValues,
      to: [],
    },
  });

  const clickAwayHandler = () => {
    if (
      methods.getValues().body?.trim() ||
      methods.getValues().subject?.trim() ||
      methods.getValues().to?.length > 0 ||
      methods.getValues().files?.length > 0 ||
      methods.getValues().solanaPay
    ) {
      minimize();
    } else {
      onClose();
    }
  };
  return (
    <FormProvider {...methods}>
      {isOpen && (
        <>
          {!composerCollapsed && !composerMinimised && (
            <>
              <Flex
                position={"absolute"}
                bg="rgba(0,0,0,.6)"
                backdropFilter={"blur(2px)"}
                inset={0}
                zIndex={100}
                onClick={clickAwayHandler}
              ></Flex>
            </>
          )}

          <Flex
            position={"fixed"}
            zIndex={500}
            right={{
              base: 0,
              md: 100,
            }}
            bottom={0}
            borderTopRadius={8}
            maxW={550}
            bg="surface.700"
            w="full"
            alignItems={"flex-end"}
          >
            {composerMinimised && (
              <Flex
                p={5}
                alignItems={"center"}
                justifyContent={"space-between"}
                w="100%"
                cursor={"pointer"}
                transition={"all ease .2s"}
                data-group
                onClick={expand}
                _hover={{
                  pb: 8,
                }}
              >
                <Flex direction={"column"} w="100%">
                  <Flex fontWeight={"bold"} color={"red.500"}>
                    Draft
                  </Flex>
                  {methods.getValues().subject && (
                    <Flex
                      opacity={0.6}
                      maxW={"70%"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      display={"inline-block"}
                      fontSize={13}
                      w="100%"
                    >
                      {methods.getValues().subject}
                    </Flex>
                  )}
                </Flex>
                <Flex>
                  <Icon
                    _groupHover={{
                      opacity: 0.5,
                    }}
                    fontSize={20}
                    as={AiOutlineExpandAlt}
                  />
                </Flex>
              </Flex>
            )}
            <ComposerLegacy />
            {composerCollapsed && <MultiMailLoader />}
          </Flex>
        </>
      )}
    </FormProvider>
  );
};

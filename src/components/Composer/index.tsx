import { Flex, Icon } from "@chakra-ui/react";
import { ComposerLegacy } from "@components/Composer/Legacy";
import { MultiMailLoader } from "@components/MultiMailLoader";
import { useComposer } from "@hooks/useComposer";
import { AiOutlineExpandAlt } from "react-icons/ai";

export const Composer: React.FC = () => {
  const { isOpen, composerCollapsed, minimize, composerMinimised, expand } =
    useComposer();

  return (
    <>
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
                onClick={minimize}
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
                <Flex fontWeight={"bold"} color={"red.500"}>
                  Draft
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
    </>
  );
};

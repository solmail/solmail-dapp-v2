import { Flex, Spinner } from "@chakra-ui/react";
import { SegmentedCircularLoader } from "@components/SegmentLoader";
import { useComposer } from "@hooks/useComposer";

export const MultiMailLoader: React.FC = () => {
  const { composerProgress, composerState } = useComposer();
  const progress = composerProgress.current / composerProgress.total;
  const hasSegmentLoader = !!(
    composerProgress.total && composerProgress.total > 1
  );
  return (
    <Flex
      bg="surface.600"
      borderRadius={10}
      w="90%"
      maxW={300}
      position={"fixed"}
      bottom={50}
      right={50}
      p={4}
      direction={"row"}
      gap={3}
    >
      <Flex alignItems={"center"}>
        {hasSegmentLoader && (
          <SegmentedCircularLoader
            segments={composerProgress.total}
            progress={progress}
            spin={!1}
            snapToSegments={!0}
            thickness={5}
            size={40}
            activeColor="green.500"
            trackColor="gray.300"
            gapAngle={
              composerProgress.total && composerProgress.total > 0 ? 30 : 2
            }
          />
        )}

        {!hasSegmentLoader && (
          <Spinner color="green.500" thickness={"5px"} boxSize={"40px"} />
        )}
      </Flex>
      <Flex flex={"auto"} direction={"column"} justifyContent={"center"}>
        <Flex color={"solana.end"} fontWeight={"bold"}>
          Sending mail
          {composerProgress.total > 1
            ? ` ${composerProgress.current}/${composerProgress.total}`
            : ""}
        </Flex>
        <Flex fontSize={13}>{composerState}</Flex>
      </Flex>
    </Flex>
  );
};

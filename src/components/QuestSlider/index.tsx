import { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { SegmentedCircularLoader } from "@components/SegmentLoader";

const SLIDES = [
  {
    label: "Invite 20 friends",
    count: "5/20",
    progress: 5 / 20,
    id: 1,
  },
  {
    label: "Sent 50 emails",
    count: "30/50",
    progress: 30 / 50,
    id: 2,
  },
];
export const QuestSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <Flex
      position="relative"
      overflow="hidden"
      w="full"
      maxW="350px"
      mx="auto"
      align="center"
      justify="center"
      flex={"auto"}
    >
      <IconButton
        aria-label="Previous Slide"
        icon={<IoIosArrowDropleft />}
        onClick={prevSlide}
        position="absolute"
        left={2}
        zIndex={2}
        size="sm"
        bg="transparent !important"
        fontSize={20}
        _hover={{
          opacity: 0.5,
        }}
      />

      <Flex
        w="full"
        transform={`translateX(-${currentIndex * 100}%)`}
        transition="transform 0.4s ease"
      >
        {SLIDES.map((quest) => (
          <Flex
            key={quest.id.toString()}
            flex="0 0 100%"
            px={4}
            alignItems={"center"}
            justifyContent={"center"}
            direction={"column"}
          >
            <SegmentedCircularLoader
              segments={100}
              progress={quest.progress}
              spin={!1}
              snapToSegments={!0}
              thickness={8}
              size={100}
              activeColor="solana.middle"
              trackColor="gray.700"
              gapAngle={0}
              label={quest.count}
            />
            <Flex fontWeight={"medium"} py={2} mt={2}>
              {quest.label}
            </Flex>
          </Flex>
        ))}
      </Flex>

      <IconButton
        aria-label="Next Slide"
        icon={<IoIosArrowDropright />}
        onClick={nextSlide}
        position="absolute"
        right={2}
        zIndex={2}
        size="sm"
        bg="transparent !important"
        fontSize={20}
        _hover={{
          opacity: 0.5,
        }}
      />
    </Flex>
  );
};

export const Quests = () => {
  return (
    <Flex direction={"column"} minH={250} maxH={250}>
      <Flex
        justifyContent={"space-between"}
        px={5}
        py={3}
        flex={"auto"}
        alignItems={"center"}
        maxH={"70"}
      >
        <Flex fontWeight={"bold"} fontSize={20}>
          Quests
        </Flex>
        <Flex>Referral</Flex>
      </Flex>
      <QuestSlider />
    </Flex>
  );
};

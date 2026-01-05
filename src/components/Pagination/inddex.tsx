import { Button, Flex } from "@chakra-ui/react";

type PaginationProps = {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  page: number;
  pages: number;
};
export const Pagination: React.FC<PaginationProps> = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  page,
  pages,
}) => {
  return (
    <Flex
      direction={"column"}
      px={5}
      alignItems={"center"}
      pt={3}
      borderTop={"solid 1px"}
      borderTopColor={"surface.900"}
      w="100%"
    >
      <Flex gap={1}>
        <Button onClick={onPrev} isDisabled={!hasPrev} size={"sm"}>
          Prev
        </Button>

        <Button onClick={onNext} isDisabled={!hasNext} size={"sm"}>
          Next
        </Button>
      </Flex>
      <Flex fontSize={12} mt={1} mb={1} opacity={0.6}>
        Page {page} of {pages}
      </Flex>
    </Flex>
  );
};

import { Box } from "@chakra-ui/react";

import { SharedAddress } from "@components/SharedAddress";

export const ReceiveScreen: React.FC = () => {
  return (
    <Box w="100%" bg="surface.800" p={5} borderRadius={5}>
      <SharedAddress />
    </Box>
  );
};

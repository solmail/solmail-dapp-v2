import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const primary = definePartsStyle({
  overlay: {
    backdropFilter: "blur(2px)",
  },

  dialog: {
    borderRadius: "5px",
    bg: "surface.900",
    w: "90%",
  },
});

const secondary = definePartsStyle({
  overlay: {
    backdropFilter: "blur(2px)",
  },
  dialog: {
    borderRadius: "5px",
    bg: "light.100",
    color: "dark.100",
    w: "90%",
  },
});

export const Modal = defineMultiStyleConfig({
  variants: { primary, secondary },
  defaultProps: {
    variant: "primary",
  },
});

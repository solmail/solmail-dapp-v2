import { useBreakpointValue } from "@chakra-ui/react";
import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ToastContainerWrapper: React.FC = () => {
  const position =
    useBreakpointValue<ToastPosition>({
      base: "bottom-center",
      md: "top-right",
    }) ?? "bottom-center";
  return (
    <ToastContainer
      hideProgressBar
      theme="dark"
      autoClose={4500}
      position={position}
    />
  );
};

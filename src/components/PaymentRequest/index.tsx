import {
  Button,
  chakra,
  Flex,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { SolanaPay } from "@components/SolanaPay";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useToken } from "@hooks/useToken";

import { type PaymentConfig } from "src/types";

import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSolanaPayLogo } from "@hooks/useSolanaPayLogo";
import { usePaymentStatus } from "@hooks/usePaymentStatus";
const PymentButton: React.FC<PaymentConfig> = ({ ...props }) => {
  const SolanaPayLogo = useSolanaPayLogo();
  const { id } = useMailBoxContext();
  const { mail } = useMailBody(id);
  const { amount, tokenaddress } = props;
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: !1 });
  const { address } = usePrivyWallet();
  const { data: isDone, isLoading } = usePaymentStatus(id, props);

  const openPayment = () => {
    if (mail && mail.from && mail.from.toString() !== address) {
      onOpen();
    }
  };

  const { symbol } = useToken(tokenaddress ?? "");
  const isPaymentRequested =
    mail && mail?.from?.toString() === address.toString();

  return (
    <>
      <Button size={"sm"} onClick={openPayment}>
        {isLoading && <Spinner size={"sm"} mr={2} />}
        <Image mr={1} src={SolanaPayLogo} w="50px" />
        {`${amount} ${symbol}`}
        {isDone && (
          <chakra.span
            bg="green.500"
            fontSize={12}
            px={2}
            py={"2px"}
            borderRadius={15}
            ml={2}
          >
            {!isPaymentRequested ? "Payment Done" : "Payment Received"}
          </chakra.span>
        )}
      </Button>

      <SolanaPay
        isOpen={isOpen}
        onClose={onClose}
        amount={props.amount}
        message={props.message}
        recipient={props.recipient}
        tokenaddress={props.tokenaddress ?? ""}
      />
    </>
  );
};
export const PaymentRequests: React.FC = () => {
  const { id } = useMailBoxContext();
  const { payments } = useMailBody(id);

  return (
    <Flex direction={"row"} flexWrap={"wrap"} my={2}>
      {payments.map((item, index) => {
        return <PymentButton key={index} {...item} />;
      })}
    </Flex>
  );
};

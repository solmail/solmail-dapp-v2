import { useQuery } from "@tanstack/react-query";
import { PaymentConfig, QueryKeys } from "src/types";
import { useSolanaPayReference } from "./useSolanaPayReference";
import { findReference, validateTransfer } from "@solana/pay";
import { useSolanaConnection } from "@hooks/useConnection";
import { PublicKey } from "@solana/web3.js";
import { useToken } from "@hooks/useToken";
import { useDisclosure } from "@chakra-ui/react";
import BigNumber from "bignumber.js";

export const usePaymentStatus = (
  id: string | undefined,
  { amount, recipient, tokenaddress }: PaymentConfig
) => {
  const connection = useSolanaConnection();
  const reference = useSolanaPayReference(id);
  const { symbol, address } = useToken(tokenaddress ?? "");
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: !0 });
  const query = useQuery({
    queryKey: [QueryKeys.PAYMENT_STATUS, reference?.toString()],
    queryFn: async () => {
      if (!reference) {
        return !1;
      }
      try {
        const amountBigint = new BigNumber(amount);
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        });

        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: new PublicKey(recipient),
            amount: amountBigint,
            reference,
            ...(symbol !== "SOL" ? { splToken: new PublicKey(address) } : {}),
          },
          { commitment: "confirmed" }
        );
        onClose();
        return !0;
      } catch {
        return !1;
      }
    },
    enabled: !!(id && isOpen),
    refetchInterval: 10000,
  });

  return query;
};

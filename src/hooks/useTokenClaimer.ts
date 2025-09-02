import { useMutation } from "@tanstack/react-query";
import { usePrivyWallet } from "./usePrivyWallet";
import { QueryKeys } from "src/types";
import { useSignTransaction } from "@privy-io/react-auth/solana";
import { useSolanaConnection } from "./useConnection";
import { useToast } from "./useToast";
import { useHttp } from "./useHttp";
import { VersionedTransaction } from "@solana/web3.js";
import { useProfile } from "./useProfile";
import { getErrorMessage } from "@utils/error/getErrorMessage";

export const useTokenClaimer = () => {
  const { fetch } = useHttp();
  const { address } = usePrivyWallet();
  const { signTransaction } = useSignTransaction();
  const connection = useSolanaConnection();
  const { refetch } = useProfile();
  const { showToast } = useToast();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_MAIL_TOKEN_CLAIM],
    mutationFn: async () => {
      const { data } = await fetch<any>("/rewards/claim-transaction", "POST", {
        token: "mail",
        wallet: address,
      });

      console.log(data);
      if (data && data.transaction) {
        const obj = data?.transaction;

        if (!obj || typeof obj !== "object") {
          throw new Error("Invalid transaction format");
        }

        const keys = Object.keys(obj)
          .map(Number)
          .sort((a, b) => a - b);

        const bytes = Uint8Array.from(keys.map((key) => obj[key]));

        const tx = VersionedTransaction.deserialize(bytes);

        const signedTransaction = await signTransaction({
          transaction: tx,
          connection: connection,
          uiOptions: {
            showWalletUIs: !1,
          },
        });

        const serializedSignedTransaction = signedTransaction.serialize();

        const transactionObject: any = {};
        serializedSignedTransaction.forEach((byte, index) => {
          transactionObject[index] = byte;
        });

        const executionPayload = {
          token: "mail",
          wallet: address,
          instruction: transactionObject,
        };

        await fetch("/rewards/confirm-transaction", "POST", executionPayload);
        return !0;
      }
    },
    onSuccess: () => {
      refetch();
      showToast("Token claimed successfully", {
        type: "success",
      });
    },
    onError: (e) => {
      refetch();
      showToast(getErrorMessage(e, "Failed to claim token"), {
        type: "success",
      });
    },
  });
};

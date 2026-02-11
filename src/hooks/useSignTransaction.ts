import { useSignTransaction as useSignTransactionPrivy } from "@privy-io/react-auth/solana";
import { usePrivyWallet } from "./usePrivyWallet";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

type Args = {
  transaction: VersionedTransaction;
  connection: Connection;
};
export const useSignTransaction = () => {
  const { isPrivy, isConnected } = usePrivyWallet();
  const { signTransaction: sign } = useWallet();
  const { signTransaction } = useSignTransactionPrivy();
  const onSignTransaction = async ({ transaction, connection }: Args) => {
    if (isPrivy) {
      return signTransaction({
        transaction: transaction,
        connection: connection,
        uiOptions: {
          showWalletUIs: !1,
        },
      });
    } else {
      return sign!(transaction);
    }
  };
  return {
    signTransaction: onSignTransaction,
    isConnected,
  };
};

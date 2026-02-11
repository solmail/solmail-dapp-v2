import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useEmbeddedWallet } from "./useEmbeddedWallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { isFunction } from "lodash";
import { useSignMessage } from "@privy-io/react-auth/solana";
import { useSendTransaction } from "@privy-io/react-auth/solana";

export const usePrivyWallet = () => {
  const {
    connected,
    connecting,
    signMessage: adapterSign,
    publicKey,
    wallet: adapterWallet,
    disconnect,
    connect,
    sendTransaction,
  } = useWallet();
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { signMessage } = useSignMessage();
  const { exportWallet: _export } = useSolanaWallets();
  const wallet = useEmbeddedWallet();
  const { sendTransaction: privySend } = useSendTransaction();

  const exportWallet = () => {
    _export({
      address: wallet?.address ?? "",
    });
  };

  type AdapterSignerWrapper = {
    message: Uint8Array<ArrayBufferLike>;
  };
  const _signMessage = ({ message }: AdapterSignerWrapper) => {
    if (adapterSign && isFunction(adapterSign)) {
      return adapterSign(message);
    } else {
      return signMessage({
        message: message as any,
      });
    }
  };

  const _sendTransaction = (
    transaction: any,
    connection: any,
    config?: any,
  ) => {
    if (privySend && !connected) {
      return privySend({ transaction, connection });
    } else {
      return sendTransaction(transaction, connection, config || {});
    }
  };
  if (connected) {
    return {
      isConnecting: connecting,
      isConnected: connected,
      login: () => connect,
      logout: () => disconnect,
      signMessage: _signMessage,
      ready: !0,
      address: publicKey?.toString() ?? "",
      wallet: adapterWallet,
      exportWallet: () => {},
      isPrivy: !1,
      sendTransaction: _sendTransaction,
    };
  }
  return {
    isConnecting: !ready,
    isConnected: authenticated,
    login,
    logout,
    signMessage: _signMessage,
    ready,
    user,
    address: wallet?.address ?? "",
    wallet: wallet,
    exportWallet,
    isPrivy: !0,
    sendTransaction: _sendTransaction,
  };
};

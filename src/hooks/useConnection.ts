import { useMemo } from "react";
import { Connection } from "@solana/web3.js";
import { RPC_ENDPOINT } from "@const/config";

let cachedConnection: Connection | null = null;

export function useSolanaConnection(alwaysUseMainnet: boolean = !1) {
  const RPC = alwaysUseMainnet
    ? RPC_ENDPOINT.replace("devnet", "mainnet")
    : RPC_ENDPOINT;
  const connection = useMemo(() => {
    if (alwaysUseMainnet) {
      return new Connection(RPC, {
        commitment: "confirmed",
      });
    }
    if (!cachedConnection) {
      cachedConnection = new Connection(RPC, {
        commitment: "confirmed",
      });
    }
    return cachedConnection;
  }, [RPC, alwaysUseMainnet]);

  return connection;
}

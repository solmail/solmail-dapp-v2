import { QueryKeys } from "src/types";
import { useSolanaConnection } from "./useConnection";
import { usePrivyWallet } from "./usePrivyWallet";
import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token";
import { useGetJupiterTokenById } from "./useGetJupTokenById";
import { useMemo } from "react";
import { formatTokenBalance } from "@utils/formating";
export const useJupiterBalance = (tokenMint?: string) => {
  const { token } = useGetJupiterTokenById(tokenMint);
  const { wallet } = usePrivyWallet();
  const connection = useSolanaConnection(!0);

  const enabled = !!wallet?.address;

  const query = useQuery({
    queryKey: [QueryKeys.JUPITER_SOL_BALANCE, wallet?.address, tokenMint],
    queryFn: async () => {
      if (!connection) {
        return 0;
      }
      if (!wallet?.address) throw new Error("Wallet not connected");

      const owner = new PublicKey(wallet.address);

      if (!tokenMint || tokenMint === NATIVE_MINT.toString()) {
        return connection.getBalance(owner);
      }
      try {
        const mint = new PublicKey(tokenMint);
        const ata = await getAssociatedTokenAddress(mint, owner);
        const tokenAccount = await connection.getTokenAccountBalance(ata);

        return parseFloat(tokenAccount.value.amount);
      } catch {
        return 0;
      }
    },
    enabled,
    refetchOnWindowFocus: true,
  });

  const formatted = useMemo(
    () =>
      formatTokenBalance({
        rawAmount: query.data ?? 0,
        mintDecimals: token?.decimals ?? 9,
        compact: !0,
        suffix: token?.symbol ?? "",
      }),
    [query.data, token?.decimals, token?.symbol]
  );
  return { formatted, ...query };
};

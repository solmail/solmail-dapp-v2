import { useQuery } from "@tanstack/react-query";
import { useSolanaConnection } from "./useConnection";
import { usePrivyWallet } from "./usePrivyWallet";
import { QueryKeys } from "src/types";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { formatTokenBalance, toRawAmount } from "@utils/formating";
import { useToken } from "./useToken";
import { useMemo } from "react";
import BigNumber from "bignumber.js";
import { useEstimatedFee } from "./useEstimatedFee";

type Args = {
  tokenMint?: string;
  requestedAmount: string | number;
};
export const useBalance = (options?: Args) => {
  const { tokenMint, requestedAmount = 0 } = options || {};
  const { wallet } = usePrivyWallet();
  const connection = useSolanaConnection();
  const { symbol, decimals } = useToken(tokenMint);
  const { fee } = useEstimatedFee();

  const enabled = !!wallet?.address;

  const { data, isFetching, refetch, isRefetching, isFetched, isLoading } =
    useQuery({
      queryKey: [QueryKeys.SOL_BALANCE, wallet?.address, tokenMint],
      queryFn: async () => {
        if (!wallet?.address) throw new Error("Wallet not connected");

        const owner = new PublicKey(wallet.address);

        if (!tokenMint) {
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

  const hasEnoughBalance = useMemo(() => {
    if (!data) return !1;
    const amount = requestedAmount
      ? toRawAmount(requestedAmount, decimals)
      : toRawAmount("0", decimals);
    const balance = new BigNumber(data);

    if (symbol !== "SOL") {
      return balance.gte(amount);
    }
    if (balance.minus(fee).lt(amount)) {
      return !1;
    }

    return !0;
  }, [data, decimals, fee, requestedAmount, symbol]);

  return {
    data,
    hasEnoughBalance,
    isFetching,
    refetch,
    isRefetching,
    isLoading,
    isFetched,

    formattedBalance: formatTokenBalance({
      rawAmount: data ?? 0,
      mintDecimals: decimals,
      suffix: symbol,
    }),
  };
};

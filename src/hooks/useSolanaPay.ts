import { createTransfer, parseURL, type TransferRequestURL } from "@solana/pay";

import { useCallback, useTransition } from "react";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { useSolanaConnection } from "./useConnection";
import { usePrivyWallet } from "./usePrivyWallet";
import { useToast } from "./useToast";
import { PublicKey, Transaction } from "@solana/web3.js";

import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { toRawAmount } from "@utils/formating";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "src/types";

type Options = {
  ref: PublicKey | null;
  qrUrl: URL | null;
  onSuccess?: () => void;
  onError?: (e: Error) => void;

  decimals: number;
  splToken?: string;
};
const _ERROR = "Failed to transfer amount";
export const useSolanaPay = ({
  qrUrl,
  onSuccess,
  onError,

  decimals,
}: Options) => {
  const { provider } = useGetMailProgramInstance();
  const { isConnected: connected, sendTransaction: send } = usePrivyWallet();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const connection = useSolanaConnection();
  const { showToast } = useToast();

  const sendTransaction = useCallback(async () => {
    if (
      isPending ||
      !qrUrl ||
      !provider ||
      !send ||
      !connection ||
      !connected
    ) {
      return !0;
    }

    const { recipient, amount, reference, splToken } = parseURL(
      qrUrl,
    ) as TransferRequestURL;

    if (!amount) return;

    startTransition(async () => {
      try {
        let transaction: Transaction;

        if (splToken) {
          const fromTokenAccount = await getAssociatedTokenAddress(
            splToken,
            provider.publicKey,
          );
          const toTokenAccount = await getAssociatedTokenAddress(
            splToken,
            recipient,
          );

          const tx = new Transaction();

          const ataInfo = await connection.getAccountInfo(toTokenAccount);
          if (!ataInfo) {
            const createATAIx = createAssociatedTokenAccountInstruction(
              provider.publicKey,
              toTokenAccount,
              recipient,
              splToken,
            );
            tx.add(createATAIx);
          }

          const transferIx = createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            provider.publicKey,
            Number(toRawAmount(amount.toString(), decimals)),
          );

          if (reference) {
            if (Array.isArray(reference)) {
              reference.forEach((ref) =>
                transferIx.keys.push({
                  pubkey: ref,
                  isSigner: false,
                  isWritable: false,
                }),
              );
            } else {
              transferIx.keys.push({
                pubkey: reference,
                isSigner: false,
                isWritable: false,
              });
            }
          }

          tx.add(transferIx);
          transaction = tx;
        } else {
          transaction = await createTransfer(
            connection,
            provider.publicKey,
            {
              recipient,
              amount,
              reference,
            },
            { commitment: "confirmed" },
          );
        }

        const { blockhash } = await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = provider.publicKey;
        await send(transaction, connection, {
          skipPreflight: false,
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.PAYMENT_STATUS, reference?.toString()],
        });

        showToast("Successfully transferred", { type: "success" });
        onSuccess?.();
      } catch (E) {
        showToast(_ERROR, { type: "error" });
        onError?.(E instanceof Error ? E : new Error(_ERROR));
      }
    });
  }, [
    connected,
    connection,
    decimals,
    isPending,
    onError,
    onSuccess,
    provider,
    qrUrl,
    queryClient,
    send,
    showToast,
  ]);

  return {
    sendTransaction,
    isPending,
  };
};

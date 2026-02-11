import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, type Idl } from "@coral-xyz/anchor";

import { useMemo } from "react";

import { useSolanaConnection } from "./useConnection";
import { useEmbeddedWallet } from "./useEmbeddedWallet";
import { usePrivyWallet } from "./usePrivyWallet";
import { useWallet } from "@solana/wallet-adapter-react";

export const useGetProgramInstance = <T extends Idl>(IDL: T) => {
  const { address, isConnected, isPrivy } = usePrivyWallet();
  const wallet = useEmbeddedWallet();
  const walletWeb3 = useWallet();
  const connection = useSolanaConnection();
  return useMemo(() => {
    if (!isConnected || !address) {
      return {
        provider: null,
        program: null,
        mailAccountAddress: null,
      };
    }
    let provider;
    if (isPrivy && wallet) {
      provider = new AnchorProvider(
        connection,
        {
          publicKey: new PublicKey(wallet.address),
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        },
        { commitment: "processed" },
      );
    } else {
      provider = new AnchorProvider(connection, walletWeb3 as any, {
        commitment: "processed",
      });
    }

    const programID = new PublicKey(IDL.address);
    const [mailAccountAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("mail-accountv2"), new PublicKey(address).toBuffer()],
      programID,
    );

    const program = new Program<T>(IDL as T, provider);

    return {
      provider,
      program,
      mailAccountAddress,
    };
  }, [IDL, address, connection, isConnected, isPrivy, wallet, walletWeb3]);
};

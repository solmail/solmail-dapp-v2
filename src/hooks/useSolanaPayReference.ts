import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

export const useSolanaPayReference = (id: string | PublicKey | undefined) => {
  const [reference, setReference] = useState<PublicKey | null>(null);
  const generateKey = useCallback(async () => {
    if (!id) return null;
    try {
      const reference = await PublicKey.createWithSeed(
        new PublicKey(id ?? ""),
        "SolmailSolanaPay",
        SystemProgram.programId
      );
      setReference(reference);
    } catch {
      setReference(null);
    }
  }, [id]);

  useEffect(() => {
    generateKey();
  }, [generateKey]);
  return reference;
};

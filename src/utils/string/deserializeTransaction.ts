import { VersionedTransaction } from "@solana/web3.js";

export const deserializeTxFromBase64 = (base64Tx: string) => {
  const txBytes = Buffer.from(base64Tx, "base64");
  const tx = VersionedTransaction.deserialize(txBytes);
  return tx;
};

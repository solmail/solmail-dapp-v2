import { Button, Flex } from "@chakra-ui/react";
import { useSolanaConnection } from "@hooks/useConnection";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSignTransaction } from "@privy-io/react-auth/solana";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export const SeekerTest: React.FC = () => {
  const { program } = useGetMailProgramInstance();
  const { address } = usePrivyWallet();
  const { signTransaction } = useSignTransaction();

  const connection = useSolanaConnection();
  const test = async () => {
    if (!program || !connection) return;
    const phantom = (window as any).solana;
    if (!phantom?.isPhantom) throw new Error("Phantom wallet not found");

    await phantom.connect();

    const authority = new PublicKey(address);
    const domainOwner = phantom.publicKey;

    // 3️⃣ Derive PDAs (replace seeds with your actual logic)
    const username = "abs";
    const [usernameAccount] = await PublicKey.findProgramAddress(
      [Buffer.from("username"), Buffer.from(username), Buffer.from("sol.mail")],
      program.programId
    );
    const [rateLimit] = await PublicKey.findProgramAddress(
      [Buffer.from("rate_limit"), authority.toBuffer()],
      program.programId
    );
    const [marketplaceSettings] = await PublicKey.findProgramAddress(
      [Buffer.from("marketplace_settings")],
      program.programId
    );

    const skrDomainAccount = new PublicKey(
      "12vVtYuHfVWfrXiUbBWvCi9dCw6LSw9PXGQ7KXXTGEA"
    );

    // 2️⃣ Build instruction that needs both signers
    const instruction = await program.methods
      .createUsernameSeeker("abs")
      .accounts({
        authority,
        domainOwner,
        usernameAccount: usernameAccount,
        rateLimit: rateLimit,
        marketplaceSettings: marketplaceSettings,
        skrDomainAccount: skrDomainAccount,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    // 3️⃣ Build transaction
    const tx = new Transaction().add(instruction);
    tx.feePayer = authority;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // 4️⃣ Privy signs first
    const privySignedTx = await signTransaction({
      connection,
      transaction: tx,
      uiOptions: {
        showWalletUIs: !1,
      },
    });

    const phantomSignedTx = await phantom.signTransaction(privySignedTx);
    console.log(phantomSignedTx);
    const txid = await connection.sendRawTransaction(
      phantomSignedTx.serialize()
    );

    await connection.confirmTransaction(txid, "confirmed");
  };

  return (
    <Flex>
      <Button onClick={test}>Test</Button>
    </Flex>
  );
};

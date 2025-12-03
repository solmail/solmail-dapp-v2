import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { PublicKey } from "@solana/web3.js";

import { usePrivyWallet } from "./usePrivyWallet";
import { DOMAINS } from "@const/domain";
import { useUsernameUpdateStatus } from "@hooks/useUsername";
import { useUsernameUpdater } from "@hooks/useUsernames";

export const useLinkUsernameToCompressedMailbox = () => {
  const { program } = useGetMailProgramInstance();
  const { address } = usePrivyWallet();
  const { updateStatus } = useUsernameUpdateStatus();
  const { refetch } = useUsernameUpdater();

  return useMutation({
    mutationKey: [QueryKeys.MUTATION_LINK_USERNAME_TO_COMPRESSED_MAIL],
    mutationFn: async ({
      username,
      unlink,
    }: {
      username?: string;
      unlink?: string | undefined;
    }) => {
      if (!program || !username) {
        return;
      }

      updateStatus(!0);

      let _unlinkPda: PublicKey | null = null;
      if (unlink) {
        const [unlink_pda] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("username"),
            Buffer.from(username.toLowerCase()),
            Buffer.from(DOMAINS.DEFAULT.slice(1)),
          ],
          program.programId
        );
        _unlinkPda = unlink_pda;
        console.log(_unlinkPda, "_unlinkPda");
      }

      const [usernameAccountPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("username"),
          Buffer.from(username.toLowerCase()),
          Buffer.from(DOMAINS.DEFAULT.slice(1)),
        ],
        program.programId
      );

      await program.methods
        .linkCompressedMailboxToUsername(new PublicKey(address))
        .accounts({
          usernameAccount: usernameAccountPDA,
          authority: new PublicKey(address),
        })
        .rpc();
    },
    onError: () => {
      updateStatus(!1);
      refetch();
    },
    onSuccess: () => {
      updateStatus(!1);
      refetch();
    },
  });
};

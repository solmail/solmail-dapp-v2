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
      isUnlinkOnly = !1,
    }: {
      username?: string;
      unlink?: string | null;
      isUnlinkOnly?: boolean;
    }) => {
      if (!program || !username) {
        return;
      }

      updateStatus(!0);

      let _unlinkPda: PublicKey | null = null;
      if (unlink && !isUnlinkOnly) {
        const [unlink_pda] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("username"),
            Buffer.from(unlink.toLowerCase()),
            Buffer.from(DOMAINS.DEFAULT.slice(1)),
          ],
          program.programId
        );
        _unlinkPda = unlink_pda;
      }

      const [usernameAccountPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("username"),
          Buffer.from(username.toLowerCase()),
          Buffer.from(DOMAINS.DEFAULT.slice(1)),
        ],
        program.programId
      );
      if (!isUnlinkOnly) {
        await program.methods
          .linkUnlinkCompressedMailboxToUsername(new PublicKey(address))
          .accounts({
            newUsernameAccount: usernameAccountPDA,
            authority: new PublicKey(address),
            oldUsernameAccount: _unlinkPda,
          })
          .rpc();
      } else {
        await program.methods
          .unlinkCompressedMailboxFromUsername()
          .accounts({
            usernameAccount: usernameAccountPDA,
            authority: new PublicKey(address),
          })
          .rpc();
      }
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

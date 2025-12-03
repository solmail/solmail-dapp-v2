import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { PublicKey } from "@solana/web3.js";
import { useLightRpc } from "@hooks/useLightRpc";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import {
  deriveAddress,
  deriveAddressSeed,
  getDefaultAddressTreeInfo,
} from "@lightprotocol/stateless.js";
import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const useGetCompressedAccountStatus = () => {
  const { address } = usePrivyWallet();
  const lightRpc = useLightRpc();
  const { program } = useGetMailProgramInstance();
  const { isOpen, onOpen } = useDisclosure();
  const query = useQuery<Promise<boolean>>({
    queryKey: [QueryKeys.COMPRESSED_ACCOUNT, address],
    queryFn: async () => {
      if (!address || !program) {
        return !1;
      }

      try {
        const addressTreeInfo = getDefaultAddressTreeInfo();

        const addressSeed = deriveAddressSeed(
          [Buffer.from("mail-accountv2"), new PublicKey(address).toBuffer()],
          program.programId
        );

        const registeredAddress = deriveAddress(
          addressSeed,
          addressTreeInfo.tree
        );

        const _address = new PublicKey(address ?? "");

        const compressedAccount = await lightRpc.getCompressedAccount(
          Array.from(registeredAddress.toBytes())
        );

        if (!compressedAccount || !compressedAccount.data) {
          return !1;
        }

        const accountData = program.coder.types.decode(
          "compressedSolMailAccountData",
          Buffer.from(compressedAccount.data.data)
        );

        if (accountData.authority.toString() !== _address.toString()) {
          return !1;
        }

        if (!accountData.mailbox) {
          return !1;
        }

        if (accountData.mailbox.toString() !== _address.toString()) {
          return !1;
        }

        return !0;
      } catch {
        return !1;
      }
    },
    enabled: !isOpen,
  });

  useEffect(() => {
    if (!isOpen && query.data) {
      onOpen();
    }
  }, [isOpen, onOpen, query.data]);

  return {
    ...query,
  };
};

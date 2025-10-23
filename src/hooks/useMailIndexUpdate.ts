import {
  MailBoxLabels,
  MailLabelIndex,
  QueryKeys,
  type FetchAllMailsResult,
} from "src/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSolanaConnection } from "./useConnection";
import { PublicKey } from "@solana/web3.js";

import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { awaitTransactionSignatureConfirmation } from "@utils/transaction";
import { useToast } from "./useToast";
import { getErrorMessage } from "@utils/error/getErrorMessage";
import { dispatchCustomEvent, EventTypes } from "@utils/event";
import { useMailBoxContext } from "./useMailBoxContext";
import { useNavigate } from "@tanstack/react-router";

type Args = {
  index: MailLabelIndex;
};

export const useLabelIndexUpdate = (id: string) => {
  const { provider, program } = useGetMailProgramInstance();
  const connection = useSolanaConnection();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { context } = useMailBoxContext();
  const navigate = useNavigate({ from: `/u/solmail/${context}/$id` });

  const redirect = () => {
    navigate({ to: `/u/solmail/${context}/all` });
  };
  const clear = () => {
    queryClient.setQueryData(
      [QueryKeys.MAILBOX, MailBoxLabels.inbox],
      (data: FetchAllMailsResult) => {
        if (!data) return [];
        return data.filter((item) => item.publicKey?.toString() !== id);
      }
    );
    queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
  };

  return useMutation({
    mutationKey: [QueryKeys.LABEL_INDEX_UPDATE, id],
    mutationFn: async ({ index }: Args) => {
      if (!program || !provider) {
        throw Error();
      }

      const trx = await program.methods
        .updatemaillabel(index)
        .accounts({
          mail: new PublicKey(id),
          authority: provider.publicKey,
        })
        .rpc();

      await awaitTransactionSignatureConfirmation(trx, connection);
      clear();
      dispatchCustomEvent({
        type: EventTypes.status_update,
      });
      redirect();
    },
    onError: (e) => {
      showToast(getErrorMessage(e, "Failed to update"), {
        type: "error",
      });
    },
  });
};

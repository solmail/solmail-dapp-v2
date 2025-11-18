import { useMutation } from "@apollo/client";
import { UPDATE_MAIL_FAV_STATUS } from "@integrations/graphql/mutation/markFav";
import { useCallback } from "react";
import { usePrivyWallet } from "./usePrivyWallet";
import {
  MailFavoriteType,
  MarkMailAsFavoriteMutation,
  MarkMailAsFavoriteMutationVariables,
} from "src/gql/graphql";
import { useMailBoxContext } from "./useMailBoxContext";
import { MailBoxLabels } from "src/types";

export const useUpdateMailFavStatus = () => {
  const [updateMailReadStatus, { data, loading, error }] = useMutation<
    MarkMailAsFavoriteMutation,
    MarkMailAsFavoriteMutationVariables
  >(UPDATE_MAIL_FAV_STATUS);
  const { address: wallet } = usePrivyWallet();
  const { context } = useMailBoxContext();
  const onUpdate = useCallback(
    async (mailId: string, status: boolean) => {
      if (mailId && typeof mailId === "string") {
        try {
          await updateMailReadStatus({
            variables: {
              isFavorite: status,
              type:
                context !== MailBoxLabels.outbox
                  ? MailFavoriteType.Inbox
                  : MailFavoriteType.Outbox,
              wallet,
              mailId,
            },
          });
        } catch {
          console.log("Failed to update status");
        }
      }
    },
    [context, updateMailReadStatus, wallet]
  );

  return {
    data,
    loading,
    error,
    onUpdate,
  };
};

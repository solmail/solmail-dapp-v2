import { useMutation } from "@apollo/client";
import { UPDATE_MAIL_READ_STATUS } from "@integrations/graphql/mutation/updateStatus";
import { useCallback } from "react";

export const useUpdateMailStatus = (id: string | undefined) => {
  const [updateMailReadStatus, { data, loading, error }] = useMutation(
    UPDATE_MAIL_READ_STATUS
  );

  const onUpdate = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        await updateMailReadStatus({
          variables: { mailId: id, markAsRead: true },
        });
      } catch {
        console.log("Failed to update status");
      }
    }
  }, [id, updateMailReadStatus]);

  return {
    data,
    loading,
    error,
    onUpdate,
  };
};

import { FormattedMailBox, MailBoxLabels, StorageVersion } from "src/types";

import { useMailBoxGraphql } from "./useMailGraphql";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { DEFAULT_MAILS_OFFSET, MAILS_PER_PAGE } from "@const/config";

import { useAtom } from "jotai";
import {
  MailListState,
  MailListStatusState,
  MailListStatus,
} from "@state/inbox";

export const useGetInbox = (type: MailBoxLabels = MailBoxLabels.inbox) => {
  const [page, setPage] = useState<number>(DEFAULT_MAILS_OFFSET);
  const [limit] = useState<number>(MAILS_PER_PAGE);
  const [count, setCount] = useState<number>(0);
  const [, set] = useAtom(MailListState);
  const [, setStatus] = useAtom(MailListStatusState);
  const { data, isLoading, refetch, isRefetching } = useMailBoxGraphql({
    type,
    offset: page * limit,
    limit,
  });

  const formattedMails = useMemo(() => {
    const mails = data?.mailsByType?.mails ?? [];
    return mails.map((mail) => {
      const [user0, user1] =
        mail.from.toString() >= mail.to.toString()
          ? [mail.from, mail.to]
          : [mail.to, mail.from];
      const encKey = `${user0.toString()}:${user1.toString()}`;

      const formattedMail: FormattedMailBox = {
        body: mail.body,
        from: new PublicKey(mail.from),
        id: mail.id,
        iv: "",
        salt: "",
        subject: mail.subject,
        to: new PublicKey(mail.to),
        encKey,
        version: StorageVersion.pinata,
        createdAt: mail.created_at,
        isV1: !1,
        user0: new PublicKey(user0),
        user1: new PublicKey(user1),
        markAsRead: !1,
        labelIdentifier: MailBoxLabels.inbox,
      };

      return formattedMail;
    });
  }, [data?.mailsByType?.mails]);

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      setCount(data?.mailsByType?.count ?? 0);
    }
  }, [data?.mailsByType?.count, isLoading, isRefetching]);
  const { pages, hasNext, hasPrev } = useMemo(() => {
    const pages = Math.ceil(count / limit);
    const hasPrev = page > 0;
    const hasNext = page + 1 < pages;

    return { pages, hasNext, hasPrev };
  }, [count, limit, page]);

  const onPrev = useCallback(() => setPage((prev) => prev - 1), [setPage]);
  const onNext = useCallback(() => setPage((prev) => prev + 1), [setPage]);
  const [placeholder, setPlaceholder] = useState<FormattedMailBox[]>([]);
  useEffect(() => {
    if (!isLoading && !isRefetching && formattedMails) {
      setPlaceholder(formattedMails);
      set(formattedMails);
    }
  }, [formattedMails, isLoading, isRefetching, set]);

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      setStatus((prev) => ({
        ...prev,
        status: MailListStatus.reday,
      }));
    } else {
      setStatus((prev) => ({
        ...prev,
        status: isRefetching ? MailListStatus.updating : MailListStatus.loading,
      }));
    }
  }, [isLoading, isRefetching, setStatus]);

  return {
    mail:
      placeholder && placeholder.length && isLoading
        ? placeholder
        : formattedMails,
    data: [],
    isLoading,
    refetch,
    isPending: isLoading && placeholder && placeholder.length > 0,
    hasNext,
    hasPrev,
    pages,
    page: page + 1,
    onPrev,
    onNext,
    isUpdating: isRefetching,
  };
};

export const useGetInboxFromCache = (id: string | undefined) => {
  const [mails] = useAtom(MailListState);
  return mails.find((mail) => mail.id === id) ?? null;
};

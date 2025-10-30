import { FormattedMailBox, MailBoxLabels } from "src/types";

import { useMailBoxGraphql } from "./useMailGraphql";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { DEFAULT_MAILS_OFFSET, MAILS_PER_PAGE } from "@const/config";

import { useAtom } from "jotai";
import {
  MailListState,
  MailListStatusState,
  MailListStatus,
} from "@state/inbox";
import {
  CustomEventType,
  dispatchCustomEvent,
  EVENT_NAME,
  EventTypes,
} from "@utils/event";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { usePrivyWallet } from "./usePrivyWallet";
import { isOlderThan } from "@utils/time";
import { useMailBoxContext } from "./useMailBoxContext";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const useGetInbox = (type: MailBoxLabels = MailBoxLabels.inbox) => {
  const [page, setPage] = useState<number>(DEFAULT_MAILS_OFFSET);
  const [limit] = useState<number>(MAILS_PER_PAGE);
  const [count, setCount] = useState<number>(0);
  const [, set] = useAtom(MailListState);
  const [, setStatus] = useAtom(MailListStatusState);
  const { program } = useGetMailProgramInstance();
  const { address } = usePrivyWallet();
  const { context } = useMailBoxContext();

  const navigate = useNavigate({ from: `/u/solmail/${context}/$id` });

  const redirect = useCallback(() => {
    navigate({ to: `/u/solmail/${context}/all` });
  }, [context, navigate]);
  const { data, isLoading, refetch, isRefetching } = useMailBoxGraphql({
    type,
    offset: page * limit,
    limit,
  });

  const clearInboxInfo = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      hasInboxUpdates: !1,
    }));
  }, [setStatus]);

  const goToMainInbox = useCallback(() => {
    if (context === MailBoxLabels.inbox) {
      setPage(() => 0);
    }
  }, [context]);

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
        id: mail.public_key ?? mail.id,
        iv: "",
        salt: "",
        subject: mail.subject,
        to: new PublicKey(mail.to),
        encKey,
        version: mail.version,
        createdAt: mail.created_at,
        isV1: !1,
        user0: new PublicKey(user0),
        user1: new PublicKey(user1),
        markAsRead: mail.mark_as_read ?? !1,
        labelIdentifier: MailBoxLabels.inbox,
        uid: mail.id ?? "",
      };

      return formattedMail;
    });
  }, [data?.mailsByType?.mails]);

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      setCount(data?.mailsByType?.count ?? 0);
    }
    const customEventHandler = (event: Event) => {
      const customEvent = event as CustomEventType;

      if (customEvent.detail) {
        if (
          customEvent.detail.type === (EventTypes.status_update as unknown) ||
          (customEvent.detail.contextRefresher &&
            customEvent.detail.contextRefresher === context)
        ) {
          refetch();
        }

        if (
          customEvent.detail.type === (EventTypes.inbox_force_update as unknown)
        ) {
          goToMainInbox();
        }
      }
    };

    window.addEventListener(EVENT_NAME, customEventHandler);
    return () => {
      window.removeEventListener(EVENT_NAME, customEventHandler);
    };
  }, [
    context,
    data?.mailsByType?.count,
    goToMainInbox,
    isLoading,
    isRefetching,
    refetch,
  ]);

  const router = useRouter();
  useEffect(() => {
    const unsubscribe = router.subscribe("onResolved", (event) => {
      if (event.toLocation.pathname !== event?.fromLocation?.pathname) {
        clearInboxInfo();
      }
    });

    return unsubscribe;
  }, [clearInboxInfo, router]);

  const { pages, hasNext, hasPrev } = useMemo(() => {
    const pages = Math.ceil(count / limit);
    const hasPrev = page > 0;
    const hasNext = page + 1 < pages;

    return { pages, hasNext, hasPrev };
  }, [count, limit, page]);

  const onPrev = useCallback(() => {
    setPage((prev) => prev - 1);
    clearInboxInfo();
    redirect();
  }, [clearInboxInfo, redirect]);

  const onNext = useCallback(() => {
    setPage((prev) => prev + 1);
    clearInboxInfo();
    redirect();
  }, [clearInboxInfo, redirect]);
  const [placeholder, setPlaceholder] = useState<FormattedMailBox[]>([]);

  useEffect(() => {
    if (!isLoading && !isRefetching && formattedMails) {
      setPlaceholder(formattedMails);
      set(formattedMails);
      dispatchCustomEvent({
        type: EventTypes.inbox_reset_scroll,
      });
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

  useEffect(() => {
    let listener: number;
    if (program) {
      listener = (program as any).addEventListener(
        "mailV2SendEvent",
        (event: {
          from: PublicKey;
          to: PublicKey;
          id: string;
          mailbox: PublicKey;
        }) => {
          if (
            address &&
            event.to &&
            event.to?.toString() === address.toString()
          ) {
            if (
              context !== MailBoxLabels.inbox ||
              (context === MailBoxLabels.inbox && page > 0)
            ) {
              setStatus((prev) => ({
                ...prev,
                hasInboxUpdates: !0,
              }));
            }
            setTimeout(() => refetch(), 2000);
          }
        }
      );
    }
    return () => {
      if (program) {
        program.removeEventListener(listener);
      }
    };
  }, [address, context, page, program, refetch, setStatus]);

  const updated = useRef<number>(new Date().getTime());

  useEffect(() => {
    const handleFocus = () => {
      if (!updated.current || isOlderThan(updated.current))
        if (!isLoading && !isRefetching) {
          refetch();
          updated.current = new Date().getTime();
        }
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [isLoading, isRefetching, refetch]);

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

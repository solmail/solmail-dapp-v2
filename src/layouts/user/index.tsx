import { Flex } from "@chakra-ui/react";
import { Composer } from "@components/Composer";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

import { useSigner } from "@hooks/useSigner";
import { Outlet } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMailAccount } from "@hooks/useMailAccount";
import { RequestAccountCreation } from "@components/RequestAccountCreation";
import noop from "lodash/noop";
import { useEmbeddedWallet } from "@hooks/useEmbeddedWallet";

import { useProfile } from "@hooks/useProfile";
import { ReferalCodeClaim } from "@components/ReferalCodeClaim";
import { usePrivy } from "@privy-io/react-auth";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { ClaimUserName } from "@components/ClaimUsername";
import { LinkUserName } from "@components/LinkUsername";
import { useUsernamePopup } from "@hooks/useUsernamePopup";
import { useAtom } from "jotai";
import { AuthState } from "@state/auth";
import { ENABLE_USERNAME_CLAIM } from "@const/config";
import { useFCMNotifications } from "@hooks/useFCMNotifications";
import { useComposer } from "@hooks/useComposer";

export const UserLayout: React.FC = () => {
  const { address } = usePrivyWallet();
  const STORAGE_NAME = `_u_${address}`;

  const { isOpen: isComposerOpen } = useComposer();
  const setStatus = (s: boolean) => {
    sessionStorage.setItem(STORAGE_NAME, s.toString());
  };
  const getStatus = () => {
    const value = sessionStorage.getItem(STORAGE_NAME);
    return value && value.trim() && value.trim() === "true" ? !0 : !1;
  };
  const { isOpen, onOpen, requestUsernameLink, onUpdate } = useUsernamePopup();
  const { isAuthenticating, isAuthenticated, requestSignIn } = useSigner();
  const { isModalOpen, authenticated } = usePrivy();
  const { requestProfileCreation, refetch: refetchProfile } = useProfile();
  const { provider } = useGetMailProgramInstance();
  const [, set] = useAtom(AuthState);
  useEmbeddedWallet();
  const { hasAccount, isLoading, refetch, isRefetching, isFetched } =
    useMailAccount();

  const { hasUserNames, account } = useGetLinkedUsernameById(address);

  const [isUserReady, setIsUserReady] = useState<boolean>(!1);

  useFCMNotifications(isAuthenticated);

  useEffect(() => {
    if (
      authenticated &&
      provider &&
      provider.publicKey &&
      !isAuthenticated &&
      !isAuthenticating
    ) {
      requestSignIn();
    }
  }, [
    authenticated,
    isAuthenticated,
    isAuthenticating,
    provider,
    requestSignIn,
  ]);
  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const onCloseHandler = () => {
    refetchProfile();
  };

  const requestWalletCreation = isFetched && !hasAccount && !isLoading;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authenticated && !requestProfileCreation && !requestWalletCreation) {
      timer = setTimeout(() => {
        setIsUserReady(!0);
      }, 3000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [authenticated, requestProfileCreation, requestWalletCreation]);

  const CAN_REQUEST_USERNAME = useMemo(
    () =>
      isUserReady &&
      isAuthenticated &&
      !requestProfileCreation &&
      !requestWalletCreation,
    [
      isAuthenticated,
      isUserReady,
      requestProfileCreation,
      requestWalletCreation,
    ]
  );

  const autoRequestExecuted = useRef<boolean>(getStatus());
  const _onClose = () => {
    if (autoRequestExecuted.current) {
      setStatus(!0);
    }
    onUpdate({
      requestUsernameLink: !1,
      isOpen: !1,
    });
  };

  useEffect(() => {
    set((prev) => ({
      ...prev,
      user: address,
    }));
  }, [address, set]);
  useEffect(() => {
    if (autoRequestExecuted.current || isOpen || requestUsernameLink) {
      return;
    }

    if (CAN_REQUEST_USERNAME && ENABLE_USERNAME_CLAIM) {
      autoRequestExecuted.current = !0;
      if (!hasUserNames) {
        onOpen();
      }

      if (hasUserNames && !account) {
        onUpdate({
          requestUsernameLink: !0,
        });
      }
    }
  }, [
    CAN_REQUEST_USERNAME,
    account,
    hasUserNames,
    isOpen,
    onOpen,
    onUpdate,
    requestUsernameLink,
  ]);

  return (
    <Flex w="100%" direction={"row"}>
      <ReferalCodeClaim
        isOpen={
          isAuthenticated &&
          !requestWalletCreation &&
          !isModalOpen &&
          requestProfileCreation
        }
        onClose={onCloseHandler}
      />

      {ENABLE_USERNAME_CLAIM && (
        <ClaimUserName isOpen={isOpen} onClose={_onClose} />
      )}

      <LinkUserName isOpen={requestUsernameLink} onClose={_onClose} />

      <Flex as={"aside"}>
        <Sidebar />
      </Flex>
      <Flex
        bg="surface.300"
        flex={"auto"}
        borderLeftRadius={20}
        direction={"column"}
      >
        <Flex
          as={"nav"}
          borderBottom={"solid 1px"}
          borderBottomColor={"surface.700"}
        >
          <Navbar />
        </Flex>
        <Flex data-body flex={"auto"}>
          {isAuthenticated && (
            <>
              {hasAccount && (
                <>
                  {isComposerOpen && <Composer />}
                  <Outlet />
                </>
              )}

              {isAuthenticated && requestWalletCreation && (
                <RequestAccountCreation
                  isOpen={true}
                  onClose={noop}
                  onSuccess={onSuccess}
                  isRefetching={isRefetching}
                />
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

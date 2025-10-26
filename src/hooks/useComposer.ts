import { appState, type AtomType } from "@state/index";
import { useAtom } from "jotai";

export const useComposer = () => {
  const [{ isComposerOpen, ...other }, update] = useAtom(appState);
  const onOpen = (config: Partial<AtomType> = {}) => {
    update((prev) => {
      return {
        ...prev,
        isComposerOpen: !0,
        ...config,
      };
    });
  };

  const minimize = () => {
    update((prev) => {
      return {
        ...prev,
        composerMinimised: !0,
      };
    });
  };

  const expand = () => {
    update((prev) => {
      return {
        ...prev,
        composerMinimised: !1,
      };
    });
  };

  const onClose = () => {
    update((prev) => {
      return {
        ...prev,
        isComposerOpen: !1,
        thread: "",
        composerCollapsed: !1,
        composerState: "",
        composerProgress: { current: 0, total: 0 },
      };
    });
  };

  const collpaseComposer = () => {
    update((prev) => {
      return {
        ...prev,
        composerCollapsed: !0,
      };
    });
  };
  const expandComposer = () => {
    update((prev) => {
      return {
        ...prev,
        composerCollapsed: !1,
      };
    });
  };

  const updateStatus = (composerState: string) => {
    update((prev) => {
      return {
        ...prev,
        composerState,
      };
    });
  };
  return {
    update,
    ...other,
    isOpen: isComposerOpen,
    onOpen,
    onClose,
    collpaseComposer,
    expandComposer,
    updateStatus,
    minimize,
    expand,
  };
};

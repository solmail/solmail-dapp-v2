import isFunction from "lodash/isFunction";
import * as anchor from "@coral-xyz/anchor";
const DEFAULT_MESSAGE = "Something went wrong";
export const getErrorMessage = (
  e: any,
  fallbackMessage?: string,
  extractFn?: (e: any) => string | undefined | void
) => {
  if (isFunction(extractFn)) {
    return extractFn(e) ?? fallbackMessage ?? DEFAULT_MESSAGE;
  } else {
    if (e && e instanceof Error) {
      try {
        const anchorError: any = parseAnchorError(e);
        if (anchorError && anchorError.isAnchorError) {
          return anchorError.message ?? fallbackMessage ?? DEFAULT_MESSAGE;
        }
      } catch {
        //
      }
      return e.message ?? fallbackMessage ?? DEFAULT_MESSAGE;
    } else {
      return fallbackMessage ?? DEFAULT_MESSAGE;
    }
  }
};

export function parseAnchorError(err: any) {
  try {
    const anchorErr = anchor.AnchorError.parse(err);
    if (anchorErr) {
      return {
        isAnchorError: true,
        code: anchorErr.error.errorCode.number,
        name: anchorErr.error.errorCode.code,
        message: anchorErr.error.errorMessage,
        logs: anchorErr.logs,
      };
    }
  } catch {
    // AnchorError.parse failed
  }

  if (err?.logs) {
    const codeLine = err.logs.find((l: string) => l.includes("Error Code:"));
    const msgLine = err.logs.find((l: string) => l.includes("Error Message:"));
    return {
      isAnchorError: true,
      code: codeLine?.split("Error Code:")[1]?.trim(),
      message: msgLine?.split("Error Message:")[1]?.trim(),
      logs: err.logs,
    };
  }

  return {
    isAnchorError: false,
    message: err?.message || String(err),
    raw: err,
  };
}

import { StorageVersion } from "src/types";

export const isLegacyMail = (version: StorageVersion) => {
  return (
    [
      StorageVersion.pinata,
      StorageVersion.pinataMobile,
      StorageVersion.compressedMobile,
      StorageVersion.compressedWeb,
    ].indexOf(version) === -1
  );
};

export const isInternalMail = (version: StorageVersion) => {
  return [StorageVersion.internal].indexOf(version) > -1;
};

export const isMailOriginMobile = (version: StorageVersion) => {
  return (
    [StorageVersion.pinataMobile, StorageVersion.compressedMobile].indexOf(
      version
    ) > -1
  );
};

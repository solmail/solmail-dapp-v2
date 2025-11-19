import { CustomSkeleton } from "@components/CustomSkeleton";

import { useVerifyUsername } from "@hooks/useVerifyUsername";
import { shortenPrincipalId } from "@utils/string";
import isFunction from "lodash/isFunction";
import { ReactElement } from "react";

type UserDisplayNameProps = {
  address: string;
  origin: string;
  children?: (displayName: string, originalName: string) => ReactElement;
};
export const UserDisplayName: React.FC<UserDisplayNameProps> = ({
  address,
  origin,
  children,
}) => {
  const { isLoading, displayName, originalName } = useVerifyUsername(
    address,
    origin
  );
  return (
    <CustomSkeleton isLoading={!displayName || isLoading}>
      <>
        {isFunction(children)
          ? children(displayName, originalName)
          : shortenPrincipalId(displayName ?? "")}
      </>
    </CustomSkeleton>
  );
};

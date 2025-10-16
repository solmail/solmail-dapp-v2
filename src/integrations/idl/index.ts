import devIdl from "@integrations/idl/solmail-dev/solmail.json";
import preprodIdl from "@integrations/idl/solmail-preprod/solmail.json";
import productionIdl from "@integrations/idl/solmail-production/solmail.json";
const env = import.meta.env.MODE || "development";
export const IDL =
  env === "preprod"
    ? preprodIdl
    : env === "production"
      ? productionIdl
      : devIdl;

export type Solmail =
  | import("@integrations/idl/solmail-dev/solmail").Solmail
  | import("@integrations/idl/solmail-preprod/solmail").Solmail
  | import("@integrations/idl/solmail-production/solmail").Solmail;

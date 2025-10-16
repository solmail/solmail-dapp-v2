import devIdl from "@integrations/idl/solmail-dev/solmail.json";
import preprodIdl from "@integrations/idl/solmail-preprod/solmail.json";

const env = import.meta.env.MODE || "development";
export const IDL = env === "preprod" ? preprodIdl : devIdl;

export type Solmail =
  | import("@integrations/idl/solmail-dev/solmail").Solmail
  | import("@integrations/idl/solmail-preprod/solmail").Solmail;

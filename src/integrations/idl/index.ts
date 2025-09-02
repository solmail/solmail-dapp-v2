import { Idl } from "@coral-xyz/anchor";
import devIdl from "@integrations/idl/solmail-dev/solmail.json";
import preprodIdl from "@integrations/idl/solmail-preprod/solmail.json";

const env = import.meta.env.MODE || "development";

const IDL = {
  development: devIdl,
  preprod: preprodIdl,
}[env] as Idl;

export default IDL;

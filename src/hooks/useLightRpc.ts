import { RPC_ENDPOINT } from "@const/config";
import { createRpc } from "@lightprotocol/stateless.js";
export const useLightRpc = () => {
  return createRpc(RPC_ENDPOINT, RPC_ENDPOINT);
};

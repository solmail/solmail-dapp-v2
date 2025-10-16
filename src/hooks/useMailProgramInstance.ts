import { useGetProgramInstance } from "./useGetProgramInstance";
import { IDL } from "@integrations/idl/index";
import type { Solmail } from "@integrations/idl/index";

export const useGetMailProgramInstance = () => {
  return useGetProgramInstance<Solmail>(IDL as Solmail);
};

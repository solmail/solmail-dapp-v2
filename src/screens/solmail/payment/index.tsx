import { Solmail } from "@components/Solmail";
import { useParams } from "@tanstack/react-router";
import { MailContext } from "src/context";
import { MailBoxLabels } from "src/types";

export const SolmailPayments: React.FC = () => {
  const { id } = useParams({ from: "/u/_layout/solmail/payment/$id" });
  return (
    <MailContext.Provider
      value={{
        context: MailBoxLabels.payment,
        name: "Payments",
        id: id && id !== "all" ? id : undefined,
      }}
    >
      <Solmail />
    </MailContext.Provider>
  );
};

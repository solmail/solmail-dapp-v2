import { useContext } from "react";
import { MailCardContext } from "src/context/MailCardContext";

export const useGetMailFromContext = () => {
  const mail = useContext(MailCardContext);
  return mail;
};

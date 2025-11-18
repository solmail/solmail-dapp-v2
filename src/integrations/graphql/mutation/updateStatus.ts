import { gql } from "@apollo/client";

export const UPDATE_MAIL_READ_STATUS = gql`
  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {
    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {
      success
      message
      mail {
        id
        subject
        mark_as_read
        from
        to
      }
    }
  }
`;

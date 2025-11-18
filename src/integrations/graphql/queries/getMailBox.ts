import { gql } from "@apollo/client";

export const GET_USER_MAILBOX = gql`
  query GetUserMails(
    $wallet: String!
    $type: MailType!
    $limit: Int
    $offset: Int
  ) {
    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {
      wallet
      count
      mails {
        id
        from
        to
        subject
        body
        label
        mark_as_read
        version
        public_key
        created_at
        is_inbox_favorite
        is_outbox_favorite
        senderMailAccount {
          authority
          mailbox
          linkedUsernames {
            username
            domain
          }
        }
        recipientMailAccount {
          authority
          mailbox
        }
      }
      appliedFilters {
        excludedLabels
        usedGSI
      }
    }
  }
`;

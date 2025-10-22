import { gql } from "@apollo/client";

export const GET_USER_MAILBOX = gql`
  query GetUserInbox(
    $wallet: String!
    $excludedLabels: [MailLabel!]
    $limit: Int
  ) {
    userInbox(wallet: $wallet, excludedLabels: $excludedLabels, limit: $limit) {
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
        created_at
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

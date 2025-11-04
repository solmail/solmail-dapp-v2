import { gql } from "@apollo/client";

export const UPDATE_MAIL_FAV_STATUS = gql`
  mutation MarkMailAsFavorite(
    $mailId: String!
    $isFavorite: Boolean!
    $type: MailFavoriteType!
    $wallet: String!
  ) {
    updateMailFavoriteStatus(
      mailId: $mailId
      isFavorite: $isFavorite
      type: $type
      wallet: $wallet
    ) {
      success
      message
      mail {
        id
        is_inbox_favorite
        is_outbox_favorite
      }
    }
  }
`;

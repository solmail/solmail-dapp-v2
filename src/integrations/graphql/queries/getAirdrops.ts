import { gql } from "@apollo/client";

export const GET_USER_AIRDROPS = gql`
  query GetUserAirdrops(
    $wallet: String!
    $limit: Int
    $offset: Int
    $claimed: Boolean
  ) {
    userAirdrops(
      wallet: $wallet
      limit: $limit
      offset: $offset
      claimed: $claimed
    ) {
      items {
        name
        message
        airdrop_address
        recipient_wallet
        amount
        token_mint
        distributed_at
        claim_status
        claimed_at
        claim_transaction_signature
      }
      total_count
      has_more
    }
  }
`;

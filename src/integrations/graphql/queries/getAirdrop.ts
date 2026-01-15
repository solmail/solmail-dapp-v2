import { gql } from "@apollo/client";

export const GET_AIRDROP = gql`
  query GetAirdrop($airdropAddress: String!) {
    airdrop(airdropAddress: $airdropAddress) {
      airdrop_address
      authority
      token_mint
      total_amount
      amount_per_user
      max_recipients
      created_at
      status
      distributed_count
      failed_count
      compressed
      compress_signature
      retry_count
      last_processed_index
      completed_at
      snapshot_timestamp
      transaction_signature
      name
      message
    }
  }
`;

//  eligible_users {
//         wallet
//         mailbox
//         created_at
//       }

import { gql } from "@apollo/client";

export const CLAIM_AIRDROP = gql`
  mutation ClaimAirdrop(
    $airdropAddress: String!
    $wallet: String!
    $transactionSignature: String!
  ) {
    claimAirdrop(
      airdropAddress: $airdropAddress
      wallet: $wallet
      transactionSignature: $transactionSignature
    ) {
      success
      claimed_at
      message
    }
  }
`;

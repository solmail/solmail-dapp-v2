import { gql } from "@apollo/client";

export const CHECK_AIRDROP_CLAIM = gql`
  query CheckAirdropClaim($airdropAddress: String!, $wallet: String!) {
    userAirdropEligibility(airdropAddress: $airdropAddress, wallet: $wallet) {
      airdrop_address
      wallet
      is_eligible
      has_claimed
      amount
      claimed_at
      claim_transaction_signature
    }
  }
`;

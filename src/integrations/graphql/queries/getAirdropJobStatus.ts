import { gql } from "@apollo/client";

export const GET_AIRDROP_JOB_STATUS = gql`
  query GetAirdropJobStatus($airdropAddress: String!) {
    airdropJobStatus(airdropAddress: $airdropAddress) {
      airdrop_address
      token_mint
      status
      total_eligible
      distributed_count
      remaining_count
      failed_count
      progress_percentage
      estimated_completion_time
      last_updated
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_DECOMPRESS_TRANSACTION = gql`
  mutation Decompress($airdropAddress: String!, $wallet: String!) {
    createDecompressInstruction(
      airdropAddress: $airdropAddress
      wallet: $wallet
    ) {
      success
      transaction
      amount
      recipientAta
      message
    }
  }
`;

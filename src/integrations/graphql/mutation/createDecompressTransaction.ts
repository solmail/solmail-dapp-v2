import { gql } from "@apollo/client";

export const CREATE_DECOMPRESS_TRANSACTION = gql`
  mutation CreateDecompressTransaction(
    $wallet: String!
    $tokenMint: String!
    $amount: String
  ) {
    createDecompressInstruction(
      wallet: $wallet
      tokenMint: $tokenMint
      amount: $amount
    ) {
      success
      transaction
      amount
      recipientAta
      message
    }
  }
`;

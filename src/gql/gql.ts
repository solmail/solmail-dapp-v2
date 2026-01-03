/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateDecompressTransaction(\n    $wallet: String!\n    $tokenMint: String!\n    $amount: String\n  ) {\n    createDecompressInstruction(\n      wallet: $wallet\n      tokenMint: $tokenMint\n      amount: $amount\n    ) {\n      success\n      transaction\n      amount\n      recipientAta\n      message\n    }\n  }\n": typeof types.CreateDecompressTransactionDocument,
    "\n  mutation ClaimAirdrop(\n    $airdropAddress: String!\n    $wallet: String!\n    $transactionSignature: String!\n  ) {\n    claimAirdrop(\n      airdropAddress: $airdropAddress\n      wallet: $wallet\n      transactionSignature: $transactionSignature\n    ) {\n      success\n      claimed_at\n      message\n    }\n  }\n": typeof types.ClaimAirdropDocument,
    "\n  mutation MarkMailAsFavorite(\n    $mailId: String!\n    $isFavorite: Boolean!\n    $type: MailFavoriteType!\n    $wallet: String!\n  ) {\n    updateMailFavoriteStatus(\n      mailId: $mailId\n      isFavorite: $isFavorite\n      type: $type\n      wallet: $wallet\n    ) {\n      success\n      message\n      mail {\n        id\n        is_inbox_favorite\n        is_outbox_favorite\n      }\n    }\n  }\n": typeof types.MarkMailAsFavoriteDocument,
    "\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n": typeof types.UpdateMailReadStatusDocument,
    "\n  query GetUserAirdrops(\n    $wallet: String!\n    $limit: Int\n    $offset: Int\n    $claimed: Boolean\n  ) {\n    userAirdrops(\n      wallet: $wallet\n      limit: $limit\n      offset: $offset\n      claimed: $claimed\n    ) {\n      items {\n        name\n        message\n        airdrop_address\n        recipient_wallet\n        amount\n        token_mint\n        distributed_at\n        claim_status\n        claimed_at\n        claim_transaction_signature\n      }\n      total_count\n      has_more\n    }\n  }\n": typeof types.GetUserAirdropsDocument,
    "\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        is_inbox_favorite\n        is_outbox_favorite\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n": typeof types.GetUserMailsDocument,
};
const documents: Documents = {
    "\n  mutation CreateDecompressTransaction(\n    $wallet: String!\n    $tokenMint: String!\n    $amount: String\n  ) {\n    createDecompressInstruction(\n      wallet: $wallet\n      tokenMint: $tokenMint\n      amount: $amount\n    ) {\n      success\n      transaction\n      amount\n      recipientAta\n      message\n    }\n  }\n": types.CreateDecompressTransactionDocument,
    "\n  mutation ClaimAirdrop(\n    $airdropAddress: String!\n    $wallet: String!\n    $transactionSignature: String!\n  ) {\n    claimAirdrop(\n      airdropAddress: $airdropAddress\n      wallet: $wallet\n      transactionSignature: $transactionSignature\n    ) {\n      success\n      claimed_at\n      message\n    }\n  }\n": types.ClaimAirdropDocument,
    "\n  mutation MarkMailAsFavorite(\n    $mailId: String!\n    $isFavorite: Boolean!\n    $type: MailFavoriteType!\n    $wallet: String!\n  ) {\n    updateMailFavoriteStatus(\n      mailId: $mailId\n      isFavorite: $isFavorite\n      type: $type\n      wallet: $wallet\n    ) {\n      success\n      message\n      mail {\n        id\n        is_inbox_favorite\n        is_outbox_favorite\n      }\n    }\n  }\n": types.MarkMailAsFavoriteDocument,
    "\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n": types.UpdateMailReadStatusDocument,
    "\n  query GetUserAirdrops(\n    $wallet: String!\n    $limit: Int\n    $offset: Int\n    $claimed: Boolean\n  ) {\n    userAirdrops(\n      wallet: $wallet\n      limit: $limit\n      offset: $offset\n      claimed: $claimed\n    ) {\n      items {\n        name\n        message\n        airdrop_address\n        recipient_wallet\n        amount\n        token_mint\n        distributed_at\n        claim_status\n        claimed_at\n        claim_transaction_signature\n      }\n      total_count\n      has_more\n    }\n  }\n": types.GetUserAirdropsDocument,
    "\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        is_inbox_favorite\n        is_outbox_favorite\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n": types.GetUserMailsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDecompressTransaction(\n    $wallet: String!\n    $tokenMint: String!\n    $amount: String\n  ) {\n    createDecompressInstruction(\n      wallet: $wallet\n      tokenMint: $tokenMint\n      amount: $amount\n    ) {\n      success\n      transaction\n      amount\n      recipientAta\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDecompressTransaction(\n    $wallet: String!\n    $tokenMint: String!\n    $amount: String\n  ) {\n    createDecompressInstruction(\n      wallet: $wallet\n      tokenMint: $tokenMint\n      amount: $amount\n    ) {\n      success\n      transaction\n      amount\n      recipientAta\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClaimAirdrop(\n    $airdropAddress: String!\n    $wallet: String!\n    $transactionSignature: String!\n  ) {\n    claimAirdrop(\n      airdropAddress: $airdropAddress\n      wallet: $wallet\n      transactionSignature: $transactionSignature\n    ) {\n      success\n      claimed_at\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ClaimAirdrop(\n    $airdropAddress: String!\n    $wallet: String!\n    $transactionSignature: String!\n  ) {\n    claimAirdrop(\n      airdropAddress: $airdropAddress\n      wallet: $wallet\n      transactionSignature: $transactionSignature\n    ) {\n      success\n      claimed_at\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkMailAsFavorite(\n    $mailId: String!\n    $isFavorite: Boolean!\n    $type: MailFavoriteType!\n    $wallet: String!\n  ) {\n    updateMailFavoriteStatus(\n      mailId: $mailId\n      isFavorite: $isFavorite\n      type: $type\n      wallet: $wallet\n    ) {\n      success\n      message\n      mail {\n        id\n        is_inbox_favorite\n        is_outbox_favorite\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MarkMailAsFavorite(\n    $mailId: String!\n    $isFavorite: Boolean!\n    $type: MailFavoriteType!\n    $wallet: String!\n  ) {\n    updateMailFavoriteStatus(\n      mailId: $mailId\n      isFavorite: $isFavorite\n      type: $type\n      wallet: $wallet\n    ) {\n      success\n      message\n      mail {\n        id\n        is_inbox_favorite\n        is_outbox_favorite\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserAirdrops(\n    $wallet: String!\n    $limit: Int\n    $offset: Int\n    $claimed: Boolean\n  ) {\n    userAirdrops(\n      wallet: $wallet\n      limit: $limit\n      offset: $offset\n      claimed: $claimed\n    ) {\n      items {\n        name\n        message\n        airdrop_address\n        recipient_wallet\n        amount\n        token_mint\n        distributed_at\n        claim_status\n        claimed_at\n        claim_transaction_signature\n      }\n      total_count\n      has_more\n    }\n  }\n"): (typeof documents)["\n  query GetUserAirdrops(\n    $wallet: String!\n    $limit: Int\n    $offset: Int\n    $claimed: Boolean\n  ) {\n    userAirdrops(\n      wallet: $wallet\n      limit: $limit\n      offset: $offset\n      claimed: $claimed\n    ) {\n      items {\n        name\n        message\n        airdrop_address\n        recipient_wallet\n        amount\n        token_mint\n        distributed_at\n        claim_status\n        claimed_at\n        claim_transaction_signature\n      }\n      total_count\n      has_more\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        is_inbox_favorite\n        is_outbox_favorite\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        is_inbox_favorite\n        is_outbox_favorite\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
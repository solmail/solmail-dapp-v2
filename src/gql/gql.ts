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
    "\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n": typeof types.UpdateMailReadStatusDocument,
    "\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n": typeof types.GetUserMailsDocument,
};
const documents: Documents = {
    "\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n": types.UpdateMailReadStatusDocument,
    "\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n": types.GetUserMailsDocument,
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
export function graphql(source: "\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMailReadStatus($mailId: String!, $markAsRead: Boolean!) {\n    updateMailReadStatus(mailId: $mailId, markAsRead: $markAsRead) {\n      success\n      message\n      mail {\n        id\n        subject\n        mark_as_read\n        from\n        to\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserMails(\n    $wallet: String!\n    $type: MailType!\n    $limit: Int\n    $offset: Int\n  ) {\n    mailsByType(wallet: $wallet, type: $type, limit: $limit, offset: $offset) {\n      wallet\n      count\n      mails {\n        id\n        from\n        to\n        subject\n        body\n        label\n        mark_as_read\n        version\n        public_key\n        created_at\n        senderMailAccount {\n          authority\n          mailbox\n          linkedUsernames {\n            username\n            domain\n          }\n        }\n        recipientMailAccount {\n          authority\n          mailbox\n        }\n      }\n      appliedFilters {\n        excludedLabels\n        usedGSI\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
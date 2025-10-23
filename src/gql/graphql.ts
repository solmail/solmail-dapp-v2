/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AppliedFilters = {
  __typename?: 'AppliedFilters';
  excludedLabels?: Maybe<Array<MailLabel>>;
  includedLabels?: Maybe<Array<MailLabel>>;
  usedGSI: Scalars['Boolean']['output'];
};

export type Bid = {
  __typename?: 'Bid';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  bid_account: Scalars['String']['output'];
  bid_amount: Scalars['Float']['output'];
  bid_expiration: Scalars['Float']['output'];
  bid_type: BidType;
  bump?: Maybe<Scalars['Int']['output']>;
  cleanup_deadline: Scalars['Float']['output'];
  created_at: Scalars['Float']['output'];
  currentBidder?: Maybe<User>;
  currentBidderMailAccount?: Maybe<MailAccount>;
  current_highest_bidder: Scalars['String']['output'];
  domain: Scalars['String']['output'];
  events: Array<Event>;
  isExpired: Scalars['Boolean']['output'];
  is_active: Scalars['String']['output'];
  originalCreator?: Maybe<User>;
  originalCreatorMailAccount?: Maybe<MailAccount>;
  original_creator: Scalars['String']['output'];
  timeRemaining: Scalars['Float']['output'];
  total_fees_collected: Scalars['Float']['output'];
  userBids: Array<UserBid>;
  username: Scalars['String']['output'];
  usernameAccount?: Maybe<Username>;
};


export type BidEventsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type BidUserBidsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type BidResponse = {
  __typename?: 'BidResponse';
  bid?: Maybe<Bid>;
  history: Array<Event>;
};

export enum BidStatus {
  Active = 'Active',
  Cancelled = 'Cancelled',
  CleanedUp = 'CleanedUp',
  Expired = 'Expired',
  Outbid = 'Outbid',
  Won = 'Won'
}

export enum BidType {
  MailToken = 'MailToken',
  Sol = 'Sol'
}

export type BidsPaginatedResponse = {
  __typename?: 'BidsPaginatedResponse';
  bids: Array<Bid>;
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type CentralState = {
  __typename?: 'CentralState';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  authority: Scalars['String']['output'];
  authorityMailAccount?: Maybe<MailAccount>;
  authorityUser?: Maybe<User>;
  bump?: Maybe<Scalars['Int']['output']>;
  collection_mint: Scalars['String']['output'];
  tag: Scalars['Int']['output'];
  total_wrapped: Scalars['Float']['output'];
  wrappedUsernames: Array<Username>;
};


export type CentralStateWrappedUsernamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Event = {
  __typename?: 'Event';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  admin?: Maybe<Scalars['String']['output']>;
  adminMailAccount?: Maybe<MailAccount>;
  adminUser?: Maybe<User>;
  amount?: Maybe<Scalars['Float']['output']>;
  authority?: Maybe<Scalars['String']['output']>;
  bidAccount?: Maybe<Bid>;
  bid_amount?: Maybe<Scalars['Float']['output']>;
  bidder?: Maybe<Scalars['String']['output']>;
  bidderMailAccount?: Maybe<MailAccount>;
  bidderUser?: Maybe<User>;
  domain?: Maybe<Scalars['String']['output']>;
  event_category: Scalars['String']['output'];
  event_data: Scalars['JSON']['output'];
  event_type: Scalars['String']['output'];
  fromMailAccount?: Maybe<MailAccount>;
  fromUser?: Maybe<User>;
  from_account?: Maybe<Scalars['String']['output']>;
  label?: Maybe<MailLabel>;
  mail?: Maybe<Mail>;
  mail_id?: Maybe<Scalars['String']['output']>;
  nft_mint?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  recipientMailAccount?: Maybe<MailAccount>;
  recipientUser?: Maybe<User>;
  sender?: Maybe<Scalars['String']['output']>;
  senderMailAccount?: Maybe<MailAccount>;
  senderUser?: Maybe<User>;
  signature: Scalars['String']['output'];
  slot: Scalars['Float']['output'];
  timestamp: Scalars['Float']['output'];
  toMailAccount?: Maybe<MailAccount>;
  toUser?: Maybe<User>;
  to_account?: Maybe<Scalars['String']['output']>;
  transaction?: Maybe<Transaction>;
  ttl: Scalars['Float']['output'];
  username?: Maybe<Scalars['String']['output']>;
  usernameAccount?: Maybe<Username>;
  username_domain?: Maybe<Scalars['String']['output']>;
  wrapper_account?: Maybe<Scalars['String']['output']>;
};

export type EventsPaginatedResponse = {
  __typename?: 'EventsPaginatedResponse';
  count: Scalars['Int']['output'];
  events: Array<Event>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type Mail = {
  __typename?: 'Mail';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  authority: Scalars['String']['output'];
  body: Scalars['String']['output'];
  created_at: Scalars['Float']['output'];
  events: Array<Event>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  iv: Scalars['String']['output'];
  label: MailLabel;
  mailbox: Scalars['String']['output'];
  mailboxAccount?: Maybe<MailAccount>;
  mark_as_read: Scalars['Boolean']['output'];
  parentMail?: Maybe<Mail>;
  parent_id?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<User>;
  recipientMailAccount?: Maybe<MailAccount>;
  salt: Scalars['String']['output'];
  sender?: Maybe<User>;
  senderMailAccount?: Maybe<MailAccount>;
  subject: Scalars['String']['output'];
  thread: Array<Mail>;
  to: Scalars['String']['output'];
  to_label: Scalars['String']['output'];
  version: Scalars['String']['output'];
};


export type MailEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type MailThreadArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type MailAccount = {
  __typename?: 'MailAccount';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  authority: Scalars['String']['output'];
  bump?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Float']['output'];
  inbox: Array<Mail>;
  linkedUsernames: Array<Username>;
  mailbox?: Maybe<Scalars['String']['output']>;
  nostr_key: Scalars['String']['output'];
  owner?: Maybe<User>;
  sentMails: Array<Mail>;
  version: Scalars['String']['output'];
};


export type MailAccountInboxArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type MailAccountLinkedUsernamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type MailAccountSentMailsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum MailLabel {
  Inbox = 'Inbox',
  Outbox = 'Outbox',
  Payment = 'Payment',
  Read = 'Read',
  Spam = 'Spam',
  Trash = 'Trash'
}

export type MailResponse = {
  __typename?: 'MailResponse';
  mail: Mail;
  thread: Array<Mail>;
};

export enum MailType {
  Inbox = 'inbox',
  Outbox = 'outbox',
  Payments = 'payments',
  Spam = 'spam',
  Trash = 'trash'
}

export type MailsResponse = {
  __typename?: 'MailsResponse';
  appliedFilters?: Maybe<AppliedFilters>;
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  mails: Array<Mail>;
  offset: Scalars['Int']['output'];
  wallet: Scalars['String']['output'];
};

export type MarketplaceSettings = {
  __typename?: 'MarketplaceSettings';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  ans_program_id?: Maybe<Scalars['String']['output']>;
  authority: Scalars['String']['output'];
  authorityMailAccount?: Maybe<MailAccount>;
  authorityUser?: Maybe<User>;
  bid_duration_secs: Scalars['Float']['output'];
  bump?: Maybe<Scalars['Int']['output']>;
  cancellation_grace_period_seconds: Scalars['Float']['output'];
  is_paused: Scalars['Boolean']['output'];
  mail_fee_tokens: Scalars['Float']['output'];
  max_bid_amount_lamports: Scalars['Float']['output'];
  max_bid_amount_tokens: Scalars['Float']['output'];
  max_username_length: Scalars['Int']['output'];
  max_usernames_per_window: Scalars['Int']['output'];
  min_bid_increase_percentage: Scalars['Int']['output'];
  min_bid_lamports: Scalars['Float']['output'];
  min_bid_tokens: Scalars['Float']['output'];
  min_creation_interval_seconds: Scalars['Float']['output'];
  min_username_length: Scalars['Int']['output'];
  payment_enabled: Scalars['Boolean']['output'];
  rate_limit_window_seconds: Scalars['Float']['output'];
  refund_grace_period_seconds: Scalars['Float']['output'];
  seller_fee_basis_points: Scalars['Int']['output'];
  skr_tld_parent?: Maybe<Scalars['String']['output']>;
  sol_fee_lamports: Scalars['Float']['output'];
  treasury?: Maybe<Treasury>;
  updated_at: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  activeBids: BidsPaginatedResponse;
  bid?: Maybe<BidResponse>;
  bidEvents: EventsPaginatedResponse;
  centralState?: Maybe<CentralState>;
  events: EventsPaginatedResponse;
  eventsByTransaction: EventsPaginatedResponse;
  expiredBids: BidsPaginatedResponse;
  lostBids: UserBidsPaginatedResponse;
  mail?: Maybe<MailResponse>;
  mailAccount?: Maybe<MailAccount>;
  mailAccountByMailbox?: Maybe<MailAccount>;
  mailEvents: EventsPaginatedResponse;
  mailsByLabel: MailsResponse;
  mailsByType: MailsResponse;
  marketplaceSettings?: Maybe<MarketplaceSettings>;
  recentTransactions: TransactionsPaginatedResponse;
  transaction?: Maybe<Transaction>;
  user?: Maybe<User>;
  userBids: UserBidsResponse;
  userInbox: MailsResponse;
  userSentMails: MailsResponse;
  username?: Maybe<Username>;
  usernameEvents: EventsPaginatedResponse;
  usernames: UsernamesResponse;
  usernamesFiltered: UsernamesResponse;
  wonBids: UserBidsPaginatedResponse;
};


export type QueryActiveBidsArgs = {
  checkExpiration?: InputMaybe<Scalars['Boolean']['input']>;
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBidArgs = {
  username: Scalars['String']['input'];
};


export type QueryBidEventsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  eventCategory?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  wallet?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventsByTransactionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  signature: Scalars['String']['input'];
};


export type QueryExpiredBidsArgs = {
  beforeTimestamp?: InputMaybe<Scalars['Float']['input']>;
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLostBidsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryMailArgs = {
  mailId: Scalars['String']['input'];
};


export type QueryMailAccountArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryMailAccountByMailboxArgs = {
  mailbox: Scalars['String']['input'];
};


export type QueryMailEventsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMailsByLabelArgs = {
  label: MailLabel;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryMailsByTypeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type: MailType;
  wallet: Scalars['String']['input'];
};


export type QueryRecentTransactionsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTransactionArgs = {
  signature: Scalars['String']['input'];
};


export type QueryUserArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryUserBidsArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryUserInboxArgs = {
  excludedLabels?: InputMaybe<Array<MailLabel>>;
  includedLabels?: InputMaybe<Array<MailLabel>>;
  label?: InputMaybe<MailLabel>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryUserSentMailsArgs = {
  excludedLabels?: InputMaybe<Array<MailLabel>>;
  includedLabels?: InputMaybe<Array<MailLabel>>;
  label?: InputMaybe<MailLabel>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsernameEventsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QueryUsernamesArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryUsernamesFilteredArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  isWrapped?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryWonBidsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};

export type RateLimit = {
  __typename?: 'RateLimit';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  bump?: Maybe<Scalars['Int']['output']>;
  creation_count: Scalars['Int']['output'];
  last_creation_time: Scalars['Float']['output'];
  user: Scalars['String']['output'];
  userAccount?: Maybe<User>;
  userMailAccount?: Maybe<MailAccount>;
  window_start: Scalars['Float']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  block_time: Scalars['Float']['output'];
  error?: Maybe<Scalars['String']['output']>;
  events: Array<Event>;
  processed_at: Scalars['Float']['output'];
  raw_transaction: Scalars['JSON']['output'];
  signature: Scalars['String']['output'];
  slot: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  ttl: Scalars['Float']['output'];
};


export type TransactionEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type TransactionsPaginatedResponse = {
  __typename?: 'TransactionsPaginatedResponse';
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  transactions: Array<Transaction>;
};

export type Treasury = {
  __typename?: 'Treasury';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  authority: Scalars['String']['output'];
  authorityMailAccount?: Maybe<MailAccount>;
  authorityUser?: Maybe<User>;
  bump?: Maybe<Scalars['Int']['output']>;
  total_bid_amount: Scalars['Float']['output'];
  total_revenue: Scalars['Float']['output'];
  updated_at: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  activeBidAccounts: Array<Bid>;
  lostBidAccounts: Array<UserBid>;
  mailAccount?: Maybe<MailAccount>;
  rateLimit?: Maybe<RateLimit>;
  receivedMails: Array<Mail>;
  sentMails: Array<Mail>;
  unwrappedUsernames: Array<Username>;
  userBids: Array<UserBid>;
  usernames: Array<Username>;
  wallet: Scalars['String']['output'];
  wonBidAccounts: Array<UserBid>;
  wrappedUsernames: Array<Username>;
};


export type UserActiveBidAccountsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserLostBidAccountsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserReceivedMailsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserSentMailsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserUnwrappedUsernamesArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserUserBidsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserUsernamesArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserWonBidAccountsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserWrappedUsernamesArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UserBid = {
  __typename?: 'UserBid';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  bidAccount?: Maybe<Bid>;
  bid_account: Scalars['String']['output'];
  bid_amount: Scalars['Float']['output'];
  bid_expiration: Scalars['Float']['output'];
  bid_method: Scalars['String']['output'];
  bid_type: BidType;
  bidder?: Maybe<User>;
  bidderMailAccount?: Maybe<MailAccount>;
  bump?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Float']['output'];
  domain: Scalars['String']['output'];
  hasLost: Scalars['Boolean']['output'];
  hasWon: Scalars['Boolean']['output'];
  isExpired: Scalars['Boolean']['output'];
  is_current_highest: Scalars['Boolean']['output'];
  last_updated: Scalars['Float']['output'];
  status: BidStatus;
  total_contributed: Scalars['Float']['output'];
  total_fees_paid: Scalars['Float']['output'];
  user: Scalars['String']['output'];
  user_status: Scalars['String']['output'];
  username: Scalars['String']['output'];
  usernameAccount?: Maybe<Username>;
  username_domain: Scalars['String']['output'];
};

export type UserBidsPaginatedResponse = {
  __typename?: 'UserBidsPaginatedResponse';
  bids: Array<UserBid>;
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type UserBidsResponse = {
  __typename?: 'UserBidsResponse';
  active_bids: Array<UserBid>;
  lost_bids: Array<UserBid>;
  past_bids: Array<UserBid>;
  total_bids: Scalars['Int']['output'];
  wallet: Scalars['String']['output'];
  won_bids: Array<UserBid>;
};

export type Username = {
  __typename?: 'Username';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  account_pubkey: Scalars['String']['output'];
  activeBid?: Maybe<Bid>;
  authority: Scalars['String']['output'];
  authorityUser?: Maybe<User>;
  bump?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Float']['output'];
  creation_method?: Maybe<Scalars['String']['output']>;
  domain: Scalars['String']['output'];
  domain_account: Scalars['String']['output'];
  events: Array<Event>;
  is_wrapped: Scalars['String']['output'];
  mailbox?: Maybe<Scalars['String']['output']>;
  mailboxAccount?: Maybe<MailAccount>;
  username: Scalars['String']['output'];
  wrapper?: Maybe<Wrapper>;
};


export type UsernameEventsArgs = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UsernamesResponse = {
  __typename?: 'UsernamesResponse';
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  usernames: Array<Username>;
  wallet: Scalars['String']['output'];
};

export type Wrapper = {
  __typename?: 'Wrapper';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  created_at: Scalars['Float']['output'];
  domain: Scalars['String']['output'];
  mailbox_locked: Scalars['Boolean']['output'];
  nft_mint: Scalars['String']['output'];
  nonce: Scalars['Int']['output'];
  originalAuthorityMailAccount?: Maybe<MailAccount>;
  originalAuthorityUser?: Maybe<User>;
  original_authority: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  ownerMailAccount?: Maybe<MailAccount>;
  ownerUser?: Maybe<User>;
  tag: Scalars['String']['output'];
  transfer_allowed: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
  usernameAccount?: Maybe<Username>;
  username_account: Scalars['String']['output'];
};

export type GetUserMailsQueryVariables = Exact<{
  wallet: Scalars['String']['input'];
  type: MailType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserMailsQuery = { __typename?: 'Query', mailsByType: { __typename?: 'MailsResponse', wallet: string, count: number, mails: Array<{ __typename?: 'Mail', id: string, from: string, to: string, subject: string, body: string, label: MailLabel, mark_as_read: boolean, created_at: number, senderMailAccount?: { __typename?: 'MailAccount', authority: string, mailbox?: string | null, linkedUsernames: Array<{ __typename?: 'Username', username: string, domain: string }> } | null, recipientMailAccount?: { __typename?: 'MailAccount', authority: string, mailbox?: string | null } | null }>, appliedFilters?: { __typename?: 'AppliedFilters', excludedLabels?: Array<MailLabel> | null, usedGSI: boolean } | null } };


export const GetUserMailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserMails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MailType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mailsByType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"mails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"mark_as_read"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"senderMailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"mailbox"}},{"kind":"Field","name":{"kind":"Name","value":"linkedUsernames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipientMailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"mailbox"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"appliedFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excludedLabels"}},{"kind":"Field","name":{"kind":"Name","value":"usedGSI"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMailsQuery, GetUserMailsQueryVariables>;
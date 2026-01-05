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

export type Airdrop = {
  __typename?: 'Airdrop';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  airdrop_address: Scalars['String']['output'];
  amount_per_user: Scalars['String']['output'];
  authority: Scalars['String']['output'];
  completed_at?: Maybe<Scalars['Float']['output']>;
  compress_signature?: Maybe<Scalars['String']['output']>;
  compressed: Scalars['Boolean']['output'];
  created_at: Scalars['Float']['output'];
  distributed_count: Scalars['Int']['output'];
  eligible_users: Array<EligibleUser>;
  failed_count: Scalars['Int']['output'];
  is_active: Scalars['Boolean']['output'];
  last_processed_index: Scalars['Int']['output'];
  max_recipients: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  retry_count: Scalars['Int']['output'];
  snapshot_timestamp: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  token_mint: Scalars['String']['output'];
  total_amount: Scalars['String']['output'];
  transaction_signature: Scalars['String']['output'];
};

export type AirdropCostEstimate = {
  __typename?: 'AirdropCostEstimate';
  cache_age_seconds: Scalars['Int']['output'];
  cache_hit: Scalars['Boolean']['output'];
  compression_cost_sol: Scalars['Float']['output'];
  total_cost_lamports: Scalars['String']['output'];
  total_cost_sol: Scalars['Float']['output'];
  total_mailboxes: Scalars['Int']['output'];
  total_transfer_cost_sol: Scalars['Float']['output'];
  transfer_cost_per_user_sol: Scalars['Float']['output'];
};

export type AirdropDistribution = {
  __typename?: 'AirdropDistribution';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  airdrop_address: Scalars['String']['output'];
  amount: Scalars['String']['output'];
  claim_status: ClaimStatus;
  claim_transaction_signature?: Maybe<Scalars['String']['output']>;
  claimed_at?: Maybe<Scalars['Float']['output']>;
  distributed_at: Scalars['Float']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  recipient_mailbox: Scalars['String']['output'];
  recipient_wallet: Scalars['String']['output'];
  status: Scalars['String']['output'];
  token_mint: Scalars['String']['output'];
  transaction_signature: Scalars['String']['output'];
};

export type AirdropDistributionList = {
  __typename?: 'AirdropDistributionList';
  count: Scalars['Int']['output'];
  distributions: Array<AirdropDistribution>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type AirdropEligibility = {
  __typename?: 'AirdropEligibility';
  airdrop_address: Scalars['String']['output'];
  amount?: Maybe<Scalars['Float']['output']>;
  claim_transaction_signature?: Maybe<Scalars['String']['output']>;
  claimed_at?: Maybe<Scalars['Float']['output']>;
  has_claimed: Scalars['Boolean']['output'];
  is_eligible: Scalars['Boolean']['output'];
  wallet: Scalars['String']['output'];
};

export type AirdropJobStatus = {
  __typename?: 'AirdropJobStatus';
  airdrop_address: Scalars['String']['output'];
  distributed_count: Scalars['Int']['output'];
  estimated_completion_time?: Maybe<Scalars['String']['output']>;
  failed_count: Scalars['Int']['output'];
  last_updated: Scalars['Float']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  progress_percentage: Scalars['Float']['output'];
  remaining_count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  token_mint: Scalars['String']['output'];
  total_eligible: Scalars['Int']['output'];
};

export type AirdropList = {
  __typename?: 'AirdropList';
  airdrops: Array<Airdrop>;
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type AppliedFilters = {
  __typename?: 'AppliedFilters';
  excludedLabels?: Maybe<Array<MailLabel>>;
  favorite?: Maybe<Scalars['Boolean']['output']>;
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

export type ClaimAirdropResponse = {
  __typename?: 'ClaimAirdropResponse';
  claimed_at?: Maybe<Scalars['Float']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum ClaimStatus {
  Claimed = 'CLAIMED',
  Unclaimed = 'UNCLAIMED'
}

export type CompressedBalance = {
  __typename?: 'CompressedBalance';
  account_count: Scalars['Int']['output'];
  balance: Scalars['String']['output'];
  token_mint: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
};

export type DecompressInstructionResponse = {
  __typename?: 'DecompressInstructionResponse';
  amount?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  recipientAta?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  transaction?: Maybe<Scalars['String']['output']>;
};

export type EligibleUser = {
  __typename?: 'EligibleUser';
  created_at: Scalars['Float']['output'];
  mailbox: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
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
  address?: Maybe<Scalars['String']['output']>;
  authority: Scalars['String']['output'];
  body: Scalars['String']['output'];
  created_at: Scalars['Float']['output'];
  events: Array<Event>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  is_favorite: Scalars['Boolean']['output'];
  is_inbox_favorite: Scalars['Boolean']['output'];
  is_outbox_favorite: Scalars['Boolean']['output'];
  iv: Scalars['String']['output'];
  label: MailLabel;
  mailbox: Scalars['String']['output'];
  mailboxAccount?: Maybe<MailAccount>;
  mark_as_read: Scalars['Boolean']['output'];
  parentMail?: Maybe<Mail>;
  parent_id?: Maybe<Scalars['String']['output']>;
  public_key?: Maybe<Scalars['String']['output']>;
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

export enum MailFavoriteType {
  Inbox = 'inbox',
  Outbox = 'outbox'
}

export enum MailLabel {
  Inbox = 'Inbox',
  Outbox = 'Outbox',
  Payment = 'Payment',
  Read = 'Read',
  Spam = 'Spam',
  Trash = 'Trash'
}

export type MailMutationResponse = {
  __typename?: 'MailMutationResponse';
  mail?: Maybe<Mail>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

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

export type Mutation = {
  __typename?: 'Mutation';
  claimAirdrop: ClaimAirdropResponse;
  createDecompressInstruction: DecompressInstructionResponse;
  generatePinataToken: PinataTokenResponse;
  updateMailFavoriteStatus: MailMutationResponse;
  updateMailReadStatus: MailMutationResponse;
};


export type MutationClaimAirdropArgs = {
  airdropAddress: Scalars['String']['input'];
  transactionSignature: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
};


export type MutationCreateDecompressInstructionArgs = {
  airdropAddress: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
};


export type MutationUpdateMailFavoriteStatusArgs = {
  isFavorite: Scalars['Boolean']['input'];
  mailId: Scalars['String']['input'];
  type: MailFavoriteType;
  wallet: Scalars['String']['input'];
};


export type MutationUpdateMailReadStatusArgs = {
  mailId: Scalars['String']['input'];
  markAsRead: Scalars['Boolean']['input'];
};

export type PinataTokenResponse = {
  __typename?: 'PinataTokenResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  activeBids: BidsPaginatedResponse;
  airdrop?: Maybe<Airdrop>;
  airdropJobStatus: AirdropJobStatus;
  airdropsByAuthority: AirdropList;
  airdropsByMint: AirdropList;
  bid?: Maybe<BidResponse>;
  bidEvents: EventsPaginatedResponse;
  calculateAirdropCost: AirdropCostEstimate;
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
  mailsBySenderUsername: MailsResponse;
  mailsByType: MailsResponse;
  marketplaceSettings?: Maybe<MarketplaceSettings>;
  recentTransactions: TransactionsPaginatedResponse;
  transaction?: Maybe<Transaction>;
  user?: Maybe<User>;
  userAirdropClaims: AirdropDistributionList;
  userAirdropEligibility: AirdropEligibility;
  userAirdrops: UserAirdropsList;
  userBids: UserBidsResponse;
  userCompressedBalance: CompressedBalance;
  userFavorites: MailsResponse;
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


export type QueryAirdropArgs = {
  airdropAddress: Scalars['String']['input'];
};


export type QueryAirdropJobStatusArgs = {
  airdropAddress: Scalars['String']['input'];
};


export type QueryAirdropsByAuthorityArgs = {
  authority: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAirdropsByMintArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tokenMint: Scalars['String']['input'];
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


export type QueryMailsBySenderUsernameArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  recipientWallet?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type QueryMailsByTypeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
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


export type QueryUserAirdropClaimsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryUserAirdropEligibilityArgs = {
  airdropAddress: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
};


export type QueryUserAirdropsArgs = {
  claimed?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  wallet: Scalars['String']['input'];
};


export type QueryUserBidsArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryUserCompressedBalanceArgs = {
  tokenMint: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
};


export type QueryUserFavoritesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateMailReadStatusResponse = {
  __typename?: 'UpdateMailReadStatusResponse';
  mail?: Maybe<Mail>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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

export type UserAirdropsList = {
  __typename?: 'UserAirdropsList';
  has_more: Scalars['Boolean']['output'];
  items: Array<AirdropDistribution>;
  total_count: Scalars['Int']['output'];
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

export type DecompressMutationVariables = Exact<{
  airdropAddress: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
}>;


export type DecompressMutation = { __typename?: 'Mutation', createDecompressInstruction: { __typename?: 'DecompressInstructionResponse', success: boolean, transaction?: string | null, amount?: string | null, recipientAta?: string | null, message: string } };

export type ClaimAirdropMutationVariables = Exact<{
  airdropAddress: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
  transactionSignature: Scalars['String']['input'];
}>;


export type ClaimAirdropMutation = { __typename?: 'Mutation', claimAirdrop: { __typename?: 'ClaimAirdropResponse', success: boolean, claimed_at?: number | null, message: string } };

export type MarkMailAsFavoriteMutationVariables = Exact<{
  mailId: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
  type: MailFavoriteType;
  wallet: Scalars['String']['input'];
}>;


export type MarkMailAsFavoriteMutation = { __typename?: 'Mutation', updateMailFavoriteStatus: { __typename?: 'MailMutationResponse', success: boolean, message: string, mail?: { __typename?: 'Mail', id: string, is_inbox_favorite: boolean, is_outbox_favorite: boolean } | null } };

export type UpdateMailReadStatusMutationVariables = Exact<{
  mailId: Scalars['String']['input'];
  markAsRead: Scalars['Boolean']['input'];
}>;


export type UpdateMailReadStatusMutation = { __typename?: 'Mutation', updateMailReadStatus: { __typename?: 'MailMutationResponse', success: boolean, message: string, mail?: { __typename?: 'Mail', id: string, subject: string, mark_as_read: boolean, from: string, to: string } | null } };

export type GetAirdropQueryVariables = Exact<{
  airdropAddress: Scalars['String']['input'];
}>;


export type GetAirdropQuery = { __typename?: 'Query', airdrop?: { __typename?: 'Airdrop', airdrop_address: string, authority: string, token_mint: string, total_amount: string, amount_per_user: string, max_recipients: number, created_at: number, status: string, distributed_count: number, failed_count: number, compressed: boolean, compress_signature?: string | null, retry_count: number, last_processed_index: number, completed_at?: number | null, snapshot_timestamp: number, transaction_signature: string, name: string, message: string } | null };

export type GetAirdropJobStatusQueryVariables = Exact<{
  airdropAddress: Scalars['String']['input'];
}>;


export type GetAirdropJobStatusQuery = { __typename?: 'Query', airdropJobStatus: { __typename?: 'AirdropJobStatus', airdrop_address: string, token_mint: string, status: string, total_eligible: number, distributed_count: number, remaining_count: number, failed_count: number, progress_percentage: number, estimated_completion_time?: string | null, last_updated: number } };

export type GetUserAirdropsQueryVariables = Exact<{
  wallet: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  claimed?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetUserAirdropsQuery = { __typename?: 'Query', userAirdrops: { __typename?: 'UserAirdropsList', total_count: number, has_more: boolean, items: Array<{ __typename?: 'AirdropDistribution', name: string, message: string, airdrop_address: string, recipient_wallet: string, amount: string, token_mint: string, distributed_at: number, claim_status: ClaimStatus, claimed_at?: number | null, claim_transaction_signature?: string | null }> } };

export type GetUserMailsQueryVariables = Exact<{
  wallet: Scalars['String']['input'];
  type: MailType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserMailsQuery = { __typename?: 'Query', mailsByType: { __typename?: 'MailsResponse', wallet: string, count: number, mails: Array<{ __typename?: 'Mail', id: string, from: string, to: string, subject: string, body: string, label: MailLabel, mark_as_read: boolean, version: string, public_key?: string | null, created_at: number, is_inbox_favorite: boolean, is_outbox_favorite: boolean, senderMailAccount?: { __typename?: 'MailAccount', authority: string, mailbox?: string | null, linkedUsernames: Array<{ __typename?: 'Username', username: string, domain: string }> } | null, recipientMailAccount?: { __typename?: 'MailAccount', authority: string, mailbox?: string | null } | null }>, appliedFilters?: { __typename?: 'AppliedFilters', excludedLabels?: Array<MailLabel> | null, usedGSI: boolean } | null } };

export type CheckAirdropClaimQueryVariables = Exact<{
  airdropAddress: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
}>;


export type CheckAirdropClaimQuery = { __typename?: 'Query', userAirdropEligibility: { __typename?: 'AirdropEligibility', airdrop_address: string, wallet: string, is_eligible: boolean, has_claimed: boolean, amount?: number | null, claimed_at?: number | null, claim_transaction_signature?: string | null } };


export const DecompressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Decompress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDecompressInstruction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"airdropAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"transaction"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"recipientAta"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DecompressMutation, DecompressMutationVariables>;
export const ClaimAirdropDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClaimAirdrop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transactionSignature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claimAirdrop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"airdropAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"transactionSignature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transactionSignature"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"claimed_at"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ClaimAirdropMutation, ClaimAirdropMutationVariables>;
export const MarkMailAsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkMailAsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MailFavoriteType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMailFavoriteStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFavorite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"mail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_inbox_favorite"}},{"kind":"Field","name":{"kind":"Name","value":"is_outbox_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<MarkMailAsFavoriteMutation, MarkMailAsFavoriteMutationVariables>;
export const UpdateMailReadStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMailReadStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markAsRead"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMailReadStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailId"}}},{"kind":"Argument","name":{"kind":"Name","value":"markAsRead"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markAsRead"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"mail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"mark_as_read"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMailReadStatusMutation, UpdateMailReadStatusMutationVariables>;
export const GetAirdropDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAirdrop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdrop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"airdropAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdrop_address"}},{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"token_mint"}},{"kind":"Field","name":{"kind":"Name","value":"total_amount"}},{"kind":"Field","name":{"kind":"Name","value":"amount_per_user"}},{"kind":"Field","name":{"kind":"Name","value":"max_recipients"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"distributed_count"}},{"kind":"Field","name":{"kind":"Name","value":"failed_count"}},{"kind":"Field","name":{"kind":"Name","value":"compressed"}},{"kind":"Field","name":{"kind":"Name","value":"compress_signature"}},{"kind":"Field","name":{"kind":"Name","value":"retry_count"}},{"kind":"Field","name":{"kind":"Name","value":"last_processed_index"}},{"kind":"Field","name":{"kind":"Name","value":"completed_at"}},{"kind":"Field","name":{"kind":"Name","value":"snapshot_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_signature"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetAirdropQuery, GetAirdropQueryVariables>;
export const GetAirdropJobStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAirdropJobStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdropJobStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"airdropAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdrop_address"}},{"kind":"Field","name":{"kind":"Name","value":"token_mint"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"total_eligible"}},{"kind":"Field","name":{"kind":"Name","value":"distributed_count"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_count"}},{"kind":"Field","name":{"kind":"Name","value":"failed_count"}},{"kind":"Field","name":{"kind":"Name","value":"progress_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_completion_time"}},{"kind":"Field","name":{"kind":"Name","value":"last_updated"}}]}}]}}]} as unknown as DocumentNode<GetAirdropJobStatusQuery, GetAirdropJobStatusQueryVariables>;
export const GetUserAirdropsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAirdrops"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimed"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAirdrops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"claimed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"airdrop_address"}},{"kind":"Field","name":{"kind":"Name","value":"recipient_wallet"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token_mint"}},{"kind":"Field","name":{"kind":"Name","value":"distributed_at"}},{"kind":"Field","name":{"kind":"Name","value":"claim_status"}},{"kind":"Field","name":{"kind":"Name","value":"claimed_at"}},{"kind":"Field","name":{"kind":"Name","value":"claim_transaction_signature"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total_count"}},{"kind":"Field","name":{"kind":"Name","value":"has_more"}}]}}]}}]} as unknown as DocumentNode<GetUserAirdropsQuery, GetUserAirdropsQueryVariables>;
export const GetUserMailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserMails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MailType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mailsByType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"mails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"mark_as_read"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"public_key"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"is_inbox_favorite"}},{"kind":"Field","name":{"kind":"Name","value":"is_outbox_favorite"}},{"kind":"Field","name":{"kind":"Name","value":"senderMailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"mailbox"}},{"kind":"Field","name":{"kind":"Name","value":"linkedUsernames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipientMailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"mailbox"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"appliedFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excludedLabels"}},{"kind":"Field","name":{"kind":"Name","value":"usedGSI"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMailsQuery, GetUserMailsQueryVariables>;
export const CheckAirdropClaimDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckAirdropClaim"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAirdropEligibility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"airdropAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"airdropAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdrop_address"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"is_eligible"}},{"kind":"Field","name":{"kind":"Name","value":"has_claimed"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claimed_at"}},{"kind":"Field","name":{"kind":"Name","value":"claim_transaction_signature"}}]}}]}}]} as unknown as DocumentNode<CheckAirdropClaimQuery, CheckAirdropClaimQueryVariables>;
type TokenStats = {
  priceChange: number;
  liquidityChange?: number;
  volumeChange?: number;
  buyVolume?: number;
  sellVolume?: number;
  buyOrganicVolume?: number;
  sellOrganicVolume?: number;
  numBuys?: number;
  numSells?: number;
  numTraders?: number;
  numOrganicBuyers?: number;
  numNetBuyers?: number;
};

type TokenAudit = {
  mintAuthorityDisabled?: boolean;
  freezeAuthorityDisabled?: boolean;
  topHoldersPercentage: number;
};

type TokenAPY = {
  jupEarn?: number;
};

type TokenPool = {
  id: string;
  createdAt: string;
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
  twitter?: string;
  discord?: string;
  website?: string;
  dev?: string;
  circSupply: number;
  totalSupply: number;
  tokenProgram: string;
  mintAuthority?: string;
  freezeAuthority?: string;
  firstPool: TokenPool;
  holderCount: number;
  audit: TokenAudit;
  apy: TokenAPY;
  organicScore: number;
  organicScoreLabel: string;
  isVerified: boolean;
  tags: string[];
  createdAt: string;
  fdv: number;
  mcap: number;
  usdPrice: number;
  priceBlockId: number;
  liquidity: number;
  stats5m: TokenStats;
  stats1h?: TokenStats;
  stats6h?: TokenStats;
  stats24h?: TokenStats;
  stats7d?: TokenStats;
  stats30d?: TokenStats;
  ctLikes?: number;
  smartCtLikes?: number;
  updatedAt?: string;
};

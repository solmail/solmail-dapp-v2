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

export enum JupiterSwapFormKeys {
  "in" = "in",
  "out" = "out",
}

export type JupiterSwapForm = {
  [K in JupiterSwapFormKeys]: string;
};

export type JupiterQuoteParams = JupiterSwapForm & {
  amount: string;
};

export type JupiterQuoteResponse = {
  swapType: string;
  router: string;
  requestId: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: "ExactIn" | "ExactOut" | string;
  slippageBps: number;
  priceImpactPct: string;
  routePlan: {
    swapInfo: {
      ammKey: string;
      label: string;
      inputMint: string;
      outputMint: string;
      inAmount: string;
      outAmount: string;
      feeAmount: string;
      feeMint: string;
      marketIncurredSlippageBpsF64: string;
    };
    percent: number;
    bps: number;
    usdValue: number;
  }[];
  inputMint: string;
  outputMint: string;
  feeMint: string;
  feeBps: number;
  platformFee: {
    feeBps: number;
  };
  taker: string;
  gasless: boolean;
  signatureFeeLamports: number;
  signatureFeePayer: string;
  prioritizationFeeLamports: number;
  prioritizationFeePayer: string;
  rentFeeLamports: number;
  rentFeePayer: string;
  transaction: string;
  inUsdValue: number;
  outUsdValue: number;
  swapUsdValue: number;
  priceImpact: number;
  mode: string;
  totalTime: number;
};

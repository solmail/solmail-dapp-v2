import Logo from "@assets/logo.png";
export const config = {
  SOLMAIL_CONTRACT: import.meta.env.VITE_SOLMAIL_CONTRACT_ADDRESS,
  logo: Logo,
};

export const PINATA_GATEWAY_URL = import.meta.env.VITE_SOLMAIL_PINATA_BASE_URL;

export const MAXIMUM_MAIL_SUBJECT_LENGTH = 50;

export const RPC_ENDPOINT = `${import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT}?api-key=${import.meta.env.VITE_SOLMAIL_RPC_API_KEY}`;

export const HELIUS_API_ENDPOINT = `https://api-devnet.helius.xyz/v0/`;

export const NO_BALANCE_LABEL = `Insufficient Balance`;

export const TELEGRAM_URL = `https://t.me/solmailofficial`;
export const TWITTER_URL = `https://x.com/SolMailOfficial`;
export const INSTAGRAM_URL = `https://www.instagram.com/solmailofficial/`;
export const DOCS_URL = `https://docs.solmail.so/`;

export const PRIVACY_POLICY_LINK =
  "https://elastic-grip-d07.notion.site/Privacy-Policy-25750f9ac71680129ef5e99dc1ac860f";
export const TERMS_AND_CONDITIONS_LINK =
  "https://elastic-grip-d07.notion.site/Terms-and-conditions-25750f9ac7168058b39ded4c2316ec37";

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_SOLMAIL_API_KEY,
  authDomain: import.meta.env.VITE_SOLMAIL_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_SOLMAIL_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SOLMAIL_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SOLMAIL_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SOLMAIL_APP_ID,
  measurementId: import.meta.env.VITE_SOLMAIL_MEASUREMENT_ID,
};

export const ENABLE_USERNAME_CLAIM =
  import.meta.env.VITE_SOLMAIL_ENABLE_USERNAME_CLAIM === "true";

export const STORAGE_NAME = "auth:token";

export const MAILS_PER_PAGE = 13;
export const DEFAULT_MAILS_OFFSET = 0;

export const FCM_STORAGE_KEY = "_i_";

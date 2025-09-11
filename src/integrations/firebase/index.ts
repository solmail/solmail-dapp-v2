import { FIREBASE_CONFIG } from "@const/config";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

export const app = initializeApp(FIREBASE_CONFIG);
export const messaging = getMessaging(app);

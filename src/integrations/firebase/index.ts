import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCwxBwXIgJq3ELDAfywvPktd1uvCL12HyA",
  authDomain: "solmail-v2.firebaseapp.com",
  projectId: "solmail-v2",
  storageBucket: "solmail-v2.firebasestorage.app",
  messagingSenderId: "196607540208",
  appId: "1:196607540208:web:b769e52612f6076a3f7b35",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

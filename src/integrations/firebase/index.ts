import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDKpWKWmhGgekdxIm5fEPYw8R3SDht2Ook",
  authDomain: "mail-88238.firebaseapp.com",
  projectId: "mail-88238",
  storageBucket: "mail-88238.firebasestorage.app",
  messagingSenderId: "938559469938",
  appId: "1:938559469938:web:d273fbdf4e7d58296f05eb",
  measurementId: "G-NBMH17W3DC",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

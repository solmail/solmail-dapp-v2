importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDKpWKWmhGgekdxIm5fEPYw8R3SDht2Ook",
  authDomain: "mail-88238.firebaseapp.com",
  projectId: "mail-88238",
  storageBucket: "mail-88238.firebasestorage.app",
  messagingSenderId: "938559469938",
  appId: "1:938559469938:web:d273fbdf4e7d58296f05eb",
  measurementId: "G-NBMH17W3DC",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "📬 SolMail";
  const notificationOptions = {
    body: payload.notification?.body || "You’ve got a new message.",
    icon: "https://solmail.so/_next/static/media/logo-only.be4816dc.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

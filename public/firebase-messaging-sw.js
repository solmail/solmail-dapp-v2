importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCwxBwXIgJq3ELDAfywvPktd1uvCL12HyA",
  authDomain: "solmail-v2.firebaseapp.com",
  projectId: "solmail-v2",
  storageBucket: "solmail-v2.firebasestorage.app",
  messagingSenderId: "196607540208",
  appId: "1:196607540208:web:b769e52612f6076a3f7b35",
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

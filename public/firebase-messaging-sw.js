importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDBLySmBfoZa-x8lQWA-WRugo-Zrw1-QEo",
  authDomain: "solmailapp.firebaseapp.com",
  projectId: "solmailapp",
  storageBucket: "solmailapp.firebasestorage.app",
  messagingSenderId: "845553486616",
  appId: "1:845553486616:web:7ea22c5f7e47770875ec6d",
  measurementId: "G-RSRW01NR4B",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { icon, click_action, body, title } = payload.data || {};

  if (!title || !body) {
    return;
  }

  const notificationTitle = title ?? "You have a new email in your inbox.";

  const notificationOptions = {
    body,
    icon,
    data: {
      url: click_action,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url.includes(event.notification.data.url) &&
            "focus" in client
          ) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});

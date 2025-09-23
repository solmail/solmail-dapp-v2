importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "VITE_SOLMAIL_API_KEY",
  authDomain: "VITE_SOLMAIL_AUTH_DOMAIN",
  projectId: "VITE_SOLMAIL_PROJECT_ID",
  storageBucket: "VITE_SOLMAIL_STORAGE_BUCKET",
  messagingSenderId: "VITE_SOLMAIL_MESSAGING_SENDER_ID",
  appId: "VITE_SOLMAIL_APP_ID",
  measurementId: "VITE_SOLMAIL_MEASUREMENT_ID",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, url, icon } = payload.data || {};

  const notificationTitle = "You have a new email in your inbox.";
  const notificationOptions = {
    body: "New Mail Received",
    icon,
    data: {
      url: url,
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

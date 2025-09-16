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

// Handle background push messages
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received background message", payload);

  const { title, body, url } = payload.data || {};

  const notificationTitle = title || "New Message";
  const notificationOptions = {
    body: body || "You have a new Solmail.",
    icon: "https://www.solmail.so/_next/static/media/logo-only.be4816dc.png",
    data: {
      url: url || "http://localhost:3030/",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle clicks on the notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes("localhost") && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});

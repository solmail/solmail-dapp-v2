importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCwxBwXIgJq3ELDAfywvPktd1uvCL12HyA",
  authDomain: "solmail-v2.firebaseapp.com",
  projectId: "solmail-v2",
  storageBucket: "solmail-v2.firebasestorage.app",
  messagingSenderId: "196607540208",
  appId: "1:196607540208:web:b769e52612f6076a3f7b35",
  measurementId: "G-0X49VLGKBP",
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

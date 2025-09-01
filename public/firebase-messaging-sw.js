importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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
  const notification = payload.data;
  if (!notification) {
    return;
  }

  const notificationOptions = {
    ...notification,
    icon: "https://www.solmail.so/_next/static/media/logo-only.be4816dc.png",
    data: {
      url: "http://localhost:3030/",
      clickAction: "open_app",
    },
  };
  console.log("here notfi");
  if (notification && notification.title) {
    self.registration.showNotification(notification.title, notificationOptions);
  }
});
console.log("here");
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received: ", event);

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          console.log(client);
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

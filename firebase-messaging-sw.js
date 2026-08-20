importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDo6kwf9QtiLXCelZDSy_a6ktv6mTC6fa4",
  authDomain: "oursky-1b847.firebaseapp.com",
  databaseURL: "https://oursky-1b847-default-rtdb.firebaseio.com",
  projectId: "oursky-1b847",
  storageBucket: "oursky-1b847.firebasestorage.app",
  messagingSenderId: "1029333881661",
  appId: "1:1029333881661:web:0ffef5df392bc984c7ab54"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || 'a sky for the two of us';
  const options = {
    body: data.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png'
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

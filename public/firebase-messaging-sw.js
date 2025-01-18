// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

//const firebaseConfig = {
//  apiKey: "AIzaSyBZNkESD1ePURF5bcthDnYbZphva-_vrdQ",
//  authDomain: "pentagon-5171c.firebaseapp.com",
//  projectId: "pentagon-5171c",
//  storageBucket: "pentagon-5171c.firebasestorage.app",
//  messagingSenderId: "558499095211",
//  appId: "1:558499095211:web:a4c334870ccf78c4bdcdee",
//};

const firebaseConfig = {
  apiKey: "AIzaSyBEqxP9JUdBnwGuBX2I20wZ_vpoEg_WmbQ",
  authDomain: "bc-babay.firebaseapp.com",
  projectId: "bc-babay",
  storageBucket: "bc-babay.firebasestorage.app",
  messagingSenderId: "901840951098",
  appId: "1:901840951098:web:9f65d7c473f98041f0e203",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "../src/assets/logoWhite.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

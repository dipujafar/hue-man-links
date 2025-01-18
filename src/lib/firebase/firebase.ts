// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEqxP9JUdBnwGuBX2I20wZ_vpoEg_WmbQ",
  authDomain: "bc-babay.firebaseapp.com",
  projectId: "bc-babay",
  storageBucket: "bc-babay.firebasestorage.app",
  messagingSenderId: "901840951098",
  appId: "1:901840951098:web:9f65d7c473f98041f0e203",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
let messaging: any = null;
try {
  messaging = getMessaging(firebaseApp);
} catch (error) {
  console.error("Error initializing Firebase Messaging:", error);
}
export { messaging };

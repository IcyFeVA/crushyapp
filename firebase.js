// firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDlAxbCBQNee9tEf3-myE4D4ALyt5G1mbc",
  authDomain: "crushy-2a133.firebaseapp.com",
  projectId: "crushy-2a133",
  storageBucket: "crushy-2a133.appspot.com",
  messagingSenderId: "36536394826",
  appId: "1:36536394826:android:a4a4da323d66a56f5a72b3"
};

let app;
let messaging;

try {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, messaging };
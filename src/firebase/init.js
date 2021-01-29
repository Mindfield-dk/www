import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";

let config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);
const db = firebase.firestore();
const cf = firebase.functions();

if (process.env.VUE_APP_ENV === "dev") {
  cf.useEmulator("127.0.0.1", 5001);
  db.settings({
    host: "127.0.0.1:8080",
    ssl: false,
  });
}

export { db, cf };

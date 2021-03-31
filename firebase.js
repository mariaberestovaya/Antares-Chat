import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnbO4TD1rI5mKTpVTejZpL6t1PvlZChN4",
  authDomain: "antares-chat-e54f5.firebaseapp.com",
  projectId: "antares-chat-e54f5",
  storageBucket: "antares-chat-e54f5.appspot.com",
  messagingSenderId: "232852835020",
  appId: "1:232852835020:web:a9ecb262cfdc5740ba5069",
  measurementId: "G-7NKLMD17C9",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

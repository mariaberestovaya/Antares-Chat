import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW2DbGe-2UGWBjTodtVvDd8yOnlm1Vkkg",
  authDomain: "fast-drake-332019.firebaseapp.com",
  projectId: "fast-drake-332019",
  storageBucket: "fast-drake-332019.appspot.com",
  messagingSenderId: "337873085464",
  appId: "1:337873085464:web:b126087df56289550ccf6d",
  measurementId: "G-G0R8H3MQKB"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

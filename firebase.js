import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcYaVbmzhnTNTDyNthgRa-TJ5uoNgpnds",
  authDomain: "vespertilio-chat.firebaseapp.com",
  projectId: "vespertilio-chat",
  storageBucket: "vespertilio-chat.appspot.com",
  messagingSenderId: "513339664871",
  appId: "1:513339664871:web:6c0916eb92885ce40df542",
  measurementId: "G-CYRE7W31PG"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

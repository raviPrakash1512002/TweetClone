import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9lhYqGcR3csTmEvPLesaJKENPdSC9y04",
  authDomain: "react-chat-99f6d.firebaseapp.com",
  databaseURL: "https://react-chat-99f6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-99f6d",
  storageBucket: "react-chat-99f6d.appspot.com",
  messagingSenderId: "5333701425",
  appId: "1:5333701425:web:e2d4cdf0f0fa70fe2d9610"
};


firebase.initializeApp(firebaseConfig);
export const db =firebase.firestore();
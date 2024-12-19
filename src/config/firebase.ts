// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaqHlAKVZckd2eqkQrA-F8Ql3mndsCc_Y",
  authDomain: "lovejollof-39a94.firebaseapp.com",
  projectId: "lovejollof-39a94",
  storageBucket: "lovejollof-39a94.firebasestorage.app",
  messagingSenderId: "20834141401",
  appId: "1:20834141401:web:02baa37252519a2c72aac8",
  measurementId: "G-0E9S6YJHLN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const usersCollection = collection(db, "users");
export const roomsCollection = collection(db, "rooms");

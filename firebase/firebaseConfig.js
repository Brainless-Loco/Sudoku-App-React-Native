// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYHfQAIOQq0zyP3xqpjc9RoOIXYgMWTi4",
  authDomain: "sudokuforever-b9936.firebaseapp.com",
  projectId: "sudokuforever-b9936",
  storageBucket: "sudokuforever-b9936.appspot.com",
  messagingSenderId: "458040946328",
  appId: "1:458040946328:web:9b0962e6f07b678f976aed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();
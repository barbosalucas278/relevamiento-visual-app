// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqw5UVvQmtncuDHzhhUBJwQ0w_8Tm5N78",
  authDomain: "usuarios-pps-81d8e.firebaseapp.com",
  projectId: "usuarios-pps-81d8e",
  storageBucket: "usuarios-pps-81d8e.appspot.com",
  messagingSenderId: "346468749693",
  appId: "1:346468749693:web:356cb3c99d4f39396e3c14",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  
  authDomain: "mern-blog-393d4.firebaseapp.com",
  projectId: "mern-blog-393d4",
  storageBucket: "mern-blog-393d4.appspot.com",
  messagingSenderId: "1032763242009",
  appId: "1:1032763242009:web:57580a96e982002eca1c88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
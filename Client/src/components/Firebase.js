
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC-v2MJS2tWnH-IIV1gcKzvASkLkNhviZk",
  authDomain: "user-auth-2d5b4.firebaseapp.com",
  projectId: "user-auth-2d5b4",
  storageBucket: "user-auth-2d5b4.firebasestorage.app",
  messagingSenderId: "260228551217",
  appId: "1:260228551217:web:411dfa8988e033c988bb10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
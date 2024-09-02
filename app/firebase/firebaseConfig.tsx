// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA_MsMgHXqiBWJ8-bTMYNgyAS92F4F2ZaY",
  authDomain: "todo-app-8868c.firebaseapp.com",
  projectId: "todo-app-8868c",
  storageBucket: "todo-app-8868c.appspot.com",
  messagingSenderId: "535568742738",
  appId: "1:535568742738:web:4d5d6faed9668146a2a28b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;

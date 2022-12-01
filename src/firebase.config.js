import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3lq0vMlTd390btkxNTK1sysKrtzKe3bI",
  authDomain: "housemarket-app-8b5aa.firebaseapp.com",
  projectId: "housemarket-app-8b5aa",
  storageBucket: "housemarket-app-8b5aa.appspot.com",
  messagingSenderId: "243757033366",
  appId: "1:243757033366:web:a3ca0521abbb3830c15fb7"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export const db = getFirestore()
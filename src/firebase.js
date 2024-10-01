// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFy8VtsTt73wwNoCVH2FfPgXjT-dlTe_4",
    authDomain: "a4embalagens-9e412.firebaseapp.com",
    projectId: "a4embalagens-9e412",
    storageBucket: "a4embalagens-9e412.appspot.com",
    messagingSenderId: "1010508704355",
    appId: "1:1010508704355:web:7fbb5ed9e864d93b336656"
  };

  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

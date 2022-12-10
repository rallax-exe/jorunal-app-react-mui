// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs_XE5cFT6hy2PKDacQ62Mgp6VAoJocfg",
  authDomain: "react-cursos-2b739.firebaseapp.com",
  projectId: "react-cursos-2b739",
  storageBucket: "react-cursos-2b739.appspot.com",
  messagingSenderId: "1077804089375",
  appId: "1:1077804089375:web:7964a29e20af2ba21d552a"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
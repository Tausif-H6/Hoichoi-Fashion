// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Ad0itM7X7yME9soMfunK9gApvgT4Z1w",
  authDomain: "hoichoi-fashion.firebaseapp.com",
  projectId: "hoichoi-fashion",
  storageBucket: "hoichoi-fashion.appspot.com",
  messagingSenderId: "434048649604",
  appId: "1:434048649604:web:c659597de4baed8c0db5d1",
  measurementId: "G-E3PE57LW9G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Corrected line to initialize the auth object

export { db, storage, auth };

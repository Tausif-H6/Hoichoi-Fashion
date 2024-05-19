// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDPyQGMn9dWwX6XrfzQ0WjUgvYOH7wDkPQ",
//   authDomain: "hoicoi.firebaseapp.com",
//   projectId: "hoicoi",
//   storageBucket: "hoicoi.appspot.com",
//   messagingSenderId: "725345752656",
//   appId: "1:725345752656:web:6aa00727a0e023e30b2355",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCQxaLPbXU9N7Zt0NQvJFBx-w2X20DRt4I",
  authDomain: "hasbi-663ae.firebaseapp.com",
  projectId: "hasbi-663ae",
  storageBucket: "hasbi-663ae.appspot.com",
  messagingSenderId: "177805077424",
  appId: "1:177805077424:web:fbe35d04bcfe52a59dc475",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Corrected line to initialize the auth object

export { db, storage, auth };

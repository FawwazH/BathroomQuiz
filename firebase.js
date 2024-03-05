// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJCyN8-c9dUzjvBwysfbEJ0wlYgk74lYU",
  authDomain: "bathroom-quiz-d7f3f.firebaseapp.com",
  projectId: "bathroom-quiz-d7f3f",
  storageBucket: "bathroom-quiz-d7f3f.appspot.com",
  messagingSenderId: "867377294754",
  appId: "1:867377294754:web:f65a761b52b628c771d6fb",
  measurementId: "G-6LY6GH7VLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoyKEF6VZ5RH49rJi8GzwPYkQuSxr7umA",
    authDomain: "vite-contact-af488.firebaseapp.com",
    projectId: "vite-contact-af488",
    storageBucket: "vite-contact-af488.firebasestorage.app",
    messagingSenderId: "535582117651",
    appId: "1:535582117651:web:e3c6e6006d8ec121b5d4e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth();
export { auth, db, app, storage };
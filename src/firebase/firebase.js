// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app)

export default ({ app, auth })
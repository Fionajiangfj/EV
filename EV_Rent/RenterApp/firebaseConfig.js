// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Updated import for auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiVsngmESHVTR1mh2HciemhXZfpl2SEYE",
  authDomain: "evrentingapp.firebaseapp.com",
  projectId: "evrentingapp",
  storageBucket: "evrentingapp.appspot.com",
  messagingSenderId: "930454821860",
  appId: "1:930454821860:web:00c93cc4ea17e6c99b45f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Export firestore database and auth so the rest of the app can access
export { app, auth, db };


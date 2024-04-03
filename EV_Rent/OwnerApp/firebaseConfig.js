// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


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

// Export firestore database so the rest of the app can access
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { auth, db };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore (if needed)
import { getAnalytics } from "firebase/analytics"; // Optional, if using Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWlkL9k75yszTKogTWuAgTAeKgQbcOlfw",
  authDomain: "chatapp-220a9.firebaseapp.com",
  databaseURL: "https://chatapp-220a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatapp-220a9",
  storageBucket: "chatapp-220a9.appspot.com",
  messagingSenderId: "622999188718",
  appId: "1:622999188718:web:b2c33ae872bdfe5f9f2fff",
  measurementId: "G-7TMJW8PCDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional

// Export Firebase services
export const auth = getAuth(app); // For Authentication
export const firestore = getFirestore(app); // For Firestore (if needed)

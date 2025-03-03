import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNalCZQnbmB_75smN5Sog24i7RWBxcWO8",
  authDomain: "zidio-task-management-3ebcc.firebaseapp.com",
  projectId: "zidio-task-management-3ebcc",
  storageBucket: "zidio-task-management-3ebcc.firebasestorage.app",
  messagingSenderId: "994181368707",
  appId: "1:994181368707:web:9381a9589ddaaf065044b6",
  measurementId: "G-7R46HGDM6Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

export { auth, googleProvider, signInWithGoogle };

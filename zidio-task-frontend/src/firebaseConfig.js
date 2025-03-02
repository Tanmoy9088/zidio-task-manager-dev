import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNalCZQnbmB_75smN5Sog24i7RWBxcWO8",
  authDomain: "zidio-task-management-3ebcc.firebaseapp.com",
  projectId: "zidio-task-management-3ebcc",
  storageBucket: "zidio-task-management-3ebcc.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

export { auth, signInWithGoogle };

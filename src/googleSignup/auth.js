import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../Configs/firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error during login", error);
  }
};

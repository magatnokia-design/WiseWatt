// Firebase Authentication Service
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth } from "./config";

export const authService = {
  // Register new user
  register: async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  },

  // Login user
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Logout user
  logout: async () => {
    await signOut(auth);
  },

  // Forgot password
  resetPassword: async (email) => {
    await sendPasswordResetEmail(auth, email);
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  }
};
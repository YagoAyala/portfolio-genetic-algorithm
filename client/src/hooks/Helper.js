import { initializeApp } from "firebase/app";
import {
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import firebaseConfig from "../config/firebase.json";

import "firebase/firestore";

const app = initializeApp(firebaseConfig);

const googleAuth = async () => {
  try {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    await signOut(auth);

    const { user } = await signInWithPopup(auth, provider);
    const token = await auth.currentUser.getIdToken();

    return { token: token, email: user.email, auth_type: "GOOGLE" };
  } catch (error) {
    return error;
  }
};

const emailAuth = async (email, password) => {
  try {
    const auth = getAuth(app);

    await signOut(auth);

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await auth.currentUser.getIdToken();

    return { token: token, email: user.email, auth_type: "EMAIL" };
  } catch (error) {
    return error;
  }
};

const passwordReset = async (email) => {
  try {
    const auth = getAuth(app);
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(error);
  }
};

const logout = async (reload) => {
  const auth = getAuth(app);
  await signOut(auth);

  localStorage.removeItem("lotoai_bet_list");
  localStorage.removeItem("lotoai_google_token");

  if (reload) {
    window.location.reload();
  }
};

const verifyAuth = async () => {
  const auth = getAuth(app);

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      const tokenExpired = (authUser.authTime + 60 * 60 * 1000) < Date.now();

      if (tokenExpired) {
        alert("Sua sessão expirou. Por favor, faça login novamente.");
        logout();
      }
    } else {
      logout();
    }
  });
};

export {
  logout,
  emailAuth,
  googleAuth,
  verifyAuth,
  passwordReset,
};

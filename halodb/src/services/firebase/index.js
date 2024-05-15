import {getApps,  initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVoW65zzn3G9csE5qXs8k-aso1uI06hVM",
  authDomain: "halodb-ce81d.firebaseapp.com",
  projectId: "halodb-ce81d",
  storageBucket: "halodb-ce81d.appspot.com",
  messagingSenderId: "410039116721",
  appId: "1:410039116721:web:46f8539cd0c85e47a65390",
  measurementId: "G-3XSETQL2SD"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig)
}

export { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, auth}

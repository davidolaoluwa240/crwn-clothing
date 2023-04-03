// Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnm1g496e_H0osEjmXK0x-ddBLRRGpdOU",
  authDomain: "crwn-clothing-db-c08c0.firebaseapp.com",
  projectId: "crwn-clothing-db-c08c0",
  storageBucket: "crwn-clothing-db-c08c0.appspot.com",
  messagingSenderId: "1053198650721",
  appId: "1:1053198650721:web:052d7b98457fc5be130920",
  measurementId: "G-VX4MHKQHZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Analytics Instance
export const analytics = getAnalytics(app);

// Firebase Auth Instance
export const auth = getAuth(app);

// Firebase Firestore Instance
export const db = getFirestore(app);

// Firebase Google Instance
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  try {
    // User Reference
    const userRef = doc(db, "users", userAuth.uid);

    // Get User
    const userSnapshot = await getDoc(userRef);

    //  If User Document Does Not Exist, Then Create A New One
    if (!userSnapshot.exists()) {
      const { displayName, email, uid } = userAuth;
      const createdAt = serverTimestamp();

      // Create User
      await setDoc(userRef, {
        displayName,
        email,
        uid,
        createdAt,
        ...additionalInformation,
      });
    }

    // Return User Ref
    return userRef;
  } catch (err) {
    console.log("Error occur creating user ", err.message);
  }
};

export const createAuthUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

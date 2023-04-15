// Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  serverTimestamp,
  writeBatch,
  query,
  getDocs,
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

/**
 * Add Collection And Documents
 * @param {string} collectionName Collection name
 * @param {array} documents Documents
 * @param {string} documentKey Document key
 */
export const addCollectionAndDocuments = async (
  collectionName,
  documents,
  field = "title"
) => {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);

  documents.forEach((document) => {
    const docRef = doc(collectionRef, document[field].toLowerCase());
    batch.set(docRef, document);
  });

  await batch.commit();
  console.log("Done!");
};

/**
 * Get Categories And Documents
 */
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const categoryQuery = query(collectionRef);
  const querySnapshot = await getDocs(categoryQuery);

  const categoryMap = querySnapshot.docs.reduce((category, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    category[title] = items;
    return category;
  }, {});

  return categoryMap;
};

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

export const signInAuthUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);

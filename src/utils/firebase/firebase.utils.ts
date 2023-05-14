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
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { Category } from "../../store/categories/category.types";

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

export type ObjectToAdd = {
  title: string;
};

/**
 * Add Collection And Documents
 */
export const addCollectionAndDocuments = async (
  collectionName: string,
  documents: ObjectToAdd[]
): Promise<void> => {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);

  documents.forEach((document) => {
    const docRef = doc(collectionRef, document.title.toLowerCase());
    batch.set(docRef, document);
  });

  await batch.commit();
};

/**
 * Get Categories And Documents
 */
export const getCategoriesAndDocuments = async (
  collectionName: string
): Promise<Category[]> => {
  const collectionRef = collection(db, collectionName);
  const categoryQuery = query(collectionRef);
  const querySnapshot = await getDocs(categoryQuery);
  return querySnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...(docSnapshot.data() as Category),
  }));
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User | null,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  let userSnapshot;

  try {
    // User Reference
    const userRef = doc(db, "users", userAuth.uid);

    // Get User
    userSnapshot = await getDoc(userRef);

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
  } catch (err) {
    console.log("Error occur creating user ", err);
  }

  // Return User Snapshot
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });

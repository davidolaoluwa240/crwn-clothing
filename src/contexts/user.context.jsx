// Modules
import { createContext } from "react";

// Hooks
import { useState, useEffect } from "react";

// Utils
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Create User Context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Create User Provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      setCurrentUser(user);
      user && (await createUserDocumentFromAuth(user));
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

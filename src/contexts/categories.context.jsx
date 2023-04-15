// Modules
import { createContext } from "react";

// Hooks
import { useState, useEffect } from "react";

// Utils
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// Create Categories Context
export const CategoriesContext = createContext({
  setCategories: () => {},
  categoriesMap: {},
});

// Create Categories Provider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    (async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

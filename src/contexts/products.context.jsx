// Modules
import { createContext } from "react";

// Hooks
import { useState } from "react";

// Data
import PRODUCTS from "../shop-data.json";

// Create Product Context
export const ProductsContext = createContext({
  setProducts: () => [],
  products: [],
});

// Create Product Provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

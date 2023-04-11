// Modules
import { createContext } from "react";

// Hooks
import { useState } from "react";

// Create Cart Context
export const CartContext = createContext({
  carts: [],
  setCarts: () => [],
  isCartOpen: false,
  setIsCartOpen: () => {},
});

// Create Cart Provider
export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = {
    carts,
    setCarts,
    isCartOpen,
    setIsCartOpen,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

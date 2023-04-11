// Modules
import { createContext, useEffect } from "react";

// Hooks
import { useState } from "react";

// Create Cart Context
export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartCount: 0,
});

// Create Cart Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalCartItem, item) => totalCartItem + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  /**
   * Add Cart Items
   * @param {array} cartItems Cart Items
   * @param {object} product Product
   */
  const addCartItem = (cartItems, product) => {
    const copiedCartItems = cartItems.slice(0);

    const existingCartItem = copiedCartItems.find(
      (item) => item.id === product.id
    );

    if (!existingCartItem) {
      copiedCartItems.push({ ...product, quantity: 1 });
    }

    if (existingCartItem) {
      existingCartItem.quantity++;
    }

    return copiedCartItems;
  };

  /**
   * Add Product To Cart Items
   * @param {object} product Product
   */
  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const value = {
    cartItems,
    addItemToCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

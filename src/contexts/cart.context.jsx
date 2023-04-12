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
  cartTotal: 0,
  setCartTotal: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
});

// Create Cart Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalCartItem, item) => totalCartItem + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  /**
   * Add Cart Item
   * @param {array} cartItems Cart items
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
   * Remove Cart Item
   * @param {array} cartItems Cart items
   * @param {object} product Product
   */
  const removeCartItem = (cartItems, product) => {
    const copiedCartItems = cartItems.slice(0);

    const existingCartItem = copiedCartItems.find(
      (item) => item.id === product.id
    );

    if (existingCartItem.quantity === 1)
      return copiedCartItems.filter((item) => item.id !== product.id);

    if (existingCartItem.quantity > 1) existingCartItem.quantity--;

    return copiedCartItems;
  };

  /**
   * Delete Cart Item
   * @param {array} cartItems Cart items
   * @param {string|number} productId Product id
   */
  const deleteCartItem = (cartItems, productId) => {
    return cartItems.filter((item) => item.id !== productId);
  };

  /**
   * Add Product To Cart Items
   * @param {object} product Product
   */
  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  /**
   * Remove Product From Cart Items
   * @param {object} product Product
   */
  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  /**
   * Delete Product From Cart Items
   * @param {string|number} productId Product id
   */
  const deleteItemFromCart = (productId) => {
    setCartItems(deleteCartItem(cartItems, productId));
  };

  const value = {
    cartItems,
    addItemToCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    removeItemFromCart,
    deleteItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

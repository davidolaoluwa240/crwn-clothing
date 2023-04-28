// Modules
import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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
    return deleteCartItem(copiedCartItems, product.id);

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

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const setCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

/**
 * Add Product To Cart Items
 * @param {object} product Product
 */
export const addItemToCart = (cartItems, product) =>
  setCartItems(addCartItem(cartItems, product));

/**
 * Remove Product From Cart Items
 * @param {object} product Product
 */
export const removeItemFromCart = (cartItems, product) =>
  setCartItems(removeCartItem(cartItems, product));

/**
 * Delete Product From Cart Items
 * @param {string|number} productId Product id
 */
export const deleteItemFromCart = (cartItems, productId) =>
  setCartItems(deleteCartItem(cartItems, productId));

// Modules
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  WithMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

/**
 * Add Cart Item
 * @param {array} cartItems Cart items
 * @param {object} product Product
 */
const addCartItem = (
  cartItems: CartItem[],
  product: CategoryItem
): CartItem[] => {
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
const removeCartItem = (
  cartItems: CartItem[],
  product: CategoryItem
): CartItem[] => {
  const copiedCartItems = cartItems.slice(0);

  const existingCartItem = copiedCartItems.find(
    (item) => item.id === product.id
  );

  if (existingCartItem?.quantity === 1)
    return deleteCartItem(copiedCartItems, product.id);

  if (existingCartItem && existingCartItem.quantity > 1)
    existingCartItem.quantity--;

  return copiedCartItems;
};

/**
 * Delete Cart Item
 * @param {array} cartItems Cart items
 * @param {string|number} productId Product id
 */
const deleteCartItem = (
  cartItems: CartItem[],
  productId: number
): CartItem[] => {
  return cartItems.filter((item) => item.id !== productId);
};

/**
 * Add Product To Cart Items
 * @param {object} product Product
 */
export const addItemToCart = (cartItems: CartItem[], product: CategoryItem) =>
  setCartItems(addCartItem(cartItems, product));

/**
 * Remove Product From Cart Items
 * @param {object} product Product
 */
export const removeItemFromCart = (
  cartItems: CartItem[],
  product: CategoryItem
) => setCartItems(removeCartItem(cartItems, product));

/**
 * Delete Product From Cart Items
 * @param {string|number} productId Product id
 */
export const deleteItemFromCart = (cartItems: CartItem[], productId: number) =>
  setCartItems(deleteCartItem(cartItems, productId));

export const setIsCartOpen = WithMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = WithMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

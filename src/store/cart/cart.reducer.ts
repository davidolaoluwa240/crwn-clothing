import { AnyAction } from "redux";

import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
};

// Cart Initial State
const INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
};

// Create Cart Reducer
export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  return state;
};

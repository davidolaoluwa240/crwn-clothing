// Modules
import React from "react";

// Hooks
import { useSelector, useDispatch } from "react-redux";

// Redux Selectors
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";

// Redux Actions
import { setIsCartOpen } from "../../store/cart/cart.action";

// Style
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

export const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

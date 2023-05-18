// Modules
import React from "react";

// Hooks
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux Selectors
import { selectCartItems } from "../../store/cart/cart.selector";

// Components
import { Button, CartItem } from "..";

// Style
import {
  EmptyMessage,
  CartDropdownContainer,
  CartItems,
} from "./cart-dropdown.styles";

export const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  // Cart Items
  const renderedCartItems = cartItems.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ));

  /**
   * Go To Checkout Route
   */
  const goToCheckoutHandler = useCallback(() => navigate("/checkout"), []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {!cartItems.length && <EmptyMessage>Your cart is empty</EmptyMessage>}
        {!!cartItems.length && renderedCartItems}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

// Modules
import React from "react";

// Hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { CartContext } from "../../contexts";

// Components
import { Button, CartItem } from "../";

// Style
import {
  EmptyMessage,
  CartDropdownContainer,
  CartItems,
} from "./cart-dropdown.styles.jsx";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Cart Items
  const renderedCartItems = cartItems.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ));

  /**
   * Go To Checkout Route
   */
  const goToCheckoutHandler = () => navigate("/checkout");

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

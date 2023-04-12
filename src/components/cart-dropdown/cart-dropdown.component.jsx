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
import "./cart-dropdown.styles.scss";

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
    <div className="cart-dropdown-container">
      <div className="cart-items">{renderedCartItems}</div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

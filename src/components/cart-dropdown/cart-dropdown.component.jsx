// Modules
import React from "react";

// Hooks
import { useContext } from "react";

// Contexts
import { CartContext } from "../../contexts";

// Components
import { Button, CartItem } from "../";

// Style
import "./cart-dropdown.styles.scss";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  // Cart Items
  const renderedCartItems = cartItems.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ));

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{renderedCartItems}</div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

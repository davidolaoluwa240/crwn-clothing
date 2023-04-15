// Modules
import React from "react";

// Style
import {
  CartItemContainer,
  ItemDetails,
  ItemName,
} from "./cart-item.styles.jsx";

export const CartItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

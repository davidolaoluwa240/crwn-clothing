// Modules
import React, { FC } from "react";

// Style
import { CartItemContainer, ItemDetails, ItemName } from "./cart-item.styles";

import { CartItem as CartItemType } from "../../store/cart/cart.types";

export type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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

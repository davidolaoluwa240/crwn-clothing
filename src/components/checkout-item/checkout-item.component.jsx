// Modules
import React from "react";

// Hooks
import { useContext } from "react";

// Contexts
import { CartContext } from "../../contexts";

// Style
import {
  Arrow,
  CheckoutItemContainer,
  CheckoutItemQuantity,
  CheckoutItemQuantityValue,
  ImageContainer,
  RemoveButton,
  BaseSpan,
} from "./checkout-item.styles";

export const CheckoutItem = ({ cartItem }) => {
  const { deleteItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { id, name, price, quantity, imageUrl } = cartItem;

  /**
   * Delete Item From Cart
   */
  const deleteItemFromCartHandler = () => deleteItemFromCart(id);

  /**
   * Add Item To Cart
   */
  const addItemToCartHandler = () => addItemToCart(cartItem);

  /**
   * Remove From To Cart
   */
  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>

      <BaseSpan>{name}</BaseSpan>

      <CheckoutItemQuantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        <CheckoutItemQuantityValue>{quantity}</CheckoutItemQuantityValue>
        <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
      </CheckoutItemQuantity>

      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={deleteItemFromCartHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

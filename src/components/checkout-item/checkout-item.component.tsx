// Modules
import React, { FC, memo } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Redux Selectors
import { selectCartItems } from "../../store/cart/cart.selector";

// Redux Actions
import {
  deleteItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

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
import { CartItem } from "../../store/cart/cart.types";

export type CheckoutItemProps = {
  cartItem: CartItem;
};

export const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { id, name, price, quantity, imageUrl } = cartItem;

  /**
   * Delete Item From Cart
   */
  const deleteItemFromCartHandler = () =>
    dispatch(deleteItemFromCart(cartItems, id));

  /**
   * Add Item To Cart
   */
  const addItemToCartHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));

  /**
   * Remove From To Cart
   */
  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

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
});

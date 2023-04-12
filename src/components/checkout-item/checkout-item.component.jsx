// Modules
import React from "react";

// Hooks
import { useContext } from "react";

// Contexts
import { CartContext } from "../../contexts";

// Style
import "./checkout-item.styles.scss";

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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={deleteItemFromCartHandler}>
        &#10005;
      </div>
    </div>
  );
};

CheckoutItem.defaultProps = {
  className: "",
};

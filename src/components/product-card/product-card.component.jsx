// Modules
import React from "react";

// Hooks
import { useContext } from "react";

// Contexts
import { CartContext } from "../../contexts";

// Components
import { Button } from "../";

// Style
import "./product-card.styles.scss";

export const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonColor="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

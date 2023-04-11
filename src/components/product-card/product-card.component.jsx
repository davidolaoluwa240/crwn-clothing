// Modules
import React from "react";

// Components
import { Button } from "../";

// Style
import "./product-card.styles.scss";

export const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonColor="inverted">Add to cart</Button>
    </div>
  );
};

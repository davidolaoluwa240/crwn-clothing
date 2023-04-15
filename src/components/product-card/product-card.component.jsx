// Modules
import React from "react";

// Hooks
import { useContext } from "react";

// Contexts
import { CartContext } from "../../contexts";

// Components
import { Button, BUTTON_TYPE_VARIANT } from "../";

// Style
import {
  Footer,
  FooterName,
  FooterPrice,
  ProductCardContainer,
} from "./product-card.styles.jsx";

export const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />

      <Footer>
        <FooterName>{name}</FooterName>
        <FooterPrice>{price}</FooterPrice>
      </Footer>

      <Button
        buttonColor={BUTTON_TYPE_VARIANT.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

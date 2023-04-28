// Modules
import React from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { addItemToCart } from "../../store/cart/cart.action";

// Redux Selectors
import { selectCartItems } from "../../store/cart/cart.selector";

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
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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

// Modules
import React from "react";

// Components
import { ProductCard } from "../../components";

// Hooks
import { useContext } from "react";

// Contexts
import { ProductsContext } from "../../contexts";

// Style
import "./shop.styles.scss";

export const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

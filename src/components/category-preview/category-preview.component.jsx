// Modules
import React from "react";

// Components
import { ProductCard } from "..";

// Style
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  PreviewContainer,
} from "./category-preview.styles";

export const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewTitle to={`/shop/${title}`}>
          {title.toUpperCase()}
        </CategoryPreviewTitle>
      </h2>

      <PreviewContainer>
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  );
};

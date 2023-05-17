// Modules
import React, { FC } from "react";

// Components
import { ProductCard } from "..";

// Style
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  PreviewContainer,
} from "./category-preview.styles";
import { CategoryItem } from "../../store/categories/category.types";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

export const CategoryPreview: FC<CategoryPreviewProps> = ({
  title,
  products,
}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewTitle to={`/shop/${title.toLowerCase()}`}>
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

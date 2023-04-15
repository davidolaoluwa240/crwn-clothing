// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { CategoryPreview } from "../../components";

// Hooks
import { useContext } from "react";

// Contexts
import { CategoriesContext } from "../../contexts";

export const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  // Product Items
  const renderedProductItems = Object.keys(categoriesMap).map((title) => (
    <CategoryPreview
      key={title}
      title={title}
      products={categoriesMap[title]}
    />
  ));

  return <Fragment>{renderedProductItems}</Fragment>;
};

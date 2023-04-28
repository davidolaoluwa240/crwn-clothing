// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { CategoryPreview } from "../../components";

// Hooks
import { useSelector } from "react-redux";

// Redux Selectors
import { selectCategoriesMap } from "../../store/categories/category.selector";

export const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

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

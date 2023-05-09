// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { CategoryPreview, Spinner } from "../../components";

// Hooks
import { useSelector } from "react-redux";

// Redux Selectors
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

export const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  // Product Items
  const renderedProductItems = Object.keys(categoriesMap).map((title) => (
    <CategoryPreview
      key={title}
      title={title}
      products={categoriesMap[title]}
    />
  ));

  return (
    <Fragment>
      {isLoading && <Spinner />}
      {!isLoading && renderedProductItems}
    </Fragment>
  );
};

// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { ProductCard, Spinner } from "../../components";

// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Redux Selectors
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

// Style
import "./category.styles.scss";
import { CategoryItem } from "../../store/categories/category.types";

type CategoryRouteParams = {
  category: string;
};

export const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setProducts(
      categoriesMap[
        category.toLowerCase().replace(category[0], category[0].toUpperCase())
      ]
    );
  }, [categoriesMap, category]);

  // Product Items
  const renderedProductItems = products?.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="category-container">{renderedProductItems}</div>
      )}
    </Fragment>
  );
};

// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { ProductCard } from "../../components";

// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Redux Selectors
import { selectCategoriesMap } from "../../store/categories/category.selector";

// Style
import "./category.styles.scss";

export const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

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
      <div className="category-container">{renderedProductItems}</div>
    </Fragment>
  );
};

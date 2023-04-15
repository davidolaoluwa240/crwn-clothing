// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { ProductCard } from "../../components";

// Hooks
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Contexts
import { CategoriesContext } from "../../contexts";

// Style
import "./category.styles.scss";

export const Category = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

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

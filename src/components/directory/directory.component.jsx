// Modules
import React from "react";

// Components
import { CategoryItem } from "..";

// Style
import "./directory.styles.scss";

export const Directory = ({ categories, className }) => {
  // Category Items
  const renderedCategoryItems = categories.map(({ title, id, imageUrl }) => (
    <CategoryItem
      className="category-item-container"
      key={id}
      title={title}
      imageUrl={imageUrl}
    />
  ));

  return (
    <div className={`directory-container ${className}`}>
      {renderedCategoryItems}
    </div>
  );
};

Directory.defaultProps = {
  className: "",
};

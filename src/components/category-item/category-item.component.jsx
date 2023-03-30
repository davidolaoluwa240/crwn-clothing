// Modules
import React from "react";

// Style
import "./category-item.styles.scss";

export const CategoryItem = ({ className, imageUrl, title }) => {
  return (
    <div className={`category-container ${className}`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

CategoryItem.defaultProps = {
  className: "",
};

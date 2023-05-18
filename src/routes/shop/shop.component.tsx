// Modules
import React from "react";

// Components
import { Routes, Route } from "react-router-dom";

// Routes
import { CategoriesPreview, Category } from "..";

// Hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Redux Actions
import { fetchCategoriesStart } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

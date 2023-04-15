// Modules
import React from "react";

// Components
import { Routes, Route } from "react-router-dom";

// Routes
import { CategoriesPreview, Category } from "../";

export const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

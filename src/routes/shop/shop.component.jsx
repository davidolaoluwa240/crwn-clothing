// Modules
import React from "react";

// Firebase
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// Components
import { Routes, Route } from "react-router-dom";

// Routes
import { CategoriesPreview, Category } from "../";

// Hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Redux Actions
import { fetchCategoriesAsync } from "../../store/categories/category.action";

export const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

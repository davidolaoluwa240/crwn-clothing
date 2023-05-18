import { lazy } from "react";

// Re-Export Route Components
const Home = lazy(() => import("./home/home.component"));
const Authentication = lazy(() =>
  import("./authentication/authentication.component")
);
const Shop = lazy(() => import("./shop/shop.component"));
const Checkout = lazy(() => import("./checkout/checkout.component"));
const CategoriesPreview = lazy(() =>
  import("./categories-preview/categories-preview.component")
);
const Category = lazy(() => import("./category/category.component"));

export { Home, Authentication, Shop, Checkout, CategoriesPreview, Category };

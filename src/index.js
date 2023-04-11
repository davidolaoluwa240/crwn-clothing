// Modules
import React from "react";
import { createRoot } from "react-dom/client";

// Components
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Contexts
import { UserProvider, ProductsProvider, CartProvider } from "./contexts";

// Style
import "./index.scss";

// Mount React To DOM
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

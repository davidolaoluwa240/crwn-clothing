// Modules
import React from "react";

// Components
import { Routes, Route } from "react-router-dom";

// Routes
import { Home, Authentication, Shop, Checkout } from "./routes";

// Layouts
import { LandingLayout } from "./layouts";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

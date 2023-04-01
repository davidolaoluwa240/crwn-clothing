// Modules
import React from "react";

// Components
import { Routes, Route } from "react-router-dom";

// Routes
import { Home, SignIn } from "./routes";

// Layouts
import { LandingLayout } from "./layouts";

const Shop = () => {
  return <h1>I am the shop component</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;

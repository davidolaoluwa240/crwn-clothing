// Modules
import React from "react";

// Components
import { Outlet } from "react-router-dom";
import { Navigation } from "../../components";

export const LandingLayout = () => {
  return (
    <div className="landing-layout">
      <Navigation />
      <Outlet />
    </div>
  );
};

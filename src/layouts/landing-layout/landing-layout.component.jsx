// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../components";

export const LandingLayout = () => {
  return (
    <Fragment>
      <Navigation />
      <Outlet />
    </Fragment>
  );
};

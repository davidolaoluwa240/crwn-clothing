// Modules
import React from "react";

// Components
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Directory } from "../../components";

const Home = () => {
  return (
    <Fragment>
      <Directory />
      <Outlet />
    </Fragment>
  );
};

export default Home;

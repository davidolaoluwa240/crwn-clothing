// Modules
import React from "react";

// Components
import { Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// Style
import "./navigation.styles.scss";

export const Navigation = ({ className }) => {
  return (
    <div className={`navigation ${className}`}>
      <Link className="logo-container" to="/">
        <CrwnLogo className="logo" arial-label="crwn clothing logo" />
      </Link>

      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          SHOP
        </Link>

        <Link className="nav-link" to="/sign-in">
          SIGN IN
        </Link>
      </div>
    </div>
  );
};

Navigation.defaultProps = {
  className: "",
};

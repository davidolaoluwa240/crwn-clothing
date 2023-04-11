// Modules
import React from "react";

// Components
import { Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartDropdown, CartIcon } from "../";

// Hooks
import { useContext } from "react";

// Contexts
import { UserContext, CartContext } from "../../contexts";

// Utils
import { signOutUser } from "../../utils/firebase/firebase.utils";

// Style
import "./navigation.styles.scss";

export const Navigation = ({ className }) => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <div className={`navigation ${className}`}>
      <Link className="logo-container" to="/">
        <CrwnLogo className="logo" arial-label="crwn clothing logo" />
      </Link>

      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          SHOP
        </Link>

        {currentUser && (
          <span className="nav-link" onClick={signOutHandler}>
            SIGN OUT
          </span>
        )}

        {!currentUser && (
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        )}

        <CartIcon />
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
  );
};

Navigation.defaultProps = {
  className: "",
};

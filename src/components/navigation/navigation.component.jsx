// Modules
import React from "react";

// Components
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartDropdown, CartIcon } from "../";

// Hooks
import { useContext } from "react";

// Contexts
import { UserContext, CartContext } from "../../contexts";

// Utils
import { signOutUser } from "../../utils/firebase/firebase.utils";

// Style
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.jsx";

export const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <NavigationContainer>
      <LogoContainer to="/">
        <CrwnLogo className="logo" arial-label="crwn clothing logo" />
      </LogoContainer>

      <NavLinks>
        <NavLink to="/shop">SHOP</NavLink>

        {currentUser && (
          <NavLink as="span" onClick={signOutHandler}>
            SIGN OUT
          </NavLink>
        )}

        {!currentUser && (
          <NavLink className="nav-link" to="/auth">
            SIGN IN
          </NavLink>
        )}

        <CartIcon />
      </NavLinks>

      {isCartOpen && <CartDropdown />}
    </NavigationContainer>
  );
};

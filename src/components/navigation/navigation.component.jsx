// Modules
import React from "react";

// Components
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartDropdown, CartIcon } from "../";

// Hooks
import { useSelector } from "react-redux";

// Redux Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

// Redux Selectors
import { selectIsCartOpen } from "../../store/cart/cart.selector";

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
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

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

// Modules
import React from "react";

// Components
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartDropdown, CartIcon } from "..";

// Hooks
import { useSelector, useDispatch } from "react-redux";

// Redux Selectors
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

// Redux Actions
import { signOutStart } from "../../store/user/user.action";

// Style
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

export const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = () => {
    dispatch(signOutStart());
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

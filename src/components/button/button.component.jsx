// Modules
import React from "react";

// Style
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_VARIANT = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_VARIANT.base) =>
  ({
    [BUTTON_TYPE_VARIANT.base]: BaseButton,
    [BUTTON_TYPE_VARIANT.google]: GoogleSignInButton,
    [BUTTON_TYPE_VARIANT.inverted]: InvertedButton,
  }[buttonType]);

export const Button = ({ children, buttonColor, ...buttonProps }) => {
  const CustomButton = getButton(buttonColor);
  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};

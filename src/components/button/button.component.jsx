// Modules
import React from "react";

// Style
import {
  BaseButton,
  ButtonSpinner,
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

export const Button = ({
  children,
  isLoading,
  buttonColor,
  ...buttonProps
}) => {
  const CustomButton = getButton(buttonColor);
  return (
    <CustomButton disabled={isLoading} {...buttonProps}>
      {!isLoading && children}
      {isLoading && <ButtonSpinner />}
    </CustomButton>
  );
};

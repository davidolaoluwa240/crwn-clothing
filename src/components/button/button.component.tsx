// Modules
import React, { FC, ButtonHTMLAttributes } from "react";

// Style
import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export enum BUTTON_TYPE_VARIANT {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}

const getButton = (buttonType = BUTTON_TYPE_VARIANT.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_VARIANT.base]: BaseButton,
    [BUTTON_TYPE_VARIANT.google]: GoogleSignInButton,
    [BUTTON_TYPE_VARIANT.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  buttonColor?: BUTTON_TYPE_VARIANT;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
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

// Modules
import React from "react";

// Style
import "./button.styles.scss";

const BUTTON_COLOR_VARIANT = {
  google: "google-sign-in",
  inverted: "inverted",
};

export const Button = ({ children, buttonColor, ...buttonProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_COLOR_VARIANT[buttonColor]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

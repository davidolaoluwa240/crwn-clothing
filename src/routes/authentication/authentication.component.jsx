// Modules
import React from "react";

// Components
import { SignUpForm, SignInForm } from "../../components";

// Style
import "./authencation.styles.scss";

export const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

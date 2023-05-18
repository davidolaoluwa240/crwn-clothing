// Modules
import React from "react";

// Components
import { SignUpForm, SignInForm } from "../../components";

// Style
import { AuthenticationContainer } from "./authencation.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

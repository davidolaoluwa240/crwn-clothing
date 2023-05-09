// Modules
import React from "react";

// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

// Components
import { Button, FormInput, BUTTON_TYPE_VARIANT } from "../";

// Redux Actions
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

// Style
import { ButtonsContainer, SignUpContainer } from "./sign-in-form.styles.jsx";

// Static Data
const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(err);
      }
    }
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignInWithGoogleProvider = () => dispatch(googleSignInStart());

  return (
    <SignUpContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          id="signInEmail"
          name="email"
          value={email}
          required
          onChange={handleInputChange}
        />

        <FormInput
          label="password"
          type="password"
          id="signInPassword"
          name="password"
          value={password}
          required
          onChange={handleInputChange}
        />

        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonColor={BUTTON_TYPE_VARIANT.google}
            onClick={handleSignInWithGoogleProvider}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

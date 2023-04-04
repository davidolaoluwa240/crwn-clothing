// Modules
import React from "react";

// Hooks
import { useState } from "react";

// Utils
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Components
import { Button, FormInput } from "../";

// Style
import "./sign-in-form.styles.scss";

// Static Data
const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = ({ className }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
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

  const handleSignInWithGoogleProvider = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className={`sign-up-container ${className}`}>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={handleInputChange}
        />

        <FormInput
          label="password"
          type="password"
          id="password"
          name="password"
          value={password}
          required
          onChange={handleInputChange}
        />

        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonColor="google"
            onClick={handleSignInWithGoogleProvider}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

SignInForm.defaultProps = {
  className: "",
};

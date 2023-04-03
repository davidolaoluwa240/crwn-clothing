// Modules
import React from "react";

// Hooks
import { useState } from "react";

// Components
import { FormInput, Button } from "../";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Style
import "./sign-up-form.styles.scss";

// Static Data
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = ({ className }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { confirmPassword, displayName, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) return alert("Password do not match");

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("User Creation Encounter An Error", err);
      }
    }
  };

  /**
   * Handle Input Value Change
   * @param {Event} event Event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={`sign-up-container ${className}`}>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          name="displayName"
          value={displayName}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          required
          onChange={handleChange}
        />

        <FormInput
          label="confirmPassword"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

SignUpForm.defaultProps = {
  className: "",
};

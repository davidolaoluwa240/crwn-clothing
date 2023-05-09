// Modules
import React from "react";

// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

// Components
import { FormInput, Button } from "../";

// Redux Actions
import { emailSignUpStart } from "../../store/user/user.action";

// Style
import { SignUpContainer } from "../sign-in-form/sign-in-form.styles";

// Static Data
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { confirmPassword, displayName, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) return alert("Password do not match");
      dispatch(emailSignUpStart(formFields));
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
    <SignUpContainer>
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
    </SignUpContainer>
  );
};

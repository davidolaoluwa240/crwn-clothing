// Modules
import React from "react";

// Hooks
import { useStripe, useElements } from "@stripe/react-stripe-js";

// Components
import { CardElement } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_VARIANT, Button } from "../";

// Style
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

export const PaymentForm = () => {
  const paymentHandler = (e) => {
    e.preventDefault();
  };

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button buttonColor={BUTTON_TYPE_VARIANT.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

// Modules
import React from "react";

// Hooks
import { useState } from "react";
import { useSelector } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";

// Components
import { CardElement } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_VARIANT } from "../";

// Redux Selectors
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

// Style
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret: clientSecret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser?.displayName || "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    }

    if (paymentResult.paymentIntent.status === "succeeded") {
      alert("Payment Successful");
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonColor={BUTTON_TYPE_VARIANT.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

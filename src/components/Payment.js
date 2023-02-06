import { useLocation, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Complete from "./Complete";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

const Payment = () => {
  const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};
function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState("");
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const { state } = useLocation();
  const [payComplete, setPayComplete] = useState(false);
  const navigate = useNavigate();

  const elements = useElements();
  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = setClientSecret(); //clientSecret goes below
    const paymentResult = await stripe.confirmCardPayment(
      `${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jay Tea",
          },
        },
      }
    );
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        setPayComplete(true);
        navigate("complete");
        // alert("Success!");
      }
    }
  };

  return payComplete ? (
    <Outlet />
  ) : (
    <div
      style={{
        padding: "18rem",
      }}
    >
      <div
        style={{
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit={payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />

            <button className="pay-button" disabled={isPaymentLoading}>
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;

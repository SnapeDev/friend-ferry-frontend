import { useLocation, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
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

// const CREATE_PAYPENT_INTENT_ENDPOINT =
//   "https://api.stripe.com/v1/payment_intents";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  // const { amount } = state;

  // useEffect(() => {
  //   const run = async () => {
  //     const paymentIntentResponse = await fetch(
  //       CREATE_PAYPENT_INTENT_ENDPOINT,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           amount,
  //           currency: "EUR",
  //           statement_descriptor: "FRIEND FERRY",
  //           payment_method_types: ["card"],
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization:
  //             "Basic " + btoa(process.env.REACT_APP_STRIPE_SECRET_KEY),
  //         },
  //       }
  //     );
  //     const { error, clientSecret } = await paymentIntentResponse.json();
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     setClientSecret(clientSecret);
  //   };
  //   run();
  // });

  return (
    <Elements stripe={stripe} /*options={{ clientSecret }}*/>
      <CheckoutForm />
    </Elements>
  );
};

function CheckoutForm() {
  const { state } = useLocation();
  const { modelId } = state;
  const stripe = useStripe();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [payComplete, setPayComplete] = useState(false);
  const [cardDetails, setCardDetails] = useState("");

  // const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const elements = useElements();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       return_url: `${window.location.origin}/complete`,
  //     },
  //   });

  //   if (error !== null) {
  //     alert(`The payment failed\n Reason: ${error.message}`);
  //     return;
  //   }
  // };

  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    // const clientSecret = setClientSecret(); //clientSecret goes below
    try {
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
    } catch (err) {
      console.error("confirmCardPayment error", err);
    } finally {
      setPaymentLoading(false);
    }
  };

  return payComplete ? (
    <Outlet />
  ) : (
    <div className="books">
      <div className="booking">
        <p> Booking details:</p>
        <br />
        <p>
          <p className="salmon">Name:</p>
          {state.name}
        </p>
        <p>
          {" "}
          <p className="salmon">Location:</p>
          {state.location}
        </p>
        <p>
          <p className="salmon">Event:</p>
          {state.event}
        </p>
        <p>
          {" "}
          <p className="salmon">Hours:</p>
          {state.nbHours}{" "}
        </p>
        <p>
          {" "}
          <p className="salmon">Amount</p>€{state.amount}
        </p>
      </div>
      <form
        style={{
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={() => navigate(`/complete/${modelId}`)}
      >
        <CardElement
          className="card"
          value={cardDetails}
          onChange={(e) => setCardDetails(e.target.value)}
        />
        <button className="pay-button" disabled={isPaymentLoading}>
          {isPaymentLoading ? "Loading..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default Payment;

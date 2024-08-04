"use client";

import { NEXT_PUBLIC_APPLICATION_URL } from "@/utils/client-constants";

import { useState, useEffect } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({
	setStep,
	paymentIntent,
	formData,
	companion,
}) {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);
		const bookingRecord = await fetch("/api/checkout/place-payment", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				event: formData.event,
				location: formData.location,
				date: formData.date,
				amount: formData.amount,
				companion: companion,
				paymentIntent,
			}),
		});

		if (!bookingRecord.ok) {
			setMessage(
				"An unexpected error occurred, no charge was made to your card."
			);
			setIsLoading(false);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${NEXT_PUBLIC_APPLICATION_URL}/book/confirmation`,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<form
			className="w-full max-w-xs flex flex-col items-center "
			id="payment-form"
			onSubmit={handleSubmit}
		>
			<div className="w-full">
				<PaymentElement id="payment-element" options={paymentElementOptions} />
			</div>
			<div className="mt-8 w-full flex gap-4 justify-center">
				<button
					onClick={() => setStep("form")}
					className="button button-secondary md"
				>
					Go Back
				</button>

				<button
					className="button button-secondary md"
					disabled={isLoading || !stripe || !elements}
					id="submit"
				>
					<span id="button-text " className="relative">
						<div
							className={`absolute w-full h-full top-0 left-0 flex justify-center transition-all ${
								!isLoading ? "opacity-0" : "opacity-100"
							}`}
						>
							<div className="spinner " id="spinner" />
						</div>

						<span
							className={` transition-all ${
								isLoading ? "opacity-0" : "opacity-100"
							}`}
						>
							Pay
						</span>
					</span>
				</button>
			</div>
			{message && (
				<div className="text-primary mt-4" id="payment-message">
					{message}
				</div>
			)}
		</form>
	);
}

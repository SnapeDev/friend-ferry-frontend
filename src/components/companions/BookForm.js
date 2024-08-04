"use client";

import Image from "next/image";
import Link from "next/link";

import { useMemo, useState, useEffect } from "react";

import Selector from "@/components/generics/Selector";
import Input from "@/components/generics/Input";
import { getCompanionImage } from "@/utils/supabase/images";

import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from "@/utils/client-constants";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BookForm({ companion }) {
	const [step, setStep] = useState("form");
	const [clientSecret, setClientSecret] = useState(null);
	const [paymentIntent, setPaymentIntent] = useState(null);

	const [formData, setFormData] = useState({
		event: "",
		location: "",
		date: "",
		amount: 1,
	});

	const bookingTotalPrice = useMemo(() => {
		return formData.amount * companion.hourly_rate;
	}, [formData.amount, companion.hourly_rate]);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const amountOptions = Array.from({ length: 10 }, (_, i) => {
		const amount = i + 1;
		return {
			label: `${amount} hour${amount > 1 ? "s" : ""}`,
			value: amount,
		};
	});

	function setCompanionLocalStorage(companion) {
		localStorage.setItem("companion", JSON.stringify(companion));
	}

	useEffect(() => {
		if (step === "checkout") {
			fetch("/api/checkout/payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					event: formData.event,
					location: formData.location,
					date: formData.date,
					amount: formData.amount,
					companion: companion,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setPaymentIntent(data);
					setClientSecret(data.client_secret);
					setCompanionLocalStorage(companion);
				});
		} else {
			setClientSecret(null);
		}
	}, [step]);

	const appearance = {
		theme: "stripe",
		variables: {
			colorPrimary: "#FA8072",
		},
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="my-5 md:my-10 w-full flex flex-col items-start px-4 md:px-8 py-4">
			{step === "form" && (
				<>
					<p className="text-3xl font-medium text-secondary mb-6">
						Book {companion?.name}
					</p>
					<div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-14 justify-between items-start ">
						<div className=" order-2 lg:order-1 w-full lg:w-7/12 flex flex-col">
							<div className="flex flex-col gap-4 max-w-96">
								<Input
									label="Event"
									name="event"
									placeholder="Event"
									onInput={handleInputChange}
									value={formData.event}
								/>

								<Input
									label="Location"
									name="location"
									placeholder="Location"
									onInput={handleInputChange}
									value={formData.location}
								/>

								<Input
									label="Date"
									name="date"
									placeholder="Date"
									onInput={handleInputChange}
									value={formData.date}
									type="datetime-local"
								/>

								<Selector
									label="Time Slot"
									name="amount"
									data={amountOptions}
									valueKey={"value"}
									labelKey={"label"}
									value={formData.amount}
									renderItem={(item) => item.label}
									onSelect={(newValue) => {
										handleInputChange({
											target: {
												name: "amount",
												value: newValue.value,
											},
										});
									}}
								/>
							</div>

							<div className="my-6">
								<p className="text-lg font-bold ">
									The amount total for your booking is :{" "}
									{bookingTotalPrice.toLocaleString("en-UK", {
										style: "currency",
										currency: "GBP",
									})}
								</p>
							</div>

							<div className="flex gap-6 justify-center lg:justify-start">
								<Link
									href={`/companions/${companion?.id}`}
									className="button button-secondary md"
								>
									Go Back
								</Link>

								<button
									onClick={() => {
										if (
											!formData.event ||
											!formData.location ||
											!formData.date
										) {
											alert("Please fill in all fields");
											return;
										}
										setStep("checkout");
									}}
									className="button button-secondary md"
								>
									Checkout
								</button>
							</div>
						</div>
						<div className="order-1 lg:order-2 w-full lg:w-5/12">
							<Image
								src={getCompanionImage(companion, companion.images[0])}
								alt={companion.name}
								width={640}
								height={854}
								className="ms-auto w-full h-auto lg:max-h-[60dvh] max-w-full aspect-[3/4] object-contain"
							/>
						</div>
					</div>
				</>
			)}

			{step === "checkout" && (
				<>
					<div className=" w-full flex flex-col items-center gap-6">
						<p className="w-full text-center text-3xl font-medium text-secondary">
							Review booking details
						</p>
						<div className="w-full flex gap-2 items-start justify-center">
							<div className=" w-64 text-lg font-medium text-secondary text-end">
								<p>Name:</p>
								<p>Location:</p>
								<p>Event:</p>
								<p>Date:</p>
								<p>Time Slot:</p>
								<p>Total:</p>
							</div>
							<div className=" w-64 text-lg ">
								<p>{companion.name}</p>
								<p>{formData.location}</p>
								<p>{formData.event}</p>
								<p>{new Date(formData.date).toLocaleString()}</p>
								<p>{formData.amount} hours</p>
								<p>
									{bookingTotalPrice.toLocaleString("en-UK", {
										style: "currency",
										currency: "GBP",
									})}
								</p>
							</div>
						</div>
						{clientSecret && (
							<Elements options={options} stripe={stripePromise}>
								<CheckoutForm
									setStep={setStep}
									paymentIntent={paymentIntent}
									formData={formData}
									companion={companion}
								/>
							</Elements>
						)}

						{/* <div className=" mt-8 flex gap-6 justify-center lg:justify-start">
							<button
								onClick={() => setStep("form")}
								className="button button-secondary md"
							>
								Go Back
							</button>
						</div> */}
					</div>
				</>
			)}
		</div>
	);
}

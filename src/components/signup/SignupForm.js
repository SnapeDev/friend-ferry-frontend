"use client";

import Input from "@/components/generics/Input";

import { useState } from "react";
export default function SignupForm() {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		age: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const { firstName, lastName, age, email, password, confirmPassword } = form;
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const response = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify(form),
		});

		if (response.ok) {
			alert("Account created successfully");
			setSubmitted(true);
		} else {
			alert("An error occurred");
		}
	}

	return (
		<div className="flex flex-col items-center gap-8">
			{!submitted ? (
				<>
					<div className="gap-6 grid grid-cols-2">
						<Input
							label="First Name"
							name="firstName"
							placeholder="First Name"
							onInput={handleInputChange}
							value={form.firstName}
						/>
						<Input
							label="Last Name"
							name="lastName"
							placeholder="Last Name"
							onInput={handleInputChange}
							value={form.lastName}
						/>
						<Input
							label="Age"
							name="age"
							placeholder="Age"
							onInput={handleInputChange}
							value={form.age}
						/>
						<Input
							label="Email"
							name="email"
							placeholder="Email"
							onInput={handleInputChange}
							value={form.email}
						/>
						<Input
							label="Password"
							name="password"
							placeholder="Password"
							onInput={handleInputChange}
							value={form.password}
							type="password"
						/>
						<Input
							label="Confirm Password"
							name="confirmPassword"
							placeholder="Confirm Password"
							onInput={handleInputChange}
							value={form.confirmPassword}
							type="password"
						/>
					</div>
					<button className="button button-secondary md" onClick={handleSubmit}>
						Sign Up
					</button>
				</>
			) : (
				<div className="text-center w-full">
					Account created successfully, please check your email for a
					verification link
				</div>
			)}
		</div>
	);
}

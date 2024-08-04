"use client";

import { NEXT_PUBLIC_APPLICATION_URL } from "@/utils/server-constants";
import { useSupabase } from "@/contexts/Supabase";

import Input from "@/components/generics/Input";

import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
	const router = useRouter();
	const { setData } = useSupabase();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const { email, password } = form;
		if (!email || !password) {
			alert("Please fill in all fields");
			return;
		}

		const response = await fetch(
			`${NEXT_PUBLIC_APPLICATION_URL}/api/auth/login`,
			{
				method: "POST",
				body: JSON.stringify(form),
				cache: "no-store",
			}
		);

		if (response.ok) {
			const {
				data: { session },
			} = await response.json();
			setData(session);

			router.push("/companions");
		} else {
			alert("An error occurred");
		}
	}

	return (
		<div className="flex flex-col items-center gap-8">
			<div className="gap-6 flex flex-col">
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
			</div>
			<button className="button button-secondary md" onClick={handleSubmit}>
				Login
			</button>
		</div>
	);
}

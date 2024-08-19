"use client";

import { useSupabase } from "@/contexts/Supabase";

import Input from "@/components/generics/Input";
import { POST } from "@/app/api/auth/login/route";

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

		const response = await POST(form)
		if (response.ok) {
			const {
				data: { session }
			} = response;
			setData(session);

			const searchParams = new URLSearchParams(window.location.search);
			const nextPath = searchParams.get('nextPath');
			const formattedPath = decodeURIComponent('/' + nextPath.replace(/^\//, ''));

			if (nextPath && !nextPath.startsWith('http') && !nextPath.startsWith('//')) {
				router.push(formattedPath);
			} else {
				router.push("/companions");
			}
		} else {
			alert("An error occurred: " + response.error);
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

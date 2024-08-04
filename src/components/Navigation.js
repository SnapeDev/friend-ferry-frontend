"use client";

import Link from "next/link";

import { useSupabase } from "@/contexts/Supabase";
export default function Navigation() {
	const { data, signOut } = useSupabase();
	return (
		<>
			<Link className="button button-secondary sm" href="/about">
				About
			</Link>
			<Link className="button button-secondary sm" href="/companions">
				Meet
			</Link>
			{data?.user ? (
				<button
					className="button button-secondary sm"
					onClick={() => {
						signOut();
					}}
				>
					Logout
				</button>
			) : (
				<>
					<Link className="button button-secondary sm" href="/signup">
						Sign Up
					</Link>
					<Link className="button button-secondary sm" href="/login">
						Log In
					</Link>
				</>
			)}
		</>
	);
}

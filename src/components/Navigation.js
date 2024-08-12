"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { useSupabase } from "@/contexts/Supabase";

import Link from "next/link";

import Menu from "@/components/icons/Menu";
import Xmark from "@/components/icons/Xmark";

export default function Navigation() {
	const { data, signOut } = useSupabase();
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<>
			<nav className=" gap-3 hidden md:flex">
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
			</nav>

			<div className="flex md:hidden justify-center items-center">
				<Menu
					onClick={() => setIsOpen(true)}
					className="h-9 w-9 p-2 bg-secondary text-white rounded-md"
				/>
			</div>

			{isOpen ? (
				<div className="absolute top-0 left-0 w-dvw h-dvh bg-white flex flex-col">
					<div className="w-full flex items-center justify-between mx-auto p-4 shadow">
						<Link href="/">
							<span className=" text-5xl text-primary font-bold">
								friend ferry
							</span>
						</Link>
						<div className="cursor-pointer" onClick={() => setIsOpen(false)}>
							<Xmark className="h-9 w-9 p-2 bg-secondary text-white rounded-md" />
						</div>
					</div>
					<div className="w-full grow flex flex-col items-center justify-start pt-16 gap-3">
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
					</div>
				</div>
			) : null}
		</>
	);
}

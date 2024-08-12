import { Roboto } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import Instagram from "@/components/icons/Instagram";
import { SupabaseProvider } from "@/contexts/Supabase";
import Navigation from "@/components/Navigation";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
	title: "Friend Ferry",
	description:
		"Where companionship and social connections are just a click away. Our selection of local companions are perfect for walks, dates, and social events.",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<SupabaseProvider>
				<body className={roboto.className}>
					<header className="px-4 md:px-8 py-4 shadow fixed top-0 left-0 right-0 z-50 bg-white/90 ">
						<div className="flex items-center justify-between mx-auto ">
							<Link href="/">
								<span className=" text-5xl text-primary font-bold">
									friend ferry
								</span>
							</Link>

							<Navigation />
						</div>
					</header>
					<main className="min-h-[calc(100dvh-80px-128px)] mt-[80px] overflow-x-hidden flex flex-col">
						{children}
					</main>

					<footer className="w-full border-t border-gray-300 bg-gray-100 px-4 md:px-8 py-10 ">
						<div className="w-full flex flex-col md:flex-row items-center justify-between mx-auto  text-center md:text-start ">
							<span className=" text-4xl leading-8 text-primary font-bold mb-6 md:mb-0">
								friend
								<br />
								ferry
							</span>

							<div className="flex flex-col text-sm font-medium">
								<Link href="/about">About</Link>
								<Link href="/privacy-policy">Privacy Policy</Link>
								<Link href="/terms-conditions">Terms & Conditions</Link>
							</div>

							<div className="flex flex-col text-sm font-medium">
								<Link href="/signup">Sign Up</Link>
								<Link href="/login">Log In</Link>
								<Link href="/contact">Contact</Link>
							</div>

							<div className="flex flex-col mt-6 md:mt-0">
								<Link href={"https://www.instagram.com/friendferry"}>
									<Instagram className="h-10 w-10" />
								</Link>
							</div>
						</div>
					</footer>
				</body>
			</SupabaseProvider>
		</html>
	);
}

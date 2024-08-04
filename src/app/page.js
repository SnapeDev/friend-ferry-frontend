import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";

const FeaturedCompanions = dynamic(
	() => import("@/components/home/FeaturedCompanions"),
	{
		ssr: false,
	}
);

import { NEXT_PUBLIC_APPLICATION_URL } from "@/utils/server-constants";

export default async function Home() {
	const featuredCompanions = await fetch(
		`${NEXT_PUBLIC_APPLICATION_URL}/api/companions/featured`,
		{
			cache: "no-store",
		}
	).then((res) => res.json());
	return (
		<>
			<div className="relative w-full min-h-[calc(100dvh-80px)] flex ">
				<Image
					src={"/images/friend.jpg"}
					alt="Friend"
					fill="true"
					style={{ objectFit: "cover" }}
					className="absolute object-center md:object-[50%_0%]  z-10"
					priority
				/>
				<div className="absolute w-full h-full bg-gradient-to-l from-black/60 from-0% via-transparent via-40% to-transparent to-100% z-[15] hidden lg:block" />

				<div className="absolute w-full h-full bg-gradient-to-t from-black/60 from-0% via-transparent via-60% to-transparent to-100% z-[15] block lg:hidden" />

				<div className="static mx-auto lg:mx-0 lg:absolute lg:start-[80%] lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2 max-w-[600px] lg:max-w-[400px] px-6 lg:px-12 mb-10 mt-auto lg:mb-auto flex flex-col items-center text-center w-full z-20">
					<p className=" text-white font-medium text-lg lg:text-3xl leading-6 drop-shadow-md">
						Welcome to friend ferry, where companionship and social connections
						are just a click away. Our selection of local companions are perfect
						for walks, dates, and social events. Join us and make lasting
						memories today.
					</p>
					<Link
						href="/signup"
						className="button button-secondary mt-6 sm lg:md"
					>
						Join Now
					</Link>
				</div>
			</div>

			<div className="w-full mb-10 md:mb-20 mt-10 md:mt-12 mx-auto flex flex-col items-center">
				<FeaturedCompanions
					className="mb-6 w-full"
					featuredCompanions={featuredCompanions?.data}
				/>
				<Link href="/companions" className="button button-secondary md">
					View All
				</Link>
			</div>
		</>
	);
}

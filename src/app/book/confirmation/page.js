"use client";

import Link from "next/link";
import Image from "next/image";
import { useSupabase } from "@/contexts/Supabase";

import { NEXT_PUBLIC_SUPPORT_EMAIL } from "@/utils/client-constants";
import { useEffect, useState } from "react";

import { getCompanionImage } from "@/utils/supabase/images";

export default function Return() {
	const [companion, setCompanion] = useState(null);

	const { data } = useSupabase();

	useEffect(() => {
		const localStorageCompanion = localStorage.getItem("companion");

		console.log("localStorageCompanion", localStorageCompanion);
		const companion = JSON.parse(localStorage.getItem("companion"));
		console.log("companion", companion);
		setCompanion(companion);
	}, []);

	return (
		<div className=" grow flex items-center">
			<div className="w-full mx-auto max-w-screen-lg flex flex-col items-center">
				{companion ? (
					<>
						<div className="my-5 md:my-10 w-full flex flex-col items-start px-4 md:px-8 py-4">
							<div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-14 items-center p-4 lg:p-12">
								<div className=" order-2 lg:order-1 w-full lg:w-6/12 h-full grow">
									<p className=" w-full text-4xl font-medium text-secondary mb-10">
										Booking Complete!
									</p>
									<p className=" italic text-xl text-center md:text-start my-auto">
										Congratulations{" "}
										<span className="text-secondary">
											{`${data?.user?.user_metadata?.first_name} 
											${data?.user?.user_metadata?.last_name}`}
										</span>{" "}
										thank you for booking{" "}
										<span className="text-secondary">{companion?.name}</span>.
										Once they have confirmed the request you will receive a
										confirmation email with the details.
									</p>
								</div>
								<div className="order-1 lg:order-2 w-full lg:w-6/12">
									<Image
										src={getCompanionImage(companion, companion?.images[0])}
										alt={companion.name}
										width={640}
										height={854}
										className="ms-auto w-full h-auto max-w-full "
									/>
								</div>
							</div>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}

{
	/*  */
}

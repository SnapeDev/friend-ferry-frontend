import Image from "next/image";
import Link from "next/link";

import { NEXT_PUBLIC_APPLICATION_URL } from "@/utils/server-constants";

import { getCompanionImage } from "@/utils/supabase/images";
import Filters from "@/components/companions/Filters";

export default async function Companions({ searchParams }) {
	const stringSearchParams = new URLSearchParams(searchParams);
	const featuredCompanions = await fetch(
		`${NEXT_PUBLIC_APPLICATION_URL}/api/companions${
			stringSearchParams ? `?${stringSearchParams}` : ""
		}`,
		{
			cache: "no-store",
		}
	).then((res) => {
		return res.json();
	});

	return (
		<div className="px-4 md:px-8 mt-4 md:mt-8 mb-10">
			<div className="flex flex-col gap-4 md:gap-8 justify-between items-center mx-auto max-w-screen-2xl">
				<div className="w-full rounded bg-white flex flex-wrap items-end justify-between md:justify-center gap-3 md:gap-6">
					<Filters
						locations={featuredCompanions?.locations ?? []}
						searchParams={searchParams}
					/>
				</div>
				{featuredCompanions?.data.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
						{featuredCompanions?.data.map((companion) => (
							<Link
								key={`companion-${companion.id}`}
								href={`/companions/${companion.id}`}
								className=""
							>
								<div className="shadow-md bg-white p-3.5 md:p-6">
									<Image
										src={getCompanionImage(companion)}
										alt={companion.name}
										width={640}
										height={854}
										style={{ objectFit: "cover" }}
										className="w-full h-auto aspect-[3/4] "
									/>
									<h3 className="text-2xl text-center mt-3.5 md:mt-6">
										{companion.name} - {companion.age}
									</h3>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="text-center w-full">
						No companions found with the selected filter criteria
					</div>
				)}
			</div>
		</div>
	);
}

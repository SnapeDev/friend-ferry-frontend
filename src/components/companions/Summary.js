"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { getCompanionImage } from "@/utils/supabase/images";

export default function Summary({ companion }) {
	const [selectedImage, setSelectedImage] = useState(companion.featured_image);

	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-14 justify-between items-center bg-white p-6 lg:p-12">
			<div className=" order-2 lg:order-1 w-full lg:w-7/12 lg:text-2xl flex flex-col">
				<div className="order-2 lg:order-1 mt-6 lg:mt-0">
					<p>
						<span className="font-medium text-secondary">Name: </span>
						{companion.name}
					</p>
					<p>
						<span className="font-medium text-secondary">Age: </span>
						{companion.age}
					</p>
					<p>
						<span className="font-medium text-secondary">Location: </span>
						{companion.location}
					</p>
					<p>
						<span className="font-medium text-secondary">Events: </span>
						{companion.events.join(", ")}
					</p>

					<p className="mt-6">{companion.about}</p>
				</div>
				<div className="order-1 lg:order-3 mt-0 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 ">
					<Image
						src={getCompanionImage(companion)}
						alt={companion.name}
						width={640}
						height={854}
						style={{ objectFit: "cover" }}
						className="w-full h-auto aspect-[3/4] cursor-pointer"
						onClick={() => setSelectedImage(companion.featured_image)}
					/>
					{companion.images.map((image, index) => (
						<Image
							key={`companion-image-${index}`}
							src={getCompanionImage(companion, image)}
							alt={companion.name}
							width={640}
							height={854}
							style={{ objectFit: "cover" }}
							className="w-full h-auto aspect-[3/4] cursor-pointer"
							onClick={() => setSelectedImage(image)}
						/>
					))}
				</div>

				<div className="order-5 mt-6 lg:mt-8 flex gap-6 justify-center lg:justify-start">
					<Link href={`/companions`} className="button button-secondary md">
						Go Back
					</Link>

					<Link
						href={`/book/${companion.id}`}
						className="button button-secondary md"
					>
						Book me
					</Link>
				</div>
			</div>
			<div className="order-1 lg:order-2 w-full lg:w-5/12">
				<Image
					src={getCompanionImage(companion, selectedImage)}
					alt={companion.name}
					width={640}
					height={854}
					className="ms-auto w-full h-auto lg:max-h-[60dvh] max-w-full aspect-[3/4] object-contain"
				/>
			</div>
		</div>
	);
}

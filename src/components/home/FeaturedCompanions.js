"use client";

import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { getCompanionImage } from "@/utils/supabase/images";

export default function FeaturedCompanions({
	featuredCompanions = [],
	...props
}) {
	return (
		<div {...props}>
			<Swiper
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides={false}
				slidesPerView={"auto"}
				pagination={true}
				modules={[Pagination]}
				className="w-full"
			>
				{featuredCompanions.map((companion) => (
					<SwiperSlide key={`featured-companion-${companion.id}`}>
						<Link href={`/companions/${companion.id}`} className="">
							<div className="p-3">
								<Image
									src={getCompanionImage(companion)}
									alt={companion.name}
									width={640}
									height={854}
									style={{ objectFit: "cover" }}
									className="w-full h-auto aspect-[3/4] "
								/>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

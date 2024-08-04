"use client";

import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
				slidesPerView={4}
				pagination={true}
				modules={[Navigation]}
				className="w-full mx-8"
				navigation={true}
				breakpoints={{
					// Default parameters
					slidesPerView: 4,
					// Responsive breakpoints
					breakpoints: {
						// when window width is >= 320px
						320: {
							slidesPerView: 2,
						},
						// when window width is >= 480px
						480: {
							slidesPerView: 3,
						},
						// when window width is >= 640px
						640: {
							slidesPerView: 4,
						},
					},
				}}
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

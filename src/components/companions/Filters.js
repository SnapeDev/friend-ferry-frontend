"use client";

import Link from "next/link";

import Selector from "@/components/generics/Selector";
import { useMemo, useState } from "react";

export default function Filters({ locations, searchParams }) {
	const [ageMin, setageMin] = useState(searchParams?.ageMin ?? undefined);
	const [ageMax, setageMax] = useState(searchParams?.ageMax ?? undefined);

	const [location, setLocation] = useState(searchParams?.location ?? undefined);

	const ageOptions = Array.from({ length: 33 }, (_, i) => i + 18);

	const newSearchParams = useMemo(() => {
		const params = new URLSearchParams();
		ageMin && params.append("ageMin", ageMin);
		ageMax && params.append("ageMax", ageMax);
		location && params.append("location", location);

		return params.toString();
	}, [ageMin, ageMax, location]);

	function handleValueChange({ name, value }) {
		switch (name) {
			case "ageMin":
				setageMin(value !== 18 ? value : undefined);
				break;
			case "ageMax":
				setageMax(value !== 50 ? value : undefined);
				break;
			case "location":
				setLocation(value !== "All" ? value : undefined);
				break;
			default:
				break;
		}
	}
	return (
		<>
			<div className="flex gap-2 items-end">
				<Selector
					label="Age"
					name="ageMin"
					data={ageOptions}
					value={ageMin ?? 18}
					onSelect={(newValue) => {
						handleValueChange({ name: "ageMin", value: newValue });
					}}
				/>
				<Selector
					name="ageMax"
					data={ageOptions}
					value={ageMax ?? 50}
					onSelect={(newValue) => {
						handleValueChange({ name: "ageMax", value: newValue });
					}}
				/>
			</div>

			<Selector
				label="Location"
				name="location"
				data={["All", ...locations]}
				value={location ?? "All"}
				onSelect={(newValue) => {
					handleValueChange({ name: "location", value: newValue });
				}}
			/>
			<Link
				href={`/companions?${newSearchParams}`}
				className=" button button-secondary md h-fit"
			>
				Filter All
			</Link>
		</>
	);
}

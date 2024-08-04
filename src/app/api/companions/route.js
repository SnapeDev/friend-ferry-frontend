import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function GET(request) {
	const searchParamsString = request.nextUrl.searchParams;
	const searchParams = Object.fromEntries(searchParamsString);
	const { ageMin, ageMax, location } = searchParams ?? {};

	let supabaseQuery = supabaseAdminClient
		.from("companions")
		.select("*")
		.order("score", { ascending: false });

	if (ageMin) {
		supabaseQuery = supabaseQuery.gte("age", ageMin);
	}
	if (ageMax) {
		supabaseQuery = supabaseQuery.lte("age", ageMax);
	}
	if (location) {
		supabaseQuery = supabaseQuery.eq("location", location);
	}

	const { data, error } = await supabaseQuery;

	if (error) {
		console.error(error);
		return Response.error({ error });
	}

	const { data: allData } = await supabaseAdminClient
		.from("companions")
		.select("*")
		.order("score", { ascending: false });

	const locations = allData.reduce((acc, curr) => {
		if (!acc.includes(curr.location)) {
			acc.push(curr.location);
		}
		return acc;
	}, []);

	return Response.json({ data, locations });
}

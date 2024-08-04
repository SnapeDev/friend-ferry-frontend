import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function GET(request, { params }) {
	const { companionId } = params;

	let { data, error } = await supabaseAdminClient
		.from("companions")
		.select("*")
		.eq("id", companionId);

	if (error || !data.length) {
		console.error(error);
		return Response.error({ error });
	}

	return Response.json(data[0]);
}

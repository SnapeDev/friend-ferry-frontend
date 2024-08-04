import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function GET() {
	const { data, error } = await supabaseAdminClient
		.from("companions")
		.select("*")
		.order("score", { ascending: false })
		.limit(6);

	if (error) {
		return Response.error({ error });
	}
	return Response.json({ data });
}

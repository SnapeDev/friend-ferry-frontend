import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function POST(request) {
	const body = await request.json();

	const { email, password, firstName, lastName } = body;

	const { data, error } = await supabaseAdminClient.auth.signUp({
		email,
		password,
		options: {
			data: {
				first_name: firstName,
				last_name: lastName,
			},
		},
	});

	if (error) {
		console.error(error);
		return Response.error({ error });
	}

	return Response.json({ data });
}

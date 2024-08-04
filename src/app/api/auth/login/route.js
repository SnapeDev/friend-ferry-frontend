"use server";

import { createServerClient } from "@/utils/supabase/server";

export async function POST(request) {
	const body = await request.json();
	const { email, password } = body;

	const supabase = createServerClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const credentials = {
		email,
		password,
	};

	const { data, error } = await supabase.auth.signInWithPassword(credentials);

	if (error) {
		console.error(error);
		return Response.error({ error });
	}

	return Response.json({ data });
}

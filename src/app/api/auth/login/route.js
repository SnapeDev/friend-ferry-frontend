"use server";

import { createServerClient } from "@/utils/supabase/server";

export async function POST(request) {
	const { email, password } = request;

	const supabase = createServerClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const credentials = {
		email,
		password,
	};

	const { data, error } = await supabase.auth.signInWithPassword(credentials);

	if (error) {
		return {
			error: error.message,
		}
	}

	return {
		ok: true,
		data,
	}
}

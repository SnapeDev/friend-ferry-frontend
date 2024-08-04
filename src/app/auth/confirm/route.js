import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type");
	const next = searchParams.get("next") ?? "/companions";

	console.log("token_hash", token_hash);
	console.log("type", type);

	if (token_hash && type) {
		const supabase = createServerClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});

		if (error) {
			console.error(error);
		}

		if (!error) {
			// redirect user to specified redirect URL or root of app
			redirect(next);
		}
	}

	// redirect the user to an error page with some instructions
	redirect("/error");
}

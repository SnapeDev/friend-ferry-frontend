import {
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from "@/utils/server-constants";
import { supabaseAdminClient } from "@/utils/supabase/admin";
import { createServerClient } from "@/utils/supabase/server";

export async function POST(request) {
	try {
		const supabase = createServerClient(
			NEXT_PUBLIC_SUPABASE_URL,
			NEXT_PUBLIC_SUPABASE_ANON_KEY,
			{
				cookies: {
					getAll() {
						return request.cookies.getAll();
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value, options }) =>
							request.cookies.set(name, value)
						);
					},
				},
			}
		);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		const body = await request.json();
		const { event, location, date, amount, paymentIntent } = body;

		let companion = body.companion;

		const { data, error } = await supabaseAdminClient
			.from("companions")
			.select("*")
			.eq("id", companion?.id)
			.single();

		if (error) {
			throw error;
		}

		companion = data;

		if (paymentIntent?.id) {
			await supabaseAdminClient.from("bookings").insert({
				event,
				location,
				date,
				amount,
				total_price: amount * companion?.hourly_rate,
				status: "pending",
				companion_id: companion?.id,
				payment_intent_id: paymentIntent?.id,
				user_id: user.id,
			});
		}

		return Response.json({
			ok: true,
			message: "Payment placement intent stored",
		});
	} catch (error) {
		console.error(error);

		return Response.error({ error });
	}
}

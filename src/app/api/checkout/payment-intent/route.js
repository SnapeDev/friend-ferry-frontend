import Stripe from "stripe";

import {
	STRIPE_SECRET_KEY,
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from "@/utils/server-constants";
import { supabaseAdminClient } from "@/utils/supabase/admin";
import { createServerClient } from "@/utils/supabase/server";

const stripe = new Stripe(STRIPE_SECRET_KEY);

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
		const { event, location, date, amount } = body;

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

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * companion?.hourly_rate * 100,
			currency: "gbp",
			description: `Booking with ${
				companion?.name
			} on ${date} for ${amount} hour${amount > 1 ? "s" : ""}`,
			metadata: {
				event,
				location,
				date,
				amount,
				companion: JSON.stringify(companion),
				user_id: user.id,
			},
			automatic_payment_methods: {
				enabled: false,
			},
			payment_method_types: ["card"],
		});

		return Response.json(paymentIntent);
	} catch (error) {
		console.error(error);

		return Response.error({ error });
	}
}

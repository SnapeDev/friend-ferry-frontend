import Stripe from "stripe";
import { headers } from "next/headers";

import {
	STRIPE_ENDPOINT_SECRET,
	STRIPE_SECRET_KEY,
	NEXT_PUBLIC_SUPPORT_EMAIL,
	NEXT_PUBLIC_APPLICATION_URL,
} from "@/utils/server-constants";
import { supabaseAdminClient } from "@/utils/supabase/admin";

import { sendEmail } from "@/utils/mailgun/server";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST(request) {
	let event;

	try {
		const signature = headers().get("stripe-signature");
		const body = await request.text();
		try {
			event = stripe.webhooks.constructEvent(
				body,
				signature,
				STRIPE_ENDPOINT_SECRET
			);
		} catch (error) {
			throw new Error(`Webhook Error: ${error.message}`);
		}

		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntentSucceeded = event.data.object;
				const { status, metadata } = paymentIntentSucceeded;
				const { companion: companionString } = metadata;
				const companion = JSON.parse(companionString);

				const { data: bookingData, error } = await supabaseAdminClient
					.from("bookings")
					.update({
						status:
							status === "succeeded"
								? "paid"
								: status === "processing"
								? "pending"
								: "failed",
					})
					.eq("payment_intent_id", paymentIntentSucceeded.id)
					.select();

				const booking = bookingData[0];

				if (error) {
					throw error;
				}

				const { data: userData, error: userError } =
					await supabaseAdminClient.auth.admin.getUserById(booking.user_id);

				const { user } = userData;

				console.log("user", user);
				console.log("companion", companion);
				console.log("booking", booking);

				const emails = await Promise.all([
					sendEmail({
						to: user.email,
						subject: "Payment confirmation",
						templateId: "payment-confirmation-user",
						params: {
							booking,
							user,
							companion,
							support_email: NEXT_PUBLIC_SUPPORT_EMAIL,
						},
					}),
					sendEmail({
						to: companion.email,
						subject: "New booking request",
						templateId: "payment-confirmation-companion",
						params: {
							booking,
							user,
							companion,
							support_email: NEXT_PUBLIC_SUPPORT_EMAIL,
							confirm_booking_url: `${NEXT_PUBLIC_APPLICATION_URL}/api/bookings/${booking.id}/confirm`,
							decline_booking_url: `${NEXT_PUBLIC_APPLICATION_URL}/api/bookings/${booking.id}/decline`,
						},
					}),
					sendEmail({
						to: NEXT_PUBLIC_SUPPORT_EMAIL,
						subject: "New booking request",
						templateId: "payment-confirmation-admin",
						params: {
							booking,
							user,
							companion,
							support_email: NEXT_PUBLIC_SUPPORT_EMAIL,
						},
					}),
				]);

				console.log("emails", emails);

				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		return Response.json({ received: true });
	} catch (error) {
		console.error(error);

		return Response.error({ error });
	}
}

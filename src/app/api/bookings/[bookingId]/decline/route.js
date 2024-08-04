import { NEXT_PUBLIC_SUPPORT_EMAIL } from "@/utils/server-constants";
import { supabaseAdminClient } from "@/utils/supabase/admin";

import { sendEmail } from "@/utils/mailgun/server";

export async function GET(request, { params }) {
	try {
		const { bookingId } = params;
		const { data: booking, error } = await supabaseAdminClient
			.from("bookings")
			.update({
				status: "declined",
			})
			.eq("id", bookingId)
			.select()
			.single();

		if (error) {
			throw error;
		}

		const { data: companion, error: companionError } = await supabaseAdminClient
			.from("companions")
			.select("*")
			.eq("id", booking.companion_id)
			.single();

		const { data: userData, error: userError } =
			await supabaseAdminClient.auth.admin.getUserById(booking.user_id);

		const { user } = userData;

		console.log("user", user);

		console.log("booking", booking);

		const emails = await Promise.all([
			sendEmail({
				to: user.email,
				subject: "Booking declination",
				templateId: "booking-declination-user",
				params: {
					booking,
					user,
					companion,
					support_email: NEXT_PUBLIC_SUPPORT_EMAIL,
				},
			}),
			sendEmail({
				to: NEXT_PUBLIC_SUPPORT_EMAIL,
				subject: "Booking declined by companion",
				templateId: "booking-declination-admin",
				params: {
					booking,
					user,
					companion,
					support_email: NEXT_PUBLIC_SUPPORT_EMAIL,
				},
			}),
		]);

		console.log("emails", emails);

		return Response.json({ received: true });
	} catch (error) {
		console.error(error);

		return Response.error({ error });
	}
}

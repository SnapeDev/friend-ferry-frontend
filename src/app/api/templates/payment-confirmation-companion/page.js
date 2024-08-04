import paymentConfirmationCompanion from "@/utils/mailgun/templates/payment-confirmation-companion";

export default function PaymentConfirmationCompanion() {
	return (
		<div dangerouslySetInnerHTML={{ __html: paymentConfirmationCompanion }} />
	);
}

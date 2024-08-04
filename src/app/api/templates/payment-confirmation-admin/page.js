import paymentConfirmationAdmin from "@/utils/mailgun/templates/payment-confirmation-admin";

export default function PaymentConfirmationAdmin() {
	return <div dangerouslySetInnerHTML={{ __html: paymentConfirmationAdmin }} />;
}

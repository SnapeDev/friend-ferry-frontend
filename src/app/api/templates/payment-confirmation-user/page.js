import paymentConfirmationUser from "@/utils/mailgun/templates/payment-confirmation-user";

export default function PaymentConfirmationUser() {
	return <div dangerouslySetInnerHTML={{ __html: paymentConfirmationUser }} />;
}

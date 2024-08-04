import signupConfirmationUser from "@/utils/mailgun/templates/signup-confirmation-user";

export default function SignupConfirmationUser() {
	return <div dangerouslySetInnerHTML={{ __html: signupConfirmationUser }} />;
}

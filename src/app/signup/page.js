import SignupForm from "@/components/signup/SignupForm";

export default function Signup() {
	return (
		<div className="px-4 md:px-8 my-5 grow flex items-center">
			<div className="flex flex-col gap-6 justify-between items-center mx-auto max-w-screen-2xl">
				<SignupForm />
			</div>
		</div>
	);
}

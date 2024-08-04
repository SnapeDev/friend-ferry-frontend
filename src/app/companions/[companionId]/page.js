import Summary from "@/components/companions/Summary";
import { NEXT_PUBLIC_APPLICATION_URL } from "@/utils/server-constants";

export default async function Companion({ params }) {
	const { companionId } = params;
	const companion = await fetch(
		`${NEXT_PUBLIC_APPLICATION_URL}/api/companions/${companionId}`,
		{
			cache: "no-store",
		}
	).then((res) => {
		return res.json();
	});

	return (
		<div className="px-4 md:px-8 my-5 grow flex items-center">
			<div className="w-full mx-auto max-w-screen-xl ">
				<Summary companion={companion} />
			</div>
		</div>
	);
}

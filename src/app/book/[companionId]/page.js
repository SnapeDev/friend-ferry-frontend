import BookForm from "@/components/companions/BookForm";
import { NEXT_PUBLIC_APPLICATION_URL } from "@/utils/server-constants";

export default async function Book({ params }) {
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
		<div className=" grow flex">
			<div className="w-full mx-auto max-w-screen-lg ">
				<BookForm companion={companion} />
			</div>
		</div>
	);
}

import { NEXT_PUBLIC_SUPABASE_URL } from "@/utils/client-constants";

export function getCompanionImage(companion, image_name) {
	return `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/companions/${
		companion.id
	}/${image_name || companion?.featured_image}`;
}

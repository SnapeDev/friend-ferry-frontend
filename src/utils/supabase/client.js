import { createBrowserClient as supabaseCreateBrowserClient } from "@supabase/ssr";

import {
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
	NEXT_PUBLIC_SUPABASE_URL,
} from "@/utils/client-constants";

export function createBrowserClient() {
	return supabaseCreateBrowserClient(
		NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY
	);
}

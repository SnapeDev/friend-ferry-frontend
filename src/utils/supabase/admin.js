import { createClient } from "@supabase/supabase-js";

import {
	SUPABASE_SERVICE_ROLE_KEY,
	NEXT_PUBLIC_SUPABASE_URL,
} from "../server-constants";

const supabaseAdminClient = createClient(
	NEXT_PUBLIC_SUPABASE_URL,
	SUPABASE_SERVICE_ROLE_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	}
);

export { supabaseAdminClient };

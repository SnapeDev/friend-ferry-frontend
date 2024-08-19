"use client";

import { createBrowserClient } from "@/utils/supabase/client";
import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const SupabaseContext = createContext({});

export function SupabaseProvider({ children }) {
	const router = useRouter();

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const supabase = createBrowserClient();

	async function signOut() {
		await supabase.auth.signOut({ scope: "local" });

		setData({});
		setError(null);
		router.refresh(); // if we are in "protected" route, then it will auto-redirect to "/login"
	}

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") {
				setData(null);
			} else if (session) {
				setData(session);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<SupabaseContext.Provider
			value={{
				supabase,
				data,
				error,
				setData,
				setError,
				signOut,
			}}
		>
			{children}
		</SupabaseContext.Provider>
	);
}

export function useSupabase() {
	return useContext(SupabaseContext);
}

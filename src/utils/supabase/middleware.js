import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import {
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from "../client-constants";
export async function updateSession(request) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/book")) {
    const url = request.nextUrl.clone();
    const nextPathNameWithoutPossibleLeadingSlash = request.nextUrl.pathname.replace(/^\//, '')
    url.pathname = "/login";
    url.searchParams.set("nextPath", nextPathNameWithoutPossibleLeadingSlash);

    return NextResponse.redirect(url);
  } else if (
    user &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    // user is logged in, potentially respond by redirecting the user to the home page
    const url = request.nextUrl.clone();

    const nextPath = url.searchParams.get("nextPath");
    if (nextPath && !nextPath.startsWith('http') && !nextPath.startsWith('//')) {
      url.pathname = `/${nextPath.replace(/^\//, '')}`;
			url.searchParams.delete('nextPath');
    } else {
      url.pathname = "/companions";
    }
    return NextResponse.redirect(url);
  }

	// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
	// creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}

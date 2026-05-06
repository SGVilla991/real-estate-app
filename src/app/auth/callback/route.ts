import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/**
 * This route is called by Supabase after a user clicks the confirmation link
 * in their email. Supabase sends a one-time `code` as a URL parameter.
 * We exchange that code for a real session (which logs the user in),
 * then redirect them to the dashboard.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Code exchanged successfully — user is now logged in
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Something went wrong — send them to login with an error message
  return NextResponse.redirect(
    new URL("/login?error=confirmation_failed", requestUrl.origin)
  );
}

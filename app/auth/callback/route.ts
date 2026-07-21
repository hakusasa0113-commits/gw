import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// This route is called by Supabase after:
//   - Email confirmation (signup)
//   - Password reset link click
//   - Google OAuth redirect
//
// It exchanges the one-time code for a session, then redirects the user.

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — send to login with an error hint
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

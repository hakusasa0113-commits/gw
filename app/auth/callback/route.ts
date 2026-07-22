import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Called by Supabase after:
//   - Email confirmation on signup
//   - Password reset email link click  → redirects to /reset-password
//   - Google OAuth flow                → redirects to / (or ?next= param)

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code  = searchParams.get("code");
  const next  = searchParams.get("next") ?? "/";
  const error = searchParams.get("error");

  // Supabase sometimes sends an error param (e.g. expired link)
  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=auth_callback_failed`
    );
  }

  if (code) {
    const supabase = createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      // Successful exchange → go to the requested destination
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No code or exchange failed
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  const supabase = createClient();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (error) { setError(error.message); return; }
    setDone(true);
  }

  async function handleGoogleSignUp() {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  // Password strength indicator
  const strength =
    password.length === 0 ? 0
    : password.length < 8 ? 1
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 3
    : 2;

  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red", "bg-amber", "bg-mint"];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 py-12">

      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-card">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="font-display text-[22px] font-bold text-ink">Groundwork</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[420px] animate-scale-in overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card-hover">

        {/* Header */}
        <div className="border-b border-line bg-gradient-to-r from-purple-soft to-blue-soft px-8 py-6">
          <h1 className="font-display text-[24px] font-bold text-ink">Create your account</h1>
          <p className="mt-1 text-[13px] text-slate">
            Track opportunities, build your CV, and strengthen your personal statement.
          </p>
        </div>

        <div className="p-8">

          {/* Success state */}
          {done ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mint-soft text-4xl">✉️</div>
              <p className="font-display text-[18px] font-bold text-ink">Check your inbox</p>
              <p className="text-[13px] leading-relaxed text-slate">
                We sent a confirmation link to <strong className="text-ink">{email}</strong>.
                Click it to activate your account — it may take a minute to arrive.
              </p>
              <Link
                href="/login"
                className="mt-2 rounded-xl bg-gradient-primary px-6 py-2.5 text-[13px] font-bold text-white shadow-card transition hover:opacity-90"
              >
                Go to sign in →
              </Link>
            </div>
          ) : (
            <>
              {/* Google button */}
              <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-paper-raised py-3 text-[14px] font-bold text-ink shadow-card transition-all duration-200 hover:border-blue hover:shadow-card-hover disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-line" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate">or</span>
                <div className="h-px flex-1 bg-line" />
              </div>

              {/* Email form */}
              <form onSubmit={handleSignUp} className="flex flex-col gap-4">

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-slate">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-slate">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Min. 8 characters"
                    className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
                  />
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex flex-1 gap-1">
                        {[1, 2, 3].map(i => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength ? strengthColor[strength] : "bg-line"
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold ${
                        strength === 1 ? "text-red" : strength === 2 ? "text-amber" : "text-mint"
                      }`}>
                        {strengthLabel[strength]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-slate">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-slate transition focus:outline-none focus:shadow-glow ${
                      confirm.length > 0 && confirm !== password
                        ? "border-red focus:border-red"
                        : "border-line focus:border-blue"
                    }`}
                  />
                  {confirm.length > 0 && confirm !== password && (
                    <p className="mt-1 text-[11px] font-semibold text-red">Passwords don't match</p>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="animate-fade-in rounded-xl border border-red/30 bg-red-soft px-4 py-3 text-[13px] font-semibold text-red">
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || (confirm.length > 0 && confirm !== password)}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-[14px] font-bold text-white shadow-card transition-all hover:opacity-90 hover:shadow-card-hover disabled:opacity-50"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-line px-8 py-4 text-center text-[13px] text-slate">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue hover:underline">Sign in →</Link>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-slate">
        By creating an account you agree to our{" "}
        <span className="font-semibold text-ink-soft">terms of service</span>.
      </p>
    </div>
  );
}

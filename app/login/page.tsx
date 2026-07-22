"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  AuthLayout,
  GoogleButton,
  Divider,
  ErrorBanner,
  Field,
  SubmitButton,
} from "@/components/AuthLayout";

// ── Tiny show/hide password input ────────────────────────────────────
function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-paper py-3 pl-4 pr-11 text-[14px] text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-slate transition hover:text-ink"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────
type Step = "signin" | "forgot" | "sent";

// ── Inner component: everything that uses useSearchParams ───────────
function LoginPageInner() {
  const searchParams = useSearchParams();
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep]       = useState<Step>("signin");
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  // Show error if redirected here after a failed callback
  useEffect(() => {
    if (searchParams.get("error") === "auth_callback_failed") {
      setError("Something went wrong with that link. Please try again.");
    }
  }, [searchParams]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Email or password is incorrect."
          : error.message
      );
      return;
    }
    window.location.href = "/";
  }

  async function googleSignIn() {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  async function sendResetLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setStep("sent");
  }

  // ── Render: email sent confirmation ──────────────────────────────
  if (step === "sent") {
    return (
      <AuthLayout
        headerGradient="from-mint-soft to-blue-soft"
        title="Check your inbox"
        subtitle="We sent you a password reset link."
        footerText="Remember your password?"
        footerLinkLabel="Sign in"
        footerLinkHref="/login"
      >
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-mint-soft text-4xl shadow-card">
            ✉️
          </div>
          <div>
            <p className="font-display text-[17px] font-bold text-ink">Link sent to</p>
            <p className="mt-1 font-semibold text-blue">{email}</p>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-slate">
            Click the link in the email to set a new password. It expires in 60 minutes.
            Check your spam folder if you don't see it.
          </p>
          <button
            onClick={() => { setStep("signin"); setError(null); }}
            className="mt-1 rounded-xl border border-line bg-paper-raised px-6 py-2.5 text-[13px] font-bold text-slate shadow-card transition hover:border-blue hover:text-blue"
          >
            ← Back to sign in
          </button>
        </div>
      </AuthLayout>
    );
  }

  // ── Render: forgot password form ─────────────────────────────────
  if (step === "forgot") {
    return (
      <AuthLayout
        headerGradient="from-amber-soft to-orange-50"
        title="Reset your password"
        subtitle="Enter your email and we'll send a reset link — it's valid for 60 minutes."
        footerText="Remember your password?"
        footerLinkLabel="Sign in"
        footerLinkHref="/login"
      >
        <form onSubmit={sendResetLink} className="flex flex-col gap-4">
          <Field label="Email address">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
            />
          </Field>

          {error && <ErrorBanner message={error} />}

          <SubmitButton loading={loading} label="Send reset link" />

          <button
            type="button"
            onClick={() => { setStep("signin"); setError(null); }}
            className="text-center text-[13px] font-bold text-slate transition hover:text-blue"
          >
            ← Back to sign in
          </button>
        </form>
      </AuthLayout>
    );
  }

  // ── Render: sign-in form (default) ───────────────────────────────
  return (
    <AuthLayout
      headerGradient="from-blue-soft to-purple-soft"
      title="Welcome back"
      subtitle="Sign in to track your opportunities and build your CV."
      footerText="No account?"
      footerLinkLabel="Create one"
      footerLinkHref="/signup"
    >
      <div className="flex flex-col gap-5">
        <GoogleButton onClick={googleSignIn} loading={loading} />
        <Divider />

        <form onSubmit={signIn} className="flex flex-col gap-4">
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
            />
          </Field>

          <Field
            label="Password"
            rightSlot={
              <button
                type="button"
                onClick={() => { setStep("forgot"); setError(null); }}
                className="text-[11px] font-bold text-blue transition hover:underline"
              >
                Forgot password?
              </button>
            }
          >
            <PasswordInput value={password} onChange={setPassword} />
          </Field>

          {error && <ErrorBanner message={error} />}

          <SubmitButton loading={loading} label="Sign in" />
        </form>

        <p className="text-center text-[12px] text-slate">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-blue hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

// ── Page: wraps the inner component in Suspense (required by Next.js
// whenever a page uses useSearchParams) ──────────────────────────────
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
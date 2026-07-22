"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  AuthLayout,
  GoogleButton,
  Divider,
  ErrorBanner,
  Field,
  SubmitButton,
} from "@/components/AuthLayout";

// ── Password visibility toggle input ─────────────────────────────────
function PasswordInput({
  value,
  onChange,
  placeholder = "Min. 8 characters",
  autoComplete = "new-password",
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

// ── Password strength ─────────────────────────────────────────────────
function StrengthBar({ password }: { password: string }) {
  if (!password.length) return null;

  const hasLength  = password.length >= 8;
  const hasUpper   = /[A-Z]/.test(password);
  const hasNumber  = /[0-9]/.test(password);
  const hasSymbol  = /[^A-Za-z0-9]/.test(password);

  const score = [hasLength, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red", "bg-amber", "bg-amber", "bg-mint"];
  const textColors = ["", "text-red", "text-amber", "text-amber", "text-mint"];

  return (
    <div className="mt-2.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : "bg-line"
            }`}
          />
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className={`text-[10.5px] font-bold ${textColors[score]}`}>
          {labels[score]}
        </span>
        <span className="text-[10.5px] text-slate">
          {!hasUpper && "Add uppercase · "}
          {!hasNumber && "Add number · "}
          {!hasSymbol && "Add symbol"}
        </span>
      </div>
    </div>
  );
}

// ── Checklist item ────────────────────────────────────────────────────
function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`flex items-center gap-1.5 text-[11.5px] ${ok ? "text-mint" : "text-slate"}`}>
      <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black ${ok ? "bg-mint text-white" : "bg-line text-slate"}`}>
        {ok ? "✓" : "·"}
      </span>
      {label}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────
export default function SignupPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  const supabase = createClient();

  const passwordsMatch = confirm.length === 0 || confirm === password;
  const canSubmit = !loading && passwordsMatch && password.length >= 8;

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }

    // If email confirmation is disabled in Supabase, signUp returns an
    // active session immediately — skip the "check your email" screen
    // and log the user straight in.
    if (data.session) {
      window.location.href = "/";
      return;
    }

    setDone(true);
  }

  async function googleSignUp() {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  // ── Render: done state ───────────────────────────────────────────
  if (done) {
    return (
      <AuthLayout
        headerGradient="from-mint-soft to-blue-soft"
        title="Almost there!"
        subtitle="One last step — confirm your email."
        footerText="Already confirmed?"
        footerLinkLabel="Sign in"
        footerLinkHref="/login"
      >
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-mint-soft text-4xl shadow-card">
            ✉️
          </div>
          <div>
            <p className="font-display text-[17px] font-bold text-ink">Confirm your email</p>
            <p className="mt-1 font-semibold text-blue">{email}</p>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-slate">
            We sent a confirmation link to your inbox. Click it to activate your account.
            Check your spam folder if you don't see it within a couple of minutes.
          </p>
          <div className="flex w-full flex-col gap-2">
            <Link
              href="/login"
              className="rounded-xl bg-gradient-primary px-6 py-3 text-center text-[13px] font-bold text-white shadow-card transition hover:opacity-90"
            >
              Go to sign in →
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-line px-6 py-3 text-center text-[13px] font-bold text-slate transition hover:border-blue hover:text-blue"
            >
              Browse opportunities while you wait
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // ── Render: signup form ──────────────────────────────────────────
  return (
    <AuthLayout
      headerGradient="from-purple-soft to-blue-soft"
      title="Create your account"
      subtitle="Track opportunities, build your CV, and strengthen your personal statement."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkHref="/login"
    >
      <div className="flex flex-col gap-5">
        <GoogleButton onClick={googleSignUp} loading={loading} label="Sign up with Google" />
        <Divider />

        <form onSubmit={signUp} className="flex flex-col gap-4">

          {/* Name */}
          <Field label="Full name">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
              placeholder="Alex Johnson"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
            />
          </Field>

          {/* Email */}
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

          {/* Password */}
          <Field label="Password">
            <PasswordInput value={password} onChange={setPassword} />
            <StrengthBar password={password} />
          </Field>

          {/* Confirm */}
          <Field label="Confirm password">
            <PasswordInput
              value={confirm}
              onChange={setConfirm}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {confirm.length > 0 && (
              <div className="mt-2">
                <Check ok={confirm === password} label="Passwords match" />
              </div>
            )}
          </Field>

          {/* Requirements checklist */}
          {password.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 rounded-xl border border-line bg-paper p-3">
              <Check ok={password.length >= 8}            label="8+ characters" />
              <Check ok={/[A-Z]/.test(password)}          label="Uppercase letter" />
              <Check ok={/[0-9]/.test(password)}          label="Number" />
              <Check ok={/[^A-Za-z0-9]/.test(password)}  label="Symbol" />
            </div>
          )}

          {error && <ErrorBanner message={error} />}

          <SubmitButton loading={loading} label="Create account" disabled={!canSubmit} />
        </form>

        <p className="text-center text-[12px] text-slate">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

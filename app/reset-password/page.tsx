"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  AuthLayout,
  ErrorBanner,
  Field,
  SubmitButton,
} from "@/components/AuthLayout";

// ── Show/hide password ────────────────────────────────────────────────
function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  borderClass = "border-line focus:border-blue",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  borderClass?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          placeholder={placeholder ?? "••••••••"}
          className={`w-full rounded-xl border ${borderClass} bg-paper py-3 pl-4 pr-11 text-[14px] text-ink placeholder:text-slate transition focus:outline-none focus:shadow-glow`}
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
    </Field>
  );
}

// ── Page ─────────────────────────────────────────────────────────────
export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  const supabase = createClient();

  const passwordsMatch = confirm.length === 0 || confirm === password;
  const isStrong = password.length >= 8;
  const canSubmit = !loading && isStrong && confirm === password;

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (!isStrong) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(
        error.message.includes("same password")
          ? "Your new password must be different from your old one."
          : error.message
      );
      return;
    }

    setDone(true);
  }

  // ── Done state ──────────────────────────────────────────────────
  if (done) {
    return (
      <AuthLayout
        headerGradient="from-mint-soft to-blue-soft"
        title="Password updated"
        subtitle="Your new password is set. You can now sign in."
        footerText="Need help?"
        footerLinkLabel="Contact support"
        footerLinkHref="/login"
      >
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-mint-soft text-4xl shadow-card">
            🔐
          </div>
          <div>
            <p className="font-display text-[17px] font-bold text-ink">All set!</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
              Your password has been updated successfully. Sign in to continue.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full rounded-xl bg-gradient-primary px-6 py-3 text-center text-[14px] font-bold text-white shadow-card transition hover:opacity-90 hover:shadow-card-hover"
          >
            Sign in →
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Form ────────────────────────────────────────────────────────
  return (
    <AuthLayout
      headerGradient="from-amber-soft to-purple-soft"
      title="Set a new password"
      subtitle="Choose a strong password — at least 8 characters with a mix of letters, numbers and symbols."
      footerText="Changed your mind?"
      footerLinkLabel="Back to sign in"
      footerLinkHref="/login"
    >
      <form onSubmit={updatePassword} className="flex flex-col gap-5">

        {/* New password */}
        <PasswordInput
          label="New password"
          value={password}
          onChange={setPassword}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
        />

        {/* Strength indicator */}
        {password.length > 0 && (
          <div className="-mt-2 flex flex-wrap gap-x-4 gap-y-1.5 rounded-xl border border-line bg-paper px-3 py-2.5">
            {[
              { ok: password.length >= 8,           label: "8+ characters" },
              { ok: /[A-Z]/.test(password),          label: "Uppercase" },
              { ok: /[0-9]/.test(password),          label: "Number" },
              { ok: /[^A-Za-z0-9]/.test(password),  label: "Symbol" },
            ].map(({ ok, label }) => (
              <span key={label} className={`flex items-center gap-1.5 text-[11.5px] ${ok ? "text-mint" : "text-slate"}`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black ${ok ? "bg-mint text-white" : "bg-line text-slate"}`}>
                  {ok ? "✓" : "·"}
                </span>
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Confirm */}
        <PasswordInput
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          borderClass={
            confirm.length > 0 && !passwordsMatch
              ? "border-red focus:border-red"
              : "border-line focus:border-blue"
          }
        />
        {confirm.length > 0 && !passwordsMatch && (
          <p className="-mt-3 text-[11.5px] font-semibold text-red">Passwords don't match</p>
        )}
        {confirm.length > 0 && passwordsMatch && confirm.length >= 8 && (
          <p className="-mt-3 flex items-center gap-1 text-[11.5px] font-semibold text-mint">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint text-[9px] font-black text-white">✓</span>
            Passwords match
          </p>
        )}

        {error && <ErrorBanner message={error} />}

        <SubmitButton
          loading={loading}
          label="Update password"
          disabled={!canSubmit}
        />
      </form>
    </AuthLayout>
  );
}

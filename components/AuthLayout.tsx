"use client";

import Link from "next/link";

const Logo = () => (
  <Link href="/" className="mb-8 flex items-center gap-2.5 self-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-card">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
    <span className="font-display text-[22px] font-bold text-ink">Groundwork</span>
  </Link>
);

interface AuthLayoutProps {
  /** Gradient classes for the header strip, e.g. "from-blue-soft to-purple-soft" */
  headerGradient?: string;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  children: React.ReactNode;
}

export function AuthLayout({
  headerGradient = "from-blue-soft to-purple-soft",
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 py-12">
      <Logo />

      <div className="w-full max-w-[440px] animate-scale-in overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card-hover">
        {/* Header strip */}
        <div className={`border-b border-line bg-gradient-to-r ${headerGradient} px-8 py-7`}>
          <h1 className="font-display text-[26px] font-bold leading-tight text-ink">{title}</h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate">{subtitle}</p>
        </div>

        {/* Body */}
        <div className="p-8">{children}</div>

        {/* Footer */}
        <div className="border-t border-line px-8 py-4 text-center text-[13px] text-slate">
          {footerText}{" "}
          <Link href={footerLinkHref} className="font-bold text-blue hover:underline">
            {footerLinkLabel} →
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-slate">
        By using Groundwork you agree to our{" "}
        <span className="cursor-default font-semibold text-ink-soft">terms of service</span>.
      </p>
    </div>
  );
}

/** Reusable Google OAuth button */
export function GoogleButton({
  onClick,
  loading,
  label = "Continue with Google",
}: {
  onClick: () => void;
  loading: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-paper-raised py-3 text-[14px] font-bold text-ink shadow-card transition-all duration-200 hover:border-blue hover:shadow-card-hover disabled:opacity-50"
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-blue" />
      ) : (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      )}
      {label}
    </button>
  );
}

/** Horizontal divider with "or" label */
export function Divider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-line" />
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate">or</span>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Generic error banner */
export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="animate-fade-in flex items-start gap-2.5 rounded-xl border border-red/30 bg-red-soft px-4 py-3 text-[13px] font-semibold text-red">
      <span className="mt-0.5 shrink-0">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

/** Labelled input field, with optional right-side slot for "Forgot password?" etc. */
export function Field({
  label,
  rightSlot,
  children,
}: {
  label: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate">{label}</label>
        {rightSlot}
      </div>
      {children}
    </div>
  );
}

/** Primary submit button */
export function SubmitButton({
  loading,
  label,
  disabled,
}: {
  loading: boolean;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-[14px] font-bold text-white shadow-card transition-all hover:opacity-90 hover:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        label
      )}
    </button>
  );
}

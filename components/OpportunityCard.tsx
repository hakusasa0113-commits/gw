"use client";

import type { Opportunity } from "@/types";

const MODE_CONFIG = {
  online:      { label: "Online",    bg: "bg-mint-soft",   text: "text-mint",   dot: "bg-mint",   border: "border-l-mint" },
  "in-person": { label: "In person", bg: "bg-amber-soft",  text: "text-amber",  dot: "bg-amber",  border: "border-l-amber" },
  hybrid:      { label: "Hybrid",    bg: "bg-blue-soft",   text: "text-blue",   dot: "bg-blue",   border: "border-l-blue" },
} as const;

const REGION_FLAG: Record<string, string> = {
  UK: "🇬🇧", US: "🇺🇸", Japan: "🇯🇵", Malaysia: "🇲🇾", Korea: "🇰🇷", China: "🇨🇳",
};

function formatChecked(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 7)  return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

export function OpportunityCard({
  opportunity: o,
  saved,
  onOpen,
  onToggleSave,
}: {
  opportunity: Opportunity;
  saved?: boolean;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
}) {
  const mode = MODE_CONFIG[o.mode];

  return (
    <div
      onClick={() => onOpen(o.id)}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line border-l-[3px] ${mode.border} bg-paper-raised shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-blue/30 hover:shadow-card-hover`}
    >
      {/* Competition glow strip */}
      {o.type === "competition" && (
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-primary" />
      )}

      <div className="flex flex-col gap-3 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10.5px] font-bold uppercase tracking-wider text-slate transition-colors duration-150 group-hover:text-blue">
              {o.organisation_name}
            </p>
            <h3 className="mt-1 font-display text-[16.5px] font-bold leading-snug text-ink">
              {o.role}
            </h3>
          </div>

          {/* Badges */}
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${mode.bg} ${mode.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${mode.dot}`} />
              {mode.label}
            </span>
            {o.type === "competition" && (
              <span className="flex items-center gap-1 rounded-full bg-purple-soft px-2.5 py-1 text-[10px] font-bold text-purple">
                🏆 Competition
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
          {o.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {o.skills.slice(0, 3).map(s => (
            <span key={s} className="rounded-lg border border-line bg-paper px-2 py-0.5 text-[11px] font-medium text-ink-soft transition-colors duration-150 group-hover:border-blue/20">
              {s}
            </span>
          ))}
          {o.skills.length > 3 && (
            <span className="rounded-lg border border-line bg-paper px-2 py-0.5 text-[11px] font-medium text-slate">
              +{o.skills.length - 3}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-dashed border-line pt-3 text-[11.5px] text-slate">
          <span className="flex items-center gap-1">⏱ {o.weekly_commitment}</span>
          <span className="flex items-center gap-1">🎂 {o.min_age}+</span>
          <span className="flex items-center gap-1">📍 {o.town}</span>
          <span className="flex items-center gap-1">{REGION_FLAG[o.region] ?? "🌍"} {o.region}</span>
          {o.last_checked && (
            <span className="ml-auto text-[10.5px] opacity-40">🔄 {formatChecked(o.last_checked)}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex gap-2 border-t border-line bg-paper-subtle px-5 py-3">
        <button
          onClick={e => { e.stopPropagation(); onOpen(o.id); }}
          className="flex-1 rounded-xl bg-gradient-primary py-2.5 text-[13px] font-bold text-white shadow-card transition-all duration-150 hover:opacity-90 hover:shadow-card-hover"
        >
          View & apply →
        </button>
        <button
          onClick={e => { e.stopPropagation(); onToggleSave(o.id); }}
          className={`rounded-xl border px-4 py-2.5 text-[13px] font-bold transition-all duration-150 ${
            saved
              ? "border-transparent bg-mint-soft text-mint"
              : "border-line bg-paper-raised text-ink-soft hover:border-blue hover:text-blue"
          }`}
          title={saved ? "Remove from saved" : "Save"}
        >
          {saved ? "✓" : "🔖"}
        </button>
      </div>
    </div>
  );
}

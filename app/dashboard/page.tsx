"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import sampleOpportunities from "@/data/sample-opportunities.json";
import type { Opportunity } from "@/types";
import { computeStatementScore } from "@/lib/statement-score";

const OPPORTUNITIES = sampleOpportunities as unknown as Opportunity[];
type Status = "saved" | "in_progress" | "completed";

const SCORE_COLOR = (v: number) =>
  v >= 70 ? "text-mint" : v >= 40 ? "text-amber" : "text-pink";
const BAR_COLOR = (v: number) =>
  v >= 70 ? "bg-gradient-success" : v >= 40 ? "bg-gradient-warm" : "bg-gradient-primary";

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-line">
      <div
        className={`h-full rounded-full transition-all duration-700 ${BAR_COLOR(value)}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

const MODE_BADGE: Record<string, string> = {
  online:      "bg-mint-soft text-mint",
  "in-person": "bg-amber-soft text-amber",
  hybrid:      "bg-blue-soft text-blue",
};

export default function DashboardPage() {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [targetCourse, setTargetCourse] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const savedIds = Object.keys(statuses);
  const savedItems = savedIds
    .map(id => ({ opportunity: OPPORTUNITIES.find(o => o.id === id)!, status: statuses[id] }))
    .filter(i => i.opportunity);

  const score = useMemo(
    () => computeStatementScore(savedItems, targetCourse || null),
    [savedItems, targetCourse]
  );

  function setStatus(id: string, status: Status) {
    setStatuses(p => ({ ...p, [id]: status }));
  }

  function removeItem(id: string) {
    setStatuses(p => { const n = { ...p }; delete n[id]; return n; });
  }

  // Build a simple CV text for copy
  const cvText = savedItems.length
    ? savedItems
        .map(({ opportunity: o, status }) =>
          `${o.role} — ${o.organisation_name}\n${o.weekly_commitment} · ${o.town} · ${status === "completed" ? "Completed" : "Ongoing"}\nSkills: ${o.skills.join(", ")}`
        )
        .join("\n\n")
    : "";

  function copyCV() {
    navigator.clipboard.writeText(cvText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const completedCount = savedItems.filter(i => i.status === "completed").length;
  const inProgressCount = savedItems.filter(i => i.status === "in_progress").length;

  return (
    <div className="min-h-screen bg-paper">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-line bg-paper-raised/90 shadow-nav backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-card">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span className="font-display text-[18px] font-bold text-ink">Groundwork</span>
          </Link>
          <span className="text-line">/</span>
          <span className="text-sm font-semibold text-slate">Dashboard</span>
          <Link
            href="/"
            className="ml-auto hidden items-center gap-1.5 rounded-full border border-line bg-paper-raised px-4 py-1.5 text-[12px] font-bold text-slate transition hover:border-blue hover:text-blue sm:flex"
          >
            ← Discover
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-[1240px] px-6 py-10">

        {/* Page header */}
        <div className="animate-fade-up mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue">Your portfolio</p>
          <h1 className="mt-2 font-display text-[32px] font-bold leading-tight text-ink md:text-[40px]">
            Build your experience —<br className="hidden sm:block" /> and your statement.
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Save opportunities from the Discover page to track your progress, build a CV preview, and measure your personal statement strength.
          </p>
        </div>

        {/* Summary stats */}
        {savedItems.length > 0 && (
          <div className="animate-fade-up mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4" style={{animationDelay:"0.05s",opacity:0}}>
            {[
              { label: "Saved",       value: savedIds.length,   color: "text-blue",   bg: "bg-blue-soft" },
              { label: "In progress", value: inProgressCount,   color: "text-amber",  bg: "bg-amber-soft" },
              { label: "Completed",   value: completedCount,    color: "text-mint",   bg: "bg-mint-soft" },
              { label: "PS score",    value: `${score.overall}`, color: SCORE_COLOR(score.overall), bg: "bg-purple-soft" },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`rounded-2xl border border-line ${bg} p-5 shadow-card`}>
                <p className={`font-display text-3xl font-bold ${color}`}>{value}</p>
                <p className="mt-0.5 text-[12px] font-medium text-slate">{label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left column */}
          <div className="flex flex-col gap-5">

            {/* Saved opportunities */}
            <div className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card" style={{animationDelay:"0.1s",opacity:0}}>
              <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-blue-soft to-purple-soft px-6 py-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue">Saved opportunities</p>
                  <p className="mt-0.5 text-[12px] text-slate">{savedItems.length} item{savedItems.length !== 1 ? "s" : ""}</p>
                </div>
                <Link
                  href="/"
                  className="rounded-xl bg-blue px-4 py-2 text-[12px] font-bold text-white shadow-card transition hover:bg-blue-dim"
                >
                  + Add more
                </Link>
              </div>

              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-soft text-3xl">🔖</div>
                  <p className="mt-4 font-display text-[18px] font-bold text-ink">Nothing saved yet</p>
                  <p className="mt-2 max-w-xs text-sm text-slate">Go to the Discover page and tap Save on any opportunity card</p>
                  <Link href="/" className="mt-5 rounded-xl bg-gradient-primary px-6 py-2.5 text-sm font-bold text-white shadow-card transition hover:opacity-90">
                    Browse opportunities →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {savedItems.map(({ opportunity: o, status }, i) => (
                    <li
                      key={o.id}
                      className="animate-fade-up flex flex-wrap items-start gap-4 px-6 py-5 transition-colors hover:bg-paper"
                      style={{ animationDelay: `${0.1 + i * 0.04}s`, opacity: 0 }}
                    >
                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10.5px] font-bold uppercase tracking-wide text-slate">{o.organisation_name}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${MODE_BADGE[o.mode] ?? "bg-line text-slate"}`}>{o.mode}</span>
                          {o.type === "competition" && <span className="rounded-full bg-purple-soft px-2 py-0.5 text-[10px] font-bold text-purple">🏆</span>}
                        </div>
                        <p className="mt-1 font-display text-[15px] font-bold text-ink">{o.role}</p>
                        <p className="mt-0.5 text-[12px] text-slate">{o.weekly_commitment} · {o.town}</p>
                      </div>

                      {/* Status + actions */}
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <select
                          value={status}
                          onChange={e => setStatus(o.id, e.target.value as Status)}
                          className={`rounded-xl border px-3 py-1.5 text-[11px] font-bold outline-none transition ${
                            status === "completed"   ? "border-mint/30   bg-mint-soft   text-mint" :
                            status === "in_progress" ? "border-amber/30  bg-amber-soft  text-amber" :
                            "border-line bg-paper text-slate"
                          }`}
                        >
                          <option value="saved">Saved</option>
                          <option value="in_progress">In progress</option>
                          <option value="completed">Completed ✓</option>
                        </select>
                        <div className="flex gap-2">
                          <Link
                            href={`/opportunities/${o.id}`}
                            className="rounded-lg bg-blue-soft px-3 py-1 text-[11px] font-bold text-blue transition hover:bg-blue hover:text-white"
                          >View</Link>
                          <button
                            onClick={() => removeItem(o.id)}
                            className="rounded-lg bg-line px-3 py-1 text-[11px] font-bold text-slate transition hover:bg-red-soft hover:text-red"
                          >Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* CV Preview */}
            <div className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card" style={{animationDelay:"0.15s",opacity:0}}>
              <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-mint-soft to-blue-soft px-6 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-mint">CV preview</p>
                {savedItems.length > 0 && (
                  <button
                    onClick={copyCV}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold transition-all duration-200 ${
                      copied ? "bg-mint text-white" : "bg-mint-soft text-mint hover:bg-mint hover:text-white"
                    }`}
                  >
                    {copied ? "✓ Copied!" : "📋 Copy text"}
                  </button>
                )}
              </div>

              {savedItems.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm text-slate">Your CV builds here as you save and complete opportunities.</p>
                </div>
              ) : (
                <div className="p-6">
                  <h4 className="font-display text-[17px] font-bold text-ink">Volunteering &amp; Extracurricular Experience</h4>
                  <div className="mt-4 flex flex-col gap-5">
                    {savedItems.map(({ opportunity: o, status }) => (
                      <div key={o.id} className="rounded-xl border border-line bg-paper p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-ink">{o.role}</p>
                            <p className="text-[12px] text-slate">{o.organisation_name} · {o.weekly_commitment} · {o.town}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${status === "completed" ? "bg-mint-soft text-mint" : "bg-amber-soft text-amber"}`}>
                            {status === "completed" ? "Completed" : status === "in_progress" ? "In progress" : "Saved"}
                          </span>
                        </div>
                        <p className="mt-2 text-[12.5px] text-ink-soft">{o.skills.join(" · ")}</p>
                        {o.example_sentence && (
                          <p className="mt-2 border-l-2 border-blue pl-3 text-[12px] italic text-ink-soft">"{o.example_sentence}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column — PS Score */}
          <div className="flex flex-col gap-5">

            {/* Score card */}
            <div className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card" style={{animationDelay:"0.1s",opacity:0}}>
              <div className="border-b border-line bg-gradient-to-r from-purple-soft to-pink-soft px-6 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-purple">Personal statement strength</p>
              </div>
              <div className="p-6">

                {/* Big score dial */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-purple-soft to-blue-soft shadow-card">
                    <span className={`font-display text-4xl font-black ${SCORE_COLOR(score.overall)}`}>{score.overall}</span>
                    <span className="absolute bottom-5 text-[10px] font-bold text-slate">/ 100</span>
                  </div>
                  <p className="mt-3 text-[13px] font-semibold text-slate">
                    {score.overall >= 70 ? "Strong profile" : score.overall >= 40 ? "Building nicely" : "Just getting started"}
                  </p>
                </div>

                {/* Sub-scores */}
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Commitment",    value: score.commitment,       tip: "More experiences = higher commitment" },
                    { label: "Reflection",    value: score.reflection,       tip: "Mark experiences as completed" },
                    { label: "Skill range",   value: score.skill_range,      tip: "Diverse skills across experiences" },
                    { label: "Relevance",     value: score.course_relevance, tip: "Experiences matched to your course" },
                  ].map(({ label, value, tip }) => (
                    <div key={label}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-ink-soft">{label}</span>
                        <span className={`text-[12px] font-black ${SCORE_COLOR(value)}`}>{value}</span>
                      </div>
                      <ScoreBar value={value} />
                      <p className="mt-1 text-[10.5px] text-slate">{tip}</p>
                    </div>
                  ))}
                </div>

                {/* Target course */}
                <div className="mt-6 border-t border-line pt-5">
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-slate">
                    Target course (for relevance score)
                  </label>
                  <input
                    value={targetCourse}
                    onChange={e => setTargetCourse(e.target.value)}
                    placeholder="e.g. medicine, law, physics…"
                    className="w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-slate focus:border-purple focus:outline-none focus:shadow-glow-purple transition"
                  />
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="animate-fade-up rounded-2xl border border-amber/30 bg-amber-soft p-5 shadow-card" style={{animationDelay:"0.2s",opacity:0}}>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-amber">Tips to improve your score</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { done: savedIds.length >= 3, tip: "Save at least 3 different opportunities" },
                  { done: completedCount >= 1,  tip: "Mark at least 1 as completed" },
                  { done: completedCount >= 2,  tip: "Complete 2 or more experiences" },
                  { done: savedIds.length >= 5, tip: "Build a portfolio of 5+ experiences" },
                  { done: !!targetCourse,        tip: "Set a target course above" },
                ].map(({ done, tip }) => (
                  <li key={tip} className="flex items-start gap-2 text-[12.5px] text-ink-soft">
                    <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-black ${done ? "bg-mint text-white" : "bg-line text-slate"}`}>
                      {done ? "✓" : "·"}
                    </span>
                    <span className={done ? "line-through opacity-50" : ""}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

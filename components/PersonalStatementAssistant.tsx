"use client";

import { useState } from "react";
import type { Opportunity } from "@/types";

const PS_LIMIT = 4000; // UCAS personal statement character limit

export function PersonalStatementAssistant({ opportunity }: { opportunity: Opportunity }) {
  const [draft, setDraft] = useState(opportunity.example_sentence ?? "");
  const [copied, setCopied] = useState(false);
  const [sentenceCopied, setSentenceCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"prompts" | "draft">("prompts");

  const chars = draft.length;
  const pct = Math.min(100, (chars / PS_LIMIT) * 100);
  const barColor = pct > 90 ? "bg-gradient-warm" : pct > 70 ? "bg-gradient-primary" : "bg-gradient-success";
  const charColor = pct > 90 ? "text-pink" : pct > 70 ? "text-amber" : "text-mint";

  function copy(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2500);
    });
  }

  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-line bg-paper">

      {/* Tabs */}
      <div className="flex border-b border-line">
        {(["prompts", "draft"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-[12px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue bg-blue-soft text-blue"
                : "text-slate hover:text-ink"
            }`}
          >
            {tab === "prompts" ? "💡 Reflection prompts" : "✍️ Draft sentence"}
          </button>
        ))}
      </div>

      {/* Prompts tab */}
      {activeTab === "prompts" && (
        <div className="flex flex-col gap-5 p-5">

          {/* Achievements */}
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-blue">Example achievements</p>
            <ul className="flex flex-col gap-2.5">
              {opportunity.achievements.map(a => (
                <li key={a} className="flex items-start gap-2.5 rounded-xl border border-line bg-paper-raised p-3 text-[13px] leading-relaxed text-ink-soft transition hover:border-blue/20">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-soft text-[9px] font-black text-blue">✓</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Reflection prompts */}
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-purple">Reflection prompts</p>
            <ul className="flex flex-col gap-2.5">
              {opportunity.reflection_prompts.map(r => (
                <li key={r} className="flex items-start gap-2.5 rounded-xl border border-amber/20 bg-amber-soft p-3 text-[13px] leading-relaxed text-ink-soft">
                  <span className="mt-0.5 shrink-0 text-amber font-bold">?</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Example sentence with copy */}
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-mint">A sentence to adapt</p>
            <div className="relative rounded-xl border border-mint/20 bg-mint-soft p-4">
              <p className="pr-10 text-[13.5px] italic leading-relaxed text-ink-soft">
                "{opportunity.example_sentence}"
              </p>
              <button
                onClick={() => copy(`"${opportunity.example_sentence}"`, setSentenceCopied)}
                className={`absolute right-3 top-3 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-all ${
                  sentenceCopied
                    ? "bg-mint text-white"
                    : "bg-paper-raised text-slate hover:bg-mint hover:text-white"
                }`}
              >
                {sentenceCopied ? "✓" : "📋"}
              </button>
            </div>
            <button
              onClick={() => { setDraft(opportunity.example_sentence ?? ""); setActiveTab("draft"); }}
              className="mt-2.5 w-full rounded-xl border border-blue/20 bg-blue-soft py-2 text-[12px] font-bold text-blue transition hover:bg-blue hover:text-white"
            >
              ✍️ Use this as my draft →
            </button>
          </div>
        </div>
      )}

      {/* Draft tab */}
      {activeTab === "draft" && (
        <div className="flex flex-col gap-4 p-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue">Your draft sentence</p>
              <span className={`text-[11px] font-bold ${charColor}`}>
                {chars} / {PS_LIMIT.toLocaleString()} chars
              </span>
            </div>

            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={5}
              placeholder="Write or paste your personal statement sentence here. Edit the example from the Prompts tab, or start fresh…"
              className="w-full resize-none rounded-xl border border-line bg-paper-raised p-4 text-[13.5px] leading-relaxed text-ink placeholder:text-slate transition focus:border-blue focus:outline-none focus:shadow-glow"
            />

            {/* Character bar */}
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>

            {pct > 90 && (
              <p className="mt-1.5 text-[11px] font-semibold text-pink">
                ⚠️ Getting close to the UCAS 4,000 character limit
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => copy(draft, setCopied)}
              disabled={!draft.trim()}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold transition-all ${
                copied
                  ? "bg-mint text-white"
                  : draft.trim()
                    ? "bg-gradient-primary text-white hover:opacity-90"
                    : "cursor-not-allowed bg-line text-slate"
              }`}
            >
              {copied ? "✓ Copied!" : "📋 Copy to clipboard"}
            </button>
            {draft && (
              <button
                onClick={() => setDraft("")}
                className="rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-[13px] font-bold text-slate transition hover:border-red hover:bg-red-soft hover:text-red"
              >
                Clear
              </button>
            )}
          </div>

          <p className="text-[11.5px] leading-relaxed text-slate">
            Tip: Reference a specific moment or conversation from this experience, not just the fact you did it. Admissions tutors read thousands of statements — the detail is what makes yours memorable.
          </p>
        </div>
      )}
    </div>
  );
}

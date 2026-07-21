import { notFound } from "next/navigation";
import Link from "next/link";
import { PersonalStatementAssistant } from "@/components/PersonalStatementAssistant";
import sampleOpportunities from "@/data/sample-opportunities.json";
import type { Opportunity } from "@/types";

const OPPORTUNITIES = sampleOpportunities as unknown as Opportunity[];

const MODE_CONFIG = {
  online:      { label: "Online",    bg: "bg-mint-soft",  text: "text-mint",  dot: "bg-mint",  bar: "bg-gradient-success" },
  "in-person": { label: "In person", bg: "bg-amber-soft", text: "text-amber", dot: "bg-amber", bar: "bg-gradient-warm" },
  hybrid:      { label: "Hybrid",    bg: "bg-blue-soft",  text: "text-blue",  dot: "bg-blue",  bar: "bg-gradient-primary" },
} as const;

const REGION_FLAG: Record<string, string> = {
  UK: "🇬🇧", US: "🇺🇸", Japan: "🇯🇵", Malaysia: "🇲🇾", Korea: "🇰🇷", China: "🇨🇳",
};

export default function OpportunityDetail({ params }: { params: { id: string } }) {
  const o = OPPORTUNITIES.find(x => x.id === params.id);
  if (!o) notFound();
  const mode = MODE_CONFIG[o.mode];

  return (
    <div className="min-h-screen bg-paper">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-line bg-paper-raised/90 backdrop-blur-xl shadow-nav">
        <div className="mx-auto flex max-w-[1000px] items-center gap-4 px-6 py-3.5">
          <Link href="/" className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-slate transition-all hover:bg-blue-soft hover:text-blue">
            ← Back to discover
          </Link>
          <span className="text-line">/</span>
          <span className="truncate text-sm font-medium text-slate">{o.role}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-[1000px] px-6 py-10">

        {/* Hero card */}
        <div className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card">
          {/* Gradient top strip */}
          <div className={`h-1.5 w-full ${mode.bar}`} />
          {o.type === "competition" && (
            <div className="flex items-center gap-2 border-b border-line bg-purple-soft px-8 py-2.5">
              <span className="text-base">🏆</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple">Competition / Award</span>
            </div>
          )}

          <div className="px-8 py-8">
            {/* Org + region */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate">{o.organisation_name}</span>
              <span className="text-line">·</span>
              <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${mode.bg} ${mode.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${mode.dot}`} />{mode.label}
              </span>
              {o.region && (
                <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft">
                  {REGION_FLAG[o.region] ?? "🌍"} {o.region}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-[32px] font-bold leading-tight text-ink md:text-[38px]">
              {o.role}
            </h1>

            {/* Meta pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: "⏱", val: o.weekly_commitment },
                { icon: "🎂", val: `${o.min_age}+` },
                { icon: "📍", val: o.town },
              ].map(({ icon, val }) => (
                <span key={val} className="flex items-center gap-1.5 rounded-xl border border-line bg-paper px-3 py-1.5 text-[12.5px] font-medium text-ink-soft">
                  {icon} {val}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">

          {/* Left */}
          <div className="flex flex-col gap-5">
            <InfoSection
              title="About the role"
              color="text-blue"
              barColor="bg-blue"
              delay="0.05s"
            >
              <p className="text-[14.5px] leading-relaxed text-ink-soft">{o.description}</p>
            </InfoSection>

            <InfoSection
              title="Why it strengthens your application"
              color="text-purple"
              barColor="bg-purple"
              delay="0.1s"
            >
              <p className="text-[14.5px] leading-relaxed text-ink-soft">{o.why_it_helps}</p>
            </InfoSection>

            <InfoSection
              title="Personal statement assistant"
              color="text-mint"
              barColor="bg-mint"
              delay="0.15s"
            >
              <PersonalStatementAssistant opportunity={o} />
            </InfoSection>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">

            {/* Skills */}
            <div className="animate-fade-up rounded-2xl border border-line bg-paper-raised p-5 shadow-card" style={{animationDelay:"0.1s",opacity:0}}>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate">Skills you'll develop</p>
              <div className="flex flex-wrap gap-2">
                {o.skills.map(s => (
                  <span key={s} className="rounded-xl border border-line bg-paper px-3 py-1 text-[12px] font-medium text-ink-soft transition-colors hover:border-blue/30 hover:text-blue">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {o.achievements?.length > 0 && (
              <div className="animate-fade-up rounded-2xl border border-line bg-paper-raised p-5 shadow-card" style={{animationDelay:"0.15s",opacity:0}}>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate">Example achievements</p>
                <ul className="flex flex-col gap-2.5">
                  {o.achievements.map(a => (
                    <li key={a} className="flex items-start gap-2 text-[13px] text-ink-soft">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint-soft text-[9px] font-black text-mint">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reflections */}
            {o.reflection_prompts?.length > 0 && (
              <div className="animate-fade-up rounded-2xl border border-amber/30 bg-amber-soft p-5" style={{animationDelay:"0.2s",opacity:0}}>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-amber">Reflection prompts</p>
                <ul className="flex flex-col gap-2.5">
                  {o.reflection_prompts.map(p => (
                    <li key={p} className="flex items-start gap-2 text-[13px] text-ink-soft">
                      <span className="mt-0.5 shrink-0 text-amber">?</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Example sentence */}
            {o.example_sentence && (
              <div className="animate-fade-up rounded-2xl border border-purple/20 bg-purple-soft p-5" style={{animationDelay:"0.25s",opacity:0}}>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-purple">Example sentence</p>
                <p className="text-[13px] italic leading-relaxed text-ink-soft">"{o.example_sentence}"</p>
              </div>
            )}

            {/* Apply CTA */}
            <a
              href={o.apply_url}
              target="_blank"
              rel="noreferrer"
              className="animate-fade-up flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-4 text-[15px] font-bold text-white shadow-card transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover"
              style={{animationDelay:"0.3s",opacity:0}}
            >
              Apply now
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm">→</span>
            </a>

            <Link
              href="/"
              className="animate-fade-up flex items-center justify-center gap-2 rounded-2xl border border-line bg-paper-raised px-5 py-3.5 text-[14px] font-semibold text-ink-soft shadow-card transition-all duration-200 hover:border-blue hover:text-blue"
              style={{animationDelay:"0.35s",opacity:0}}
            >
              ← Browse more opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoSection({ title, color, barColor, delay, children }: {
  title: string; color: string; barColor: string; delay: string; children: React.ReactNode;
}) {
  return (
    <div
      className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card"
      style={{ animationDelay: delay, opacity: 0 }}
    >
      <div className="flex items-center gap-3 border-b border-line px-6 py-4">
        <span className={`h-4 w-1 rounded-full ${barColor}`} />
        <h2 className={`text-[11px] font-black uppercase tracking-[0.15em] ${color}`}>{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export function generateStaticParams() {
  return OPPORTUNITIES.map(o => ({ id: o.id }));
}

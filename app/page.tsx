"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CourseSelector } from "@/components/CourseSelector";
import { OpportunityCard } from "@/components/OpportunityCard";
import sampleOpportunities from "@/data/sample-opportunities.json";
import type { Opportunity, Region } from "@/types";

const OPPORTUNITIES = sampleOpportunities as unknown as Opportunity[];

const REGION_FLAG: Record<string, string> = {
  UK: "🇬🇧", US: "🇺🇸", Japan: "🇯🇵", Malaysia: "🇲🇾", Korea: "🇰🇷", China: "🇨🇳",
};

const TOTAL_COMPS = OPPORTUNITIES.filter(o => o.type === "competition").length;

export default function DiscoverPage() {
  const [course, setCourse]     = useState<string | null>(null);
  const [modes, setModes]       = useState<Set<string>>(new Set());
  const [regions, setRegions]   = useState<Set<string>>(new Set());
  const [types, setTypes]       = useState<Set<string>>(new Set());
  const [search, setSearch]     = useState("");
  const [saved, setSaved]       = useState<Set<string>>(new Set());
  const [showSaved, setShowSaved] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<"idle"|"checking"|"done">("idle");
  const [mounted, setMounted]   = useState(false);
  const lastRefresh = useRef<number>(0);
  const REFRESH_MS = 6 * 60 * 60 * 1000;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function refresh() {
      const now = Date.now();
      if (now - lastRefresh.current < REFRESH_MS) return;
      lastRefresh.current = now;
      setRefreshStatus("checking");
      try { await fetch("/api/refresh-opportunities", { method: "POST" }); } catch {}
      finally { setRefreshStatus("done"); setTimeout(() => setRefreshStatus("idle"), 4000); }
    }
    refresh();
    const id = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  const results = useMemo(() => OPPORTUNITIES.filter(o => {
    if (course && !o.courses.includes(course)) return false;
    if (modes.size && !modes.has(o.mode)) return false;
    if (regions.size && !regions.has(o.region)) return false;
    if (types.size && (!o.type || !types.has(o.type))) return false;
    if (search) {
      const hay = `${o.organisation_name} ${o.role} ${o.skills.join(" ")} ${o.town} ${o.region}`.toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  }), [course, modes, regions, types, search]);

  const savedList = useMemo(() => OPPORTUNITIES.filter(o => saved.has(o.id)), [saved]);
  const hasFilters = !!(course || modes.size || regions.size || types.size || search);

  const toggle = (set: Set<string>, set2: (s: Set<string>) => void, val: string) => {
  const n = new Set(set);
  n.has(val) ? n.delete(val) : n.add(val);
  set2(n);
};

  return (
    <div className="min-h-screen bg-paper">

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-line bg-paper-raised/90 shadow-nav backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-card">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-display text-[18px] font-bold text-ink">Groundwork</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/dashboard"
              className="hidden items-center gap-1.5 rounded-full border border-line bg-paper-raised px-4 py-1.5 text-[12px] font-bold text-slate transition-all duration-200 hover:border-blue hover:text-blue sm:flex"
            >
              📊 Dashboard
            </a>
            {refreshStatus === "checking" && (
              <span className="flex animate-fade-in items-center gap-1.5 rounded-full bg-blue-soft px-3 py-1 text-[11px] font-bold text-blue">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue" />
                Refreshing listings…
              </span>
            )}
            {refreshStatus === "done" && (
              <span className="flex animate-fade-in items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1 text-[11px] font-bold text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Updated
              </span>
            )}
            <button
              onClick={() => setShowSaved(true)}
              className={`relative flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-bold transition-all duration-200 ${
                saved.size > 0
                  ? "border-purple bg-purple-soft text-purple shadow-glow-purple"
                  : "border-line bg-paper-raised text-slate hover:border-blue hover:text-blue"
              }`}
            >
              {saved.size > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple text-[9px] font-black text-white shadow">
                  {saved.size}
                </span>
              )}
              🔖 Saved
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-float absolute -top-32 right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-cool opacity-[0.08] blur-3xl" style={{animationDelay:"0s"}} />
          <div className="animate-float absolute -bottom-20 left-[-5%] h-[400px] w-[400px] rounded-full bg-gradient-warm opacity-[0.07] blur-3xl" style={{animationDelay:"2s"}} />
          <div className="animate-float absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple opacity-[0.04] blur-3xl" style={{animationDelay:"1s"}} />
        </div>

        <div className="mx-auto max-w-[1240px] px-6 pb-12 pt-16">
          <div className={`transition-all duration-700 ${mounted ? "animate-fade-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue-soft px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue">Volunteering & Competitions</span>
            </div>

            <h1 className="mt-5 max-w-3xl font-display text-[42px] font-bold leading-[1.12] tracking-tight text-ink md:text-[58px]">
              Build your CV with{" "}
              <span className="gradient-text-animate">opportunities that matter.</span>
            </h1>

            <p className={`mt-5 max-w-[580px] text-[17px] leading-relaxed text-ink-soft animate-fade-up animate-delay-200`}>
              Discover volunteering roles and competitions matched to your university course.
              Build real experience — then turn it into a personal statement that stands out.
            </p>

            {/* Stats */}
            <div className={`mt-10 flex flex-wrap gap-8 animate-fade-up animate-delay-300`}>
              {[
                { value: OPPORTUNITIES.length.toString(), label: "Opportunities", color: "text-blue" },
                { value: TOTAL_COMPS.toString(), label: "Competitions", color: "text-purple" },
                { value: "49", label: "Courses", color: "text-mint" },
                { value: "6", label: "Regions", color: "text-amber" },
              ].map(({ value, label, color }) => (
                <div key={label} className="group flex flex-col">
                  <span className={`font-display text-3xl font-bold ${color} transition-transform duration-200 group-hover:scale-110`}>{value}</span>
                  <span className="text-[13px] font-medium text-slate">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Course Selector ───────────────────────────────────────────── */}
      <div className="border-y border-line bg-paper-raised shadow-card">
        <div className="mx-auto max-w-[1240px] px-6 py-6">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate">Select your course</p>
          <CourseSelector value={course} onChange={setCourse} />
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1240px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className={`flex flex-col gap-4 animate-slide-left`}>

            {/* Search */}
            <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card">
              <div className="border-b border-line bg-gradient-to-r from-blue-soft to-purple-soft px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue">Search</p>
              </div>
              <div className="p-4">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-slate">🔍</span>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Skill, org, location…"
                    className="w-full rounded-xl border border-line bg-paper py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-slate transition-all duration-200 focus:border-blue focus:bg-paper-raised focus:shadow-glow focus:outline-none"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate transition hover:text-ink"
                    >✕</button>
                  )}
                </div>
              </div>
            </div>

            {/* Type */}
            <FilterBlock title="Type" gradient="from-purple-soft to-pink-soft" titleColor="text-purple">
              {[
                { val: "volunteering", label: "Volunteering", emoji: "🤝", color: "text-mint", bg: "bg-mint-soft", dot: "bg-mint" },
                { val: "competition",  label: "Competition",  emoji: "🏆", color: "text-purple", bg: "bg-purple-soft", dot: "bg-purple" },
              ].map(({ val, label, emoji, color, bg, dot }) => (
                <FilterChip
                  key={val}
                  label={label}
                  emoji={emoji}
                  active={types.has(val)}
                  color={color}
                  bg={bg}
                  dot={dot}
                  onToggle={() => toggle(types, setTypes, val)}
                />
              ))}
            </FilterBlock>

            {/* Mode */}
            <FilterBlock title="Mode" gradient="from-mint-soft to-blue-soft" titleColor="text-mint">
              {[
                { val: "online",     label: "Online",     emoji: "💻", color: "text-mint",  bg: "bg-mint-soft",  dot: "bg-mint" },
                { val: "in-person",  label: "In person",  emoji: "📍", color: "text-amber", bg: "bg-amber-soft", dot: "bg-amber" },
                { val: "hybrid",     label: "Hybrid",     emoji: "🔀", color: "text-blue",  bg: "bg-blue-soft",  dot: "bg-blue" },
              ].map(({ val, label, emoji, color, bg, dot }) => (
                <FilterChip
                  key={val}
                  label={label}
                  emoji={emoji}
                  active={modes.has(val)}
                  color={color}
                  bg={bg}
                  dot={dot}
                  onToggle={() => toggle(modes, setModes, val)}
                />
              ))}
            </FilterBlock>

            {/* Region */}
            <FilterBlock title="Region" gradient="from-amber-soft to-pink-soft" titleColor="text-amber">
              {(["UK","US","Japan","Malaysia","Korea","China"] as Region[]).map(r => (
                <FilterChip
                  key={r}
                  label={r}
                  emoji={REGION_FLAG[r]}
                  active={regions.has(r)}
                  color="text-blue"
                  bg="bg-blue-soft"
                  dot="bg-blue"
                  onToggle={() => toggle(regions, setRegions, r)}
                />
              ))}
            </FilterBlock>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={() => { setCourse(null); setModes(new Set()); setRegions(new Set()); setTypes(new Set()); setSearch(""); }}
                className="animate-scale-in flex items-center justify-center gap-2 rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm font-semibold text-slate shadow-card transition-all duration-200 hover:border-red hover:bg-red-soft hover:text-red"
              >
                <span>✕</span> Clear all filters
              </button>
            )}
          </aside>

          {/* ── Results grid ────────────────────────────────────── */}
          <div>
            {/* Results header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-[22px] font-bold text-ink">
                  {course ? `Results for ${course.replace(/-/g," ")}` : "All opportunities"}
                </h2>
                <p className="mt-0.5 text-[13px] text-slate">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                  {hasFilters ? " matching your filters" : " across all courses"}
                </p>
              </div>

              {/* Active filter pills */}
              <div className="flex flex-wrap gap-2">
                {[...modes].map(m => (
                  <ActiveFilterPill key={m} label={m} onRemove={() => toggle(modes, setModes, m)} />
                ))}
                {[...regions].map(r => (
                  <ActiveFilterPill key={r} label={`${REGION_FLAG[r]} ${r}`} onRemove={() => toggle(regions, setRegions, r)} />
                ))}
                {[...types].map(t => (
                  <ActiveFilterPill key={t} label={t} onRemove={() => toggle(types, setTypes, t)} />
                ))}
              </div>
            </div>

            {/* Empty state */}
            {results.length === 0 ? (
              <div className="animate-scale-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-24 text-center">
                <span className="text-5xl">🔍</span>
                <p className="mt-4 font-display text-[18px] font-bold text-ink">No results found</p>
                <p className="mt-2 max-w-xs text-sm text-slate">Try adjusting your filters, selecting a different course, or clearing your search</p>
                {hasFilters && (
                  <button
                    onClick={() => { setCourse(null); setModes(new Set()); setRegions(new Set()); setTypes(new Set()); setSearch(""); }}
                    className="mt-5 rounded-xl bg-gradient-primary px-6 py-2.5 text-sm font-bold text-white shadow-card transition hover:opacity-90"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {results.map((o, i) => (
                  <div
                    key={o.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s`, opacity: 0 }}
                  >
                    <OpportunityCard
                      opportunity={o}
                      saved={saved.has(o.id)}
                      onOpen={id => window.location.assign(`/opportunities/${id}`)}
                      onToggleSave={id => toggle(saved, setSaved, id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Floating Saved Panel ─────────────────────────────────────── */}
      {showSaved && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-6 sm:items-center sm:justify-center"
          onClick={() => setShowSaved(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-fade-in" />

          {/* Panel */}
          <div
            className="relative z-10 flex w-full max-w-md animate-scale-in flex-col rounded-2xl bg-paper-raised shadow-card-hover"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <h3 className="font-display text-[18px] font-bold text-ink">Saved opportunities</h3>
                <p className="text-xs text-slate">{saved.size} item{saved.size !== 1 ? "s" : ""}</p>
              </div>
              <button
                onClick={() => setShowSaved(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-slate transition hover:border-ink hover:text-ink"
              >✕</button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {savedList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="text-4xl">🔖</span>
                  <p className="mt-3 font-semibold text-ink">Nothing saved yet</p>
                  <p className="mt-1 text-sm text-slate">Tap Save on any card to add it here</p>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {savedList.map(o => (
                    <li key={o.id} className="flex items-center justify-between gap-3 px-6 py-3 transition hover:bg-paper">
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold uppercase tracking-wide text-slate">{o.organisation_name}</p>
                        <p className="truncate text-sm font-bold text-ink">{o.role}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => window.location.assign(`/opportunities/${o.id}`)}
                          className="rounded-lg bg-blue-soft px-3 py-1.5 text-[11px] font-bold text-blue transition hover:bg-blue hover:text-white"
                        >View</button>
                        <button
                          onClick={() => toggle(saved, setSaved, o.id)}
                          className="rounded-lg bg-red-soft px-3 py-1.5 text-[11px] font-bold text-red transition hover:bg-red hover:text-white"
                        >Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {saved.size > 0 && (
              <div className="border-t border-line p-4">
                <button
                  onClick={() => setSaved(new Set())}
                  className="w-full rounded-xl border border-line py-2.5 text-sm font-bold text-slate transition hover:border-red hover:bg-red-soft hover:text-red"
                >Clear all saved</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Floating Action Button ───────────────────────────────────── */}
      {saved.size > 0 && !showSaved && (
        <button
          onClick={() => setShowSaved(true)}
          className="fixed bottom-8 right-8 z-40 flex animate-scale-in items-center gap-2.5 rounded-2xl bg-gradient-primary px-5 py-3.5 text-[14px] font-bold text-white shadow-card-hover transition-all duration-200 hover:scale-105 hover:shadow-glow"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[11px] font-black">
            {saved.size}
          </span>
          View saved
        </button>
      )}
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function FilterBlock({ title, gradient, titleColor, children }: {
  title: string;
  gradient: string;
  titleColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-card">
      <div className={`border-b border-line bg-gradient-to-r ${gradient} px-4 py-3`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${titleColor}`}>{title}</p>
      </div>
      <div className="flex flex-col gap-0.5 p-2">{children}</div>
    </div>
  );
}

function FilterChip({ label, emoji, active, color, bg, dot, onToggle }: {
  label: string; emoji: string; active: boolean;
  color: string; bg: string; dot: string;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
        active
          ? `${bg} ${color} font-bold shadow-card`
          : "text-ink-soft hover:bg-paper"
      }`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full transition-all duration-150 ${active ? dot : "bg-line"}`} />
      <span>{emoji}</span>
      <span className="flex-1 text-left">{label}</span>
      {active && <span className="ml-auto text-[10px]">✓</span>}
    </button>
  );
}

function ActiveFilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex animate-scale-in items-center gap-1.5 rounded-full border border-blue/30 bg-blue-soft px-3 py-1 text-[11px] font-bold text-blue">
      {label}
      <button onClick={onRemove} className="ml-0.5 transition hover:text-blue-dim">✕</button>
    </span>
  );
}

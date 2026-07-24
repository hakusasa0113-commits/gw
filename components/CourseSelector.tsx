"use client";

import { useState } from "react";
import courses from "@/data/courses.json";

const GROUPS: { label: string; color: string; accent: string; slugs: string[] }[] = [
  {
    label: "Health & Medicine", color: "text-pink",
    accent: "border-pink hover:border-pink hover:bg-pink-soft hover:text-pink data-[sel=true]:border-pink data-[sel=true]:bg-pink-soft data-[sel=true]:text-pink",
    slugs: ["medicine","nursing","dentistry","pharmacy","physiotherapy","veterinary-science","midwifery","occupational-therapy","biomedical-science","optometry","nutrition-dietetics","public-health"],
  },
  {
    label: "Sciences", color: "text-mint",
    accent: "border-mint hover:border-mint hover:bg-mint-soft hover:text-mint data-[sel=true]:border-mint data-[sel=true]:bg-mint-soft data-[sel=true]:text-mint",
    slugs: ["biology-life-sciences","chemistry","physics","mathematics","environmental-science","space-science","data-science-ai","biochemistry","neuroscience","geography","marine-biology","forensic-science"],
  },
  {
    label: "Technology", color: "text-blue",
    accent: "border-blue hover:border-blue hover:bg-blue-soft hover:text-blue data-[sel=true]:border-blue data-[sel=true]:bg-blue-soft data-[sel=true]:text-blue",
    slugs: ["computer-science","engineering","civil-engineering","product-design","robotics-ai","cybersecurity","game-design","animation-vfx"],
  },
  {
    label: "Social Sciences", color: "text-purple",
    accent: "border-purple hover:border-purple hover:bg-purple-soft hover:text-purple data-[sel=true]:border-purple data-[sel=true]:bg-purple-soft data-[sel=true]:text-purple",
    slugs: ["psychology","sociology","social-work","economics","politics","law","international-relations","anthropology","linguistics","criminology","development-studies","sport-psychology","urban-planning","human-geography"],
  },
  {
    label: "Humanities", color: "text-amber",
    accent: "border-amber hover:border-amber hover:bg-amber-soft hover:text-amber data-[sel=true]:border-amber data-[sel=true]:bg-amber-soft data-[sel=true]:text-amber",
    slugs: ["history","philosophy","english-literature","journalism","film-media-studies","classics","creative-writing","theology","museum-studies","media-communications"],
  },
  {
    label: "Creative & Design", color: "text-pink",
    accent: "border-pink hover:border-pink hover:bg-pink-soft hover:text-pink data-[sel=true]:border-pink data-[sel=true]:bg-pink-soft data-[sel=true]:text-pink",
    slugs: ["art-design","music","architecture","theatre-performance","fashion-design"],
  },
  {
    label: "Business & Finance", color: "text-amber",
    accent: "border-amber hover:border-amber hover:bg-amber-soft hover:text-amber data-[sel=true]:border-amber data-[sel=true]:bg-amber-soft data-[sel=true]:text-amber",
    slugs: ["business","finance","marketing","accounting","education","sports-science"],
  },
];

const COURSE_MAP = Object.fromEntries(courses.map(c => [c.slug, c.name]));

// Flat ordered list — the first 9 shown by default
const ALL_SLUGS = GROUPS.flatMap(g => g.slugs).filter(s => COURSE_MAP[s]);
const INITIAL_COUNT = 9;

// Look up which group a slug belongs to for its accent colour
const SLUG_ACCENT: Record<string, string> = {};
GROUPS.forEach(g => g.slugs.forEach(s => { SLUG_ACCENT[s] = g.accent; }));

export function CourseSelector({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (slug: string | null) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  // When collapsed: show first 9 + selected course (if outside the first 9)
  const visibleSlugs = expanded
    ? ALL_SLUGS
    : [
        ...ALL_SLUGS.slice(0, INITIAL_COUNT),
        // keep the active selection visible even if it's beyond position 9
        ...(value && !ALL_SLUGS.slice(0, INITIAL_COUNT).includes(value) ? [value] : []),
      ];

  const hiddenCount = ALL_SLUGS.length - INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-4">

      {/* ── Collapsed / expanded course chips ── */}
      {expanded ? (
        // Grouped view when expanded
        <div className="flex flex-col gap-5">
          {GROUPS.map(({ label, color, accent, slugs }) => {
            const valid = slugs.filter(s => COURSE_MAP[s]);
            if (!valid.length) return null;
            return (
              <div key={label}>
                <p className={`mb-2.5 text-[10px] font-black uppercase tracking-[0.15em] ${color}`}>
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {valid.map(slug => {
                    const selected = value === slug;
                    return (
                      <CourseChip
                        key={slug}
                        slug={slug}
                        name={COURSE_MAP[slug]}
                        selected={selected}
                        accent={accent}
                        onClick={() => onChange(selected ? null : slug)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Flat chip strip when collapsed
        <div className="flex flex-wrap gap-2">
          {visibleSlugs.map(slug => {
            const selected = value === slug;
            return (
              <CourseChip
                key={slug}
                slug={slug}
                name={COURSE_MAP[slug]}
                selected={selected}
                accent={SLUG_ACCENT[slug] ?? ""}
                onClick={() => onChange(selected ? null : slug)}
              />
            );
          })}
        </div>
      )}

      {/* ── Show more / Show less button ── */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <button
          onClick={() => setExpanded(e => !e)}
          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-bold transition-all duration-200 ${
            expanded
              ? "border-line bg-paper-raised text-slate hover:border-blue hover:text-blue"
              : "border-blue bg-blue-soft text-blue hover:bg-blue hover:text-white"
          }`}
        >
          {expanded ? (
            <>
              <span>↑</span> Show less
            </>
          ) : (
            <>
              <span>+</span> {hiddenCount} more courses
            </>
          )}
        </button>
        <div className="h-px flex-1 bg-line" />
      </div>

    </div>
  );
}

// ── Shared chip sub-component ──────────────────────────────────────────
function CourseChip({
  slug,
  name,
  selected,
  accent,
  onClick,
}: {
  slug: string;
  name: string;
  selected: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      data-sel={selected}
      onClick={onClick}
      className={`rounded-full border border-line bg-paper-raised px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-all duration-150 ${accent}`}
    >
      {name}
    </button>
  );
}

"use client";

import { useState } from "react";
import courses from "@/data/courses.json";

// Each group has an explicit selected style so Tailwind can purge correctly.
// Never pass selected styles as a dynamic string — Tailwind won't detect them.
type GroupColor = "pink" | "mint" | "blue" | "purple" | "amber" | "teal" | "orange";

const GROUPS: { label: string; color: GroupColor; slugs: string[] }[] = [
  {
    label: "Health & Medicine", color: "pink",
    slugs: ["medicine","nursing","dentistry","pharmacy","physiotherapy","veterinary-science",
            "midwifery","occupational-therapy","biomedical-science","optometry",
            "nutrition-dietetics","public-health"],
  },
  {
    label: "Sciences", color: "mint",
    slugs: ["biology-life-sciences","chemistry","physics","mathematics","environmental-science",
            "space-science","data-science-ai","biochemistry","neuroscience","geography",
            "marine-biology","forensic-science"],
  },
  {
    label: "Technology", color: "blue",
    slugs: ["computer-science","engineering","civil-engineering","product-design",
            "robotics-ai","cybersecurity","game-design","animation-vfx"],
  },
  {
    label: "Social Sciences", color: "purple",
    slugs: ["psychology","sociology","social-work","economics","politics","law",
            "international-relations","anthropology","linguistics","criminology",
            "development-studies","sport-psychology","urban-planning","human-geography"],
  },
  {
    label: "Humanities", color: "amber",
    slugs: ["history","philosophy","english-literature","journalism","film-media-studies",
            "classics","creative-writing","theology","museum-studies","media-communications"],
  },
  {
    label: "Creative & Design", color: "teal",
    slugs: ["art-design","music","architecture","theatre-performance","fashion-design"],
  },
  {
    label: "Business & Finance", color: "orange",
    slugs: ["business","finance","marketing","accounting","education","sports-science"],
  },
];

// Static class maps — Tailwind scans these strings at build time correctly
const LABEL_COLOR: Record<GroupColor, string> = {
  pink:   "text-pink",
  mint:   "text-mint",
  blue:   "text-blue",
  purple: "text-purple",
  amber:  "text-amber",
  teal:   "text-teal",
  orange: "text-orange",
};

const CHIP_DEFAULT = "border-line bg-paper-raised text-ink-soft";

const CHIP_HOVER: Record<GroupColor, string> = {
  pink:   "hover:border-pink hover:bg-pink-soft hover:text-pink",
  mint:   "hover:border-mint hover:bg-mint-soft hover:text-mint",
  blue:   "hover:border-blue hover:bg-blue-soft hover:text-blue",
  purple: "hover:border-purple hover:bg-purple-soft hover:text-purple",
  amber:  "hover:border-amber hover:bg-amber-soft hover:text-amber",
  teal:   "hover:border-teal hover:bg-teal-soft hover:text-teal",
  orange: "hover:border-orange hover:bg-orange-soft hover:text-orange",
};

const CHIP_SELECTED: Record<GroupColor, string> = {
  pink:   "border-pink bg-pink-soft text-pink font-bold",
  mint:   "border-mint bg-mint-soft text-mint font-bold",
  blue:   "border-blue bg-blue-soft text-blue font-bold",
  purple: "border-purple bg-purple-soft text-purple font-bold",
  amber:  "border-amber bg-amber-soft text-amber font-bold",
  teal:   "border-teal bg-teal-soft text-teal font-bold",
  orange: "border-orange bg-orange-soft text-orange font-bold",
};

const COURSE_MAP = Object.fromEntries(courses.map(c => [c.slug, c.name]));
const SLUG_COLOR: Record<string, GroupColor> = {};
GROUPS.forEach(g => g.slugs.forEach(s => { SLUG_COLOR[s] = g.color; }));

// Flat list for the collapsed default view (first 9)
const ALL_SLUGS = GROUPS.flatMap(g => g.slugs).filter(s => COURSE_MAP[s]);
const INITIAL_COUNT = 9;

export function CourseSelector({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (slug: string | null) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleSlugs = expanded
    ? ALL_SLUGS
    : [
        ...ALL_SLUGS.slice(0, INITIAL_COUNT),
        ...(value && !ALL_SLUGS.slice(0, INITIAL_COUNT).includes(value) ? [value] : []),
      ];

  const hiddenCount = ALL_SLUGS.length - INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-4">

      {expanded ? (
        // ── Grouped view ──────────────────────────────────────────
        <div className="flex flex-col gap-5">
          {GROUPS.map(({ label, color, slugs }) => {
            const valid = slugs.filter(s => COURSE_MAP[s]);
            if (!valid.length) return null;
            return (
              <div key={label}>
                <p className={`mb-2.5 text-[10px] font-black uppercase tracking-[0.15em] ${LABEL_COLOR[color]}`}>
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {valid.map(slug => (
                    <Chip
                      key={slug}
                      name={COURSE_MAP[slug]}
                      color={color}
                      selected={value === slug}
                      onClick={() => onChange(value === slug ? null : slug)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // ── Flat collapsed strip ──────────────────────────────────
        <div className="flex flex-wrap gap-2">
          {visibleSlugs.map(slug => (
            <Chip
              key={slug}
              name={COURSE_MAP[slug]}
              color={SLUG_COLOR[slug] ?? "blue"}
              selected={value === slug}
              onClick={() => onChange(value === slug ? null : slug)}
            />
          ))}
        </div>
      )}

      {/* ── Show more / show less ── */}
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
          {expanded ? "↑ Show less" : `+ ${hiddenCount} more courses`}
        </button>
        <div className="h-px flex-1 bg-line" />
      </div>
    </div>
  );
}

function Chip({ name, color, selected, onClick }: {
  name: string;
  color: GroupColor;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-150 ${
        selected
          ? CHIP_SELECTED[color]
          : `${CHIP_DEFAULT} ${CHIP_HOVER[color]}`
      }`}
    >
      {name}
    </button>
  );
}

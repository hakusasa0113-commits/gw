"use client";

import courses from "@/data/courses.json";

const GROUPS: { label: string; color: string; accent: string; slugs: string[] }[] = [
  { label: "Health & Medicine",   color: "text-pink",   accent: "border-pink   hover:border-pink   hover:bg-pink-soft   hover:text-pink   data-[sel=true]:border-pink   data-[sel=true]:bg-pink-soft   data-[sel=true]:text-pink",   slugs: ["medicine","nursing","dentistry","pharmacy","physiotherapy","veterinary-science","midwifery","occupational-therapy","biomedical-science"] },
  { label: "Sciences",            color: "text-mint",   accent: "border-mint   hover:border-mint   hover:bg-mint-soft   hover:text-mint   data-[sel=true]:border-mint   data-[sel=true]:bg-mint-soft   data-[sel=true]:text-mint",   slugs: ["biology-life-sciences","chemistry","physics","mathematics","environmental-science","space-science","data-science-ai","biochemistry","neuroscience","geography"] },
  { label: "Technology",          color: "text-blue",   accent: "border-blue   hover:border-blue   hover:bg-blue-soft   hover:text-blue   data-[sel=true]:border-blue   data-[sel=true]:bg-blue-soft   data-[sel=true]:text-blue",   slugs: ["computer-science","engineering","civil-engineering","product-design"] },
  { label: "Social Sciences",     color: "text-purple", accent: "border-purple hover:border-purple hover:bg-purple-soft hover:text-purple data-[sel=true]:border-purple data-[sel=true]:bg-purple-soft data-[sel=true]:text-purple", slugs: ["psychology","sociology","social-work","economics","politics","law","international-relations","anthropology","linguistics"] },
  { label: "Humanities",          color: "text-amber",  accent: "border-amber  hover:border-amber  hover:bg-amber-soft  hover:text-amber  data-[sel=true]:border-amber  data-[sel=true]:bg-amber-soft  data-[sel=true]:text-amber",  slugs: ["history","philosophy","english-literature","journalism","film-media-studies","classics","creative-writing"] },
  { label: "Creative & Design",   color: "text-pink",   accent: "border-pink   hover:border-pink   hover:bg-pink-soft   hover:text-pink   data-[sel=true]:border-pink   data-[sel=true]:bg-pink-soft   data-[sel=true]:text-pink",   slugs: ["art-design","music","architecture","theatre-performance","fashion-design"] },
  { label: "Business & Finance",  color: "text-amber",  accent: "border-amber  hover:border-amber  hover:bg-amber-soft  hover:text-amber  data-[sel=true]:border-amber  data-[sel=true]:bg-amber-soft  data-[sel=true]:text-amber",  slugs: ["business","finance","marketing","education","sports-science"] },
];

const COURSE_MAP = Object.fromEntries(courses.map(c => [c.slug, c.name]));

export function CourseSelector({ value, onChange }: { value: string | null; onChange: (slug: string | null) => void }) {
  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map(({ label, color, accent, slugs }) => {
        const valid = slugs.filter(s => COURSE_MAP[s]);
        if (!valid.length) return null;
        return (
          <div key={label}>
            <p className={`mb-2.5 text-[10px] font-black uppercase tracking-[0.15em] ${color}`}>{label}</p>
            <div className="flex flex-wrap gap-2">
              {valid.map((slug, i) => {
                const selected = value === slug;
                return (
                  <button
                    key={slug}
                    data-sel={selected}
                    onClick={() => onChange(selected ? null : slug)}
                    className={`rounded-full border border-line bg-paper-raised px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-all duration-150 ${accent}`}
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    {COURSE_MAP[slug]}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

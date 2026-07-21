import type { Opportunity, PersonalStatementScore } from "@/types";

interface ScoreInput {
  opportunity: Opportunity;
  status: "saved" | "in_progress" | "completed";
}

/**
 * Computes a 0-100 "personal statement strength" score from a user's
 * saved/completed opportunities. This is intentionally simple and
 * transparent so it can be explained to the student, not a black box:
 *  - commitment: rewards having more than one experience saved
 *  - reflection: rewards experiences marked completed (implies lived reflection)
 *  - skill_range: rewards breadth of distinct skills across experiences
 *  - course_relevance: share of experiences tagged to the target course
 */
export function computeStatementScore(
  items: ScoreInput[],
  targetCourseSlug?: string | null
): PersonalStatementScore {
  const count = items.length;
  const completedCount = items.filter((i) => i.status === "completed").length;
  const skillSet = new Set(items.flatMap((i) => i.opportunity.skills));

  const commitment = Math.min(100, count * 22);
  const reflection = Math.min(100, completedCount * 30 + (count ? 10 : 0));
  const skill_range = Math.min(100, skillSet.size * 9);
  const course_relevance = count
    ? Math.round(
        (items.filter((i) =>
          targetCourseSlug ? i.opportunity.courses.includes(targetCourseSlug) : true
        ).length /
          count) *
          100
      )
    : 0;

  const overall = Math.round(
    commitment * 0.25 + reflection * 0.3 + skill_range * 0.25 + course_relevance * 0.2
  );

  return { overall, commitment, reflection, skill_range, course_relevance };
}

/**
 * Fallback opportunity pool.
 * These are permanently-open national platforms and programmes that
 * accept volunteers continuously. When the refresh route finds a dead
 * apply_url it picks the best-matching fallback for the same courses
 * and swaps it in, so users always see a live listing.
 */

import type { Opportunity, Region } from "@/types";

type FallbackTemplate = Omit<Opportunity, "id" | "is_active" | "last_checked" | "organisation_id">;

export const FALLBACK_POOL: FallbackTemplate[] = [
  // ── Universal platforms (match any course) ────────────────────────
  {
    organisation_name: "Do-it.org",
    role: "Volunteer (Search by Course)",
    courses: ["medicine","nursing","psychology","law","engineering","education","business",
              "architecture","biology-life-sciences","journalism","pharmacy","dentistry",
              "physiotherapy","social-work","mathematics","physics","chemistry","economics",
              "politics","philosophy","history","english-literature","film-media-studies",
              "art-design","music","sports-science","veterinary-science","environmental-science",
              "data-science-ai","space-science","computer-science"],
    description: "Search the UK's largest volunteering database for opportunities that match your course, location and availability.",
    why_it_helps: "Do-it lists thousands of active roles updated in real time — you can filter by interest, location and commitment.",
    skills: ["Varies by role"],
    mode: "online",
    region: "UK",
    weekly_commitment: "Flexible",
    min_age: 14,
    town: "Anywhere (online)",
    apply_url: "https://do-it.org/",
    achievements: [],
    reflection_prompts: ["What role matched your course interest most closely?"],
    example_sentence: "Finding a placement through Do-it helped me target exactly the experience my application needed.",
  },
  {
    organisation_name: "Volunteering Matters",
    role: "Volunteer (Always Open)",
    courses: ["medicine","nursing","psychology","social-work","education","law","business",
              "engineering","biology-life-sciences","sports-science","physiotherapy"],
    description: "Volunteering Matters runs year-round programmes across health, community, sport and education — always accepting new volunteers.",
    why_it_helps: "A trusted national charity with structured roles across most subject areas.",
    skills: ["Varies by role"],
    mode: "hybrid",
    region: "UK",
    weekly_commitment: "Flexible",
    min_age: 16,
    town: "Anywhere",
    apply_url: "https://volunteeringmatters.org.uk/volunteer/",
    achievements: [],
    reflection_prompts: ["Which programme aligned best with your target course?"],
    example_sentence: "Volunteering through Volunteering Matters gave me structured, evidenced experience I could speak to at interview.",
  },
  {
    organisation_name: "Reach Volunteering",
    role: "Skills-Based Volunteer",
    courses: ["business","law","computer-science","journalism","economics","data-science-ai",
              "mathematics","psychology","politics","architecture","engineering","art-design"],
    description: "Match your academic skills to charities and non-profits that need them — from data analysis to legal research to design.",
    why_it_helps: "Skills-based volunteering is especially compelling evidence because it shows your subject knowledge being applied to real problems.",
    skills: ["Varies by skill area"],
    mode: "online",
    region: "UK",
    weekly_commitment: "Project-based",
    min_age: 18,
    town: "Anywhere (online)",
    apply_url: "https://reachvolunteering.org.uk/",
    achievements: [],
    reflection_prompts: ["What professional skill did this role let you apply for the first time?"],
    example_sentence: "Using my subject skills to help a charity through Reach Volunteering gave my application concrete, real-world evidence.",
  },

  // ── Health & Medicine ────────────────────────────────────────────
  {
    organisation_name: "NHS Volunteer Responders",
    role: "Community Volunteer (Always Open)",
    courses: ["medicine","nursing","pharmacy","physiotherapy","dentistry","sports-science"],
    description: "The NHS national volunteer programme accepts new volunteers year-round across a range of community and remote support roles.",
    why_it_helps: "An NHS-branded healthcare role carries immediate credibility in medical and allied health applications.",
    skills: ["Patient communication","Reliability","Safeguarding awareness"],
    mode: "hybrid",
    region: "UK",
    weekly_commitment: "Flexible",
    min_age: 18,
    town: "Anywhere",
    apply_url: "https://nhsvolunteerresponders.org.uk/become-a-volunteer",
    achievements: [],
    reflection_prompts: ["How did your NHS volunteer role connect to your target career?"],
    example_sentence: "Volunteering with the NHS gave me direct, credible healthcare exposure throughout my application year.",
  },
  {
    organisation_name: "St John Ambulance",
    role: "First Aid Volunteer (Ongoing)",
    courses: ["medicine","nursing","physiotherapy","sports-science","pharmacy"],
    description: "Train and practise first aid at events, schools and community venues — St John Ambulance recruits volunteers continuously.",
    why_it_helps: "Practical clinical skills and real emergency situations make this highly evidential for any health application.",
    skills: ["First aid","Emergency response","Patient assessment"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "2-4 hrs/week",
    min_age: 16,
    town: "Anywhere",
    apply_url: "https://www.sja.org.uk/get-involved/volunteer/",
    achievements: [],
    reflection_prompts: ["What real emergency situation required you to apply your first aid training?"],
    example_sentence: "Responding to real first aid incidents as a St John volunteer gave me clinical confidence no textbook could.",
  },

  // ── Science & Environment ────────────────────────────────────────
  {
    organisation_name: "Conservation Volunteers (TCV)",
    role: "Green Volunteer (Always Open)",
    courses: ["environmental-science","biology-life-sciences","veterinary-science","chemistry","engineering"],
    description: "TCV runs weekly green volunteering sessions nationwide — habitat management, planting, river work and biodiversity projects.",
    why_it_helps: "Regular fieldwork with a professional conservation organisation builds exactly the practical evidence science courses want.",
    skills: ["Habitat management","Field ecology","Teamwork outdoors"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "1 day/week",
    min_age: 16,
    town: "Anywhere",
    apply_url: "https://www.tcv.org.uk/volunteering/",
    achievements: [],
    reflection_prompts: ["What did regular practical conservation work reveal about ecosystems that a lecture couldn't?"],
    example_sentence: "Weekly TCV sessions gave me sustained, fieldwork-based evidence I could reference throughout my application.",
  },
  {
    organisation_name: "RSPB",
    role: "Nature Reserve Volunteer",
    courses: ["environmental-science","biology-life-sciences","veterinary-science"],
    description: "RSPB nature reserves recruit volunteers year-round for species surveys, habitat management and visitor engagement.",
    why_it_helps: "Working on a managed nature reserve provides the kind of documented field experience that biology and environmental science tutors prioritise.",
    skills: ["Species identification","Survey methods","Visitor engagement"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "Flexible",
    min_age: 16,
    town: "Anywhere",
    apply_url: "https://www.rspb.org.uk/get-involved/volunteering-fundraising/volunteer/",
    achievements: [],
    reflection_prompts: ["What species data did you collect and what did it indicate about the reserve's health?"],
    example_sentence: "Regular RSPB volunteer surveys gave me documented fieldwork evidence with real conservation outcomes.",
  },

  // ── Education & Youth ────────────────────────────────────────────
  {
    organisation_name: "Tutor Trust",
    role: "Volunteer Tutor (Always Open)",
    courses: ["education","mathematics","physics","chemistry","english-literature","economics"],
    description: "Tutor Trust recruits volunteer tutors year-round to support disadvantaged pupils in core academic subjects.",
    why_it_helps: "Structured one-to-one tutoring with measurable outcomes is strong, specific evidence for Education and subject-specialist applications.",
    skills: ["Subject tutoring","Lesson planning","Progress tracking"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "2 hrs/week",
    min_age: 17,
    town: "Manchester",
    apply_url: "https://tutortrust.org/volunteer/",
    achievements: [],
    reflection_prompts: ["What did tracking a pupil's progress week-to-week teach you about how learning actually works?"],
    example_sentence: "Tutoring disadvantaged students through Tutor Trust gave me measurable, outcome-evidenced teaching experience.",
  },
  {
    organisation_name: "Volunteer It Yourself (VIY)",
    role: "Youth Build Volunteer",
    courses: ["architecture","engineering","art-design","education","social-work"],
    description: "VIY recruits volunteers year-round to help young people renovate community spaces, developing both practical and social skills.",
    why_it_helps: "Combining design, construction and youth development makes this distinctive evidence for Architecture and Engineering applications.",
    skills: ["Construction skills","Youth engagement","Spatial problem-solving"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "Project-based weekends",
    min_age: 16,
    town: "London",
    apply_url: "https://www.viy.org.uk/get-involved/",
    achievements: [],
    reflection_prompts: ["How did working alongside young people change how you approached the design decisions?"],
    example_sentence: "Helping young people renovate a community space showed me that architecture is inseparable from the lives of the people who use it.",
  },

  // ── Arts, Media & Culture ────────────────────────────────────────
  {
    organisation_name: "Artfundi",
    role: "Arts Outreach Volunteer",
    courses: ["art-design","music","film-media-studies","english-literature","history"],
    description: "Artfundi connects arts volunteers with schools and community organisations year-round, across all art forms.",
    why_it_helps: "Sustained community arts involvement is the most persuasive evidence of genuine subject commitment for arts applications.",
    skills: ["Arts facilitation","Creative workshop delivery","Community engagement"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "Flexible",
    min_age: 16,
    town: "Anywhere",
    apply_url: "https://www.a-n.co.uk/jobs/",
    achievements: [],
    reflection_prompts: ["What did facilitating art for a non-arts audience teach you about your own creative practice?"],
    example_sentence: "Sustained arts outreach volunteering showed me how creativity functions differently when it serves a community rather than an audience.",
  },

  // ── Social Sciences & Law ────────────────────────────────────────
  {
    organisation_name: "Citizens Advice",
    role: "Trainee Adviser (Rolling Intake)",
    courses: ["law","social-work","politics","economics","psychology","business"],
    description: "Citizens Advice runs rolling volunteer intakes year-round — train as an adviser helping the public with legal, financial and welfare issues.",
    why_it_helps: "Client-facing legal and social welfare advice is among the most impactful and evidential experience for Law and Social Work applications.",
    skills: ["Legal information delivery","Client communication","Case recording"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "6 hrs/week",
    min_age: 18,
    town: "Anywhere",
    apply_url: "https://www.citizensadvice.org.uk/about-us/support-us/volunteering/",
    achievements: [],
    reflection_prompts: ["What case revealed most starkly the gap between rights on paper and access in practice?"],
    example_sentence: "Advising real clients at Citizens Advice showed me that legal knowledge only has value when it reaches the people who need it.",
  },

  // ── Technology & Data ────────────────────────────────────────────
  {
    organisation_name: "Code Club (Raspberry Pi Foundation)",
    role: "Code Club Volunteer (Always Open)",
    courses: ["computer-science","mathematics","data-science-ai","education","engineering"],
    description: "The Raspberry Pi Foundation recruits Code Club volunteers year-round — run a weekly coding club for 9-13 year-olds at a local school or library.",
    why_it_helps: "Teaching programming with measurable curriculum outcomes gives technical and communication evidence simultaneously.",
    skills: ["Python/Scratch teaching","Curriculum delivery","Debugging"],
    mode: "in-person",
    region: "UK",
    weekly_commitment: "1 hr/week",
    min_age: 16,
    town: "Anywhere",
    apply_url: "https://codeclub.org/en/volunteer",
    achievements: [],
    reflection_prompts: ["What programming concept required the most creative explanation to make it click for a child?"],
    example_sentence: "Running a Code Club gave me continuous, outcome-measured teaching and technical evidence across my whole application period.",
  },

  // ── International regions fallback ───────────────────────────────
  {
    organisation_name: "UN Volunteers (Online)",
    role: "Online UN Volunteer",
    courses: ["social-work","politics","law","economics","data-science-ai","engineering",
              "computer-science","education","journalism","environmental-science"],
    description: "The UN Volunteers programme offers fully remote volunteer assignments year-round in areas including data, communications, research and education.",
    why_it_helps: "UN-affiliated volunteering carries global credibility and demonstrates the kind of international perspective that competitive applications need.",
    skills: ["Varies by assignment"],
    mode: "online",
    region: "US",
    weekly_commitment: "10-20 hrs/week",
    min_age: 18,
    town: "Anywhere (online)",
    apply_url: "https://www.onlinevolunteering.org/en",
    achievements: [],
    reflection_prompts: ["How did working on a global challenge change your understanding of your subject?"],
    example_sentence: "An online UN volunteer assignment gave my application genuine international experience without leaving my desk.",
  },
  {
    organisation_name: "JICA Volunteer Programme",
    role: "Japan International Cooperation Volunteer",
    courses: ["education","medicine","engineering","environmental-science","social-work","agriculture"],
    description: "JICA recruits volunteers year-round to work on development projects across Asia — including education, healthcare and engineering.",
    why_it_helps: "International development experience in Asia is distinctive and highly valued for ambitious applications.",
    skills: ["Cross-cultural communication","Project support","Subject-specific skills"],
    mode: "in-person",
    region: "Japan",
    weekly_commitment: "Full-time placement",
    min_age: 20,
    town: "Various locations across Asia",
    apply_url: "https://www.jica.go.jp/volunteer/index.html",
    achievements: [],
    reflection_prompts: ["What did the development context reveal about your subject that a domestic setting couldn't?"],
    example_sentence: "A JICA placement showed me how my subject knowledge translates — and sometimes fails to translate — into real-world impact.",
  },
];

/**
 * Given a dead opportunity, return the best available fallback from the pool.
 * Preference order: same courses > overlapping courses > universal fallback.
 */
export function getBestFallback(
  dead: Opportunity,
  usedFallbackIds: Set<string>
): FallbackTemplate | null {
  const deadCourses = new Set(dead.courses);

  // Score each fallback by how many courses overlap
  const scored = FALLBACK_POOL
    .filter((f) => {
      // Don't reuse the exact same fallback org+role for the same course set
      const key = `${f.organisation_name}|${f.role}`;
      return !usedFallbackIds.has(key);
    })
    .map((f) => {
      const overlap = f.courses.filter((c) => deadCourses.has(c)).length;
      return { f, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);

  return scored[0]?.f ?? null;
}

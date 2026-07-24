const fs = require("fs"), path = require("path");
const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const d = JSON.parse(fs.readFileSync(DATA, "utf8"));
const today = new Date().toISOString().split("T")[0];
const existing = new Set(d.map(o => o.id));

function op(id, org, role, courses, desc, why, skills, mode, region, wc, age, town, url, ach, ref, ex, type) {
  if (existing.has(id)) return null;
  return { id, organisation_name:org, role, courses, description:desc, why_it_helps:why,
    skills, mode, region, weekly_commitment:wc, min_age:age, town, apply_url:url,
    achievements:ach, reflection_prompts:ref, example_sentence:ex,
    is_active:true, last_checked:today, type:type||"volunteering" };
}

const ops = [
  // ── ROBOTICS & AI ENGINEERING ──────────────────────────────────────
  op("rb1","FIRST Robotics","FIRST Robotics Competition",["robotics-ai","engineering","computer-science","mathematics"],
    "Compete in FIRST Robotics — building a robot in 6 weeks to solve an annually-changing engineering challenge, competing at regional and national events.",
    "FIRST Robotics is the world's most recognised pre-university robotics competition and is cited by every engineering and CS admissions panel.",
    ["Mechanical design","Programming","Systems integration"],
    "in-person","UK","Weekly sessions + competitions",14,"Anywhere","https://www.firstinspires.org/robotics/frc",
    ["Robot competed at UK FIRST Robotics regional championship","Programmed the autonomous routine used in competition"],
    ["What systems integration failure during build season required the most creative engineering solution?"],
    "Competing in FIRST Robotics showed me that engineering is always a team sport — no single person can hold the whole system in their head.",
    "competition"),

  op("rb2","AI UK Festival","AI for Good Hackathon",["robotics-ai","computer-science","data-science-ai","mathematics"],
    "Compete in an AI for Good hackathon — building an AI-powered solution to a real societal challenge within 24-48 hours.",
    "AI hackathon participation demonstrates applied machine learning thinking and rapid prototyping skills that robotics and AI programmes want.",
    ["Machine learning basics","Rapid AI prototyping","Problem framing"],
    "online","UK","Hackathon weekend",16,"Anywhere","https://www.turing.ac.uk/",
    ["Team's AI solution reached hackathon final","Model accuracy improved by 15% through feature engineering during the event"],
    ["What societal problem turned out to be harder to define than to solve technically?"],
    "Competing in an AI hackathon showed me that the hardest part of applied AI is deciding what problem you are actually trying to solve.",
    "competition"),

  op("rb3","Robotics for Good","Community Robot Build Volunteer",["robotics-ai","engineering","education"],
    "Help design and build robots for community benefit — assistive devices, educational robots and tools for people with disabilities.",
    "Applied robotics for social impact demonstrates the purposeful engineering thinking that distinguishes strong applications.",
    ["Embedded systems","Mechanical fabrication","Assistive technology design"],
    "in-person","UK","Weekly sessions",16,"London","https://www.theiet.org/",
    ["Built an assistive communication device for a young person with motor difficulties"],
    ["What design constraint imposed by the user's needs changed your engineering approach most fundamentally?"],
    "Building an assistive robot showed me that the best engineering is always designed for a specific person, not a generic user.",
    "volunteering"),

  op("rb4","IET","IET FIRST LEGO League Coach",["robotics-ai","engineering","education","computer-science"],
    "Coach a team of young people (9-16) competing in the IET-sponsored FIRST LEGO League — designing, building and programming a robot to complete missions.",
    "Coaching FLL demonstrates both technical depth and the teaching dimension that robotics and engineering courses value.",
    ["Robot programming","Team coaching","Engineering communication"],
    "in-person","UK","Weekly sessions",16,"Anywhere","https://www.theiet.org/",
    ["Coached a team of 8 to a regional FLL competition","Team's robot completed 12/15 missions in competition"],
    ["What programming problem did the team solve in a way you hadn't suggested, and what did that teach you?"],
    "Coaching an FLL team showed me that teaching robotics forces you to understand it from first principles all over again.",
    "volunteering"),

  op("rb5","Alan Turing Institute","Data Study Group Volunteer",["robotics-ai","data-science-ai","mathematics","computer-science"],
    "Participate in an Alan Turing Institute Data Study Group — collaborative week-long hackathons working on real data challenges with researchers and industry partners.",
    "Turing Institute Data Study Group participation is exceptional evidence of applied AI and data science capability for robotics and AI applications.",
    ["Applied machine learning","Data analysis","Collaborative research"],
    "in-person","UK","Week-long programme",18,"London","https://www.turing.ac.uk/collaborate-turing/data-study-groups",
    ["Contributed to a Turing Data Study Group that produced an industry report"],
    ["What data problem revealed a fundamental limitation in the ML approach your team initially chose?"],
    "Working at a Turing Data Study Group showed me that the boundary between AI research and real-world application is narrower and messier than papers suggest.",
    "volunteering"),

  // ── MARINE BIOLOGY ─────────────────────────────────────────────────
  op("mb1","Marine Conservation Society","Sea Champion Volunteer",["marine-biology","environmental-science","biology-life-sciences"],
    "Become an MCS Sea Champion — organising beach cleans, recording marine litter data and running ocean conservation community events.",
    "MCS engagement is specifically recognised by marine biology programmes as evidence of conservation commitment and citizen science participation.",
    ["Marine litter monitoring","Citizen science","Conservation advocacy"],
    "in-person","UK","Monthly events",14,"Anywhere","https://www.mcsuk.org/",
    ["Organised a beach clean collecting 50kg of litter","Submitted data to the MCS Great British Beach Clean survey"],
    ["What did beach clean data reveal about the sources of marine litter that surprised you?"],
    "Organising beach cleans for the MCS showed me that marine conservation is built on data collected one piece of litter at a time.",
    "volunteering"),

  op("mb2","Shark Trust","Great Eggcase Hunt Volunteer",["marine-biology","biology-life-sciences","environmental-science"],
    "Participate in the Shark Trust Great Eggcase Hunt — surveying beaches for shark and ray eggcases and contributing data to national population studies.",
    "Shark Trust citizen science work gives marine biology applicants rare, specific field evidence directly relevant to elasmobranch research.",
    ["Species survey methodology","Marine taxonomy","Citizen science data collection"],
    "in-person","UK","Seasonal surveys",14,"Anywhere","https://www.sharktrust.org/",
    ["Contributed 40+ eggcase records to the national Great Eggcase Hunt database"],
    ["What distribution pattern in the eggcase data suggested something unexpected about local shark and ray populations?"],
    "Surveying for the Shark Trust showed me that marine biology fieldwork is about training your eyes to see what isn't obvious.",
    "volunteering"),

  op("mb3","Reef Check UK","Coral and Reef Survey Volunteer",["marine-biology","environmental-science","biology-life-sciences"],
    "Train as a Reef Check UK volunteer diver — conducting standardised underwater surveys of reef health, fish populations and invertebrate communities.",
    "Reef Check underwater survey training is among the most distinctive and specific experiences for marine biology applications.",
    ["Reef survey methodology","Marine species identification","Underwater data collection"],
    "in-person","UK","Training + survey dives",16,"Anywhere","https://www.reefcheck.org.uk/",
    ["Completed Reef Check UK volunteer diver training","Conducted 4 standardised reef health surveys"],
    ["What reef health indicator showed the most unexpected pattern in your survey data?"],
    "Training as a Reef Check diver showed me that marine biology fieldwork requires the same methodological rigour as any laboratory science.",
    "volunteering"),

  op("mb4","Marine Biological Association","MBA School of Ocean Science",["marine-biology","biology-life-sciences","chemistry","environmental-science"],
    "Participate in the MBA's School of Ocean Science — a summer programme introducing marine biology, oceanography and laboratory techniques to sixth-formers.",
    "MBA is the world's oldest marine biology institution; school programme participation is cited by every marine biology admissions panel.",
    ["Marine ecology","Oceanography basics","Laboratory marine science"],
    "in-person","UK","Summer programme week",16,"Plymouth","https://www.mba.ac.uk/",
    ["Completed MBA School of Ocean Science programme","Conducted original plankton diversity analysis as part of the course"],
    ["What aspect of ocean science revealed a level of complexity you had not anticipated from school biology?"],
    "The MBA School of Ocean Science showed me that the ocean is not a background to marine life — it is an active and dynamic participant in it.",
    "volunteering"),

  op("mb5","Sea Life Trust","Marine Education Volunteer",["marine-biology","education","environmental-science"],
    "Support Sea Life Trust's marine education programmes — delivering ocean conservation workshops, handling sessions and school visits.",
    "Sea Life Trust outreach gives marine biology applicants communication experience linked to their subject in a public, educational context.",
    ["Marine education","Species handling","Conservation communication"],
    "in-person","UK","2 hrs/week",16,"London","https://www.sealifetrust.org/",
    ["Delivered marine conservation workshops to 6 school groups","Assisted with live animal handling demonstrations for 200+ visitors"],
    ["What did a child's question during a handling session reveal about a gap in how marine biology is publicly communicated?"],
    "Volunteering at Sea Life Trust showed me that the most important job in marine conservation is helping people see the ocean as something that belongs to them.",
    "volunteering"),

  // ── THEOLOGY & RELIGIOUS STUDIES ──────────────────────────────────
  op("th_1","Inter Faith Network UK","Interfaith Dialogue Volunteer",["theology","philosophy","sociology","politics"],
    "Support the Inter Faith Network UK — facilitating interfaith dialogue events, school visits and community bridge-building programmes across different faith communities.",
    "Interfaith facilitation demonstrates the cross-cultural religious understanding and dialogue skills that theology programmes specifically require.",
    ["Interfaith facilitation","Religious literacy","Community dialogue"],
    "hybrid","UK","2-3 hrs/week",17,"Anywhere","https://www.interfaith.org.uk/",
    ["Facilitated 6 interfaith dialogue sessions attended by representatives from 5 faith traditions"],
    ["What theological or ethical commonality emerged between traditions you had assumed to be in opposition?"],
    "Facilitating interfaith dialogue showed me that religious disagreement is often about the same questions approached from different starting points.",
    "volunteering"),

  op("th_2","St Ethelburga's Centre","Reconciliation & Peacebuilding Volunteer",["theology","philosophy","politics","sociology"],
    "Support St Ethelburga's Centre for Reconciliation and Peace — a London interfaith centre using religion as a resource for conflict transformation.",
    "Reconciliation work at a dedicated interfaith peace centre is rare, distinctive evidence for Theology and Philosophy applications.",
    ["Conflict transformation","Religious peacebuilding","Facilitation"],
    "in-person","UK","2-3 hrs/week",18,"London","https://www.stethelburgas.org/",
    ["Supported 4 reconciliation workshops bringing together participants from conflicting backgrounds"],
    ["What did the reconciliation process reveal about the role of religious narrative in sustaining conflict?"],
    "Volunteering at St Ethelburga's showed me that religion is equally capable of sustaining conflict and resolving it — the difference lies entirely in how it is used.",
    "volunteering"),

  op("th_3","Scripture Union","Youth Worker Support Volunteer",["theology","education","social-work"],
    "Support Scripture Union youth workers in schools and community settings — assisting with Bible exploration groups, camps and mentoring programmes.",
    "Sustained youth work in a faith context demonstrates the pastoral and educational skills that theology programmes value alongside academic knowledge.",
    ["Youth pastoral support","Faith exploration facilitation","Group leadership"],
    "in-person","UK","Weekly sessions",17,"Anywhere","https://www.scriptureunion.org.uk/",
    ["Supported weekly Bible exploration groups in two secondary schools"],
    ["What question from a young person about faith or meaning revealed something you had not yet fully worked out yourself?"],
    "Supporting Scripture Union youth groups showed me that theological questions are most alive when they emerge from real experience, not academic texts.",
    "volunteering"),

  op("th_4","Student Christian Movement","Theological Essay Competition",["theology","philosophy","history","sociology"],
    "Enter the SCM theological essay competition — writing an original piece engaging a contemporary theological or ethical question.",
    "SCM essay competition success is recognised by theology departments as evidence of independent theological thinking at degree-entry level.",
    ["Theological argument","Ethics","Academic writing"],
    "online","UK","Project-based",16,"Anywhere","https://www.movement.org.uk/",
    ["Shortlisted in SCM theological essay competition"],
    ["What theological argument in your essay most surprised you by its implications once you had fully worked it through?"],
    "Writing for the SCM competition showed me that theology is not a subject about belief — it is a discipline about the rigour with which beliefs are examined.",
    "competition"),

  op("th_5","National Association of Teachers of Religious Education","NATRE Spirited Arts",["theology","art-design","philosophy","education"],
    "Enter the NATRE Spirited Arts competition — producing an original artwork that engages with a religious, spiritual or moral theme.",
    "Spirited Arts bridges theology and creative practice — competition success demonstrates both religious literacy and artistic engagement.",
    ["Religious and spiritual themes in art","Creative interpretation","Theological reflection"],
    "online","UK","Project-based",5,"Anywhere","https://www.natre.org.uk/spirited-arts/",
    ["Artwork shortlisted in NATRE Spirited Arts national competition"],
    ["What spiritual or theological concept became clearer to you through trying to express it visually?"],
    "Entering Spirited Arts showed me that the attempt to represent a theological idea in art forces a clarity of thought that writing alone rarely achieves.",
    "competition"),
];

const added = ops.filter(Boolean);
added.forEach(o => d.push(o));
fs.writeFileSync(DATA, JSON.stringify(d, null, 2));
console.log("Total:", d.length, "| Added:", added.length);

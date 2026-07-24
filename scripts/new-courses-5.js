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
  // ── CYBERSECURITY ─────────────────────────────────────────────────
  op("cy1","National Cyber Security Centre","CyberFirst Girls Competition",["cybersecurity","computer-science","mathematics","data-science-ai"],
    "Enter the NCSC CyberFirst Girls Competition — a team-based cybersecurity challenge testing coding, cryptography and security thinking.",
    "NCSC CyberFirst is government-endorsed; competition participation is cited by every cybersecurity and computer science admissions panel.",
    ["Cryptography","Network security basics","Team CTF problem-solving"],
    "online","UK","Competition weekend",12,"Anywhere","https://www.ncsc.gov.uk/cyberfirst/competitions",
    ["Team reached CyberFirst Girls national final","Solved 15/18 challenges in competition time"],
    ["What security vulnerability in the competition did you find hardest to exploit, and what did that teach you about defence?"],
    "Competing in CyberFirst showed me that good cybersecurity thinking requires you to understand both attack and defence simultaneously.",
    "competition"),

  op("cy2","GCHQ","GCHQ Cybersecurity Challenge",["cybersecurity","computer-science","mathematics"],
    "Enter the GCHQ-sponsored Cyber Security Challenge UK — a series of competitions and assessment events testing real-world cybersecurity skills.",
    "GCHQ-endorsed competition participation is exceptional, distinctive evidence for cybersecurity applications at any university.",
    ["Penetration testing basics","Network forensics","Security challenge solving"],
    "online","UK","Competition series",18,"Anywhere","https://www.cybersecuritychallenge.org.uk/",
    ["Qualified for Cyber Security Challenge UK face-to-face assessment"],
    ["What security problem in the challenge required you to think like an attacker to design the defence?"],
    "Competing in the Cyber Security Challenge showed me that the most important cybersecurity skill is anticipating what you haven't been told to protect.",
    "competition"),

  op("cy3","NCSC","CyberFirst Bursary Programme",["cybersecurity","computer-science","mathematics","engineering"],
    "Apply for the NCSC CyberFirst bursary — a government-funded programme supporting students into cybersecurity through courses, mentoring and summer schools.",
    "CyberFirst bursary holders are the UK government's identified pipeline for cybersecurity talent — it is the most direct pre-university endorsement available.",
    ["Cyber defence fundamentals","Programming security","Government security awareness"],
    "hybrid","UK","Summer school + academic year",16,"Anywhere","https://www.ncsc.gov.uk/cyberfirst/overview",
    ["Selected as a CyberFirst Bursary holder","Completed CyberFirst summer school with distinction"],
    ["What aspect of national cybersecurity did the programme reveal that public discourse completely misses?"],
    "Being selected for CyberFirst showed me that cybersecurity is infrastructure — it is the thing that makes everything else possible.",
    "volunteering"),

  op("cy4","Cyber Discovery","Cyber Discovery Programme",["cybersecurity","computer-science","data-science-ai"],
    "Participate in DCMS Cyber Discovery — a free online cybersecurity learning and challenge programme funded by the UK government for 13-18 year olds.",
    "Cyber Discovery Elite completion is cited by admissions tutors as the benchmark of pre-university cybersecurity commitment.",
    ["Web security","Reverse engineering","Cryptanalysis"],
    "online","UK","Self-paced + challenges",13,"Anywhere","https://joincyberdiscovery.com/",
    ["Reached Cyber Discovery Elite level","Solved cryptanalysis challenges rated university-level difficulty"],
    ["What category of cybersecurity challenge exposed the biggest gap in your current knowledge?"],
    "Completing Cyber Discovery Elite showed me that cybersecurity knowledge has a floor but no ceiling.",
    "volunteering"),

  op("cy5","OWASP","Student Security Research Volunteer",["cybersecurity","computer-science","data-science-ai","law"],
    "Contribute to OWASP (Open Worldwide Application Security Project) — testing, documenting or communicating web application security issues for the open-source community.",
    "OWASP open-source contribution demonstrates real, applied security engineering practice that cybersecurity admissions specifically cite.",
    ["Web application security","Vulnerability documentation","Security research communication"],
    "online","UK","3-4 hrs/week",16,"Anywhere","https://owasp.org/",
    ["Contributed documentation to an OWASP security testing guide","Identified and reported a configuration vulnerability in a test environment"],
    ["What web security vulnerability was most commonly misunderstood by other developers in the OWASP community?"],
    "Contributing to OWASP showed me that open-source security research is how the whole internet gets incrementally safer.",
    "volunteering"),

  // ── ANIMATION & VFX ───────────────────────────────────────────────
  op("av1","BAFTA","BAFTA Young Animators Award",["animation-vfx","art-design","computer-science","film-media-studies"],
    "Enter the BAFTA Young Animators Award — submitting an original animated short film for judging by BAFTA industry members.",
    "BAFTA recognition in animation is the most prestigious pre-university film and animation distinction available in the UK.",
    ["Animation production","Storytelling","Technical rendering"],
    "online","UK","Project-based",10,"Anywhere","https://www.bafta.org/",
    ["BAFTA Young Animator Award shortlist","Animation screened at a BAFTA event"],
    ["What technical limitation in your production forced a creative solution you ended up preferring?"],
    "Entering the BAFTA animation award showed me that the best animated films solve technical problems with creative decisions.",
    "competition"),

  op("av2","Into Film","Animation Masterclass Participant",["animation-vfx","film-media-studies","art-design","computer-science"],
    "Attend an Into Film animation masterclass — learning professional animation techniques from industry practitioners working in UK film and TV.",
    "Into Film industry masterclasses give animation applicants direct professional exposure that is consistently cited in personal statements.",
    ["2D/3D animation techniques","Industry workflow","Storyboarding"],
    "in-person","UK","Workshop days",14,"London","https://www.intofilm.org/",
    ["Completed an Into Film animation masterclass","Produced a 30-second animated sequence using industry software"],
    ["What aspect of professional animation workflow was most different from self-taught practice?"],
    "Attending an Into Film masterclass showed me that animation is a discipline of planning — every second of movement is designed before it is made.",
    "volunteering"),

  op("av3","ScreenSkills","Animation Industry Work Placement",["animation-vfx","computer-science","art-design","film-media-studies"],
    "Apply for a ScreenSkills-funded animation or VFX work placement at a UK studio — observing production pipelines and contributing to live projects.",
    "ScreenSkills animation placements provide direct industry experience that is specifically cited by animation and VFX degree programmes.",
    ["Production pipeline","VFX compositing basics","Studio professional culture"],
    "in-person","UK","2-3 week placement",17,"Anywhere","https://www.screenskills.com/",
    ["Completed a 2-week placement at a UK animation studio","Contributed rigging work to a live production"],
    ["What part of the animation pipeline was most invisible to you before the placement and most important in practice?"],
    "My ScreenSkills animation placement showed me that 90% of animation is invisible work done by people whose names appear for two seconds in the credits.",
    "volunteering"),

  op("av4","Escape Studios","Escape Studios Taster Day",["animation-vfx","computer-science","art-design"],
    "Attend an Escape Studios taster day — hands-on experience of VFX, motion graphics and 3D animation led by industry professionals.",
    "Escape Studios is the UK's leading VFX and animation training institution; taster day participation demonstrates informed career motivation.",
    ["VFX compositing","3D modelling basics","Motion graphics"],
    "in-person","UK","Taster day",15,"London","https://www.escapestudios.ac.uk/",
    ["Completed Escape Studios VFX taster day","Produced a composited VFX shot in a single day"],
    ["What VFX technique that looks simple on screen turned out to require the most complex technical process?"],
    "Attending an Escape Studios taster day showed me that VFX is the art of making difficult things look effortless.",
    "volunteering"),

  op("av5","Aardman","Aardman Student Competition",["animation-vfx","art-design","film-media-studies","creative-writing"],
    "Enter an Aardman animation challenge — creating an original animated character or short in response to a brief set by the UK's most famous animation studio.",
    "Aardman is globally recognised; competition entry demonstrates the creative and technical commitment that every animation programme values.",
    ["Character design","Stop motion or digital animation","Narrative craft"],
    "online","UK","Project-based",12,"Anywhere","https://www.aardman.com/",
    ["Animation shortlisted in Aardman student challenge"],
    ["What character design decision most changed how the animation felt when you saw it in motion?"],
    "Entering the Aardman competition showed me that character animation is the art of making a drawing feel like it has a life of its own.",
    "competition"),

  // ── HUMAN GEOGRAPHY ───────────────────────────────────────────────
  op("hg1","RGS","Human Geography Fieldwork Award",["human-geography","geography","sociology","economics"],
    "Enter the RGS Human Geography Fieldwork Award — conducting original primary research on a human geography topic and presenting your findings.",
    "RGS fieldwork recognition is the most prestigious pre-university human geography award and is directly cited by geography and social science departments.",
    ["Primary research methods","Human geography analysis","Research presentation"],
    "in-person","UK","Project-based",16,"Anywhere","https://www.rgs.org/schools/",
    ["Shortlisted in RGS Human Geography Fieldwork Award"],
    ["What finding in your primary data most contradicted the secondary literature you had read?"],
    "Conducting original human geography fieldwork showed me that the most interesting geography happens at the intersection of maps and people.",
    "competition"),

  op("hg2","Joseph Rowntree Foundation","Urban Inequality Research Volunteer",["human-geography","sociology","economics","politics"],
    "Support JRF's research on spatial inequality, housing and place-based poverty in UK cities.",
    "JRF urban inequality research gives human geography applicants direct evidence of the socioeconomic fieldwork their discipline requires.",
    ["Spatial data analysis","Housing research","Poverty mapping"],
    "hybrid","UK","3 hrs/week",18,"York","https://www.jrf.org.uk/work-with-us",
    ["Contributed spatial data coding to a JRF report on neighbourhood poverty"],
    ["What pattern in the spatial data revealed that urban inequality cannot be understood at the city level alone?"],
    "Researching urban inequality for JRF showed me that geography is the discipline that makes visible what statistics keep hidden.",
    "volunteering"),

  op("hg3","Shelter","Housing Policy Research Volunteer",["human-geography","sociology","politics","social-work"],
    "Support Shelter's research and policy team — analysing housing data, reviewing literature on homelessness and contributing to campaign briefings.",
    "Shelter research experience demonstrates the applied socioeconomic analysis and policy awareness that human geography programmes value.",
    ["Housing policy analysis","Social geography","Data interpretation"],
    "hybrid","UK","3 hrs/week",18,"London","https://www.shelter.org.uk/",
    ["Contributed data analysis to a Shelter housing affordability briefing"],
    ["What housing statistic most revealed how spatial location determines life outcomes?"],
    "Researching for Shelter showed me that geography is not neutral — where you live shapes what is possible for you in ways that have nothing to do with individual effort.",
    "volunteering"),

  op("hg4","Migration Museum","Community History Volunteer",["human-geography","history","sociology","anthropology"],
    "Support the Migration Museum — helping collect community migration histories, supporting exhibitions and assisting with public engagement events.",
    "Migration Museum work demonstrates the cultural geography and social history engagement that human geography departments look for.",
    ["Migration geography","Oral history","Community engagement"],
    "in-person","UK","2 hrs/week",17,"London","https://www.migrationmuseum.org/get-involved/",
    ["Contributed to a migration history oral archive","Assisted with a Migration Museum public exhibition attended by 300 visitors"],
    ["What migration story revealed a geographical pattern that no map had previously made visible to you?"],
    "Volunteering at the Migration Museum showed me that migration is not a movement of people across space — it is the movement of lives across worlds.",
    "volunteering"),

  op("hg5","Geographers in Schools","School Fieldwork Mentor",["human-geography","geography","education"],
    "Support geography teachers as a fieldwork mentor — helping design and deliver human geography fieldwork projects for GCSE and A-level students.",
    "Fieldwork mentoring in schools demonstrates both subject depth and the communication skills that geography programmes value alongside academic achievement.",
    ["Fieldwork design","Human geography teaching","Research mentoring"],
    "in-person","UK","2 hrs/week",17,"Anywhere","https://www.rgs.org/schools/teachers/",
    ["Mentored a Year 12 class through a primary fieldwork project on urban land use"],
    ["What fieldwork method did students find most challenging to apply, and what did their struggle reveal about the method itself?"],
    "Mentoring school fieldwork showed me that human geography is a discipline about asking better questions of the places we already know.",
    "volunteering"),
];

const added = ops.filter(Boolean);
added.forEach(o => d.push(o));
fs.writeFileSync(DATA, JSON.stringify(d, null, 2));

const counts = {};
d.forEach(o => o.courses.forEach(c => counts[c] = (counts[c]||0)+1));
const newCourses = ["accounting","criminology","media-communications","public-health","nutrition-dietetics",
  "optometry","game-design","urban-planning","robotics-ai","marine-biology","theology",
  "development-studies","sport-psychology","forensic-science","museum-studies",
  "cybersecurity","animation-vfx","human-geography"];
console.log("Total:", d.length, "| Added:", added.length);
console.log("\nNew course counts:");
newCourses.forEach(c => console.log(c + ":", counts[c] || 0));

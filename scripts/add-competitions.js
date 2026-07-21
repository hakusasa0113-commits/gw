const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const today = new Date().toISOString().split("T")[0];

const competitions = [
  // ── STEM Olympiads & Competitions ─────────────────────────────────
  {
    id:"o91", organisation_name:"UK Mathematics Trust", role:"Senior Mathematical Challenge & Olympiad",
    courses:["mathematics","physics","economics","computer-science","data-science-ai"],
    description:"Compete in the UK's premier mathematics competition — from the Senior Mathematical Challenge through to the British Mathematical Olympiad.",
    why_it_helps:"Olympiad success is one of the strongest differentiators for Mathematics, Physics and Economics applications at top universities.",
    skills:["Mathematical problem-solving","Competition thinking","Proof writing"],
    mode:"hybrid", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.ukmt.org.uk/competitions/solo-competitions",
    achievements:["Qualified for British Mathematical Olympiad Round 2","Achieved gold certificate in Senior Mathematical Challenge"],
    reflection_prompts:["What mathematical technique did you learn from competition problems that doesn't appear in A-level content?"],
    example_sentence:"Reaching the British Mathematical Olympiad showed me that mathematics at university demands a different kind of thinking from what exams test.",
    is_active:true, last_checked:today
  },
  {
    id:"o92", organisation_name:"British Physics Olympiad", role:"Physics Challenge & Olympiad",
    courses:["physics","engineering","mathematics","space-science"],
    description:"Enter the British Physics Olympiad — a series of challenges testing physics problem-solving from first principles, culminating in national and international rounds.",
    why_it_helps:"Physics Olympiad participation signals the kind of problem-solving depth that Physics and Engineering admissions tutors actively look for.",
    skills:["Physics problem-solving","Mathematical modelling","First-principles thinking"],
    mode:"hybrid", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.bpho.org.uk/",
    achievements:["Silver medal in Round 1","Qualified for British Physics Olympiad Round 2"],
    reflection_prompts:["Which Olympiad problem required you to derive a result from scratch that you'd only ever been given as a formula?"],
    example_sentence:"Competing in the Physics Olympiad taught me that real physics problems don't come with a list of equations at the front.",
    is_active:true, last_checked:today
  },
  {
    id:"o93", organisation_name:"UK Chemistry Olympiad", role:"Chemistry Olympiad Competition",
    courses:["chemistry","medicine","pharmacy","biology-life-sciences"],
    description:"Take part in the UK Chemistry Olympiad — a challenging national competition testing understanding, problem-solving and practical chemistry knowledge.",
    why_it_helps:"Chemistry Olympiad results demonstrate subject depth and competition-level thinking highly valued in Chemistry and Medicine applications.",
    skills:["Chemical problem-solving","Mechanism reasoning","Quantitative analysis"],
    mode:"in-person", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"Anywhere",
    apply_url:"https://edu.rsc.org/enrichment/uk-chemistry-olympiad",
    achievements:["Bronze medal in UK Chemistry Olympiad Round 1"],
    reflection_prompts:["What chemistry concept did the Olympiad expose that your A-level hadn't yet covered?"],
    example_sentence:"The Chemistry Olympiad showed me how much deeper chemical reasoning goes than A-level reaction memorisation.",
    is_active:true, last_checked:today
  },
  {
    id:"o94", organisation_name:"British Biology Olympiad", role:"Biology Challenge & Olympiad",
    courses:["biology-life-sciences","medicine","veterinary-science","environmental-science"],
    description:"Enter the British Biology Olympiad — testing biological knowledge, problem-solving and experimental thinking across all life science disciplines.",
    why_it_helps:"Biology Olympiad success is a clear signal of academic ambition and subject depth for competitive Biology and Medicine applications.",
    skills:["Biological reasoning","Data interpretation","Experimental design"],
    mode:"in-person", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.ukbiologycompetitions.org/",
    achievements:["Gold award in British Biology Olympiad","Invited to participate in training camp"],
    reflection_prompts:["What biological system did the Olympiad questions make you rethink from first principles?"],
    example_sentence:"Competing in the Biology Olympiad taught me that biological problem-solving is as rigorous as any mathematical proof.",
    is_active:true, last_checked:today
  },
  {
    id:"o95", organisation_name:"UK Informatics Olympiad", role:"British Informatics Olympiad (BIO)",
    courses:["computer-science","mathematics","data-science-ai","engineering"],
    description:"Compete in the British Informatics Olympiad — a national algorithmic problem-solving competition for the UK's top computing students.",
    why_it_helps:"BIO results are exceptional evidence of algorithmic thinking and are specifically referenced by Oxbridge Computer Science admissions.",
    skills:["Algorithm design","Competitive programming","Computational thinking"],
    mode:"online", region:"UK", weekly_commitment:"Competition-based", min_age:14, town:"Anywhere",
    apply_url:"https://www.olympiad.org.uk/",
    achievements:["Qualified for BIO Round 2","Solved 3/3 Round 1 problems in competition time"],
    reflection_prompts:["What algorithmic technique did you learn from the Olympiad that you'd never encountered in class?"],
    example_sentence:"Reaching the BIO finals taught me that competitive programming is as much about mathematical proof as code.",
    is_active:true, last_checked:today
  },

  // ── Essay & Debating Competitions ─────────────────────────────────
  {
    id:"o96", organisation_name:"John Locke Institute", role:"John Locke Essay Competition",
    courses:["philosophy","politics","economics","law","history","english-literature"],
    description:"Write an extended essay on a philosophical, political, economic or legal question for the prestigious John Locke Essay Competition.",
    why_it_helps:"John Locke success is one of the most recognised essay competition results for Oxbridge humanities and social science applications.",
    skills:["Extended essay writing","Philosophical argument","Critical reading"],
    mode:"online", region:"UK", weekly_commitment:"Project-based", min_age:15, town:"Anywhere",
    apply_url:"https://www.johnlockeinstitute.com/essay-competition",
    achievements:["Shortlisted in Philosophy category","Highly commended in Politics category"],
    reflection_prompts:["What did writing a 2000-word essay under competition conditions teach you that coursework doesn't?"],
    example_sentence:"Writing for the John Locke competition taught me that a strong argument is built on anticipating counterarguments, not avoiding them.",
    is_active:true, last_checked:today
  },
  {
    id:"o97", organisation_name:"European Youth Parliament UK", role:"EYP Debating Competitions",
    courses:["politics","law","history","economics","journalism"],
    description:"Compete in EYP debating competitions, representing your region in debates on European political and social issues.",
    why_it_helps:"EYP competition experience demonstrates political engagement, public speaking and collaborative argument skills valued in Politics and Law applications.",
    skills:["Formal debating","Political analysis","Public speaking"],
    mode:"in-person", region:"UK", weekly_commitment:"Event-based", min_age:16, town:"London",
    apply_url:"https://eyp.org.uk/get-involved/",
    achievements:["Represented regional delegation at national EYP session","Co-authored winning resolution on climate policy"],
    reflection_prompts:["How did competitive debating change the way you construct a political argument?"],
    example_sentence:"Competing in the EYP taught me that the best political arguments are built from evidence, not conviction.",
    is_active:true, last_checked:today
  },
  {
    id:"o98", organisation_name:"The Economist Essay Competition", role:"Open Future Essay Competition",
    courses:["economics","politics","business","history","philosophy"],
    description:"Write an essay on a global political economy question set by The Economist for their annual Open Future competition.",
    why_it_helps:"The Economist competition is globally recognised and carries particular weight for Economics and Politics applications at competitive universities.",
    skills:["Economic reasoning","Essay writing","Global policy analysis"],
    mode:"online", region:"UK", weekly_commitment:"Project-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.economist.com/open-future/",
    achievements:["Essay published in The Economist's shortlisted collection"],
    reflection_prompts:["What economic argument did you discover through the research that challenged your initial position?"],
    example_sentence:"Writing for The Economist competition forced me to think like an economist, not a student with opinions.",
    is_active:true, last_checked:today
  },

  // ── Creative Competitions ─────────────────────────────────────────
  {
    id:"o99", organisation_name:"BBC Young Writers' Award", role:"BBC Young Writers' Award Competition",
    courses:["english-literature","journalism","film-media-studies","creative-writing"],
    description:"Submit original fiction, poetry or non-fiction to the BBC Young Writers' Award — one of the UK's most prestigious writing competitions for under-18s.",
    why_it_helps:"BBC recognition as a young writer is strong, tangible evidence of writing quality for English and Journalism applications.",
    skills:["Creative writing","Editing","Narrative craft"],
    mode:"online", region:"UK", weekly_commitment:"Project-based", min_age:14, town:"Anywhere",
    apply_url:"https://www.bbc.co.uk/programmes/articles/young-writers-award",
    achievements:["Shortlisted in fiction category","Piece broadcast on BBC Radio"],
    reflection_prompts:["What did the editorial feedback reveal about your writing that self-assessment couldn't?"],
    example_sentence:"Being shortlisted by the BBC taught me that good writing is rewriting — the first draft is just permission to write a better second one.",
    is_active:true, last_checked:today
  },
  {
    id:"o100", organisation_name:"Royal Photographic Society", role:"Young Photographer of the Year",
    courses:["art-design","film-media-studies","journalism"],
    description:"Enter the RPS Young Photographer of the Year competition with a portfolio showcasing your photographic work and creative vision.",
    why_it_helps:"RPS recognition demonstrates technical skill and creative vision — strong evidence for Art, Film and Journalism applications.",
    skills:["Photography","Portfolio curation","Visual storytelling"],
    mode:"online", region:"UK", weekly_commitment:"Project-based", min_age:12, town:"Anywhere",
    apply_url:"https://rps.org/qualifications/distinctions/young-photographer-of-the-year/",
    achievements:["Highly commended in documentary category","Portfolio exhibited at RPS gallery"],
    reflection_prompts:["What did curating a competition portfolio teach you about your photographic voice?"],
    example_sentence:"Entering RPS taught me that a strong portfolio is a conversation, not a collection.",
    is_active:true, last_checked:today
  },
  {
    id:"o101", organisation_name:"ARTiculation Prize", role:"National Art History Speaking Competition",
    courses:["art-design","history","english-literature","film-media-studies"],
    description:"Research and present a 10-minute talk on a work of art for the ARTiculation Prize — the UK's national art history speaking competition.",
    why_it_helps:"ARTiculation demonstrates art historical research, critical analysis and presentation skills — distinctive for Art and History applications.",
    skills:["Art historical analysis","Public speaking","Visual literacy"],
    mode:"in-person", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"London",
    apply_url:"https://articulationprize.com/",
    achievements:["Regional finalist","Presented on contemporary sculpture at national final"],
    reflection_prompts:["What did speaking about art in front of an expert audience reveal about your understanding of visual analysis?"],
    example_sentence:"Competing in ARTiculation taught me that looking at art critically means asking questions the artwork itself raises.",
    is_active:true, last_checked:today
  },

  // ── Medical & Science Competitions ────────────────────────────────
  {
    id:"o102", organisation_name:"NHS Cadets Leadership Competition", role:"NHS Cadets Challenge",
    courses:["medicine","nursing","physiotherapy","dentistry"],
    description:"Join the NHS Cadets programme and compete in the annual leadership challenge — a healthcare simulation testing clinical knowledge and teamwork.",
    why_it_helps:"NHS Cadets competition experience combines clinical exposure with leadership development — strong evidence for Medicine and Nursing applications.",
    skills:["Healthcare simulation","Team leadership","Clinical decision-making"],
    mode:"in-person", region:"UK", weekly_commitment:"Event-based", min_age:14, town:"Anywhere",
    apply_url:"https://nhscadets.co.uk/",
    achievements:["Team placed 2nd in regional NHS Cadets Challenge","Led team through emergency simulation exercise"],
    reflection_prompts:["What did the simulation reveal about healthcare teamwork that theory doesn't capture?"],
    example_sentence:"Competing in the NHS Cadets challenge showed me that clinical decisions are team decisions, not solo ones.",
    is_active:true, last_checked:today
  },
  {
    id:"o103", organisation_name:"Cambridge Chemistry Challenge", role:"Cambridge Chemistry Challenge (C3)",
    courses:["chemistry","medicine","pharmacy","chemical-engineering"],
    description:"Take the Cambridge Chemistry Challenge — an extension paper for top chemistry students testing university-level thinking.",
    why_it_helps:"C3 results specifically appear in Oxbridge Chemistry and Medicine offer-holder profiles and signal readiness for degree-level content.",
    skills:["Advanced chemistry","University-level problem-solving","Chemical reasoning"],
    mode:"in-person", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.c3l6.com/",
    achievements:["Gold award in C3","Scored in top 10% nationally"],
    reflection_prompts:["Which C3 question required chemistry thinking you hadn't yet developed at A-level?"],
    example_sentence:"The Cambridge Chemistry Challenge showed me that university chemistry is about reasoning from principles, not applying memorised rules.",
    is_active:true, last_checked:today
  },

  // ── Business & Entrepreneurship ───────────────────────────────────
  {
    id:"o104", organisation_name:"The Fosse Entrepreneur Challenge", role:"Young Entrepreneur Business Competition",
    courses:["business","economics","computer-science","engineering"],
    description:"Pitch a business idea and develop a full business plan through the Fosse Entrepreneur Challenge — competing for seed funding and mentorship.",
    why_it_helps:"Entrepreneurship competition experience shows commercial thinking, initiative and real business planning — strong for Business and Economics applications.",
    skills:["Business planning","Pitching","Financial modelling"],
    mode:"hybrid", region:"UK", weekly_commitment:"Competition-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.thefosse.org.uk/programmes/",
    achievements:["Reached regional final","Developed full business plan and financial model"],
    reflection_prompts:["What business assumption did market research prove wrong?"],
    example_sentence:"Competing in Fosse taught me that a business plan is only as strong as the evidence supporting it.",
    is_active:true, last_checked:today
  },
  {
    id:"o105", organisation_name:"Target 2.0 Investment Competition", role:"Student Investment Challenge",
    courses:["economics","business","mathematics","data-science-ai"],
    description:"Compete in the Target 2.0 student investment challenge — managing a virtual portfolio and pitching investment decisions to judges.",
    why_it_helps:"Investment competition experience demonstrates quantitative analysis, economic reasoning and decision-making under uncertainty — valued in Economics and Finance applications.",
    skills:["Investment analysis","Economic reasoning","Quantitative modelling"],
    mode:"online", region:"UK", weekly_commitment:"Competition period", min_age:16, town:"Anywhere",
    apply_url:"https://www.target2point0.co.uk/",
    achievements:["Portfolio outperformed FTSE 100 benchmark by 8%","Presented investment thesis to panel of fund managers"],
    reflection_prompts:["What did managing a portfolio teach you about the gap between theory and practice?"],
    example_sentence:"Competing in the investment challenge taught me that economic forecasting is about probabilities, not predictions.",
    is_active:true, last_checked:today
  },

  // ── International Competitions ────────────────────────────────────
  {
    id:"o106", organisation_name:"International Linguistics Olympiad", role:"Linguistics Olympiad (UK Team Selection)",
    courses:["english-literature","philosophy","computer-science","mathematics","linguistics"],
    description:"Compete in the UK Linguistics Olympiad — solving problems in unfamiliar languages and linguistic systems to win a place on the UK team for the International Linguistics Olympiad.",
    why_it_helps:"Linguistics Olympiad success demonstrates analytical reasoning, pattern recognition and problem-solving that's distinctive for both humanities and STEM applications.",
    skills:["Linguistic analysis","Pattern recognition","Logical reasoning"],
    mode:"online", region:"UK", weekly_commitment:"Competition-based", min_age:13, town:"Anywhere",
    apply_url:"https://www.uklo.org/",
    achievements:["Qualified for UK team for International Linguistics Olympiad","Gold medal in UK Linguistics Olympiad"],
    reflection_prompts:["What did solving linguistic puzzles teach you about how language works as a system?"],
    example_sentence:"Competing in the Linguistics Olympiad showed me that language is a mathematical structure as much as a cultural one.",
    is_active:true, last_checked:today
  },
  {
    id:"o107", organisation_name:"Model United Nations", role:"International Model UN Conferences",
    courses:["politics","law","history","economics","international-relations"],
    description:"Represent countries in Model United Nations conferences — debating global policy, drafting resolutions and negotiating with delegates from around the world.",
    why_it_helps:"Model UN demonstrates international awareness, negotiation skills and political engagement — strong for Politics, Law and IR applications.",
    skills:["International relations","Negotiation","Public speaking"],
    mode:"in-person", region:"UK", weekly_commitment:"Conference-based", min_age:14, town:"London",
    apply_url:"https://www.mun.org.uk/",
    achievements:["Best delegate award at London Model UN","Co-authored resolution adopted by committee"],
    reflection_prompts:["What did negotiating as a country reveal about the gap between national interest and global cooperation?"],
    example_sentence:"Competing at Model UN taught me that international politics is a negotiation between competing interests, not a search for objective justice.",
    is_active:true, last_checked:today
  },
];

competitions.forEach(c => data.push(c));
fs.writeFileSync(DATA, JSON.stringify(data, null, 2));

const counts = {};
data.forEach(o => o.courses.forEach(c => counts[c] = (counts[c]||0)+1));
console.log("Total opportunities:", data.length);
console.log("Competitions added:", competitions.length);

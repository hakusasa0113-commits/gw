const fs = require("fs"), path = require("path");
const DATA = path.join(__dirname,"../data/sample-opportunities.json");
const data = JSON.parse(fs.readFileSync(DATA,"utf8"));
const today = new Date().toISOString().split("T")[0];

function v(id,org,role,courses,desc,why,skills,mode,region,wc,age,town,url,ach,ref,ex,type){
  return {id,organisation_name:org,role,courses,description:desc,why_it_helps:why,
    skills,mode,region,weekly_commitment:wc,min_age:age,town,apply_url:url,
    achievements:ach,reflection_prompts:ref,example_sentence:ex,
    is_active:true,last_checked:today,type:type||"volunteering"};
}

const ops = [
  // CREATIVE WRITING
  v("cw1","Penguin Random House","WriteNow Mentee Programme",["creative-writing","english-literature"],
    "Apply to PRH WriteNow — a free mentoring programme pairing underrepresented writers with industry editors and agents.",
    "WriteNow is the most prestigious pathway into UK publishing and is specifically referenced by creative writing tutors.",
    ["Manuscript development","Editorial feedback","Publishing industry knowledge"],
    "online","UK","Programme year",18,"London","https://www.penguinrandomhouse.co.uk/writing/writenow/",
    ["Received direct manuscript feedback from a PRH editor"],
    ["What did editorial feedback reveal about assumptions you made for the reader?"],
    "Receiving manuscript notes from a PRH editor showed me that every word choice is also a choice about the reader.","competition"),

  v("cw2","National Flash Fiction Day","Flash Fiction Competition",["creative-writing","english-literature"],
    "Enter the annual National Flash Fiction Day competition — one of the UK's leading short-form writing contests.",
    "Competition recognition in a national literary contest is concrete, citable evidence for creative writing applications.",
    ["Flash fiction","Economy of language","Narrative compression"],
    "online","UK","Project-based",14,"Anywhere","https://nationalflashfictionday.co.uk/competitions/",
    ["Longlisted in the National Flash Fiction Day competition"],
    ["What did the word limit force you to cut, and what did that teach you about your prose?"],
    "Entering flash fiction competitions showed me that every word must earn its place.","competition"),

  v("cw3","Spread the Word","Life Writing Prize",["creative-writing","english-literature","journalism"],
    "Enter the Spread the Word Life Writing Prize — celebrating creative non-fiction and memoir from underrepresented voices.",
    "Life writing competition recognition signals both craft and the personal voice that creative writing programmes develop.",
    ["Creative non-fiction","Memoir writing","Voice and perspective"],
    "online","UK","Project-based",16,"London","https://www.spreadtheword.org.uk/programmes-overview/life-writing-prize/",
    ["Shortlisted in the Spread the Word Life Writing Prize"],
    ["What truth did writing from your own life reveal that fiction couldn't?"],
    "Being shortlisted for a life writing prize showed me that memoir is not confession — it's argument made personal.","competition"),

  v("cw4","Commonword","Community Writing Workshop Facilitator",["creative-writing","education","english-literature"],
    "Support Commonword's community creative writing workshops for adults in Manchester — co-facilitating sessions and helping participants develop their work.",
    "Facilitating creative writing for real audiences deepens craft understanding and shows the teaching dimension creative writing degrees value.",
    ["Workshop facilitation","Creative feedback","Group dynamics"],
    "in-person","UK","2 hrs/week",17,"Manchester","https://www.cultureword.org.uk/get-involved/",
    ["Helped a participant develop a short story from first draft to final version"],
    ["What feedback approach opened up someone's writing rather than shutting it down?"],
    "Facilitating community writing workshops taught me that the best creative feedback asks questions rather than offering answers.","volunteering"),

  // CHEMICAL ENGINEERING
  v("che1","IChemE","Schools Chemical Engineering Challenge",["chemical-engineering","chemistry","engineering"],
    "Compete in the IChemE Schools Challenge — designing a process solution to a real industrial brief.",
    "IChemE competition is specifically recognised by chemical engineering departments as evidence of process thinking beyond A-level.",
    ["Process design","Chemical calculations","Team problem-solving"],
    "in-person","UK","Competition-based",16,"Anywhere","https://www.icheme.org/education/whychemeng/schools-challenge/",
    ["Team reached national IChemE Schools Challenge final"],
    ["What design constraint forced you to abandon your first solution?"],
    "Competing in the IChemE challenge showed me that process design is always a negotiation between chemistry and economics.","competition"),

  v("che2","Catalyst Science Discovery Centre","STEM Volunteer",["chemical-engineering","chemistry","engineering"],
    "Volunteer at Catalyst — the only museum dedicated to the chemical and process industries — delivering demonstrations and guiding visitors.",
    "Engagement with the chemical industry's public face demonstrates the professional awareness chemical engineering courses want.",
    ["Chemical process communication","Museum education","Industrial chemistry knowledge"],
    "in-person","UK","Half-day/week",16,"Widnes","https://www.catalyst.org.uk/get-involved/volunteering/",
    ["Delivered chemical process demonstrations to 200+ school visitors"],
    ["What aspect of the chemical industry surprised visitors most?"],
    "Volunteering at Catalyst showed me that the chemical industry underpins almost everything people take for granted.","volunteering"),

  v("che3","RSC UK Chemistry Olympiad","Chemistry Olympiad Advanced Round",["chemical-engineering","chemistry","medicine"],
    "Work through the UK Chemistry Olympiad advanced rounds, focusing on physical chemistry and industrial process problems.",
    "Advanced olympiad engagement is strong evidence of the mathematical and chemical depth chemical engineering requires.",
    ["Advanced stoichiometry","Thermodynamics","Industrial process chemistry"],
    "online","UK","Self-paced",16,"Anywhere","https://edu.rsc.org/enrichment/uk-chemistry-olympiad",
    ["Completed all three UK ChemOlympiad rounds","Scored in top 20% nationally"],
    ["Which problem required you to apply chemistry from a context you'd never studied?"],
    "Working through olympiad problems taught me that chemistry at university is about reasoning, not recall.","competition"),

  v("che4","IChemE","Young Researcher Showcase",["chemical-engineering","chemistry","biology-life-sciences"],
    "Enter the IChemE Young Researchers Showcase — presenting a project related to chemical, biochemical or process engineering.",
    "Presenting research to a professional engineering audience signals the academic confidence chemical engineering admissions want.",
    ["Research presentation","Technical communication","Process engineering awareness"],
    "hybrid","UK","Project-based",16,"Anywhere","https://www.icheme.org/education/awards/",
    ["Presented research to a panel of IChemE Fellows"],
    ["What question from a professional engineer revealed a gap in your methodology?"],
    "Presenting to IChemE Fellows showed me that chemical engineering is as much about justifying your process as running it.","competition"),

  // LINGUISTICS
  v("li1","UK Linguistics Olympiad","UKLO Competition",["linguistics","mathematics","computer-science","english-literature"],
    "Compete in the UK Linguistics Olympiad — solving language puzzles requiring only analytical reasoning, no prior linguistics knowledge.",
    "UKLO is the primary route to the International Linguistics Olympiad and is recognised by every UK linguistics department.",
    ["Language pattern analysis","Morphological reasoning","Cross-language comparison"],
    "online","UK","Competition-based",14,"Anywhere","https://www.uklo.org/",
    ["Qualified for UKLO Round 2","Gold medal at UKLO Round 1"],
    ["What language feature in the puzzle contradicted what you expected from English?"],
    "Competing in the UKLO showed me that language is a system, and systems can be decoded.","competition"),

  v("li2","Translators Without Borders","Volunteer Translator",["linguistics","english-literature","international-relations"],
    "Volunteer as a translator or proofreader for TWB, helping translate humanitarian content into underserved languages.",
    "Applied translation work for a global NGO demonstrates real linguistic precision and cross-cultural communication skills.",
    ["Translation accuracy","Cross-cultural meaning","Proofreading"],
    "online","UK","3 hrs/week",18,"Anywhere","https://translatorswithoutborders.org/get-involved/volunteer/",
    ["Translated three public health documents for a humanitarian campaign"],
    ["Where did a direct translation fail, and how did you solve it?"],
    "Translating health documents for TWB showed me that language is never just words — it's the culture those words carry.","volunteering"),

  v("li3","Plain English Campaign","Volunteer Drafter",["linguistics","journalism","law","english-literature"],
    "Help the Plain English Campaign simplify real documents — government forms, healthcare leaflets and legal notices.",
    "Linguistic simplification work demonstrates applied understanding of grammar, register and audience that linguistics courses develop.",
    ["Register analysis","Plain language drafting","Readability assessment"],
    "online","UK","2-3 hrs/week",17,"Anywhere","https://www.plainenglish.co.uk/our-work/volunteer.html",
    ["Simplified three NHS patient information leaflets","Reduced average sentence length by 40%"],
    ["What grammatical structure was hardest to simplify without losing meaning?"],
    "Simplifying NHS documents taught me that clarity is a form of respect for the reader.","volunteering"),

  v("li4","Language Gym","Community Language Tutor",["linguistics","education","english-literature"],
    "Tutor community members in English as a foreign language, applying linguistic knowledge to help real learners.",
    "Teaching language to non-native speakers requires you to make implicit grammatical rules explicit — exactly what linguistics trains.",
    ["EFL pedagogy","Grammar metalanguage","Learner error analysis"],
    "online","UK","2 hrs/week",16,"Anywhere","https://www.languagegym.app/",
    ["Tutored three adult learners from A2 to B1 level over six months"],
    ["What grammatical rule did a learner's error reveal that you had never consciously noticed?"],
    "Teaching EFL forced me to articulate grammatical rules I had always used but never examined.","volunteering"),

  // INTERNATIONAL RELATIONS
  v("ir1","Foreign Policy Centre","Research & Comms Volunteer",["international-relations","politics","law"],
    "Support the FPC — a leading London think tank — with research, social media and writing for their foreign policy publications.",
    "Think tank engagement demonstrates the policy-level IR thinking competitive applications require.",
    ["Foreign policy analysis","Think tank writing","Policy communication"],
    "hybrid","UK","3 hrs/week",18,"London","https://fpc.org.uk/get-involved/",
    ["Contributed research to an FPC briefing on UK-EU relations"],
    ["What foreign policy argument did the research complicate that seemed clear-cut before?"],
    "Researching for the Foreign Policy Centre showed me that every foreign policy position has a domestic political logic behind it.","volunteering"),

  v("ir2","UN Association UK","Youth Branch Member",["international-relations","politics","law"],
    "Join a UNA-UK Youth Branch — campaigning on global issues, organising events and engaging with the UN system.",
    "UNA-UK is the direct route into understanding how the UN actually works — essential grounding for IR and international law applications.",
    ["UN systems knowledge","Campaign organisation","International advocacy"],
    "hybrid","UK","3 hrs/week",16,"London","https://una.org.uk/get-involved",
    ["Co-organised a Model UN preparation event for 50 sixth-formers","Led a campaign on SDG implementation"],
    ["Where did the gap between UN ideals and UN reality become most visible to you?"],
    "Working with UNA-UK showed me that international cooperation is built on procedural compromise, not shared values.","volunteering"),

  v("ir3","Wilton Park","Youth Ambassador Programme",["international-relations","politics","economics"],
    "Attend Wilton Park's international policy conferences and contribute to cross-border dialogue on global challenges.",
    "Wilton Park engagement is rare and highly distinctive, signalling genuine international policy ambition for IR applications.",
    ["International dialogue","Multilateral diplomacy","Policy debate"],
    "in-person","UK","Event-based",18,"West Sussex","https://www.wiltonpark.org.uk/get-involved/",
    ["Attended a Wilton Park conference on climate diplomacy","Contributed a position paper to conference conclusions"],
    ["What did direct dialogue with foreign delegates reveal about the limits of multilateral diplomacy?"],
    "Attending a Wilton Park conference showed me that international agreements are built in corridor conversations, not formal sessions.","volunteering"),

  v("ir4","National Model United Nations","NMUN New York Delegate",["international-relations","law","politics","economics"],
    "Represent a country at the National Model United Nations conference in New York — debating global policy and drafting resolutions.",
    "NMUN New York is the world's largest MUN conference and is directly cited by IR admissions tutors as exceptional evidence.",
    ["UN diplomacy","Resolution drafting","International negotiation"],
    "in-person","US","Conference week",16,"New York","https://www.nmun.org/conferences/new-york.html",
    ["Best delegate award at NMUN New York","Co-authored a resolution adopted by committee"],
    ["What position did you have to defend that you personally disagreed with, and how did it change your thinking?"],
    "Representing a country at NMUN New York showed me that diplomacy is not about being right — it's about building a coalition.","competition"),

  // ARCHITECTURE
  v("ar1","RIBA","Student Design Competition",["architecture","art-design","engineering"],
    "Enter the RIBA Student Design Competition — designing a building or space in response to a brief set by the Royal Institute of British Architects.",
    "RIBA competition participation is the gold standard of pre-university architecture engagement and universally recognised at interview.",
    ["Architectural design","Technical drawing","Brief interpretation"],
    "online","UK","Project-based",16,"Anywhere","https://www.architecture.com/education-cpd-and-careers/competitions",
    ["Commended in RIBA student competition","Design featured in RIBA student showcase"],
    ["What constraint in the brief forced you to abandon your initial design concept?"],
    "Entering a RIBA competition taught me that architecture is always a response to constraints, not an expression of freedom.","competition"),

  v("ar2","Open City","Open House Festival Volunteer",["architecture","history","art-design"],
    "Volunteer at the Open House Festival — guiding public tours of London's most significant buildings.",
    "Open House volunteering demonstrates subject passion and communication skill in a nationally recognised architectural context.",
    ["Architectural history","Public speaking","Building analysis"],
    "in-person","UK","Festival weekend",16,"London","https://openhouselondon.open-city.org.uk/get-involved",
    ["Guided 15 public tours of a Grade II listed building","Researched and wrote a new tour script"],
    ["What detail of a building's design only became visible when you started explaining it to others?"],
    "Guiding architectural tours showed me that you don't really understand a building until you have to describe it to someone who's never noticed it.","volunteering"),

  v("ar3","Architecture Foundation","Young Architects Programme",["architecture","art-design","product-design"],
    "Join the Architecture Foundation's Young Architects programme — attending studio critiques, site visits and design workshops.",
    "Sustained engagement with a major architecture institution is among the most valued pre-university experiences for RIBA-accredited courses.",
    ["Design critique","Site analysis","Spatial thinking"],
    "in-person","UK","Weekly sessions",16,"London","https://www.architecturefoundation.org.uk/",
    ["Attended 12 studio critique sessions","Produced a design proposal reviewed by a practising architect"],
    ["What did a professional architect's critique reveal about your design assumptions?"],
    "Attending studio critiques at the Architecture Foundation showed me that architecture is a conversation between the designer and the city.","volunteering"),

  // SPACE SCIENCE
  v("sp1","Royal Observatory Greenwich","Astronomy Photographer of the Year",["space-science","physics","art-design"],
    "Enter the Royal Observatory Greenwich Astronomy Photographer of the Year — the world's most prestigious astrophotography competition.",
    "APOTY recognition demonstrates scientific engagement with astronomy and a distinctive creative application of the subject.",
    ["Astrophotography","Image processing","Observational astronomy"],
    "online","UK","Annual competition",12,"Anywhere","https://www.rmg.co.uk/whats-on/astronomy-photographer-year",
    ["Shortlisted in the Young Astronomy Photographer category"],
    ["What technical challenge in capturing your image deepened your understanding of the physics involved?"],
    "Being shortlisted in APOTY showed me that astronomy is a discipline of patience — the sky doesn't perform on demand.","competition"),

  v("sp2","NASA","International Space Apps Challenge",["space-science","computer-science","data-science-ai","engineering"],
    "Compete in NASA's annual International Space Apps Challenge — building software or data tools to solve real space agency problems.",
    "Space Apps is NASA's own hackathon; participation is cited by space science and engineering programmes as applied technical evidence.",
    ["Space data analysis","Software development","Mission problem-solving"],
    "online","US","48-hour hackathon",14,"Anywhere","https://www.spaceappschallenge.org/",
    ["Team won local Space Apps award","Solution submitted for global NASA judging"],
    ["What space dataset revealed a pattern you hadn't expected when you started building?"],
    "Competing in Space Apps showed me that the most interesting science questions arise from data you didn't know existed.","competition"),

  v("sp3","Astrobiology Society of Britain","Public Lecture Volunteer",["space-science","biology-life-sciences","chemistry"],
    "Support ASB's public outreach events — helping run lectures and panel discussions on astrobiology and the search for extraterrestrial life.",
    "Astrobiology outreach demonstrates cross-disciplinary engagement at the chemistry-biology-space science boundary.",
    ["Astrobiology communication","Cross-disciplinary science","Public engagement"],
    "hybrid","UK","Monthly events",16,"London","https://www.astrobiologysociety.org/",
    ["Helped organise a public lecture attended by 120 people","Moderated a post-lecture audience Q&A"],
    ["What question from the public most revealed the gap between scientific uncertainty and popular expectation?"],
    "Supporting ASB lectures showed me that astrobiology is where chemistry, biology and physics meet the biggest question of all.","volunteering"),

  // SPORTS SCIENCE
  v("ss1","BASES","UK Sports Science Olympiad",["sports-science","biology-life-sciences","medicine"],
    "Compete in the British Association of Sport and Exercise Sciences student competition — answering questions on physiology, biomechanics, nutrition and sports psychology.",
    "A dedicated sports science competition directly demonstrates the academic depth programmes expect at degree level.",
    ["Exercise physiology","Biomechanics","Sports nutrition science"],
    "online","UK","Competition-based",15,"Anywhere","https://www.bases.org.uk/",
    ["Placed in top 10% nationally"],
    ["Which physiology concept did the competition require you to understand at a level your school hadn't covered?"],
    "The sports science competition showed me how much physiology underpins performance that coaches explain in purely intuitive terms.","competition"),

  v("ss2","English Institute of Sport","Performance Insight Volunteer",["sports-science","data-science-ai","mathematics"],
    "Assist EIS performance analysts with data collection, wearable tracking and statistical analysis supporting elite athletes.",
    "Hands-on exposure to performance data at the national sports institute is exceptional evidence for sports science applications.",
    ["Performance data analysis","Wearable technology","Statistical interpretation"],
    "in-person","UK","2 days/month",17,"Sheffield","https://www.eis2win.co.uk/",
    ["Assisted with GPS tracking data collection across a training cycle","Contributed to a performance report used by coaching staff"],
    ["What did the data reveal about training load that the coaches' gut instinct had missed?"],
    "Assisting EIS analysts showed me that performance sports science is about making the invisible visible to coaches.","volunteering"),

  v("ss3","SportsAid","Athlete Welfare Programme Volunteer",["sports-science","physiotherapy","psychology"],
    "Support SportsAid's welfare programme for talented young athletes — assisting at training weekends and mental health workshops.",
    "Combining sports performance with athlete welfare gives distinctive evidence bridging sports science and psychology.",
    ["Athlete welfare","Mental health in sport","Performance support"],
    "in-person","UK","Event-based",17,"London","https://www.sportsaid.org.uk/get-involved/",
    ["Supported mental health workshops for 20 elite junior athletes"],
    ["What did athletes' relationship to performance anxiety reveal about the limits of physical training alone?"],
    "Supporting SportsAid's welfare programme showed me that elite sport is as much a psychological discipline as a physical one.","volunteering"),

  // FILM & MEDIA STUDIES
  v("fm1","BFI","Film Academy Young Programmer",["film-media-studies","english-literature","journalism"],
    "Join the BFI Film Academy Young Programmers strand, curating films for BFI public events and writing programme notes.",
    "BFI Film Academy is the UK's premier youth film education institution — participation is cited by every film studies department.",
    ["Film curation","Critical writing","Programme note writing"],
    "in-person","UK","Seasonal programme",16,"London","https://www.bfi.org.uk/get-funding-support/bfi-film-academy",
    ["Curated a short film programme shown at BFI Southbank","Programme note published in BFI print materials"],
    ["What curatorial argument did your selection of films make, even if you hadn't consciously intended it?"],
    "Curating a BFI programme showed me that every screening is an argument about what cinema is for.","volunteering"),

  v("fm2","Raindance Film Festival","Festival Volunteer",["film-media-studies","journalism","english-literature"],
    "Volunteer at Raindance — the UK's largest independent film festival — working across screenings, Q&As and filmmaker liaison.",
    "Raindance volunteer experience puts you inside independent film culture with specific insider knowledge to discuss at interview.",
    ["Independent film industry","Press liaison","Festival logistics"],
    "in-person","UK","Festival week",16,"London","https://www.raindance.org/volunteer/",
    ["Worked as filmmaker liaison across 5 days of the festival","Attended 20+ industry Q&As as session host assistant"],
    ["What did a filmmaker's Q&A reveal about a creative decision you had misread watching the film?"],
    "Volunteering at Raindance showed me that independent cinema is kept alive by passion, not infrastructure.","volunteering"),

  v("fm3","ScreenSkills","Screen Industry Work Placement",["film-media-studies","computer-science","data-science-ai"],
    "Apply for a ScreenSkills-funded work placement in a UK production company, broadcaster or post-production house.",
    "A ScreenSkills placement is a formally recognised pathway into the UK screen industries and carries weight at any film school.",
    ["Production workflow","Industry terminology","Professional screen culture"],
    "in-person","UK","2-4 week placement",17,"London","https://www.screenskills.com/careers/",
    ["Completed a 2-week placement in a London post-production house","Sat in on an online edit for a TV documentary"],
    ["What aspect of professional production most contradicted what you imagined from watching the finished product?"],
    "My ScreenSkills placement showed me that film and TV production is 90% problem-solving and 10% what ends up on screen.","volunteering"),

  // VETERINARY SCIENCE
  v("vs1","Royal Veterinary College","Open Farm Saturday Volunteer",["veterinary-science","biology-life-sciences","medicine"],
    "Volunteer at RVC's Open Farm Saturday — demonstrating animal handling and explaining vet science careers to the public.",
    "Volunteering at the UK's leading vet school is direct, professional-environment evidence for veterinary applications.",
    ["Animal handling communication","Veterinary career knowledge","Public engagement"],
    "in-person","UK","Event-based",16,"London","https://www.rvc.ac.uk/",
    ["Supported Open Farm Saturday with 300+ visitors","Demonstrated small animal handling techniques to school groups"],
    ["What question from a visitor revealed a misconception about veterinary science you hadn't anticipated?"],
    "Volunteering at RVC showed me that public understanding of vet science is mostly shaped by TV — and the reality is far more rigorous.","volunteering"),

  v("vs2","RSPCA","Animal Rescue Support Volunteer",["veterinary-science","biology-life-sciences","social-work"],
    "Support RSPCA rescue centre operations — assisting with welfare assessments, enrichment programmes and rehoming preparation.",
    "RSPCA rescue centre experience combines animal welfare observation with structured case management — both valued by vet schools.",
    ["Animal welfare assessment","Enrichment design","Rescue centre operations"],
    "in-person","UK","Half-day/week",16,"Birmingham","https://www.rspca.org.uk/getinvolved/volunteer",
    ["Contributed to welfare assessments for 30+ rescue animals","Designed an enrichment programme for kennelled dogs"],
    ["What behavioural indicator revealed welfare status more reliably than physical examination?"],
    "Volunteering at an RSPCA centre taught me that animal welfare is as much about psychology as physiology.","volunteering"),

  v("vs3","British Veterinary Association","Rural Practice Shadowing",["veterinary-science","biology-life-sciences"],
    "Shadow large animal vets on farm visits and emergency call-outs, observing TB testing, lambing and herd health programmes.",
    "Large animal shadowing is harder to access than small animal and carries significant weight in vet school applications.",
    ["Large animal handling","Farm health management","Clinical observation"],
    "in-person","UK","1 day/fortnight",16,"Gloucester","https://www.bva.co.uk/for-students/work-experience/",
    ["Observed TB testing across a 200-cow dairy herd","Assisted with a difficult lambing"],
    ["What herd health problem required weighing the welfare of one animal against the economics of the whole farm?"],
    "Shadowing a farm vet showed me that large animal medicine is always practised at the intersection of welfare and livelihoods.","volunteering"),
];

// Only add entries whose id doesn't already exist
const existingIds = new Set(data.map(o => o.id));
const newOps = ops.filter(o => !existingIds.has(o.id));
newOps.forEach(o => data.push(o));
fs.writeFileSync(DATA, JSON.stringify(data, null, 2));

const counts = {};
data.forEach(o => o.courses.forEach(c => counts[c] = (counts[c]||0)+1));
const thin = Object.entries(counts).filter(([,v]) => v < 5);
console.log("Total opportunities:", data.length);
console.log("New entries added:", newOps.length);
console.log("Still under 5:", thin.length ? thin.map(([k,v]) => v+" "+k).join(", ") : "none ✓");

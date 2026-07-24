const fs = require("fs"), path = require("path");
const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const today = new Date().toISOString().split("T")[0];
const existing = new Set(data.map(o => o.id));

function op(id, org, role, courses, desc, why, skills, mode, region, wc, age, town, url, ach, ref, ex, type) {
  if (existing.has(id)) return null;
  return { id, organisation_name: org, role, courses, description: desc, why_it_helps: why,
    skills, mode, region, weekly_commitment: wc, min_age: age, town, apply_url: url,
    achievements: ach, reflection_prompts: ref, example_sentence: ex,
    is_active: true, last_checked: today, type: type || "volunteering" };
}

const raw = [
  // MEDICINE / NURSING / HEALTH
  op("new01","Médecins Sans Frontières UK","MSF Awareness Volunteer",["medicine","nursing","pharmacy"],
    "Support MSF UK's public awareness campaigns — organising events, running stalls and communicating the realities of humanitarian medicine.",
    "MSF engagement demonstrates global health awareness and the ethical commitment medical schools increasingly look for.",
    ["Global health communication","Campaign coordination","Medical ethics awareness"],
    "hybrid","UK","2 hrs/week",17,"London","https://www.msf.org.uk/get-involved/volunteer",
    ["Organised an MSF awareness stall that spoke to 200+ people"],
    ["What aspect of humanitarian medicine most challenged your assumptions about global healthcare?"],
    "Volunteering for MSF showed me that medicine practised without political and ethical awareness is never truly neutral."),

  op("new02","Age UK","Telephone Befriending Volunteer",["nursing","medicine","psychology","social-work"],
    "Make regular friendly calls to isolated elderly people — providing conversation, signposting services and monitoring wellbeing.",
    "Long-term, structured contact with elderly people demonstrates the sustained interpersonal care that nursing applications need.",
    ["Elderly care communication","Safeguarding","Wellbeing monitoring"],
    "online","UK","1-2 hrs/week",18,"Anywhere","https://www.ageuk.org.uk/get-involved/volunteer/",
    ["Maintained weekly calls with three elderly clients over 6 months"],
    ["What did sustained weekly contact reveal about loneliness that a single visit couldn't?"],
    "Regular befriending calls showed me that nursing is as much about consistent presence as clinical intervention."),

  op("new03","Hospice UK","Hospice Volunteer",["medicine","nursing","psychology","social-work"],
    "Volunteer in a local hospice — supporting patients and families through practical help, companionship and administrative assistance.",
    "Hospice experience provides rare, deeply evidential exposure to end-of-life care and multidisciplinary teams.",
    ["Palliative care awareness","Compassionate communication","Multidisciplinary team working"],
    "in-person","UK","Half-day/week",18,"Anywhere","https://www.hospiceuk.org/our-campaigns/volunteering",
    ["Supported 20+ patients and families over a 3-month placement"],
    ["What did the hospice setting reveal about the relationship between medicine and meaning?"],
    "Volunteering in a hospice showed me that the most important thing a clinician can offer is sometimes just their full presence."),

  // PSYCHOLOGY
  op("new04","Mind","Mental Health Support Volunteer",["psychology","social-work","nursing"],
    "Support Mind's local services — running wellbeing groups, helping with drop-in sessions and assisting peer support facilitators.",
    "Frontline mental health support is among the most impactful and evidential experiences for Psychology applications.",
    ["Mental health first aid","Group facilitation","Peer support"],
    "in-person","UK","3 hrs/week",18,"London","https://www.mind.org.uk/get-involved/volunteer-with-us/",
    ["Co-facilitated 8 weekly wellbeing groups","Completed Mind's mental health awareness training"],
    ["What did direct contact with mental health service users change about your academic understanding of psychological distress?"],
    "Volunteering at Mind showed me that psychological theory only makes sense once you've seen it in a real person's face."),

  op("new05","Place2Be","School Wellbeing Ambassador",["psychology","education","social-work"],
    "Support Place2Be's school mental health programmes — assisting with wellbeing activities, training events and awareness campaigns.",
    "Child and adolescent mental health experience is highly distinctive for Psychology applications.",
    ["Child mental health awareness","School wellbeing","Prevention programmes"],
    "in-person","UK","2 hrs/week",17,"London","https://www.place2be.org.uk/get-involved/volunteer/",
    ["Supported wellbeing workshops in 3 primary schools","Helped run a teacher mental health training event"],
    ["What did working with children's mental health reveal about the importance of early intervention?"],
    "Volunteering with Place2Be showed me that mental health support in schools changes trajectories, not just moods."),

  // LAW
  op("new06","Law Centres Network","Trainee Legal Clinic Volunteer",["law","social-work","politics"],
    "Assist lawyers at a Law Centre providing free legal advice to people who cannot afford representation on housing, employment and welfare issues.",
    "Law Centre experience provides the most direct, authentic legal practice evidence available to pre-university students.",
    ["Legal advice support","Case file preparation","Access to justice"],
    "in-person","UK","Half-day/week",18,"London","https://www.lawcentres.org.uk/",
    ["Assisted with 30+ client intakes over a 3-month placement"],
    ["What case most clearly illustrated the gap between legal rights and legal access?"],
    "Working at a Law Centre showed me that the rule of law is only meaningful if everyone can reach it."),

  op("new07","Innocence Project UK","Wrongful Conviction Research Volunteer",["law","criminology","psychology"],
    "Research cases of potential wrongful conviction — reviewing transcripts, identifying legal issues and supporting caseworkers.",
    "Innocence Project work is exceptional, specific evidence of legal reasoning and justice awareness for competitive Law applications.",
    ["Legal research","Case analysis","Miscarriage of justice awareness"],
    "hybrid","UK","3-4 hrs/week",18,"London","https://innocenceproject.org/get-involved/",
    ["Contributed research to an active wrongful conviction case review"],
    ["What evidential issue did the case file reveal that the original trial had not adequately addressed?"],
    "Researching wrongful conviction cases showed me that justice depends entirely on the quality of the questions lawyers are willing to ask."),

  // COMPUTER SCIENCE / DATA SCIENCE
  op("new08","Codebar","Codebar Workshop Coach",["computer-science","data-science-ai","mathematics"],
    "Coach at Codebar — free programming workshops for underrepresented groups — helping beginners learn HTML, CSS, Python and JavaScript.",
    "Teaching coding to diverse beginners demonstrates technical depth and the inclusive communication skills CS courses value.",
    ["Coaching","Debugging","Inclusive pedagogy"],
    "in-person","UK","Weekly session",16,"London","https://codebar.io/become-a-coach",
    ["Coached 50+ students across 20 weekly workshops"],
    ["What explanation finally made a concept click for a student who had been struggling, and what did that teach you?"],
    "Coaching at Codebar showed me that the clearest sign of understanding a concept is being able to explain it five different ways."),

  op("new09","Open Data Institute","ODI Open Data Volunteer",["data-science-ai","computer-science","economics","politics"],
    "Support the ODI's public education and advocacy work — helping produce open data explainers, event support and research summaries.",
    "ODI engagement demonstrates exactly the data-policy intersection that distinguishes strong Data Science applications.",
    ["Open data literacy","Data ethics","Policy communication"],
    "hybrid","UK","3 hrs/week",17,"London","https://theodi.org/about-the-odi/join-us/",
    ["Contributed to an ODI open data literacy guide used in 5 schools"],
    ["What open dataset revealed a policy issue that the government had not publicly acknowledged?"],
    "Working with the ODI showed me that data is only as valuable as the questions it enables people to ask."),

  // ECONOMICS / BUSINESS / FINANCE
  op("new10","Financial Times School","FT School Ambassador",["economics","business","finance","journalism"],
    "Become an FT School Ambassador — running media literacy sessions using Financial Times articles and helping students engage with economic news.",
    "FT Ambassador status demonstrates economic literacy, communication skill and the analytical approach economics tutors want.",
    ["Economic journalism analysis","Media literacy","Current affairs teaching"],
    "in-person","UK","2 hrs/week",17,"Anywhere","https://schools.ft.com/",
    ["Ran 6 FT media literacy sessions reaching 120 students"],
    ["What economic story in the FT challenged a widely held assumption among your students?"],
    "Running FT media literacy sessions showed me that economic understanding is inseparable from the ability to read evidence critically."),

  op("new11","St Mungo's","Fundraising & Comms Volunteer",["business","marketing","social-work","economics"],
    "Support St Mungo's fundraising and communications team — producing content, organising challenge events and stewarding donors.",
    "Charity communications and fundraising experience develops the commercial and audience awareness business courses want.",
    ["Fundraising","Stakeholder communication","Charity marketing"],
    "hybrid","UK","3 hrs/week",17,"London","https://www.mungos.org/get-involved/volunteer/",
    ["Helped raise £2,000 at a fundraising event","Wrote donor communications reaching 500 supporters"],
    ["What did fundraising for a homelessness charity reveal about public attitudes to social issues?"],
    "Fundraising for St Mungo's showed me that commercial skills deployed for social good require exactly the same rigour as in business."),

  // HISTORY
  op("new12","Imperial War Museum","Learning Volunteer",["history","politics","english-literature"],
    "Support IWM's learning team delivering school sessions, handling objects from the collection and assisting with public events.",
    "Delivering object-based history in a major national institution gives rare, specific evidence for History applications.",
    ["Object-based learning","Historical interpretation","Museum education"],
    "in-person","UK","2 hrs/week",17,"London","https://www.iwm.org.uk/get-involved/volunteer",
    ["Delivered object-handling sessions to 10 school groups","Assisted with a public commemoration event"],
    ["What did handling a physical object from the collection reveal about the past that a document couldn't?"],
    "Volunteering at the IWM showed me that objects carry a kind of historical evidence that words alone never quite capture."),

  op("new13","Historic England","Heritage Volunteer",["history","architecture","art-design","geography"],
    "Support Historic England's community heritage projects — conducting local surveys, assisting with archive work and public engagement.",
    "Heritage fieldwork with the national body responsible for England's built heritage is compelling evidence for History and Architecture applications.",
    ["Heritage survey methods","Archive research","Built environment analysis"],
    "in-person","UK","2 hrs/fortnight",16,"Anywhere","https://historicengland.org.uk/get-involved/volunteer/",
    ["Contributed to a local heritage survey that identified two previously unrecorded structures"],
    ["What did fieldwork reveal about the built environment of your area that records hadn't captured?"],
    "Volunteering with Historic England taught me that heritage is never just the past — it's the present we haven't yet documented."),

  // ENGLISH LITERATURE / JOURNALISM
  op("new14","First Story","Writing Mentor",["english-literature","creative-writing","education"],
    "Work alongside professional authors as a writing mentor in a secondary school — supporting students to write and publish their own books.",
    "First Story mentoring is specifically recognised by English and Creative Writing departments as evidence of sustained literary engagement.",
    ["Creative writing mentoring","Editorial feedback","Literary facilitation"],
    "in-person","UK","Weekly session",17,"London","https://www.firststory.org.uk/get-involved/",
    ["Helped a group of 12 students write, edit and publish a short story anthology"],
    ["What did mentoring young writers reveal about your own relationship to language?"],
    "Mentoring student writers with First Story showed me that good writing is taught through conversation, not correction."),

  op("new15","Press Gazette","Student Journalism Award Entry",["journalism","english-literature","politics"],
    "Enter the Student Journalism Awards — the UK's most prestigious competition for student reporters, covering news, features and digital.",
    "Press Gazette recognition is directly cited by journalism schools as the clearest pre-university evidence of reporting ability.",
    ["News reporting","Feature writing","Editorial judgment"],
    "online","UK","Project-based",16,"Anywhere","https://www.pressgazette.co.uk/",
    ["Shortlisted in Press Gazette Student Journalism Awards","Article published in regional newspaper"],
    ["What editorial decision did you make that improved the story but felt risky at the time?"],
    "Being shortlisted by Press Gazette showed me that good journalism is always about making difficult decisions under pressure.","competition"),

  // MATHEMATICS / PHYSICS
  op("new16","Maths Inspiration","Student Lecture Volunteer",["mathematics","physics","engineering"],
    "Help organise and host Maths Inspiration student lectures — events where leading mathematicians present applied maths to sixth-formers.",
    "Engagement with public mathematics communication shows the kind of subject enthusiasm that differentiates strong applications.",
    ["Mathematical communication","Event hosting","Audience engagement"],
    "in-person","UK","Event-based",16,"Anywhere","https://www.mathsinspiration.com/",
    ["Hosted a Maths Inspiration lecture attended by 400 students","Introduced a speaker to a live audience"],
    ["What application of mathematics surprised the audience most, and why hadn't they encountered it before?"],
    "Hosting Maths Inspiration lectures showed me that mathematics is everywhere — most people just haven't been shown where to look."),

  op("new17","Institute of Physics","Physics in Schools Ambassador",["physics","mathematics","space-science","engineering"],
    "Deliver IOP-supported physics demonstrations and talks in local schools, representing the institute as a physics ambassador.",
    "IOP Ambassador status is directly recognisable to physics admissions tutors as evidence of subject depth and outreach commitment.",
    ["Physics demonstrations","Science communication","Curriculum engagement"],
    "in-person","UK","2 hrs/fortnight",17,"Anywhere","https://www.iop.org/about/get-involved/volunteering",
    ["Delivered physics workshops to 6 schools reaching 180 students"],
    ["What question from a student made you realise your own understanding had a gap?"],
    "Being an IOP ambassador showed me that teaching physics forces you to understand it at a level you never reach just studying it."),

  // ENVIRONMENTAL SCIENCE / GEOGRAPHY
  op("new18","Greenpeace UK","Youth Campaigner",["environmental-science","politics","geography"],
    "Join a Greenpeace local group — organising public actions, producing campaign content and engaging the community on environmental issues.",
    "Greenpeace campaign experience demonstrates political environmental engagement and the organisational skills admissions tutors value.",
    ["Environmental campaigning","Community mobilisation","Direct action planning"],
    "in-person","UK","3 hrs/week",16,"Anywhere","https://www.greenpeace.org.uk/get-involved/volunteer/",
    ["Organised a climate action event attended by 80 people","Produced campaign content that reached 2,000 social media followers"],
    ["What did running an environmental campaign teach you about the difference between awareness and action?"],
    "Organising a Greenpeace campaign showed me that environmental change requires political skill as much as scientific knowledge."),

  op("new19","Field Studies Council","Residential Field Course Assistant",["environmental-science","geography","biology-life-sciences"],
    "Assist FSC tutors running residential environmental field courses for school groups — supporting data collection, lab sessions and site management.",
    "Working as a field course assistant at the UK's leading environmental education provider is rare, high-quality fieldwork evidence.",
    ["Field ecology","Environmental data collection","Educational facilitation"],
    "in-person","UK","Residential placements",17,"Anywhere","https://www.field-studies-council.org/get-involved/",
    ["Assisted on 3 residential field courses totalling 180 school students","Contributed species data used in FSC research"],
    ["What did supporting a field course reveal about the gap between classroom ecology and field ecology?"],
    "Assisting FSC field courses showed me that environmental science happens in the mud, not the textbook."),

  // SOCIAL WORK / SOCIOLOGY
  op("new20","Barnardo's","Children's Services Volunteer",["social-work","psychology","education"],
    "Support Barnardo's children's services — helping with activity groups, mentoring programmes and family support sessions.",
    "Barnardo's experience with vulnerable children is among the most valued and direct evidence for Social Work and Education applications.",
    ["Child safeguarding","Youth mentoring","Trauma-informed communication"],
    "in-person","UK","3 hrs/week",18,"Anywhere","https://www.barnardos.org.uk/get-involved/volunteer",
    ["Supported 10 weekly activity sessions for children in care","Completed Barnardo's safeguarding training"],
    ["What interaction with a child challenged your assumptions about resilience and vulnerability?"],
    "Volunteering at Barnardo's showed me that effective social work starts with actually listening to children, not presuming to know what they need."),

  op("new21","Joseph Rowntree Foundation","Poverty Research Volunteer",["sociology","social-work","economics","politics"],
    "Assist JRF researchers with data coding, report production and community engagement for projects examining poverty and inequality in the UK.",
    "Social research experience at the UK's leading poverty charity is compelling, specific evidence for Sociology applications.",
    ["Qualitative data coding","Social research methods","Poverty analysis"],
    "hybrid","UK","3 hrs/week",18,"York","https://www.jrf.org.uk/work-with-us",
    ["Contributed coding to a published JRF poverty report"],
    ["What finding in the data challenged something you thought you already understood about poverty?"],
    "Coding qualitative data for JRF showed me that poverty statistics are built from individual stories, not the other way around."),

  // ENGINEERING / PRODUCT DESIGN
  op("new22","Engineers Without Borders UK","University Challenge Entry",["engineering","civil-engineering","product-design","mathematics"],
    "Enter the EWB-UK Engineering for People Design Challenge — designing an infrastructure solution for a real community in a low-income country.",
    "EWB is recognised by every UK engineering department as the gold standard pre-university humanitarian design competition.",
    ["Humanitarian engineering design","Sustainability analysis","Community-centred problem solving"],
    "online","UK","Project-based",16,"Anywhere","https://www.ewb-uk.org/get-involved/universities/",
    ["Team reached the EWB-UK national finals","Design presented to a panel of practising engineers"],
    ["What cultural or material constraint made your initial engineering solution completely unworkable?"],
    "Entering the EWB challenge showed me that engineering for people in different contexts requires you to question every assumption you hold.","competition"),

  op("new23","Smallpeice Trust","Engineering Residential Course",["engineering","physics","mathematics","computer-science"],
    "Attend a Smallpeice Trust engineering residential course — intensive problem-solving, industry visits and team engineering challenges.",
    "Smallpeice courses are specifically referenced by engineering departments and give direct academic and practical experience.",
    ["Engineering problem-solving","Teamwork under pressure","Industry awareness"],
    "in-person","UK","Residential (4-5 days)",14,"Anywhere","https://www.smallpeicetrust.org.uk/",
    ["Completed a Smallpeice aerospace engineering residential","Team project awarded best design by industry judges"],
    ["What engineering trade-off during the residential challenge was hardest to resolve and why?"],
    "Attending a Smallpeice residential showed me that engineering is always a negotiation between what's technically possible and what's practically deliverable.","competition"),

  // MUSIC / THEATRE / ART
  op("new24","LSO Discovery","Young Music Volunteer",["music","education"],
    "Support LSO Discovery's community music education work — helping at workshops, concerts and music creation sessions for young people.",
    "Working with the London Symphony Orchestra's education arm is rare, high-prestige evidence for Music applications.",
    ["Orchestral music knowledge","Music education support","Youth engagement"],
    "in-person","UK","2 hrs/week",16,"London","https://lso.co.uk/lso-discovery/get-involved.html",
    ["Supported 6 LSO Discovery community workshops","Assisted at a concert for 300 school children"],
    ["What did an LSO musician say about their practice that changed how you think about musical performance?"],
    "Volunteering at LSO Discovery showed me that world-class performance is built on the same fundamentals as any beginner's first lesson."),

  op("new25","Young Vic Theatre","Taking Part Volunteer",["theatre-performance","education","english-literature"],
    "Support Young Vic's Taking Part community and education programme — helping with workshops, rehearsals and public participation events.",
    "Young Vic is one of the world's leading producing theatres — involvement in their education work carries significant weight for drama applications.",
    ["Theatre facilitation","Community engagement","Rehearsal support"],
    "in-person","UK","2-3 hrs/week",16,"London","https://www.youngvic.org/taking-part",
    ["Supported 8 community drama workshops","Assisted with a large-scale participatory theatre event"],
    ["What did facilitating community theatre reveal about the relationship between performance and participation?"],
    "Working with Young Vic's Taking Part programme showed me that the most powerful theatre breaks the barrier between stage and audience."),

  op("new26","Tate Exchange","Gallery Volunteer Facilitator",["art-design","philosophy","education","sociology"],
    "Facilitate Tate Exchange open studio sessions — helping gallery visitors engage with artworks, artists and creative processes.",
    "Tate Exchange facilitation demonstrates the critical and interpretive engagement with contemporary art that Art & Design tutors look for.",
    ["Art facilitation","Critical dialogue","Audience engagement"],
    "in-person","UK","2 hrs/week",16,"London","https://www.tate.org.uk/about-us/working-at-tate/volunteer-internships",
    ["Facilitated 15 open studio sessions for diverse public audiences","Led a post-exhibition discussion with 20 visitors"],
    ["What question from a visitor opened up an interpretation of a work you hadn't considered?"],
    "Facilitating at Tate Exchange showed me that contemporary art only fully exists in the dialogue it generates."),

  // INTERNATIONAL / GLOBAL
  op("new27","VSO","Youth Advocate Volunteer",["international-relations","social-work","politics","economics"],
    "Support VSO's UK advocacy work — communicating the case for international development and volunteering to policymakers, media and the public.",
    "VSO is the UK's largest international development volunteer organisation — advocacy experience here is directly relevant to IR applications.",
    ["International development advocacy","Policy communication","Global justice awareness"],
    "hybrid","UK","2-3 hrs/week",17,"London","https://www.vsointernational.org/volunteer/",
    ["Presented VSO's development work to a parliamentary intern briefing","Produced advocacy content reaching 1,500 followers"],
    ["What aspect of international development did your advocacy reveal that public discourse consistently misrepresents?"],
    "Advocating for VSO showed me that international development is consistently misunderstood by the people with the power to fund it."),

  op("new28","Refugee Action","Volunteer Casework Support",["social-work","law","international-relations","psychology"],
    "Support Refugee Action caseworkers — helping refugees and asylum seekers navigate legal processes, housing and employment support.",
    "Refugee casework support demonstrates empathic, cross-cultural practice under genuine complexity — exactly what social work schools want.",
    ["Asylum process knowledge","Cross-cultural empathy","Case support"],
    "in-person","UK","Half-day/week",18,"London","https://www.refugee-action.org.uk/get-involved/volunteer/",
    ["Supported 15 refugee clients through housing and employment applications"],
    ["What legal or procedural barrier most repeatedly prevented clients from accessing their rights?"],
    "Supporting Refugee Action caseworkers showed me that legal rights without support workers to navigate them are rights in name only."),

  // SCIENCE
  op("new29","Sense About Science","Voice of Young Science Member",["biology-life-sciences","medicine","chemistry","physics","data-science-ai"],
    "Join Sense About Science's Voice of Young Science network — advocating for evidence-based thinking in media, policy and public life.",
    "VoYS membership demonstrates scientific communication and critical thinking skills that complement any science application.",
    ["Science communication","Evidence literacy","Media engagement"],
    "online","UK","2 hrs/month",18,"Anywhere","https://senseaboutscience.org/voice-of-young-science/",
    ["Contributed to a VoYS open letter on evidence in public policy","Represented VoYS at a parliamentary science engagement event"],
    ["What media or policy claim did you have to challenge, and what evidence did you use?"],
    "Joining VoYS showed me that scientific literacy is not just about understanding science — it's about protecting it in public life."),

  op("new30","Nuffield Research Placements","Student Research Placement",["biology-life-sciences","chemistry","physics","mathematics","data-science-ai","engineering"],
    "Complete a Nuffield Research Placement — 4-6 weeks working on a real research project at a university, company or research institute.",
    "A Nuffield placement is one of the most recognised pre-university science experiences and is cited in applications across every science subject.",
    ["Original research","Laboratory technique","Scientific writing"],
    "in-person","UK","4-6 week placement",16,"Anywhere","https://www.stem.org.uk/nuffield-research-placements",
    ["Completed a 5-week placement at a university biochemistry lab","Contributed to a paper submitted for peer review"],
    ["What aspect of the research process was most different from what you had imagined from studying science at school?"],
    "My Nuffield placement showed me that real science is built on failed experiments and revised hypotheses, not clean results."),
];

const newOps = raw.filter(Boolean);
newOps.forEach(o => data.push(o));
fs.writeFileSync(DATA, JSON.stringify(data, null, 2));

const counts = {};
data.forEach(o => o.courses.forEach(c => counts[c] = (counts[c]||0)+1));
const thin = Object.entries(counts).filter(([,v]) => v < 5).sort((a,b) => a[1]-b[1]);
console.log("Total:", data.length, "| Added:", newOps.length);
if (thin.length) console.log("Still under 5:", thin.map(([k,v]) => v+" "+k).join(", "));
else console.log("All courses have 5+ ✓");

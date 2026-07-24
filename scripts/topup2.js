const fs = require("fs"), path = require("path");
const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const d = JSON.parse(fs.readFileSync(DATA, "utf8"));
const today = new Date().toISOString().split("T")[0];
const existing = new Set(d.map(o => o.id));

const ops = [
  // CRIMINOLOGY
  { id:"cr1", organisation_name:"Youth Justice Board", role:"Youth Justice Volunteer",
    courses:["criminology","law","social-work","psychology"],
    description:"Support youth offending teams — attending restorative justice sessions, mentoring young people and assisting caseworkers.",
    why_it_helps:"Direct work with the youth justice system is the most evidential experience for Criminology applications.",
    skills:["Restorative justice","Youth mentoring","Case support"],
    mode:"in-person", region:"UK", weekly_commitment:"Half-day/week", min_age:18, town:"Anywhere",
    apply_url:"https://www.gov.uk/guidance/youth-offending-teams",
    achievements:["Attended 8 restorative justice sessions","Supported a young person through a community resolution order"],
    reflection_prompts:["What did the restorative justice process reveal about the relationship between victim, offender and community?"],
    example_sentence:"Attending restorative justice sessions showed me that crime is always embedded in relationships, not just individual choices.",
    is_active:true, last_checked:today, type:"volunteering" },

  { id:"cr2", organisation_name:"Nacro", role:"Community Rehabilitation Volunteer",
    courses:["criminology","social-work","psychology"],
    description:"Support Nacro — the UK's largest crime reduction charity — with mentoring, employment support and community resettlement work for ex-offenders.",
    why_it_helps:"Nacro experience demonstrates applied criminological understanding of rehabilitation and desistance — both core to the discipline.",
    skills:["Rehabilitation support","Desistance awareness","Mentoring"],
    mode:"in-person", region:"UK", weekly_commitment:"3 hrs/week", min_age:18, town:"London",
    apply_url:"https://www.nacro.org.uk/get-involved/",
    achievements:["Mentored two people through a Nacro employment programme"],
    reflection_prompts:["What did working with people rebuilding their lives reveal about the structural barriers to desistance?"],
    example_sentence:"Volunteering at Nacro showed me that desistance from crime is not a decision — it is a process that requires sustained structural support.",
    is_active:true, last_checked:today, type:"volunteering" },

  // FINANCE
  { id:"fi1", organisation_name:"MyBnk", role:"Financial Education Volunteer",
    courses:["finance","economics","mathematics","business"],
    description:"Deliver MyBnk financial education workshops in schools — teaching budgeting, saving, debt and financial decision-making.",
    why_it_helps:"Teaching financial literacy demonstrates the applied understanding and communication skills Finance courses value.",
    skills:["Financial literacy education","Budget modelling","Youth communication"],
    mode:"in-person", region:"UK", weekly_commitment:"2 hrs/week", min_age:18, town:"London",
    apply_url:"https://www.mybnk.org/get-involved/volunteer/",
    achievements:["Delivered workshops to 6 school groups","Helped 80 students create their first personal budget"],
    reflection_prompts:["What financial concept was hardest to make relevant to teenagers, and how did you solve it?"],
    example_sentence:"Delivering financial education workshops showed me that money literacy is a form of power that schools routinely fail to teach.",
    is_active:true, last_checked:today, type:"volunteering" },

  { id:"fi2", organisation_name:"Fidelity International", role:"Finance for Teenagers Programme",
    courses:["finance","economics","business","mathematics"],
    description:"Participate in Fidelity's Finance for Teenagers programme — intensive workshops on investing, markets, personal finance and careers in finance.",
    why_it_helps:"Direct engagement with a major asset manager gives Finance applications the institutional awareness and vocabulary that tutors look for.",
    skills:["Investment fundamentals","Market analysis","Personal finance"],
    mode:"in-person", region:"UK", weekly_commitment:"Programme days", min_age:15, town:"London",
    apply_url:"https://www.fidelityinternational.com/",
    achievements:["Completed Fidelity Finance for Teenagers","Built and presented a mock portfolio to Fidelity analysts"],
    reflection_prompts:["What investment principle from the programme contradicted your intuitive assumptions about markets?"],
    example_sentence:"The Fidelity programme showed me that investing is not about predictions — it is about probabilities and time horizons.",
    is_active:true, last_checked:today, type:"volunteering" },

  // MARKETING
  { id:"ma1", organisation_name:"Marketing Society", role:"Future Leaders Student Member",
    courses:["marketing","business","economics"],
    description:"Join the Marketing Society's Future Leaders programme — attending talks, networking events and brand challenges with industry professionals.",
    why_it_helps:"Marketing Society membership gives direct access to industry thinking and is specifically noted by marketing admissions tutors.",
    skills:["Brand strategy","Consumer behaviour","Industry networking"],
    mode:"hybrid", region:"UK", weekly_commitment:"Monthly events", min_age:17, town:"London",
    apply_url:"https://www.marketingsociety.com/student-members",
    achievements:["Attended 6 Marketing Society talks","Presented a brand strategy to a panel of marketing directors"],
    reflection_prompts:["What did a practising marketer say that contradicted what you had read in marketing theory?"],
    example_sentence:"Joining the Marketing Society showed me that the gap between marketing theory and practice is where all the interesting questions live.",
    is_active:true, last_checked:today, type:"volunteering" },

  { id:"ma2", organisation_name:"D&AD", role:"New Blood Award Entry",
    courses:["marketing","art-design","product-design","film-media-studies"],
    description:"Enter D&AD New Blood Awards — responding to real creative briefs set by major brands with original design, advertising and marketing solutions.",
    why_it_helps:"D&AD is the world's most respected creative award — entry demonstrates applied creative and strategic thinking that top courses want.",
    skills:["Creative strategy","Brief interpretation","Campaign concept development"],
    mode:"online", region:"UK", weekly_commitment:"Project-based", min_age:16, town:"Anywhere",
    apply_url:"https://www.dandad.org/en/d-ad-new-blood-awards/",
    achievements:["D&AD New Blood Pencil nomination","Campaign concept adopted by sponsoring brand"],
    reflection_prompts:["What creative constraint in the brief forced you to abandon your first idea and produce a better one?"],
    example_sentence:"Entering D&AD showed me that the best creative ideas come from understanding the brief deeply, not escaping it.",
    is_active:true, last_checked:today, type:"competition" },

  // CIVIL ENGINEERING
  { id:"ce1", organisation_name:"Arup", role:"Arup Schools Engineering Challenge",
    courses:["civil-engineering","engineering","mathematics","physics"],
    description:"Compete in the Arup Schools Challenge — a structural engineering design competition solving a real infrastructure problem set by Arup engineers.",
    why_it_helps:"Working on a live brief set by one of the world's leading engineering firms is exceptional evidence for civil engineering applications.",
    skills:["Structural analysis","Sustainable design","Engineering presentation"],
    mode:"in-person", region:"UK", weekly_commitment:"Competition-based", min_age:15, town:"Anywhere",
    apply_url:"https://www.arup.com/careers/early-careers",
    achievements:["Team reached Arup Schools Challenge national final"],
    reflection_prompts:["What sustainability constraint made your initial structural solution unworkable, and how did you redesign it?"],
    example_sentence:"Competing in the Arup challenge showed me that civil engineering is never just about what holds up — it is about what holds up for whom and at what cost.",
    is_active:true, last_checked:today, type:"competition" },

  { id:"ce2", organisation_name:"STEM Learning", role:"Civil Engineering STEM Ambassador",
    courses:["civil-engineering","engineering","mathematics"],
    description:"Become a STEM Ambassador specialising in civil engineering — delivering infrastructure and construction demonstrations in schools.",
    why_it_helps:"STEM Ambassador status in civil engineering is directly recognisable to admissions tutors as evidence of subject depth and outreach.",
    skills:["Infrastructure education","Construction awareness","STEM communication"],
    mode:"in-person", region:"UK", weekly_commitment:"2 hrs/fortnight", min_age:17, town:"Anywhere",
    apply_url:"https://www.stem.org.uk/stem-ambassadors",
    achievements:["Delivered civil engineering workshops to 5 schools reaching 150 students"],
    reflection_prompts:["What aspect of infrastructure did students find most surprising about how it is designed and built?"],
    example_sentence:"Delivering civil engineering workshops showed me that most people use infrastructure every day without ever wondering how it was designed.",
    is_active:true, last_checked:today, type:"volunteering" },

  // THEATRE & PERFORMANCE
  { id:"th1", organisation_name:"Frantic Assembly", role:"Ignition Physical Theatre Programme",
    courses:["theatre-performance","english-literature","education"],
    description:"Apply for Frantic Assembly's Ignition — a free 5-day intensive physical theatre workshop led by professional Frantic Assembly artists.",
    why_it_helps:"Frantic Assembly Ignition is specifically cited by drama schools as high-quality evidence of physical theatre training.",
    skills:["Physical theatre","Devising","Ensemble performance"],
    mode:"in-person", region:"UK", weekly_commitment:"5-day intensive", min_age:16, town:"Various",
    apply_url:"https://franticassembly.co.uk/ignition",
    achievements:["Completed Frantic Assembly Ignition programme","Devised and performed a piece shared with industry professionals"],
    reflection_prompts:["What did physical theatre training reveal about the relationship between your body and your character?"],
    example_sentence:"The Frantic Assembly Ignition programme showed me that physical theatre requires you to think with your whole body, not just your voice.",
    is_active:true, last_checked:today, type:"volunteering" },

  { id:"th2", organisation_name:"National Theatre", role:"NT Connections Participant",
    courses:["theatre-performance","english-literature","education"],
    description:"Participate in National Theatre Connections — your school produces a brand-new play by a leading playwright, performed at the NT.",
    why_it_helps:"NT Connections is the most prestigious schools theatre programme in the UK and is cited by RADA, LAMDA and every drama school.",
    skills:["Professional text work","Production process","Live performance"],
    mode:"in-person", region:"UK", weekly_commitment:"Rehearsal period", min_age:11, town:"Anywhere",
    apply_url:"https://www.nationaltheatre.org.uk/learning/connections/",
    achievements:["Performed in an NT Connections production at the National Theatre"],
    reflection_prompts:["What did working on a brand-new play reveal about the text that rehearsed reading couldn't?"],
    example_sentence:"Performing in NT Connections showed me that new writing requires actors to become collaborators in the making of the play, not just interpreters of it.",
    is_active:true, last_checked:today, type:"volunteering" },
];

const added = ops.filter(o => !existing.has(o.id));
added.forEach(o => d.push(o));
fs.writeFileSync(DATA, JSON.stringify(d, null, 2));

const counts = {};
d.forEach(o => o.courses.forEach(c => counts[c] = (counts[c]||0)+1));
const thin = Object.entries(counts).filter(([,v]) => v < 5).sort((a,b) => a[1]-b[1]);
console.log("Total:", d.length, "| Added:", added.length);
console.log(thin.length ? "Still under 5: " + thin.map(([k,v]) => v+" "+k).join(", ") : "All courses 5+ ✓");

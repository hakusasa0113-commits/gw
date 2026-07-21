const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const today = new Date().toISOString().split("T")[0];

const newOps = [
  // ── VETERINARY SCIENCE (currently 3) ─────────────────────────────
  {
    id:"o78", organisation_name:"Blue Cross Animal Hospital", role:"Animal Care Volunteer",
    courses:["veterinary-science","biology-life-sciences"],
    description:"Assist veterinary nurses caring for sick and injured animals at a Blue Cross pet hospital — including post-op recovery, kennel care and client support.",
    why_it_helps:"Sustained hands-on animal care in a clinical setting is essential evidence for vet school applications.",
    skills:["Animal handling","Clinical observation","Client communication"],
    mode:"in-person", region:"UK", weekly_commitment:"Half-day/week", min_age:16, town:"London",
    apply_url:"https://www.bluecross.org.uk/volunteer",
    achievements:["Logged 50+ hours of supervised animal care","Assisted in post-operative recovery monitoring"],
    reflection_prompts:["What did working with sick animals teach you about the emotional demands of veterinary practice?"],
    example_sentence:"Volunteering at a Blue Cross hospital showed me that veterinary care is as much about comforting owners as treating animals.",
    is_active:true, last_checked:today
  },
  {
    id:"o79", organisation_name:"World Horse Welfare", role:"Field Officer Support Volunteer",
    courses:["veterinary-science","biology-life-sciences","environmental-science"],
    description:"Accompany World Horse Welfare field officers on welfare assessment visits, observing equine health evaluations and case management.",
    why_it_helps:"Equine welfare fieldwork is rare and highly distinctive evidence for vet applications, especially for students interested in large animals.",
    skills:["Equine observation","Welfare assessment","Field documentation"],
    mode:"in-person", region:"UK", weekly_commitment:"2 visits/month", min_age:17, town:"Norfolk",
    apply_url:"https://www.worldhorsewelfare.org/get-involved/volunteer",
    achievements:["Observed welfare assessments on 20+ horses","Assisted with case documentation for a field report"],
    reflection_prompts:["What welfare indicator surprised you most in the field?"],
    example_sentence:"Joining equine welfare assessments in the field gave me a clinical rigour I couldn't have found in a domestic setting.",
    is_active:true, last_checked:today
  },
  {
    id:"o80", organisation_name:"Cats Protection", role:"Fostering & Socialisation Volunteer",
    courses:["veterinary-science","biology-life-sciences","psychology"],
    description:"Foster rescue cats at home, socialising them and monitoring their health and behaviour ahead of rehoming.",
    why_it_helps:"Long-term individual animal monitoring builds the observational and behavioural skills vet schools actively want to see.",
    skills:["Animal behaviour observation","Health monitoring","Record keeping"],
    mode:"in-person", region:"UK", weekly_commitment:"Ongoing (foster placement)", min_age:18, town:"Anywhere",
    apply_url:"https://www.cats.org.uk/support-us/volunteering",
    achievements:["Successfully fostered and rehomed 6 cats","Monitored and reported a respiratory condition early"],
    reflection_prompts:["What did sustained daily observation of the same animal reveal that a single clinic visit couldn't?"],
    example_sentence:"Fostering rescue cats showed me how much clinical observation depends on knowing an individual's baseline.",
    is_active:true, last_checked:today
  },

  // ── ENVIRONMENTAL SCIENCE (currently 4) ──────────────────────────
  {
    id:"o81", organisation_name:"Surfers Against Sewage", role:"Plastic Free Communities Volunteer",
    courses:["environmental-science","biology-life-sciences","politics"],
    description:"Lead local plastic-free community campaigns, organising beach cleans, school talks and data collection on plastic pollution.",
    why_it_helps:"Running a data-backed environmental campaign is concrete, impactful evidence for Environmental Science applications.",
    skills:["Campaign leadership","Pollution data collection","Community engagement"],
    mode:"in-person", region:"UK", weekly_commitment:"3 hrs/week", min_age:16, town:"Cornwall",
    apply_url:"https://www.sas.org.uk/get-involved/volunteer/",
    achievements:["Organised a beach clean collecting 40kg of plastic","Led a school talk reaching 120 students"],
    reflection_prompts:["What did the data from your beach clean reveal about local pollution sources?"],
    example_sentence:"Leading a plastic-free campaign showed me that environmental change starts with local data, not global statistics.",
    is_active:true, last_checked:today
  },
  {
    id:"o82", organisation_name:"Soil Association", role:"Food & Farming Outreach Volunteer",
    courses:["environmental-science","biology-life-sciences","chemistry"],
    description:"Support the Soil Association's community food and farming education programme — running school workshops on soil health, sustainable farming and food systems.",
    why_it_helps:"Agricultural environmental science is an underrepresented but academically valued area of expertise for Environmental Science applications.",
    skills:["Soil science basics","Food systems knowledge","Workshop delivery"],
    mode:"in-person", region:"UK", weekly_commitment:"2 hrs/week", min_age:16, town:"Bristol",
    apply_url:"https://www.soilassociation.org/take-action/volunteer/",
    achievements:["Delivered soil health workshops to 3 school groups","Contributed to a community allotment soil survey"],
    reflection_prompts:["What did the soil data reveal about the relationship between farming practice and environmental health?"],
    example_sentence:"Workshops on soil health taught me that environmental science is ultimately about what happens at ground level.",
    is_active:true, last_checked:today
  },

  // ── DENTISTRY (currently 4) ───────────────────────────────────────
  {
    id:"o83", organisation_name:"Dentists Without Borders UK", role:"Awareness & Fundraising Volunteer",
    courses:["dentistry","medicine","social-work"],
    description:"Support UK awareness campaigns for global dental care access, helping organise events and produce fundraising content.",
    why_it_helps:"Engagement with global oral health inequity demonstrates the socially aware perspective dental schools increasingly value.",
    skills:["Global health awareness","Fundraising","Event coordination"],
    mode:"hybrid", region:"UK", weekly_commitment:"2 hrs/week", min_age:16, town:"London",
    apply_url:"https://www.dentistswithoutborders.org/volunteer",
    achievements:["Co-organised a fundraising event raising £1,200","Produced an awareness campaign reaching 500+ social media followers"],
    reflection_prompts:["What global oral health statistic changed how you see dentistry as a profession?"],
    example_sentence:"Campaigning for global dental access showed me that the profession's purpose extends far beyond the chair.",
    is_active:true, last_checked:today
  },
  {
    id:"o84", organisation_name:"University Dental Hospital NHS Trust", role:"Patient Liaison Volunteer",
    courses:["dentistry","nursing","medicine"],
    description:"Support reception and patient liaison teams at an NHS dental teaching hospital — welcoming patients, providing information and supporting anxious attendees.",
    why_it_helps:"Working in an NHS dental environment alongside training dentists provides direct, authentic evidence of clinical engagement.",
    skills:["Patient communication","Dental anxiety management","NHS environment awareness"],
    mode:"in-person", region:"UK", weekly_commitment:"Half-day/week", min_age:17, town:"Manchester",
    apply_url:"https://www.ncl.ac.uk/dental/about/patient-services/",
    achievements:["Supported 30+ patient check-in interactions","Observed a broad range of dental treatments across 3 months"],
    reflection_prompts:["How did the teaching hospital environment differ from a private practice you'd observed before?"],
    example_sentence:"Volunteering in an NHS dental teaching hospital showed me how clinical training shapes every consultation.",
    is_active:true, last_checked:today
  },

  // ── BUSINESS (currently 5) ────────────────────────────────────────
  {
    id:"o85", organisation_name:"Prince's Trust Enterprise Programme", role:"Enterprise Mentor Assistant",
    courses:["business","economics","law"],
    description:"Assist mentors supporting young entrepreneurs through the Prince's Trust Enterprise programme — from business plan development to pitch preparation.",
    why_it_helps:"Supporting real business creation from ideation to pitch is the most applied business experience available to sixth-formers.",
    skills:["Business planning","Mentoring","Pitch coaching"],
    mode:"hybrid", region:"UK", weekly_commitment:"2 hrs/week", min_age:18, town:"London",
    apply_url:"https://www.princes-trust.org.uk/support-us/volunteer",
    achievements:["Helped two young entrepreneurs refine their business plans","Assisted a team rehearse and improve their investor pitch"],
    reflection_prompts:["What business assumption did a young entrepreneur hold that the evidence didn't support?"],
    example_sentence:"Supporting a young entrepreneur through the Prince's Trust taught me that good business thinking starts with honest numbers.",
    is_active:true, last_checked:today
  },
  {
    id:"o86", organisation_name:"Social Enterprise UK", role:"Social Enterprise Network Volunteer",
    courses:["business","economics","social-work","politics"],
    description:"Support a social enterprise in your community — helping with marketing, operations, customer engagement or impact measurement.",
    why_it_helps:"Social enterprise blends commercial rigour with social purpose — a distinctive angle that stands out in Business applications.",
    skills:["Social enterprise operations","Impact measurement","Marketing basics"],
    mode:"hybrid", region:"UK", weekly_commitment:"3 hrs/week", min_age:17, town:"Anywhere",
    apply_url:"https://www.socialenterprise.org.uk/get-involved/",
    achievements:["Designed a social media campaign that increased a social enterprise's reach by 40%"],
    reflection_prompts:["Where did the social mission create a tension with commercial sustainability?"],
    example_sentence:"Working with a social enterprise showed me that the hardest business decisions are the ones where profit and purpose pull in opposite directions.",
    is_active:true, last_checked:today
  },

  // ── MUSIC (currently 5) ───────────────────────────────────────────
  {
    id:"o87", organisation_name:"Sage Gateshead", role:"Young Musicians Programme Assistant",
    courses:["music","education","social-work"],
    description:"Support Sage Gateshead's community music education team running programmes for young people from low-income backgrounds.",
    why_it_helps:"Working at a major music venue's education programme demonstrates institutional engagement and community music practice.",
    skills:["Music education support","Youth engagement","Programme coordination"],
    mode:"in-person", region:"UK", weekly_commitment:"2-3 hrs/week", min_age:16, town:"Gateshead",
    apply_url:"https://www.sagegateshead.com/take-part/",
    achievements:["Supported a 12-week young musicians programme","Helped organise an end-of-programme showcase performance"],
    reflection_prompts:["What barrier to musical participation did you observe that you hadn't expected?"],
    example_sentence:"Assisting Sage Gateshead's youth programme showed me that musical access is a social justice issue as much as a cultural one.",
    is_active:true, last_checked:today
  },
  {
    id:"o88", organisation_name:"National Youth Jazz Orchestra", role:"NYJO Community Outreach Assistant",
    courses:["music","education"],
    description:"Support NYJO's schools and community outreach programme — assisting at workshops, jazz education sessions and public events.",
    why_it_helps:"Jazz outreach work demonstrates specialist musical knowledge and community engagement in a distinctive idiom.",
    skills:["Jazz music knowledge","Workshop facilitation","Audience development"],
    mode:"in-person", region:"UK", weekly_commitment:"Event-based (1-2/month)", min_age:16, town:"London",
    apply_url:"https://www.nyjo.org.uk/get-involved",
    achievements:["Assisted at 6 school jazz workshops","Supported a public open day reaching 200 young people"],
    reflection_prompts:["What did improvisation teach workshop participants about musical risk-taking?"],
    example_sentence:"Supporting jazz education workshops showed me that improvisation is as much a way of thinking as a musical technique.",
    is_active:true, last_checked:today
  },

  // ── PHILOSOPHY (currently 5) ──────────────────────────────────────
  {
    id:"o89", organisation_name:"Ethics Bowl UK", role:"Student Team Coach",
    courses:["philosophy","law","politics"],
    description:"Coach a school team preparing for the Ethics Bowl — a competition where students analyse and debate complex ethical dilemmas collaboratively.",
    why_it_helps:"Coaching ethical argument at a competitive level shows both philosophical depth and the ability to develop reasoning in others.",
    skills:["Ethics case analysis","Argument coaching","Structured debate"],
    mode:"in-person", region:"UK", weekly_commitment:"2 hrs/week", min_age:17, town:"London",
    apply_url:"https://www.ethicsbowl.org.uk/",
    achievements:["Coached a team to the regional Ethics Bowl finals","Developed a preparation guide used by 3 school teams"],
    reflection_prompts:["What ethical case exposed a gap between your students' intuitions and their arguments?"],
    example_sentence:"Coaching an Ethics Bowl team taught me that the hardest part of ethical reasoning is separating what you feel from what you can justify.",
    is_active:true, last_checked:today
  },
  {
    id:"o90", organisation_name:"Big Ideas Festival", role:"Public Philosophy Volunteer",
    courses:["philosophy","english-literature","history","politics"],
    description:"Support a public philosophy and humanities festival — stewarding talks, assisting speakers and engaging audiences before and after sessions.",
    why_it_helps:"Sustained engagement with public intellectual life signals the kind of curiosity and commitment philosophy tutors most want to see.",
    skills:["Public engagement","Speaker coordination","Critical listening"],
    mode:"in-person", region:"UK", weekly_commitment:"Festival week + monthly events", min_age:17, town:"Birmingham",
    apply_url:"https://www.bigideastrust.com/",
    achievements:["Stewarded 10 public philosophy and humanities talks","Facilitated a post-talk audience discussion"],
    reflection_prompts:["Which talk changed your thinking on something you'd considered resolved?"],
    example_sentence:"Stewarding public philosophy talks showed me that the best ideas only become real in conversation.",
    is_active:true, last_checked:today
  },
];

newOps.forEach(o => data.push(o));
fs.writeFileSync(DATA, JSON.stringify(data, null, 2));

const counts = {};
data.forEach(o => o.courses.forEach(c => counts[c] = (counts[c]||0)+1));
const thin = Object.entries(counts).filter(([,v]) => v < 5).sort((a,b)=>a[1]-b[1]);
console.log("Total:", data.length);
console.log("Still under 5:", thin.length ? thin.map(([k,v])=>v+" "+k).join(", ") : "none");

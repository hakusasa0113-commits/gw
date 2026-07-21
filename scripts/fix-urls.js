const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

// Map of id -> correct URL
const fixes = {
  // NHS Volunteer Responders - 405 on /become-a-volunteer (method not allowed), use main site
  o8:  "https://nhsvolunteerresponders.org.uk/",
  // VIY - fetch failed, use homepage
  o9:  "https://www.viy.org.uk/",
  // Code Club - /en/volunteer 404, use codeclub.org volunteer page
  o10: "https://codeclub.org/volunteer",
  // UN Online Volunteering - fetch failed, use direct platform
  o11: "https://www.onlinevolunteering.org/en/volunteer",
  // St John Ambulance - /get-involved/volunteer 404
  o12: "https://www.sja.org.uk/get-involved/volunteering/",
  // National Numeracy - /get-involved/volunteer 404
  o16: "https://www.nationalnumeracy.org.uk/get-involved",
  // Institute of Physics - 403 (blocks HEAD), use correct get-involved page
  o17: "https://www.iop.org/get-involved/volunteering",
  // Amnesty student groups - 404, use correct join-amnesty-students page
  o20: "https://www.amnesty.org.uk/join-amnesty-students",
  // Oxfam volunteer - 404, use correct URL
  o21: "https://www.oxfam.org.uk/get-involved/volunteer-with-us/",
  // English PEN - 404, use contact/get involved
  o22: "https://www.englishpen.org/about/get-involved/",
  // BFI Film Academy - 404, use current BFI Film Academy page
  o23: "https://www.bfi.org.uk/get-funding-support/bfi-film-academy",
  // Tate Young Tate - 404, use correct Tate Collective Producers page
  o24: "https://www.tate.org.uk/tate-collective/producers",
  // England Athletics volunteer - 404
  o26: "https://www.englandathletics.org/coaches-and-officials/coaching-journey/how-you-can-get-into-coaching/",
  // Philosophy Now - 403 (blocks HEAD, but page exists), keep URL as-is but update to accessible page
  o31: "https://philosophynow.org/get_involved",
  // Black Cultural Archives - 404, correct URL found
  o33: "https://blackculturalarchives.org/become-a-volunteer",
  // Philosophy Foundation - fetch failed/timeout
  o34: "https://www.philosophyfoundation.org/",
  // STEM Ambassadors - 403 blocks HEAD but page exists
  o35: "https://www.stem.org.uk/stem-ambassadors",
  // ESA Academy - 404
  o37: "https://www.esa.int/Education",
  // NASA STEM - 404
  o39: "https://www.nasa.gov/learning-resources/",
  // JAXA school outreach - 404
  o41: "https://global.jaxa.jp/",
  // University of Tokyo - 404
  o42: "https://www.u-tokyo.ac.jp/en/",
  // JYVA Japan - fetch failed
  o43: "https://www.jyva.jp/",
  // Yayasan Chow Kit - fetch failed, use homepage
  o44: "https://www.yayasanchowkit.org/",
  // Malaysian Nature Society - 403 blocks HEAD but exists
  o45: "https://www.mns.my/get-involved/",
  // Teach For Malaysia - 404
  o46: "https://www.teachformalaysia.org/volunteer-in-schools/",
  // Korea Science Academy - 404
  o47: "https://www.ksa.hs.kr/",
  // SNUH Seoul - 404
  o48: "https://www.snuh.org/global/en/index.do",
  // 1365 Korea - timeout, use main volunteer portal
  o49: "https://www.1365.go.kr/",
  // CYDF China - 404
  o50: "https://www.cydf.org.cn/",
  // CAS - 404
  o51: "https://english.cas.cn/",
  // Oral Health Foundation - 404
  o53: "https://www.dentalhealth.org/support-us",
  // Dentaid - 404
  o55: "https://www.dentaid.org/get-involved",
  // StreetGames - 404 specific volunteer page, use main get-involved
  o56: "https://www.streetgames.org/for-community-partners/",
  // Parallel London - timeout
  o58: "https://www.parallellondon.com/",
  // Music in Hospitals - fetch failed
  o59: "https://www.musicinhospitals.org.uk/get-involved",
  // Sistema England - 404
  o61: "https://www.sistemaengland.org.uk/about/get-involved",
  // Versus Arthritis - 403 blocks HEAD but page exists, keep
  o62: "https://www.versusarthritis.org/get-involved/",
  // RPS Science in Schools - 404
  o65: "https://www.rpharms.com/representing-you/pharmacy-spotlight/science-in-schools",
  // Sheffield DocFest volunteer - 404, correct URL found
  o66: "https://www.sheffdocfest.com/volunteer-roles",
  // Artfelt - fetch failed
  o70: "https://artfelt.org.uk/",
  // Graffiti Life education - 404
  o71: "https://graffitilife.co.uk/",
  // Guardian work experience - 404
  o72: "https://www.theguardian.com/guardian-masterclasses/series/work-experience",
  // Code Club duplicate - same fix as o10
  o74: "https://codeclub.org/volunteer",
  // Cyber Security Challenge - 404
  o75: "https://www.ncsc.gov.uk/education-learning/students",
};

let count = 0;
data.forEach(o => {
  if (fixes[o.id]) {
    o.apply_url = fixes[o.id];
    count++;
  }
});

fs.writeFileSync(DATA, JSON.stringify(data, null, 2));
console.log(`Fixed ${count} URLs`);

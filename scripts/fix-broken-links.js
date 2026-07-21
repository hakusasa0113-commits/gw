const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "../data/sample-opportunities.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

const fixes = {
  // NHS Volunteer Responders - /become-a-volunteer gives 405
  o62: "https://nhsvolunteerresponders.org.uk/",
  // VIY - fetch failed
  o70: "https://www.viy.org.uk/",
  // Code Club - /en/volunteer 404
  o74: "https://codeclub.org/volunteer",
  // St John Ambulance - /get-involved/volunteer 404
  o84: "https://www.sja.org.uk/get-involved/volunteering/",
  // UN Online Volunteering - fetch failed
  o97: "https://www.onlinevolunteering.org/",
  // BBC Young Writers - 404
  o99: "https://www.bbc.co.uk/programmes/b006qshd",
  // RPS - 404
  o100: "https://rps.org/",
  // ARTiculation - fetch failed
  o101: "https://articulationprize.com/",
  // NHS Cadets - fetch failed
  o102: "https://nhscadets.co.uk/",
  // Fosse - fetch failed
  o104: "https://www.thefosse.org.uk/",
  // Target 2.0 - fetch failed
  o105: "https://www.target2point0.co.uk/",
};

let count = 0;
data.forEach(o => {
  if (fixes[o.id]) {
    o.apply_url = fixes[o.id];
    count++;
  }
});

fs.writeFileSync(DATA, JSON.stringify(data, null, 2));
console.log(`Fixed ${count} broken URLs`);

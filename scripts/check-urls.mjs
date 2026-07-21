import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(path.join(__dirname, "../data/sample-opportunities.json"), "utf8"));

async function check(id, url) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctrl.signal });
    clearTimeout(t);
    return { id, url, status: r.status, ok: r.status < 400 };
  } catch (e) {
    return { id, url, status: 0, ok: false, err: e.message };
  }
}

const CONCURRENCY = 8;
const results = [];
for (let i = 0; i < data.length; i += CONCURRENCY) {
  const batch = data.slice(i, i + CONCURRENCY);
  const res = await Promise.all(batch.map(o => check(o.id, o.apply_url)));
  res.forEach(r => results.push(r));
  process.stdout.write(".");
}
console.log("\n");
const dead = results.filter(r => !r.ok);
const alive = results.filter(r => r.ok);
console.log(`Alive: ${alive.length}  Dead: ${dead.length}`);
if (dead.length) {
  console.log("\nDEAD URLs:");
  dead.forEach(r => console.log(`  ${r.id} [${r.status}] ${r.url}${r.err ? " — "+r.err : ""}`));
}

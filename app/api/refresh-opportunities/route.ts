import { NextResponse } from "next/server";
import type { Opportunity } from "@/types";

// On Vercel the filesystem is read-only, so we can't write back to the JSON.
// Instead this route checks all URLs and returns a status report.
// The client uses this to show a "checked today" indicator without mutating
// any files — the source-of-truth data stays in the bundled JSON.

const TIMEOUT_MS = 8000;
const CONCURRENCY = 6;

// Lazy-load opportunities so the import doesn't break at build time
async function getOpportunities(): Promise<Opportunity[]> {
  const mod = await import("@/data/sample-opportunities.json");
  return mod.default as unknown as Opportunity[];
}

async function checkUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res.status < 400;
  } catch {
    return false;
  }
}

export async function POST() {
  const opportunities = await getOpportunities();
  const today = new Date().toISOString().split("T")[0];
  const results: { id: string; role: string; alive: boolean }[] = [];

  for (let i = 0; i < opportunities.length; i += CONCURRENCY) {
    const batch = opportunities.slice(i, i + CONCURRENCY);
    const settled = await Promise.all(
      batch.map(async (o) => ({
        id: o.id,
        role: o.role,
        alive: await checkUrl(o.apply_url),
      }))
    );
    results.push(...settled);
  }

  const dead = results.filter((r) => !r.alive).length;
  const alive = results.filter((r) => r.alive).length;

  return NextResponse.json({
    message: `Checked ${opportunities.length} opportunities. ${alive} alive, ${dead} unreachable.`,
    last_checked: today,
    alive,
    dead,
    results,
  });
}

export async function GET() {
  const opportunities = await getOpportunities();
  return NextResponse.json({
    total: opportunities.length,
    last_checked: new Date().toISOString().split("T")[0],
  });
}

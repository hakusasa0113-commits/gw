import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Opportunity } from "@/types";
import { getBestFallback } from "@/lib/fallback-opportunities";

const DATA_PATH = path.join(process.cwd(), "data", "sample-opportunities.json");
const TIMEOUT_MS = 8000;
const CONCURRENCY = 6;

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

async function checkBatch(
  items: { id: string; url: string }[]
): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    const settled = await Promise.all(
      batch.map(async ({ id, url }) => ({ id, ok: await checkUrl(url) }))
    );
    settled.forEach(({ id, ok }) => (results[id] = ok));
  }
  return results;
}

export async function POST() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const opportunities: Opportunity[] = JSON.parse(raw);
  const today = new Date().toISOString().split("T")[0];

  // Check all URLs
  const urlResults = await checkBatch(
    opportunities.map((o) => ({ id: o.id, url: o.apply_url }))
  );

  // Track which fallback org+role combos we've already used this run
  // so we don't replace multiple dead listings with the exact same entry
  const usedFallbackKeys = new Set<string>();

  let replaced = 0;
  let stillDead = 0;

  const updated = opportunities.map((o): Opportunity => {
    const isAlive = urlResults[o.id] ?? true;

    if (isAlive) {
      // Link is fine — just refresh the timestamp
      return { ...o, is_active: true, last_checked: today };
    }

    // Dead link — try to find a fallback
    const fallback = getBestFallback(o, usedFallbackKeys);

    if (fallback) {
      const key = `${fallback.organisation_name}|${fallback.role}`;
      usedFallbackKeys.add(key);
      replaced++;
      return {
        // Keep the original id so saved items and routes still resolve
        id: o.id,
        organisation_id: o.organisation_id ?? "",
        ...fallback,
        // Preserve the original course list so filters keep working
        courses: o.courses,
        // Preserve region
        region: o.region,
        is_active: true,
        last_checked: today,
      };
    }

    // No fallback available — keep the entry but mark inactive
    stillDead++;
    return { ...o, is_active: false, last_checked: today };
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2));

  return NextResponse.json({
    message: `Checked ${opportunities.length} opportunities. ${replaced} replaced, ${stillDead} still unavailable.`,
    last_checked: today,
    replaced,
    still_unavailable: stillDead,
  });
}

export async function GET() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const opportunities: Opportunity[] = JSON.parse(raw);
  const active = opportunities.filter((o) => o.is_active).length;
  const inactive = opportunities.filter((o) => !o.is_active).length;
  const last = opportunities[0]?.last_checked ?? null;
  return NextResponse.json({
    total: opportunities.length,
    active,
    inactive,
    last_checked: last,
  });
}

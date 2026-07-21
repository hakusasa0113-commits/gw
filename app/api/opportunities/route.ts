import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/opportunities?course=medicine&mode=online&search=hospice
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const course = searchParams.get("course");
  const mode = searchParams.get("mode");
  const search = searchParams.get("search");
  const town = searchParams.get("town");

  const supabase = createClient();
  let query = supabase.from("opportunities").select("*, organisations(name, town)");

  if (course) query = query.contains("course_slugs", [course]);
  if (mode) query = query.eq("mode", mode);
  if (town) query = query.eq("town", town);
  if (search) {
    query = query.or(
      `role.ilike.%${search}%,description.ilike.%${search}%`
    );
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ opportunities: data });
}

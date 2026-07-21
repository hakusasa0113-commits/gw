import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/saved — list the current user's saved opportunities
export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("*, opportunities(*)")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ saved: data });
}

// POST /api/saved  { opportunity_id }
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { opportunity_id } = await req.json();
  if (!opportunity_id) {
    return NextResponse.json({ error: "opportunity_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("saved_opportunities")
    .upsert(
      { user_id: user.id, opportunity_id, status: "saved" },
      { onConflict: "user_id,opportunity_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ saved: data });
}

// PATCH /api/saved  { opportunity_id, status: 'in_progress' | 'completed' }
export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { opportunity_id, status } = await req.json();
  const update: Record<string, unknown> = { status };
  if (status === "completed") update.completed_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("saved_opportunities")
    .update(update)
    .eq("user_id", user.id)
    .eq("opportunity_id", opportunity_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ saved: data });
}

// DELETE /api/saved  { opportunity_id }
export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { opportunity_id } = await req.json();
  const { error } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", user.id)
    .eq("opportunity_id", opportunity_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

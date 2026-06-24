import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { bookmaker?: string; match_id?: string; mode?: string };
    // Future: persist to Supabase analytics table
    console.log("[affiliate:click]", body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

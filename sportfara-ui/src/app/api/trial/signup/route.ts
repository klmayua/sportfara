import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      email: string;
      firstName: string;
      lastName: string;
      country: string;
      selectedMode: string;
      sourceSport: string;
      utmSource?: string;
    };

    if (!body.email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const trialStart = new Date().toISOString();
      const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const res = await fetch(`${supabaseUrl}/rest/v1/trial_signups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          email: body.email,
          first_name: body.firstName,
          last_name: body.lastName,
          country: body.country,
          selected_mode: body.selectedMode,
          source_sport: body.sourceSport,
          utm_source: body.utmSource ?? null,
          trial_start: trialStart,
          trial_end: trialEnd,
          subscription_status: "trial",
          free_briefings_used: 0,
          preferred_mode: body.selectedMode,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("[trial/signup] Supabase error:", errText);
        // Still return ok — local fallback handles it on the client
      }
    } else {
      // No Supabase configured — log only
      console.log("[trial/signup] No Supabase configured. Signup data:", {
        email: body.email,
        mode: body.selectedMode,
        country: body.country,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[trial/signup]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

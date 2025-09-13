import { NextResponse } from "next/server";

/**
 * Basic intake endpoint.
 * - Validates minimal required fields server-side.
 * - In a real deployment, persist to DB and/or notify via email.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Minimal validation
    const required = ["name", "email", "phone", "state", "county", "acreage", "price", "timeline", "leadId"];
    for (const key of required) {
      if (!data?.[key]) {
        return NextResponse.json({ error: `Missing: ${key}` }, { status: 400 });
      }
    }

    // TODO: persist to your DB or send email
    // For now, just log on the server (visible in Vercel logs)
    console.log("[SELL LEAD]", JSON.stringify(data));

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid payload" }, { status: 400 });
  }
}

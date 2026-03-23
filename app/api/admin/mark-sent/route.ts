import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const secret = formData.get("secret") as string;
  const month = formData.get("month") as string;

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  await supabase
    .from("letters")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("month", month)
    .in("status", ["generated", "approved"]);

  return NextResponse.redirect(new URL("/admin", req.url));
}

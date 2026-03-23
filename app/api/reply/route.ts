import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const email = req.cookies.get("fumi_email")?.value;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "content required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data: user } = await supabase
    .from("users")
    .select("id, plan")
    .eq("email", email)
    .single();

  if (!user || user.plan !== "premium") {
    return NextResponse.json({ error: "プレミアムプランのみ利用可能です" }, { status: 403 });
  }

  // 今月すでに返信済みかチェック
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const { count } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfMonth);

  if ((count ?? 0) >= 1) {
    return NextResponse.json({ error: "今月の返信は1回までです" }, { status: 429 });
  }

  await supabase.from("messages").insert({
    user_id: user.id,
    content: content.trim(),
    used_in_letter: false,
  });

  return NextResponse.json({ ok: true });
}

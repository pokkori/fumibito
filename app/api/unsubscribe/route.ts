import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PAYJP_API = "https://api.pay.jp/v1";

function auth() {
  return "Basic " + Buffer.from(process.env.PAYJP_SECRET_KEY! + ":").toString("base64");
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data: user } = await supabase
    .from("users")
    .select("id, payjp_sub_id, status")
    .eq("email", email)
    .single();

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // PAY.JPでサブスク解約（期間終了時に解約）
  if (user.payjp_sub_id) {
    await fetch(`${PAYJP_API}/subscriptions/${user.payjp_sub_id}/cancel`, {
      method: "POST",
      headers: { Authorization: auth() },
    });
  }

  // DBに解約フラグ
  await supabase
    .from("users")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("id", user.id);

  // 管理者にメール通知
  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ふみびと <noreply@fumibito.jp>",
        to: process.env.ADMIN_EMAIL,
        subject: `【ふみびと】解約: ${email}`,
        html: `<p>${email} が解約しました。</p>`,
      }),
    });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.delete("fumi_email");
  res.cookies.delete("payjp_sub_id");
  return res;
}

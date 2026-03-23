import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  // 今月生成された未送付手紙を管理者に通知
  const { data: pending } = await supabase
    .from("letters")
    .select("id, month, user_id")
    .eq("month", month)
    .eq("status", "generated");

  const count = pending?.length ?? 0;

  // Resendで管理者にサマリーメール
  if (count > 0 && process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ふみびと <noreply@fumibito.jp>",
        to: process.env.ADMIN_EMAIL,
        subject: `【ふみびと】${month} 手紙生成完了 ${count}通`,
        html: `
          <h2>手紙生成完了のお知らせ</h2>
          <p>${month} の手紙が <strong>${count}通</strong> 生成されました。</p>
          <p>管理画面からCSVをダウンロードして、ラクスルにアップロードしてください。</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://fumibito.vercel.app"}/admin">管理画面を開く</a></p>
        `,
      }),
    });
  }

  return NextResponse.json({ ok: true, month, pending_count: count });
}

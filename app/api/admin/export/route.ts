import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// 管理者のみアクセス可（CRON_SECRETで保護）
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const month = req.nextUrl.searchParams.get("month");
  if (!month) return NextResponse.json({ error: "month required" }, { status: 400 });

  const supabase = getSupabaseAdmin();

  const { data: letters, error } = await supabase
    .from("letters")
    .select(`
      id, month, status, content,
      users (
        email,
        profiles (
          name, postal_code, address, address_name
        )
      )
    `)
    .eq("month", month)
    .in("status", ["generated", "approved"]);

  if (error) return NextResponse.json({ error: "DB error" }, { status: 500 });

  // CSV生成（ラクスルDM向け）
  const rows = (letters ?? []).map((l) => {
    const user = Array.isArray(l.users) ? l.users[0] : l.users;
    const profile = user && (Array.isArray(user.profiles) ? user.profiles[0] : user.profiles);
    return [
      l.id,
      user?.email ?? "",
      profile?.address_name ?? "",
      profile?.postal_code ?? "",
      profile?.address ?? "",
      l.status,
    ];
  });

  const header = ["letter_id", "email", "宛名", "郵便番号", "住所", "status"];
  const csv = [header, ...rows]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fumibito_${month}.csv"`,
    },
  });
}

// 一括「送付済み」マーク
export async function POST(req: NextRequest) {
  const { secret, month } = await req.json();
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("letters")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("month", month)
    .in("status", ["generated", "approved"]);

  return NextResponse.json({ ok: true, updated: count });
}

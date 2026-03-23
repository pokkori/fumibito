import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateLetter } from "@/lib/claude";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  // アクティブユーザー全員のプロフィールを取得
  const { data: users, error } = await supabase
    .from("users")
    .select(`
      id, email, plan,
      profiles (
        name, birthday, interests, worry, tone
      ),
      letters (
        month, summary
      ),
      messages (
        content, used_in_letter, created_at
      )
    `)
    .eq("status", "active");

  if (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  let generated = 0;
  let failed = 0;

  for (const user of users ?? []) {
    // すでに今月分生成済みならスキップ
    const profile = Array.isArray(user.profiles) ? user.profiles[0] : user.profiles;
    const lettersList = Array.isArray(user.letters) ? user.letters : [];
    const messagesList = Array.isArray(user.messages) ? user.messages : [];

    if (!profile) continue;

    const alreadyGenerated = lettersList.some((l: { month: string }) => l.month === month);
    if (alreadyGenerated) continue;

    // 前月の要約を取得
    const prevMonth = getPrevMonth(month);
    const prevLetter = lettersList.find((l: { month: string }) => l.month === prevMonth);

    // プレミアムユーザーの未使用メッセージを取得
    const unusedMessage = user.plan === "premium"
      ? messagesList
          .filter((m: { used_in_letter: boolean }) => !m.used_in_letter)
          .sort((a: { created_at: string }, b: { created_at: string }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
      : null;

    // 誕生日月チェック
    const isBirthdayMonth = profile.birthday
      ? profile.birthday.slice(5, 7) === month.slice(5, 7)
      : false;

    try {
      const { content, summary } = await generateLetter({
        name: profile.name,
        interests: profile.interests ?? [],
        tone: profile.tone ?? "warm",
        previousSummary: prevLetter?.summary,
        userMessage: unusedMessage?.content,
        month,
        birthday: profile.birthday,
        isBirthdayMonth,
      });

      await supabase.from("letters").insert({
        user_id: user.id,
        month,
        content,
        summary,
        status: "generated",
      });

      // メッセージを使用済みにマーク
      if (unusedMessage) {
        await supabase
          .from("messages")
          .update({ used_in_letter: true })
          .eq("user_id", user.id)
          .eq("used_in_letter", false);
      }

      generated++;
    } catch (e) {
      console.error(`Letter generation failed for user ${user.id}:`, e);
      failed++;
    }

    // レート制限対策（Haiku: 50 req/min）
    await new Promise((r) => setTimeout(r, 1300));
  }

  return NextResponse.json({ ok: true, month, generated, failed });
}

function getPrevMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  if (m === 1) return `${y - 1}-12`;
  return `${y}-${String(m - 1).padStart(2, "0")}`;
}

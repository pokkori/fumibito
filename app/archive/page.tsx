import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("fumi_email")?.value;

  if (!email) redirect("/register");

  const supabase = getSupabaseAdmin();
  const { data: user } = await supabase
    .from("users")
    .select("id, plan, status")
    .eq("email", email)
    .single();

  if (!user || user.status !== "active") redirect("/register");

  const { data: letters } = await supabase
    .from("letters")
    .select("id, month, content, status, sent_at, created_at")
    .eq("user_id", user.id)
    .order("month", { ascending: false });

  return (
    <main className="min-h-screen" style={{ background: "#fffdf8" }}>
      <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/90 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-amber-900">✉️ ふみびと</Link>
          <span className="text-xs text-amber-600 font-medium">
            {user.plan === "premium" ? "プレミアム" : "スタンダード"}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black text-amber-950 mb-2">手紙のアーカイブ</h1>
        <p className="text-sm text-gray-500 mb-8">これまでに届いた手紙の一覧です</p>

        {!letters || letters.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-100 p-10 text-center">
            <div className="text-4xl mb-4">✉️</div>
            <p className="text-gray-500">まだ手紙がありません。毎月5〜10日頃にお届けします。</p>
          </div>
        ) : (
          <div className="space-y-6">
            {letters.map((letter) => (
              <div key={letter.id} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-amber-900">
                    {letter.month.replace("-", "年")}月号
                  </p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    letter.status === "sent"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {letter.status === "sent" ? "発送済み" : "準備中"}
                  </span>
                </div>
                <p className="text-amber-900 text-sm leading-loose whitespace-pre-line">
                  {letter.content}
                </p>
                {letter.sent_at && (
                  <p className="text-xs text-gray-400 mt-4">
                    発送日: {new Date(letter.sent_at).toLocaleDateString("ja-JP")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {user.plan === "premium" && (
          <div className="mt-8 bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <p className="font-bold text-amber-900 mb-2">✉️ AIに返信する</p>
            <p className="text-sm text-gray-600 mb-4">
              今月の手紙に返事を書くと、来月の手紙に反映されます。（月1回）
            </p>
            <Link
              href="/reply"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl transition-colors text-sm"
            >
              返信を書く →
            </Link>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/unsubscribe" className="text-xs text-gray-400 hover:text-gray-600 underline">
            解約はこちら
          </Link>
        </div>
      </div>
    </main>
  );
}

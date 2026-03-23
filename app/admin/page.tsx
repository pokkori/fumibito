import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSecret = cookieStore.get("admin_secret")?.value;

  if (adminSecret !== process.env.CRON_SECRET) redirect("/");

  const supabase = getSupabaseAdmin();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [{ count: activeUsers }, { data: pendingLetters }, { data: recentLetters }] =
    await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("letters").select("id, month, status, users(email)").eq("month", currentMonth).eq("status", "generated"),
      supabase.from("letters").select("id, month, status, created_at, users(email)").order("created_at", { ascending: false }).limit(20),
    ]);

  const csvUrl = `/api/admin/export?month=${currentMonth}&secret=${process.env.CRON_SECRET}`;

  return (
    <main className="min-h-screen" style={{ background: "#fffdf8" }}>
      <header className="border-b border-amber-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-amber-900">✉️ ふみびと 管理画面</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* サマリー */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-amber-100 p-5 text-center">
            <p className="text-3xl font-black text-amber-950">{activeUsers ?? 0}</p>
            <p className="text-xs text-gray-500 mt-1">アクティブユーザー</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-5 text-center">
            <p className="text-3xl font-black text-amber-950">{pendingLetters?.length ?? 0}</p>
            <p className="text-xs text-gray-500 mt-1">{currentMonth} 生成済み（未送付）</p>
          </div>
          <div className="bg-amber-500 rounded-xl p-5 text-center">
            <p className="text-3xl font-black text-white">{currentMonth}</p>
            <p className="text-xs text-amber-100 mt-1">今月</p>
          </div>
        </div>

        {/* 今月のアクション */}
        <div className="bg-white rounded-2xl border border-amber-100 p-6 mb-8">
          <h2 className="font-black text-amber-950 mb-4">今月のアクション</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={csvUrl}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
            >
              CSVダウンロード（ラクスル入稿用）
            </a>
            <form action="/api/admin/mark-sent" method="POST">
              <input type="hidden" name="month" value={currentMonth} />
              <input type="hidden" name="secret" value={process.env.CRON_SECRET} />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
              >
                今月分を「送付済み」にする
              </button>
            </form>
          </div>
        </div>

        {/* 直近の手紙一覧 */}
        <div className="bg-white rounded-2xl border border-amber-100 p-6">
          <h2 className="font-black text-amber-950 mb-4">直近の手紙</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-100">
                  <th className="text-left py-2 px-3 font-bold text-amber-700">月</th>
                  <th className="text-left py-2 px-3 font-bold text-amber-700">メール</th>
                  <th className="text-left py-2 px-3 font-bold text-amber-700">ステータス</th>
                  <th className="text-left py-2 px-3 font-bold text-amber-700">生成日</th>
                </tr>
              </thead>
              <tbody>
                {(recentLetters ?? []).map((l) => {
                  const user = Array.isArray(l.users) ? l.users[0] : l.users;
                  return (
                    <tr key={l.id} className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="py-2 px-3">{l.month}</td>
                      <td className="py-2 px-3 text-gray-600">{(user as { email?: string })?.email ?? "-"}</td>
                      <td className="py-2 px-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          l.status === "sent" ? "bg-green-100 text-green-700" :
                          l.status === "generated" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-500">
                        {new Date(l.created_at).toLocaleDateString("ja-JP")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

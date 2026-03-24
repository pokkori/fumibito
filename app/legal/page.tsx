import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="min-h-screen" style={{ background: "#fffdf8" }}>
      <header className="border-b border-amber-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold text-amber-900">️ ふみびと</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10 prose prose-sm">
        <h1 className="text-2xl font-black text-amber-950 mb-8">特定商取引法に基づく表記</h1>

        <table className="w-full text-sm border-collapse">
          <tbody>
            {[
              ["販売事業者", "ポッコリラボ"],
              ["代表者名", "新美"],
              ["所在地", "〒475-0077 愛知県半田市元山町（住所は請求に応じて開示します）"],
              ["連絡先", "X(Twitter) @levona_design へのDM"],
              ["販売URL", "https://fumibito.vercel.app"],
              ["商品の名称", "ふみびと — AIパーソナライズ手紙サブスクリプション"],
              ["販売価格", "スタンダード ¥980/月（税込）/ プレミアム ¥1,980/月（税込）"],
              ["支払方法", "クレジットカード（オンライン決済サービス）"],
              ["支払時期", "初月無料。翌月より毎月自動更新"],
              ["商品の引渡時期", "毎月5〜10日頃、ご登録住所へ郵送"],
              ["返品・キャンセル", "デジタルコンテンツの性質上、原則返品不可。解約は翌月請求停止"],
              ["解約方法", "マイページまたはメールにてご連絡ください"],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-amber-100">
                <td className="py-3 pr-4 font-bold text-amber-900 whitespace-nowrap align-top w-1/3">{label}</td>
                <td className="py-3 text-gray-700 align-top">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="bg-amber-950 text-amber-200 py-8 text-center text-xs mt-16">
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
          <Link href="/unsubscribe" className="hover:text-white">配信停止</Link>
        </div>
        <p>運営: ポッコリラボ（代表 新美）</p>
      </footer>
    </main>
  );
}

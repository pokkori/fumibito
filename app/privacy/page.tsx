import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ background: "#fffdf8" }}>
      <header className="border-b border-amber-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold text-amber-900">✉️ ふみびと</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8 text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-black text-amber-950">プライバシーポリシー</h1>

        {[
          {
            title: "1. 収集する情報",
            body: "当サービスは、手紙のお届けおよびサービス提供のために以下の情報を収集します：氏名（呼び名）、メールアドレス、住所（郵便番号・都道府県以下）、誕生日（任意）、趣味・関心、近況・悩み（任意）、クレジットカード情報（PAY.JPが処理。当サービスには保存されません）。"
          },
          {
            title: "2. 利用目的",
            body: "収集した個人情報は、手紙の生成・郵送、サービスに関するお知らせ（発送通知等）、サービス改善のためにのみ使用します。第三者への提供は行いません（法令に基づく場合を除く）。"
          },
          {
            title: "3. 情報の保管",
            body: "個人情報はSupabase（米国）のセキュアなデータベースに保存されます。住所情報は手紙発送完了後も退会まで保管します。退会後はすみやかに削除します。"
          },
          {
            title: "4. Cookie",
            body: "当サービスはログイン状態の保持のためCookieを使用します。ブラウザの設定からCookieを無効にできますが、一部機能が使用できなくなる場合があります。"
          },
          {
            title: "5. 開示・訂正・削除",
            body: "ご自身の個人情報の開示・訂正・削除をご希望の場合は、X(Twitter) @levona_design へDMでお問い合わせください。本人確認の上、速やかに対応します。"
          },
          {
            title: "6. お問い合わせ",
            body: "プライバシーに関するお問い合わせ: X(Twitter) @levona_design へのDM"
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="font-bold text-amber-950 mb-2">{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}

        <p className="text-xs text-gray-400">制定日: 2026年3月 / ポッコリラボ</p>
      </div>

      <footer className="bg-amber-950 text-amber-200 py-8 text-center text-xs mt-8">
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

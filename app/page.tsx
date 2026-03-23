import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#fffdf8" }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-900">✉️ ふみびと</span>
          <Link
            href="/register"
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors min-h-[44px] inline-flex items-center"
            aria-label="無料で1通手紙をもらう登録ページへ進む"
          >
            無料で1通もらう
          </Link>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-12 text-center">
        <p className="text-amber-600 text-sm font-medium mb-3 tracking-wider">AI LETTER SUBSCRIPTION</p>
        <h1 className="text-3xl md:text-4xl font-black text-amber-950 leading-tight mb-4">
          AIがあなたの話を覚えて、<br />
          毎月手紙を書いてくれる。
        </h1>
        <p className="text-gray-600 text-base mb-8 leading-relaxed">
          5問のアンケートに答えるだけ。<br />
          AIがあなた専用のペンフレンドになって、<br />
          毎月1通、物理的な手紙を郵送します。
        </p>
        <Link
          href="/register"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 min-h-[44px]"
          aria-label="初月無料で手紙サービスに登録する"
        >
          無料で1通もらってみる →
        </Link>
        <p className="text-xs text-gray-400 mt-3">初月無料・カード登録不要・いつでも解約</p>
      </section>

      {/* サンプル手紙 */}
      <section className="max-w-xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-8 relative">
          <div className="absolute -top-3 left-6 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            サンプル手紙
          </div>
          <p className="text-amber-900 text-sm leading-loose font-medium whitespace-pre-line">{`さくらさんへ

桜の季節もあっという間に過ぎてしまいましたね。
先月、転職のことで悩んでいるとおっしゃっていましたが、
その後いかがお過ごしでしょうか。

新しい環境に踏み出す怖さは、きっと誰にでもあります。
でもさくらさんが「一歩踏み出したい」と思っているなら、
その気持ちはもう、半分扉を開けているのだと私は思います。

また来月も、お手紙しますね。

                              ふみびと より`}</p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">※実際はあなただけの内容でお届けします</p>
      </section>

      {/* 問題提起 */}
      <section className="bg-amber-50 py-12 mb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-lg font-bold text-amber-950 mb-6 leading-relaxed">
            「日記は続かない。SNSには書けない。<br />
            でも、誰かに話を聞いてほしい。」
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "😔", text: "話し相手が\nいない" },
              { icon: "📝", text: "記録が\n続かない" },
              { icon: "🎁", text: "プレゼントに\n迷う" },
            ].map((item) => (
              <div key={item.text} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm text-gray-700 font-medium whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方3ステップ */}
      <section className="max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-xl font-black text-amber-950 text-center mb-8">はじめ方はかんたん</h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "5問に答える", desc: "呼び名・趣味・最近の状況など。2分で完了。" },
            { step: "2", title: "AIがあなたの手紙を書く", desc: "前月の内容を覚えながら、毎月違う内容をお届け。" },
            { step: "3", title: "毎月5〜10日頃に届く", desc: "封筒に入った物理的な手紙が自宅に届きます。" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-bold text-amber-950 mb-1">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 料金 */}
      <section className="max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-xl font-black text-amber-950 text-center mb-8">料金プラン</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 shadow-sm">
            <p className="text-sm font-bold text-amber-600 mb-1">スタンダード</p>
            <p className="text-3xl font-black text-amber-950 mb-1">¥980<span className="text-sm font-normal text-gray-400">/月</span></p>
            <p className="text-xs text-gray-400 mb-4">初月無料</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✓</span>毎月1通・A4サイズ</li>
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✓</span>AIが前月を記憶して継続</li>
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✓</span>普通郵便でお届け</li>
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✓</span>いつでも解約可能</li>
            </ul>
          </div>
          <div className="bg-amber-500 rounded-2xl border-2 border-amber-500 p-6 shadow-md relative">
            <div className="absolute -top-3 right-4 bg-amber-900 text-white text-xs font-bold px-2 py-1 rounded-full">おすすめ</div>
            <p className="text-sm font-bold text-amber-100 mb-1">プレミアム</p>
            <p className="text-3xl font-black text-white mb-1">¥1,980<span className="text-sm font-normal text-amber-200">/月</span></p>
            <p className="text-xs text-amber-200 mb-4">初月無料</p>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex items-start gap-2"><span className="shrink-0">✓</span>スタンダードの全機能</li>
              <li className="flex items-start gap-2"><span className="shrink-0">✓</span>月1回Webで返信できる</li>
              <li className="flex items-start gap-2"><span className="shrink-0">✓</span>特殊デザイン封筒</li>
              <li className="flex items-start gap-2"><span className="shrink-0">✓</span>誕生日月は特別デザイン</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl border border-amber-100 p-5 text-center">
          <p className="text-sm font-bold text-amber-900 mb-1">🎁 ギフトプラン</p>
          <p className="text-xs text-gray-500">3ヶ月分 ¥4,200 / 6ヶ月分 ¥7,800 — 贈り先住所に直接届きます</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-xl font-black text-amber-950 text-center mb-8">よくある質問</h2>
        <div className="space-y-3">
          {[
            { q: "住所を登録して大丈夫ですか？", a: "はい。住所は手紙の発送にのみ使用します。第三者への提供は一切行いません。" },
            { q: "AIが書いた手紙ってどんな感じですか？", a: "上のサンプルをご覧ください。400〜600字で、季節感・前月の話題のフォローを含む温かみのある手紙です。" },
            { q: "いつ届きますか？", a: "毎月5〜10日頃を目安にお届けします。発送時にメールでご連絡します。" },
            { q: "プレゼントで別の住所に送れますか？", a: "ギフトプランをご利用ください。贈り先の方がご自身で住所を登録する形になります。" },
            { q: "解約はいつでもできますか？", a: "はい。マイページからいつでも解約できます。解約後は次の更新日まで利用可能です。" },
          ].map((item) => (
            <details key={item.q} className="bg-white rounded-xl border border-amber-100 p-5 group cursor-pointer">
              <summary className="font-bold text-sm text-amber-950 list-none flex justify-between items-center">
                {item.q}
                <span className="text-amber-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 最終CTA */}
      <section className="bg-amber-500 py-16 text-center">
        <h2 className="text-2xl font-black text-white mb-3">まず1通、無料で試してみませんか？</h2>
        <p className="text-amber-100 text-sm mb-8">カード登録不要 · 2分で完了 · いつでも解約</p>
        <Link
          href="/register"
          className="inline-block bg-white hover:bg-amber-50 text-amber-600 font-black text-lg px-10 py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 min-h-[44px]"
          aria-label="無料で手紙サービスをはじめる"
        >
          無料ではじめる →
        </Link>
      </section>

      {/* フッター */}
      <footer className="bg-amber-950 text-amber-200 py-8 text-center text-xs">
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/legal" className="hover:text-white" aria-label="特定商取引法に基づく表記を確認する">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white" aria-label="プライバシーポリシーを確認する">プライバシーポリシー</Link>
          <Link href="/unsubscribe" className="hover:text-white" aria-label="メール配信を停止する">配信停止</Link>
        </div>
        <p>運営: ポッコリラボ（代表 新美）</p>
      </footer>
    </main>
  );
}

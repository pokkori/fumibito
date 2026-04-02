import Link from "next/link";
import StreakBadge from "@/components/StreakBadge";

/* --- SVG Icons (replaces all emoji) --- */
function LetterSvg({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect x="2" y="8" width="28" height="18" rx="3" fill="#F59E0B" />
      <path d="M2 11l14 9 14-9" stroke="#92400E" strokeWidth="2" fill="none" />
      <rect x="2" y="8" width="28" height="18" rx="3" fill="none" stroke="#92400E" strokeWidth="1" />
    </svg>
  );
}
function PersonSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <circle cx="16" cy="10" r="6" fill="#D4A574" />
      <path d="M6 28c0-6 4.5-10 10-10s10 4 10 10" fill="#92400E" />
    </svg>
  );
}
function NotebookSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <rect x="6" y="4" width="20" height="24" rx="2" fill="#FEF3C7" />
      <rect x="4" y="4" width="4" height="24" rx="1" fill="#D97706" />
      <path d="M12 10h10M12 15h8M12 20h6" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function GiftSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <rect x="4" y="14" width="24" height="14" rx="2" fill="#F59E0B" />
      <rect x="2" y="10" width="28" height="6" rx="2" fill="#D97706" />
      <rect x="14" y="10" width="4" height="18" fill="#FEF3C7" />
      <path d="M16 10c-4-6-10-2-6 0h6c4-6 10-2 6 0h-6" stroke="#92400E" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function CheckSvg() {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#F59E0B" />
      <path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronSvg() {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden="true">
      <path d="M7 5l5 5-5 5" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- Floating particles --- */
function FloatingLetters() {
  return (
    <>
      <style>{`
        @keyframes letterFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(5deg); opacity: 0.6; }
          100% { transform: translateY(0) rotate(-5deg); opacity: 0.3; }
        }
      `}</style>
      {[15, 35, 55, 75, 88].map((left, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${left}%`, top: `${20 + i * 12}%`,
          animation: `letterFloat ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
          opacity: 0.15,
        }}>
          <LetterSvg size={16 + i * 2} />
        </div>
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at 30% 20%, rgba(245,158,11,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(217,119,6,0.04) 0%, transparent 50%), #fffdf8',
    }}>
      <FloatingLetters />
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-amber-100" style={{
        background: 'rgba(255,253,248,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold" aria-label="ふみびと トップへ戻る" style={{
            background: 'linear-gradient(135deg, #92400E, #D97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>ふみびと</span>
          <div className="flex items-center gap-3">
            <StreakBadge />
            <Link
              href="/register"
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors min-h-[44px] inline-flex items-center"
              aria-label="無料で1通手紙をもらう登録ページへ進む"
            >
              無料で1通もらう
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-12 text-center relative z-10">
        <p className="text-sm font-medium mb-3 tracking-wider" style={{
          color: '#D97706',
          textShadow: '0 0 10px rgba(217,119,6,0.3)',
          letterSpacing: '0.2em',
        }}>AI LETTER SUBSCRIPTION</p>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4" style={{
          background: 'linear-gradient(135deg, #78350F 0%, #92400E 40%, #D97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(217,119,6,0.2))',
        }}>
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
          className="inline-block text-white font-black text-lg px-10 py-4 rounded-2xl min-h-[56px] transition-all duration-200 hover:-translate-y-1 active:scale-[0.95]"
          aria-label="初月無料で手紙サービスに登録する"
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
            boxShadow: '0 0 30px rgba(245,158,11,0.4), 0 6px 20px rgba(0,0,0,0.15)',
          }}
        >
          <span className="flex items-center gap-2"><LetterSvg size={20} /> 無料で1通もらってみる</span>
        </Link>
        <p className="text-xs text-gray-400 mt-3">初月無料・カード登録不要・いつでも解約</p>
      </section>

      {/* サンプル手紙 */}
      <section className="max-w-xl mx-auto px-4 mb-16">
        <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px' }} className="shadow-md p-8 relative">
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
              { svgEl: <PersonSvg />, text: "話し相手が\nいない" },
              { svgEl: <NotebookSvg />, text: "記録が\n続かない" },
              { svgEl: <GiftSvg />, text: "プレゼントに\n迷う" },
            ].map((item) => (
              <div key={item.text} className="rounded-xl p-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="mb-2 flex justify-center" aria-hidden="true">{item.svgEl}</div>
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
            <div key={item.step} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="flex items-start gap-4 p-5 shadow-sm">
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
          <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '2px solid rgba(245,158,11,0.4)', borderRadius: '16px' }} className="shadow-sm p-6">
            <p className="text-sm font-bold text-amber-600 mb-1">スタンダード</p>
            <p className="text-3xl font-black text-amber-950 mb-1">¥980<span className="text-sm font-normal text-gray-400">/月</span></p>
            <p className="text-xs text-gray-400 mb-4">初月無料</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>毎月1通・A4サイズ</li>
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>AIが前月を記憶して継続</li>
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>普通郵便でお届け</li>
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>いつでも解約可能</li>
            </ul>
          </div>
          <div className="bg-amber-500 rounded-2xl border-2 border-amber-500 p-6 shadow-md relative">
            <div className="absolute -top-3 right-4 bg-amber-900 text-white text-xs font-bold px-2 py-1 rounded-full">おすすめ</div>
            <p className="text-sm font-bold text-amber-100 mb-1">プレミアム</p>
            <p className="text-3xl font-black text-white mb-1">¥1,980<span className="text-sm font-normal text-amber-200">/月</span></p>
            <p className="text-xs text-amber-200 mb-4">初月無料</p>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>スタンダードの全機能</li>
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>月1回Webで返信できる</li>
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>特殊デザイン封筒</li>
              <li className="flex items-start gap-2"><span className="shrink-0"><CheckSvg /></span>誕生日月は特別デザイン</li>
            </ul>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="mt-4 p-5 text-center">
          <p className="text-sm font-bold text-amber-900 mb-1 flex items-center justify-center gap-1"><GiftSvg /> ギフトプラン</p>
          <p className="text-xs text-gray-500">3ヶ月分 ¥4,200 / 6ヶ月分 ¥7,800 -- 贈り先住所に直接届きます</p>
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
            <details key={item.q} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="p-5 group cursor-pointer">
              <summary className="font-bold text-sm text-amber-950 list-none flex justify-between items-center" aria-label={`よくある質問: ${item.q}`}>
                {item.q}
                <span className="group-open:rotate-180 transition-transform" aria-hidden="true"><ChevronSvg /></span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Xシェアボタン */}
      <section className="max-w-xl mx-auto px-4 mb-10 text-center">
        <p className="text-sm text-gray-500 mb-3">気に入ったら友達にシェアしてみませんか？</p>
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent("AIが毎月あなたへ手紙を書いてくれる「ふみびと」。自分の話を聞いてもらえる感覚がある。 #ふみびと https://fumibito.vercel.app")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ふみびとをXでシェアする"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white min-h-[44px] transition-all active:scale-95 hover:opacity-90"
          style={{ background: "#000" }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Xでシェアする
        </a>
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

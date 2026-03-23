import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center" style={{ background: "#fffdf8" }}>
      <div className="max-w-md w-full">
        <div className="text-6xl mb-6">✉️</div>
        <h1 className="text-2xl font-black text-amber-950 mb-4">
          登録が完了しました！
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          毎月5〜10日頃に、あなただけの手紙をお届けします。<br />
          発送時にメールでお知らせします。楽しみにお待ちください。
        </p>

        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 mb-8 text-left space-y-3">
          <p className="text-sm font-bold text-amber-950 mb-3">これからの流れ</p>
          {[
            { num: "1", text: "AIがあなたの情報をもとに手紙を執筆" },
            { num: "2", text: "毎月5〜10日頃にご自宅へ郵送" },
            { num: "3", text: "発送時にメールでお知らせ" },
            { num: "4", text: "翌月、前月の内容を覚えた続きの手紙をお届け" },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {item.num}
              </div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/archive"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            過去の手紙を見る
          </Link>
          <Link
            href="/"
            className="w-full bg-white hover:bg-amber-50 text-amber-700 font-bold py-3 rounded-xl border border-amber-200 transition-colors"
          >
            トップページに戻る
          </Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("AIで心のこもった手紙を作りました！ #ふみびと #AI手紙 https://fumibito.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg bg-black hover:bg-gray-800 text-white font-medium transition-colors inline-flex items-center justify-center min-h-[44px]"
            aria-label="ふみびとを使ったことをXにシェアする"
          >
            Xにシェア
          </a>
        </div>
      </div>
    </main>
  );
}

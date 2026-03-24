"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: "#fffdf8" }}>
      <div className="max-w-md w-full text-center">
        <Link href="/" className="text-lg font-bold text-amber-900 block mb-8">️ ふみびと</Link>

        {submitted ? (
          <div>
            <div className="text-4xl mb-4"></div>
            <h1 className="text-xl font-black text-amber-950 mb-4">解約申請を受け付けました</h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              次回更新日の請求は発生しません。<br />
              今月号の手紙はお届けします。<br />
              またいつでも戻ってきてください。
            </p>
            <Link href="/" className="text-sm text-amber-600 hover:underline">トップに戻る</Link>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-black text-amber-950 mb-3">解約手続き</h1>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              解約後も今月号の手紙はお届けします。<br />
              翌月からの請求・発送が停止されます。
            </p>
            <form onSubmit={handleSubmit} className="text-left">
              <label className="text-xs font-bold text-amber-700 mb-2 block">登録メールアドレス</label>
              <input
                type="email"
                required
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors mb-6"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="解約する"
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? "処理中..." : "解約する"}
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              <Link href="/" className="hover:underline">キャンセルしてトップに戻る</Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

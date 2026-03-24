"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReplyPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "送信に失敗しました");
        return;
      }
      router.push("/archive?replied=1");
    } catch {
      setError("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12" style={{ background: "#fffdf8" }}>
      <div className="max-w-md w-full">
        <Link href="/" className="text-lg font-bold text-amber-900 block mb-8 text-center">️ ふみびと</Link>

        <h1 className="text-xl font-black text-amber-950 mb-3">AIへの返信</h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          今月の手紙への返事を書いてください。<br />
          来月の手紙の内容に反映されます。（月1回）
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="先月の手紙を読んで、こんなことを感じました..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-2xl px-5 py-4 text-base outline-none transition-colors resize-none mb-2"
            maxLength={500}
          />
          <p className="text-xs text-gray-400 text-right mb-6">{content.length}/500</p>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "送信中..." : "返信を送る ️"}
          </button>
        </form>

        <p className="text-center mt-4">
          <Link href="/archive" className="text-xs text-gray-400 hover:underline">戻る</Link>
        </p>
      </div>
    </main>
  );
}

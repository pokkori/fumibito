"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [letterText, setLetterText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamDone, setStreamDone] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // 登録フォームからSearchParamsで渡された情報を取得
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const interests = params.get("interests") || "";
    const tone = (params.get("tone") || "warm") as "warm" | "formal" | "cheerful";
    const worry = params.get("worry") || "";

    // プレビュー生成対象情報がない場合は何もしない
    if (!name) return;

    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchStream() {
      setStreaming(true);
      setLetterText("");
      setStreamDone(false);
      setStreamError(false);

      try {
        const res = await fetch("/api/preview-letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            interests: interests ? interests.split(",").filter(Boolean) : [],
            tone,
            worry,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          setStreamError(true);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setLetterText(accumulated);
        }

        setStreamDone(true);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setStreamError(true);
      } finally {
        setStreaming(false);
      }
    }

    fetchStream();

    return () => {
      controller.abort();
    };
  }, []);

  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const name = params?.get("name") || "";
  const showPreview = Boolean(name);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
      style={{ background: "#fffdf8" }}
    >
      <div className="max-w-md w-full">
        <div className="text-6xl mb-6">️</div>
        <h1 className="text-2xl font-black text-amber-950 mb-4">
          登録が完了しました！
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          毎月5〜10日頃に、あなただけの手紙をお届けします。
          <br />
          発送時にメールでお知らせします。楽しみにお待ちください。
        </p>

        {/* Streamingプレビューセクション */}
        {showPreview && (
          <div className="mb-8">
            <p className="text-sm font-bold text-amber-700 mb-3 text-left">
              {streaming && !streamDone
                ? "AIがあなたの手紙を書いています..."
                : streamDone
                ? "AIがあなた専用のサンプル手紙を生成しました"
                : streamError
                ? "プレビューを読み込めませんでした"
                : ""}
            </p>

            {(streaming || streamDone) && !streamError && (
              <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 text-left relative overflow-hidden">
                {/* 書いている最中のタイプライター風アニメ */}
                {streaming && !streamDone && (
                  <div className="absolute top-3 right-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                  </div>
                )}
                <p className="text-amber-900 text-sm leading-loose whitespace-pre-line">
                  {letterText}
                  {streaming && !streamDone && (
                    <span className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5 align-middle animate-pulse" />
                  )}
                </p>
              </div>
            )}

            {streamError && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-sm text-amber-800">
                プレビューの生成に失敗しました。実際の手紙は毎月5〜10日頃にお届けします。
              </div>
            )}
          </div>
        )}

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
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-center"
            aria-label="過去の手紙一覧を見る"
          >
            過去の手紙を見る
          </Link>
          <Link
            href="/"
            className="w-full bg-white hover:bg-amber-50 text-amber-700 font-bold py-3 rounded-xl border border-amber-200 transition-colors min-h-[44px] flex items-center justify-center"
            aria-label="トップページに戻る"
          >
            トップページに戻る
          </Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "AIで心のこもった手紙を作りました！ #ふみびと #AI手紙 https://fumibito.vercel.app"
            )}`}
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

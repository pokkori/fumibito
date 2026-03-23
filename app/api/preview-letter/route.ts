import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    interests?: string[];
    tone?: "warm" | "formal" | "cheerful";
    worry?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = body.name?.trim() || "あなた";
  const interests = Array.isArray(body.interests) ? body.interests.slice(0, 5) : [];
  const tone = body.tone ?? "warm";
  const worry = body.worry?.trim() || "";

  const toneGuide = {
    warm: "温かく、共感的で、まるで古い友人のような自然な文体",
    formal: "丁寧で落ち着いた、品のある文体",
    cheerful: "明るくポジティブで、元気が出るような文体",
  }[tone];

  const now = new Date();
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const currentMonthJa = `${now.getFullYear()}年${monthNames[now.getMonth()]}`;

  const worryContext = worry
    ? `\n【最近の状況・悩み】\n${worry}`
    : "";

  const interestsText = interests.length > 0
    ? interests.join("、")
    : "様々なこと";

  const prompt = `あなたはAIペンフレンド「ふみびと」です。
以下の情報をもとに、${name}さんへのサンプル手紙を400〜600字で書いてください。

【文体】${toneGuide}
【現在の月】${currentMonthJa}
【趣味・関心】${interestsText}
（初回の手紙です）${worryContext}

【手紙の構成】
1. 季節の挨拶（今の季節感を取り入れる）
2. ${name}さんへの温かいメッセージ（押しつけがましくなく）
3. 締めの言葉「また来月も、お手紙しますね。」

【重要なルール】
- 宛名: 「${name}へ」で始める
- 署名: 「ふみびと より」で終わる
- AI感を出さない。人間が書いたような自然な手紙
- アドバイスや説教はしない。共感と温かさを大切に
- 400〜600字厳守
- 要約は不要。手紙本文のみ書く`;

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface LetterContext {
  name: string;
  interests: string[];
  tone: "warm" | "formal" | "cheerful";
  previousSummary?: string;
  userMessage?: string;
  month: string; // e.g. "2026-04"
  birthday?: string; // YYYY-MM-DD
  isBirthdayMonth?: boolean;
}

export async function generateLetter(ctx: LetterContext): Promise<{ content: string; summary: string }> {
  const [year, monthNum] = ctx.month.split("-").map(Number);
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const currentMonthJa = `${year}年${monthNames[monthNum - 1]}`;

  const toneGuide = {
    warm: "温かく、共感的で、まるで古い友人のような自然な文体",
    formal: "丁寧で落ち着いた、品のある文体",
    cheerful: "明るくポジティブで、元気が出るような文体",
  }[ctx.tone];

  const prevContext = ctx.previousSummary
    ? `\n【前回の手紙の要約】\n${ctx.previousSummary}`
    : "\n（初回の手紙です）";

  const userMsg = ctx.userMessage
    ? `\n【ユーザーからの返信】\n${ctx.userMessage}`
    : "";

  const birthdayNote = ctx.isBirthdayMonth
    ? "\n※今月は誕生日月です。誕生日をお祝いする特別な内容を含めてください。"
    : "";

  const prompt = `あなたはAIペンフレンド「ふみびと」です。
以下の情報をもとに、${ctx.name}さんへの手紙を400〜600字で書いてください。

【文体】${toneGuide}
【現在の月】${currentMonthJa}
【趣味・関心】${ctx.interests.join("、")}
${prevContext}${userMsg}${birthdayNote}

【手紙の構成】
1. 季節の挨拶（今の季節感を取り入れる）
2. 前回の内容のフォロー、または初回なら最初の状況への共感
3. ${ctx.name}さんへの温かいメッセージ（押しつけがましくなく）
4. 締めの言葉「また来月も、お手紙しますね。」

【重要なルール】
- 宛名: 「${ctx.name}へ」で始める
- 署名: 「ふみびと より」で終わる
- AI感を出さない。人間が書いたような自然な手紙
- アドバイスや説教はしない。共感と温かさを大切に
- 400〜600字厳守

手紙の後に改行2つを挟んで、次の月の手紙作成用に今回の手紙の要約を100〜150字で書いてください。要約の冒頭は「###SUMMARY###」とだけ書いてください。`;

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const parts = text.split("###SUMMARY###");
  const content = parts[0].trim();
  const summary = (parts[1] ?? "").trim().slice(0, 200);

  return { content, summary };
}

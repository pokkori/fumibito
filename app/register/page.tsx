"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const PayjpModal = dynamic(() => import("@/components/PayjpModal"), { ssr: false });

const INTERESTS = [
  "読書", "映画", "音楽", "料理", "旅行", "ガーデニング",
  "スポーツ", "アート", "ゲーム", "ファッション", "美容", "写真",
  "カフェ巡り", "アニメ", "ペット", "ヨガ・瞑想",
];

type Step = 1 | 2 | 3 | 4 | 5 | "plan" | "payment";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "premium">("standard");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    birthday: "",
    interests: [] as string[],
    worry: "",
    tone: "warm" as "warm" | "formal" | "cheerful",
    email: "",
    postal_code: "",
    address: "",
    address_name: "",
  });

  const toggleInterest = (item: string) => {
    setForm((prev) => {
      const has = prev.interests.includes(item);
      if (has) return { ...prev, interests: prev.interests.filter((i) => i !== item) };
      if (prev.interests.length >= 5) return prev;
      return { ...prev, interests: [...prev.interests, item] };
    });
  };

  const canNext = () => {
    if (step === 1) return form.name.trim().length > 0;
    if (step === 2) return form.interests.length > 0;
    if (step === 3) return form.worry.trim().length > 0;
    if (step === 4) return true;
    if (step === 5) return (
      form.email.includes("@") &&
      form.postal_code.trim().length >= 7 &&
      form.address.trim().length > 0 &&
      form.address_name.trim().length > 0
    );
    return true;
  };

  const nextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
    else if (step === 4) setStep(5);
    else if (step === 5) setStep("plan");
    else if (step === "plan") setStep("payment");
  };

  const planLabel =
    selectedPlan === "standard"
      ? "スタンダードプラン ¥980/月（初月無料）— 毎月1通のパーソナル手紙をお届けします"
      : "プレミアムプラン ¥1,980/月（初月無料）— 毎月1通 + Web返信機能 + 特殊デザイン封筒";

  const extraBody: Record<string, string> = {
    email: form.email,
    name: form.name,
    birthday: form.birthday,
    interests: form.interests.join(","),
    worry: form.worry,
    tone: form.tone,
    postal_code: form.postal_code,
    address: form.address,
    address_name: form.address_name,
    plan: selectedPlan,
  };

  const STEPS_LABEL = ["1", "2", "3", "4", "5"];
  const currentStepNum =
    step === "plan" ? 6 :
    step === "payment" ? 7 :
    Number(step);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12" style={{ background: "#fffdf8" }}>
      {/* ヘッダー */}
      <div className="mb-8 text-center">
        <span className="text-2xl font-black text-amber-900">️ ふみびと</span>
        <p className="text-sm text-gray-500 mt-1">登録フォーム</p>
      </div>

      {/* プログレスバー */}
      {step !== "payment" && (
        <div className="flex gap-2 mb-10">
          {STEPS_LABEL.map((s, i) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                currentStepNum > i + 1
                  ? "bg-amber-500 text-white"
                  : currentStepNum === i + 1
                  ? "bg-amber-500 text-white ring-4 ring-amber-200"
                  : "bg-amber-100 text-amber-400"
              }`}
            >
              {currentStepNum > i + 1 ? "" : s}
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl border border-amber-100 shadow-sm p-8">
        {/* Step 1: 呼び名 */}
        {step === 1 && (
          <div>
            <p className="text-xs text-amber-500 font-bold mb-1 tracking-wider">STEP 1 / 5</p>
            <h2 className="text-xl font-black text-amber-950 mb-2">どのように呼びますか？</h2>
            <p className="text-sm text-gray-500 mb-6">手紙の冒頭に使います（例: さくらさん、田中さん、たんたん）</p>
            <input
              type="text"
              placeholder="例: さくらさん"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
              maxLength={20}
              aria-label="手紙で使う呼び名を入力"
            />
          </div>
        )}

        {/* Step 2: 趣味 */}
        {step === 2 && (
          <div>
            <p className="text-xs text-amber-500 font-bold mb-1 tracking-wider">STEP 2 / 5</p>
            <h2 className="text-xl font-black text-amber-950 mb-2">好きなことを教えてください</h2>
            <p className="text-sm text-gray-500 mb-6">最大5つまで選べます（{form.interests.length}/5）</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleInterest(item)}
                  aria-label={`${item}を${form.interests.includes(item) ? "選択解除" : "選択"}する`}
                  aria-pressed={form.interests.includes(item)}
                  className={`px-3 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                    form.interests.includes(item)
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "bg-white border-amber-200 text-amber-700 hover:border-amber-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 最近の状況 */}
        {step === 3 && (
          <div>
            <p className="text-xs text-amber-500 font-bold mb-1 tracking-wider">STEP 3 / 5</p>
            <h2 className="text-xl font-black text-amber-950 mb-2">最近どんな状況ですか？</h2>
            <p className="text-sm text-gray-500 mb-6">悩み・嬉しいこと・状況など何でも。手紙の話題になります。</p>
            <textarea
              placeholder="例: 仕事の人間関係に悩んでいます。転職を考え始めたところです。"
              value={form.worry}
              onChange={(e) => setForm({ ...form, worry: e.target.value })}
              rows={5}
              className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors resize-none"
              maxLength={300}
              aria-label="最近の状況や悩みを入力（300文字以内）"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{form.worry.length}/300</p>
          </div>
        )}

        {/* Step 4: トーン + 誕生日 */}
        {step === 4 && (
          <div>
            <p className="text-xs text-amber-500 font-bold mb-1 tracking-wider">STEP 4 / 5</p>
            <h2 className="text-xl font-black text-amber-950 mb-2">手紙の雰囲気を選んでください</h2>
            <p className="text-sm text-gray-500 mb-5">どんなトーンで書いてほしいですか？</p>
            <div className="space-y-3 mb-8">
              {[
                { key: "warm", label: " 温かく・共感的", desc: "まるで古い友人のような自然な文体" },
                { key: "formal", label: " 丁寧で品のある", desc: "落ち着いた大人の手紙" },
                { key: "cheerful", label: "️ 明るく元気に", desc: "ポジティブで気分が上がる手紙" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setForm({ ...form, tone: t.key as typeof form.tone })}
                  aria-label={`文体を${t.label}に設定する`}
                  aria-pressed={form.tone === t.key}
                  className={`w-full text-left border-2 rounded-xl px-4 py-4 transition-colors ${
                    form.tone === t.key
                      ? "border-amber-500 bg-amber-50"
                      : "border-amber-100 hover:border-amber-300"
                  }`}
                >
                  <p className="font-bold text-amber-950">{t.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
            <div>
              <p className="font-bold text-amber-950 mb-2 text-sm"> 誕生日（任意）</p>
              <p className="text-xs text-gray-500 mb-3">誕生日月に特別なメッセージをお届けします</p>
              <input
                type="date"
                value={form.birthday}
                onChange={(e) => setForm({ ...form, birthday: e.target.value })}
                className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                aria-label="誕生日を入力（任意）"
              />
            </div>
          </div>
        )}

        {/* Step 5: 住所・メール */}
        {step === 5 && (
          <div>
            <p className="text-xs text-amber-500 font-bold mb-1 tracking-wider">STEP 5 / 5</p>
            <h2 className="text-xl font-black text-amber-950 mb-2">お届け先を教えてください</h2>
            <p className="text-sm text-gray-500 mb-6">手紙の郵送先です。第三者への提供は一切行いません。</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-700 mb-1 block">メールアドレス *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-amber-700 mb-1 block">郵便番号 *</label>
                <input
                  type="text"
                  placeholder="1234567（ハイフンなし）"
                  value={form.postal_code}
                  onChange={(e) => setForm({ ...form, postal_code: e.target.value.replace(/-/g, "") })}
                  className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                  maxLength={8}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-amber-700 mb-1 block">住所 *</label>
                <input
                  type="text"
                  placeholder="都道府県から番地・部屋番号まで"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-amber-700 mb-1 block">宛名（封筒に印刷） *</label>
                <input
                  type="text"
                  placeholder="例: 田中 さくら 様"
                  value={form.address_name}
                  onChange={(e) => setForm({ ...form, address_name: e.target.value })}
                  className="w-full border-2 border-amber-200 focus:border-amber-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* プラン選択 */}
        {step === "plan" && (
          <div>
            <h2 className="text-xl font-black text-amber-950 mb-2 text-center">プランを選んでください</h2>
            <p className="text-sm text-gray-500 text-center mb-6">初月無料・いつでも解約可能</p>
            <div className="space-y-4">
              <button
                onClick={() => setSelectedPlan("standard")}
                aria-label="スタンダードプランを選択する"
                aria-pressed={selectedPlan === "standard"}
                className={`w-full text-left border-2 rounded-2xl p-5 transition-colors ${
                  selectedPlan === "standard" ? "border-amber-500 bg-amber-50" : "border-amber-100 hover:border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-amber-950">スタンダード</p>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "standard" ? "border-amber-500 bg-amber-500" : "border-amber-300"}`}>
                    {selectedPlan === "standard" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-2xl font-black text-amber-950">¥980<span className="text-sm font-normal text-gray-400">/月</span></p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li> 毎月1通・AIパーソナライズ手紙</li>
                  <li> AIが前月を記憶して継続</li>
                  <li> 普通郵便でお届け</li>
                </ul>
              </button>

              <button
                onClick={() => setSelectedPlan("premium")}
                aria-label="プレミアムプランを選択する"
                aria-pressed={selectedPlan === "premium"}
                className={`w-full text-left border-2 rounded-2xl p-5 transition-colors relative ${
                  selectedPlan === "premium" ? "border-amber-500 bg-amber-500 text-white" : "border-amber-300 hover:border-amber-500"
                }`}
              >
                <div className="absolute -top-3 right-4 bg-amber-900 text-white text-xs font-bold px-2 py-1 rounded-full">おすすめ</div>
                <div className="flex items-center justify-between mb-2">
                  <p className={`font-bold ${selectedPlan === "premium" ? "text-white" : "text-amber-950"}`}>プレミアム</p>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "premium" ? "border-white bg-white" : "border-amber-300"}`}>
                    {selectedPlan === "premium" && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                  </div>
                </div>
                <p className={`text-2xl font-black ${selectedPlan === "premium" ? "text-white" : "text-amber-950"}`}>
                  ¥1,980<span className="text-sm font-normal opacity-70">/月</span>
                </p>
                <ul className={`mt-3 space-y-1 text-sm ${selectedPlan === "premium" ? "text-amber-100" : "text-gray-600"}`}>
                  <li> スタンダードの全機能</li>
                  <li> 月1回Webで返信できる</li>
                  <li> 特殊デザイン封筒</li>
                  <li> 誕生日月は特別デザイン</li>
                </ul>
              </button>
            </div>
          </div>
        )}

        {/* 決済ボタン表示ステップ */}
        {step === "payment" && (
          <div className="text-center">
            <div className="text-5xl mb-4">️</div>
            <h2 className="text-xl font-black text-amber-950 mb-3">最後のステップです</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              カード情報を登録して、<br />
              {form.name}さんへの手紙を始めましょう。
            </p>
            <div className="bg-amber-50 rounded-xl border border-amber-100 p-4 mb-6 text-left text-sm space-y-1 text-gray-700">
              <p>️ 毎月5〜10日頃にお届け</p>
              <p> 初月無料・翌月から課金開始</p>
              <p> マイページからいつでも解約可能</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-lg py-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 min-h-[44px]"
              aria-label="カード情報を入力してふみびとに登録する"
            >
              カード情報を入力して登録 →
            </button>
            <p className="text-xs text-gray-400 mt-3">
              {selectedPlan === "standard" ? "¥980/月" : "¥1,980/月"}（初月無料）
            </p>
          </div>
        )}

        {/* Nextボタン */}
        {step !== "payment" && (
          <button
            onClick={nextStep}
            disabled={!canNext()}
            className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 min-h-[44px]"
            aria-label={step === "plan" ? "選択したプランで次へ進む" : "次のステップへ進む"}
          >
            {step === "plan" ? "この内容で進む →" : "次へ →"}
          </button>
        )}
      </div>

      {showModal && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          planLabel={planLabel}
          plan={selectedPlan}
          extraBody={extraBody}
          apiPath="/api/payjp/checkout"
          onSuccess={() => {
            const params = new URLSearchParams({
              name: form.name,
              interests: form.interests.join(","),
              tone: form.tone,
              worry: form.worry,
            });
            router.push(`/success?${params.toString()}`);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}

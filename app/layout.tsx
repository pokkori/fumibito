import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const SITE_URL = "https://fumibito.vercel.app";
const TITLE = "ふみびと｜AIがあなたの話を覚えて、毎月手紙を書いてくれる";
const DESC = "登録するだけで、AIがあなた専用の手紙を毎月1通郵送します。前月の内容を記憶して続く、世界にひとつのペンフレンド体験。初月無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✉️</text></svg>",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "ふみびと",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ふみびと",
      url: SITE_URL,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "980",
        priceCurrency: "JPY",
        description: "スタンダードプラン ¥980/月",
      },
      description: DESC,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "AIが書いた手紙はどんな内容ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "登録時にご入力いただいたお名前・趣味・状況をもとに、AIが400〜600字のパーソナルな手紙を書きます。前月の内容を記憶して続くので、毎月違う内容をお届けします。",
          },
        },
        {
          "@type": "Question",
          name: "いつ届きますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "毎月5〜10日頃にお届けします。発送時にメールでお知らせします。",
          },
        },
        {
          "@type": "Question",
          name: "解約はいつでもできますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、いつでも解約可能です。次回の更新前に解約すれば翌月分の請求は発生しません。",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

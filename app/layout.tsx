import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://fumibito.vercel.app";
const TITLE = "ふみびと｜AIがあなたの話を覚えて、毎月手紙を書いてくれる";
const DESC = "登録するだけで、AIがあなた専用の手紙を毎月1通郵送します。前月の内容を記憶して続く、世界にひとつのペンフレンド体験。初月無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>️</text></svg>",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "ふみびと",
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "ふみびと" }],
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
        {
          "@type": "Question",
          name: "初月無料とはどういう仕組みですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "初月は無料で手紙をお届けします。2ヶ月目以降は月額980円（スタンダードプラン）が発生します。初月無料期間中に解約いただければ費用は一切かかりません。",
          },
        },
        {
          "@type": "Question",
          name: "手紙は本物の紙で届きますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、AIが書いた内容を印刷・封入して、実際のポストに郵送します。デジタルではなくアナログな紙の手紙としてお手元に届きます。",
          },
        },
        {
          "@type": "Question",
          name: "自分の情報はどのように使われますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ご登録いただいたお名前・趣味・状況はAIが手紙を生成するためにのみ使用します。第三者への提供や広告目的での利用は一切行いません。詳細はプライバシーポリシーをご確認ください。",
          },
        },
        {
          "@type": "Question",
          name: "手紙の内容は毎月違いますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい。AIが前月の手紙の内容を記憶して、会話が続くように次の手紙を書きます。季節や出来事を反映したパーソナルな内容になるため、毎月新鮮な手紙をお楽しみいただけます。",
          },
        },
        {
          "@type": "Question",
          name: "プランの変更はできますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、マイページからプランの変更が可能です。スタンダード（¥980/月）からプレミアム（¥1,980/月）へのアップグレードや、ダウングレードも対応しています。",
          },
        },
        {
          "@type": "Question",
          name: "贈り物として送ることはできますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、ギフト機能に対応しています。相手の住所とプロフィール情報を入力して申し込むことで、大切な方への特別なプレゼントとして手紙を定期的にお届けできます。",
          },
        },
        {
          "@type": "Question",
          name: "海外在住でも利用できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "現在は日本国内の住所のみ対応しています。海外発送には対応しておりません。海外在住の方からのご要望が多い場合は対応を検討いたします。",
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
        {(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? 'ca-pub-XXXXXXXX') !== 'ca-pub-XXXXXXXX' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

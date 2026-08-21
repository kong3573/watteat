import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://watteat.shop'),
  title: {
    default: "왓잇 (Watteat) - 오늘 뭐먹지? 로켓프레시 당일·새벽도착 밀키트 & 레시피",
    template: "%s | 왓잇 (Watteat)",
  },
  description: "오늘 저녁 뭐 먹을지 고민될 땐? 왓잇(Watteat)에서 3초 만에 메뉴 결정! 방송 화제 요리부터 15분 완성 밀키트, 신선 식재료를 로켓프레시로 즉시 주문하세요.",
  keywords: [
    "왓잇",
    "watteat",
    "오늘뭐먹지",
    "내일뭐먹지",
    "저녁메뉴추천",
    "점심메뉴추천",
    "밀키트추천",
    "쿠팡 밀키트",
    "로켓프레시",
    "새벽배송",
    "당일배송",
    "간단요리",
    "자취요리",
    "1인식단",
    "메뉴룰렛",
    "식단추천",
  ],
  authors: [{ name: "왓잇 (Watteat)" }],
  creator: "왓잇 (Watteat)",
  publisher: "왓잇 (Watteat)",
  applicationName: "왓잇 (Watteat)",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "왓잇 (Watteat)",
    title: "왓잇 (Watteat) - 오늘 뭐먹지? 3초 메뉴 결정 & 로켓배송",
    description: "매일 반복되는 끼니 고민 끝! 왓잇(Watteat) 룰렛으로 메뉴 정하고 오늘 저녁 로켓프레시로 받아보세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "왓잇 (Watteat) - 오늘 뭐먹지? 3초 메뉴 결정 & 로켓배송",
    description: "매일 반복되는 끼니 고민 끝! 룰렛으로 메뉴 정하고 오늘 저녁 도착으로 받아보세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      'naver-site-verification':
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || 'c2f6850e01b6755f71ec076e1222e3f842d98900',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://watteat.shop';

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '왓잇 (Watteat)',
    alternateName: ['Watteat', '왓잇', '오늘뭐먹지 왓잇'],
    url: siteUrl,
    description: '매일 반복되는 식사 메뉴 고민 해결! 로켓프레시 당일/새벽배송 밀키트 & 간편 레시피 큐레이션 플랫폼',
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}

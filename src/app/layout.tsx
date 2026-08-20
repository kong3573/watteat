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
  title: "오늘 뭐먹지, 내일 뭐먹지? - 로켓프레시 당일/새벽배송 밀키트 큐레이션",
  description: "오전 주문 시 오늘 저녁 7시 문 앞 도착! 퇴근 후 15분 컷 밀키트와 신선 식재료를 3초 만에 결정하고 바로 주문하세요.",
  keywords: "오늘뭐먹지, 내일뭐먹지, 쿠팡 밀키트, 로켓프레시, 당일배송, 저녁메뉴추천, 간단요리, 1인식단",
  openGraph: {
    title: "오늘 뭐먹지, 내일 뭐먹지? - 3초 메뉴 결정 & 로켓배송",
    description: "매일 반복되는 끼니 고민 끝! 룰렛으로 메뉴 정하고 오늘 저녁 도착으로 받아보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Nanum_Myeongjo, Gowun_Dodum } from "next/font/google";
import "./globals.css";

const nanum = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ["latin"],
  variable: '--font-nanum',
});

const dodum = Gowun_Dodum({
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-dodum',
});

export const metadata: Metadata = {
  title: "시그널 — 그 시절 그 사람에게",
  description: "이름도 연락처도 모르지만 같은 교실에 있었던 당신에게",
  manifest: "/manifest.json",
  openGraph: {
    title: "시그널 — 그 시절 그 사람에게",
    description: "이름도 연락처도 모르지만 같은 교실에 있었던 당신에게 어둠 속 포스트잇을 붙입니다.",
    siteName: "Signal",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0a07',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanum.variable} ${dodum.variable} font-dodum antialiased`}>
        {children}
      </body>
    </html>
  );
}

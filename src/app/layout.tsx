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
  title: "Stik — RECALL YOUR MEMORIES",
  description: "이름은 가물가물해도 문득 그리워지는 그 시절 우리들",
  manifest: "/manifest.json",
  openGraph: {
    title: "Stik — RECALL YOUR MEMORIES",
    description: "이름은 가물가물해도 문득 그리워지는 그 시절 우리들. 어둠 속 포스트잇을 붙입니다.",
    siteName: "Stik",
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

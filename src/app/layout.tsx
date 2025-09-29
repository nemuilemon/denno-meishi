import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "./components/ParticleBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "もうちゃん - ポートフォリオ",
  description: "AIエンジニア・ソフトウェア開発者のポートフォリオサイト。機械学習からフルスタック開発まで、最新技術を活用したソリューション開発に取り組んでいます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}

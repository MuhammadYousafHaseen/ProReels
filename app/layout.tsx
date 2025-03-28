import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ProReels",
  description: "A powerful video-sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Providers>
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </Providers>
    </div>
  );
}

import { Html, Head, Main, NextScript } from "next/document";
import { Inter } from "next/font/google"; // ✅ Import Inter font

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Document() {
  return (
    <Html lang="en" className={inter.variable}> {/* ✅ Apply Inter font */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

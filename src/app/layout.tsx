import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const grotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const retro = VT323({
  variable: "--font-retro",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sandra Tang — Personal Site",
  description:
    "Sandra Tang. CS @ Cornell University. Builder, musician, student.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${mono.variable} ${retro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <div className="grain-overlay" aria-hidden />
        <Nav />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TerminalProvider from "@/components/terminal/TerminalProvider";
import FloatingTerminal from "@/components/terminal/FloatingTerminal";

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
  title: "Sandra Tang",
  description:
    "Sandra Tang: CS at Cornell, Intelligence lead on CUAir, violin and piano. The terminal on the homepage works.",
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
        <TerminalProvider>
          <Nav />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <FloatingTerminal />
        </TerminalProvider>
      </body>
    </html>
  );
}

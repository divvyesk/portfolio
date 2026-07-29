import type { Metadata, Viewport } from "next";
import { Bangers, Barlow_Condensed, JetBrains_Mono, Permanent_Marker, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import ResumeDock from "@/components/ResumeDock";
import ChatWidget from "@/components/ChatWidget";
import Halftone from "@/components/Halftone";
import { profile } from "@/lib/resume";

const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.blurb,
  keywords: ["Divvye Kansara", "Full Stack Developer", "React", "Next.js", "AI Engineer", "Portfolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1225",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${bangers.variable} ${playfair.variable} ${barlow.variable} ${jetbrains.variable} ${marker.variable} antialiased`}
      >
        <SmoothScroll />
        <ScrollProgress />
        <Halftone />
        <Navbar />
        <ResumeDock />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

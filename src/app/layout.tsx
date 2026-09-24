import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { IMG, wix } from "@/data/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const body = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cherriesdiner.com"),
  title: "Cherries Diner | Best Pittsburgh Breakfast",
  description:
    "Family-owned diner at 115 Forbes Ave in downtown Pittsburgh. Big breakfasts and hearty lunches, Monday to Saturday, 8am to 2pm.",
  icons: { icon: wix(IMG.logo, 64, 64) },
  openGraph: { type: "website", images: [wix(IMG.pancakes, 1200, 630)] },
};

export const viewport: Viewport = { themeColor: "#c8231a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed -left-[9999px] top-2 z-[60] rounded-full bg-ink px-4 py-2.5 text-page focus:left-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";
import type { ReactNode } from "react";
import Image from "next/image";
import { Cinzel, Outfit } from "next/font/google";

const heading = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-heading",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  title: "Land Command",
  description: "AI-driven land search and listings",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="relative bg-black text-white font-body">
        {/* Fixed top navigation bar */}
        <header className="fixed top-0 left-0 z-50 w-full h-32 flex items-center justify-between px-10 bg-black/70 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center gap-3">
            {/* Logo image with fixed dimensions (prevents fullscreen flash) */}
            <Image
              src="/sight_only.png"
              alt="Land Command logo"
              width={80}
              height={80}
              priority
              style={{ width: 80, height: 80 }}
            />
            <span className="font-heading text-4xl md:text-5xl font-bold tracking-wide">
              Land Command
            </span>
          </div>
          <nav className="flex gap-8 text-lg">
            <a href="/buy" className="hover:text-green-400 transition">
              Buy
            </a>
            <a href="/sell" className="hover:text-green-400 transition">
              Sell
            </a>
            <a href="/listings" className="hover:text-green-400 transition">
              Listings
            </a>
            <a href="/about" className="hover:text-green-400 transition">
              About
            </a>
          </nav>
        </header>

        {/* Page content padded below header */}
        <main className="pt-32">{children}</main>
      </body>
    </html>
  );
}

}

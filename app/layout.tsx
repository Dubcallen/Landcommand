import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Cinzel } from "next/font/google";

// Premium Roman-inspired font
const brand = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Land Command",
  description: "AI-powered land marketing and builder partnerships.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white">
        {/* Big Sticky Header */}
        <header className="fixed top-0 left-0 z-50 w-full h-32 flex items-center justify-between px-10 bg-black/70 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center space-x-5">
            <img
              src="/sight_only.png"
              alt="Land Command logo"
              className="h-20 w-20"
            />
            <span
              className={`${brand.className} text-4xl md:text-5xl font-bold tracking-wide`}
            >
              Land Command
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-10 text-lg font-medium">
            <a href="/listings" className="hover:text-green-400">
              Listings
            </a>
            <a href="/buy" className="hover:text-green-400">
              Ask Land AI
            </a>
            <a href="/contact" className="hover:text-green-400">
              Contact
            </a>
          </nav>
        </header>

        {/* Push content down below the tall header */}
        <main className="pt-32">{children}</main>
      </body>
    </html>
  );
}

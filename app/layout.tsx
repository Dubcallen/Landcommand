import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

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
              alt="LandCommand Logo"
              className="h-20 w-20"
            />
            <span className="text-3xl font-bold tracking-tight">
              LandCommand.ai
            </span>
          </div>
          <nav className="space-x-10 text-lg font-medium">
            <a href="/listings" className="hover:text-green-400">
              Listings
            </a>
            <a href="/buy" className="hover:text-green-400">
              Buy
            </a>
            <a href="/contact" className="hover:text-green-400">
              Contact
            </a>
          </nav>
        </header>

        {/* Push content down so it doesn’t overlap the header */}
        <main className="pt-32">{children}</main>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LandCommand.ai",
  description: "AI-powered land marketing and builder partnerships.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white">
        {/* Header with Logo */}
        <header className="w-full flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center space-x-3">
            <img
              src="/sight_only.png"
              alt="LandCommand Logo"
              className="h-12 w-12"
            />
            <span className="text-xl font-bold">LandCommand.ai</span>
          </div>
          <nav className="space-x-6 text-sm font-medium">
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

        {/* Main page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}


import "@/styles/globals.css";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display"] });

export const metadata = {
  title: "LandCommand.ai",
  description: "Premium land listings. AI-powered discovery.",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-dvh bg-white text-neutral-900 antialiased`}>
        <header className="border-b">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <a href="/" className="flex items-center gap-2">
              {/* swap to your header logo asset */}
              <img src="/branding/logo.png" alt="LandCommand.ai" className="h-8 w-auto" />
            </a>
            <nav className="flex gap-6 text-sm">
              <a href="/listings" className="hover:opacity-80">Listings</a>
              <a href="/buy" className="hover:opacity-80">Buy</a>
              <a href="/about" className="hover:opacity-80">About</a>
              <a href="/contact" className="hover:opacity-80">Contact</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-neutral-600">
            © {new Date().getFullYear()} LandCommand.ai — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

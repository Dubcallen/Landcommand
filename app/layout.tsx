import "@/styles/globals.css";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata = {
  title: "LandCommand.ai",
  description: "Premium land listings. AI-powered discovery.",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-dvh bg-brand-charcoal text-brand-linen`}>
        {/* Overlaid header */}
        <Nav />
        {children}
        <footer className="mt-16 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-white/70">
            © {new Date().getFullYear()} LandCommand.ai — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

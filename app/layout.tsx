import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LandCommand.ai",
  description: "AI-powered land marketing and builder partnerships",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white">
        {/* Topo contour background */}
        <div
          className="absolute inset-0 bg-[url('/bg-topo.svg')] bg-repeat opacity-10 pointer-events-none"
          aria-hidden="true"
        />
        {/* Page content */}
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}

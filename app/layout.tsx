// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "LandCommand.ai",
  description: "Middle Tennessee land, farm, equestrian, estate specialists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
        <Nav />
        {children}
      </body>
    </html>
  );
}

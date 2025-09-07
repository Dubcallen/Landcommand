// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "LandCommand.ai",
  description:
    "Middle Tennessee's Premier Property Specialists—Land, Farm, Equestrian, Estate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1B1B1B] text-[#EFECE0] antialiased">
        {/* Header lives here exactly once */}
        <Nav />
        {children}
      </body>
    </html>
  );
}

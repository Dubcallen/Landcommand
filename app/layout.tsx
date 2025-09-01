import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "LandCommand.ai",
  description: "AI-powered land marketing and builder partnerships",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white">
        {/* Topo contour background (embedded SVG as data URI) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundRepeat: "repeat",
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3Cpattern id='topo' x='0' y='0' width='400' height='400' patternUnits='userSpaceOnUse'%3E%3Crect width='400' height='400' fill='none'/%3E%3Cg fill='none' stroke='%236b7280' stroke-opacity='0.25' stroke-width='1'%3E%3Cpath d='M-50,50 C100,20 300,80 450,50' /%3E%3Cpath d='M-50,100 C120,70 280,130 450,100' /%3E%3Cpath d='M-50,150 C140,120 260,180 450,150' /%3E%3Cpath d='M-50,200 C160,170 240,230 450,200' /%3E%3Cpath d='M-50,250 C180,220 220,280 450,250' /%3E%3Cpath d='M-50,300 C200,270 200,330 450,300' /%3E%3Cpath d='M50,-50 C20,100 80,300 50,450' /%3E%3Cpath d='M100,-50 C70,120 130,280 100,450' /%3E%3Cpath d='M150,-50 C120,140 180,260 150,450' /%3E%3Cpath d='M200,-50 C170,160 230,240 200,450' /%3E%3Cpath d='M250,-50 C220,180 280,220 250,450' /%3E%3Cpath d='M300,-50 C270,200 330,200 300,450' /%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23topo)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Main content */}
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}

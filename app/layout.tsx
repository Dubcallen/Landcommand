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
        {/* Topo contour background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundRepeat: "repeat",
            // lighter stroke (#9ca3af) and a touch stronger opacity (0.35)
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Cdefs%3E%3Cpattern id='topo' x='0' y='0' width='500' height='500' patternUnits='userSpaceOnUse'%3E%3Crect width='500' height='500' fill='none'/%3E%3Cg fill='none' stroke='%239ca3af' stroke-opacity='0.35' stroke-width='1'%3E%3Cpath d='M-50,60 C120,25 380,95 550,60' /%3E%3Cpath d='M-50,120 C140,85 360,155 550,120' /%3E%3Cpath d='M-50,180 C160,145 340,215 550,180' /%3E%3Cpath d='M-50,240 C180,205 320,275 550,240' /%3E%3Cpath d='M-50,300 C200,265 300,335 550,300' /%3E%3Cpath d='M-50,360 C220,325 280,395 550,360' /%3E%3Cpath d='M60,-50 C25,120 95,380 60,550' /%3E%3Cpath d='M120,-50 C85,140 155,360 120,550' /%3E%3Cpath d='M180,-50 C145,160 205,340 180,550' /%3E%3Cpath d='M240,-50 C205,180 265,320 240,550' /%3E%3Cpath d='M300,-50 C265,200 325,300 300,550' /%3E%3Cpath d='M360,-50 C325,220 385,280 360,550' /%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='500' height='500' fill='url(%23topo)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft vignette to keep edges dark (optional, looks good on black) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient( 1200px 700px at 50% 10%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}

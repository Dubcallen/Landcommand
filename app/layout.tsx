export const metadata = {
  title: "LandCommand.ai — Buy • Sell • Discover Land",
  description:
    "AI-powered land marketing: listings, media packages, and nationwide referral brokerage partners.",
  metadataBase: new URL("https://landcommand.ai"),
  openGraph: {
    title: "LandCommand.ai",
    description:
      "AI-powered land marketing: listings, media packages, and nationwide referral partners.",
    url: "https://landcommand.ai",
    siteName: "LandCommand.ai",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", site: "@yourhandle" },
};

import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              {/* Inline SVG so you don’t need a file yet; you can swap to /public/logo.svg later */}
              <svg width="28" height="28" viewBox="0 0 64 64" className="rounded-lg">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#C9A13D" />
                    <stop offset="1" stopColor="#BFC1C2" />
                  </linearGradient>
                </defs>
                <path fill="url(#g)" d="M8 30c5-8 14-14 24-14s19 6 24 14v8c0 3-2 5-5 5H13c-3 0-5-2-5-5v-8z"/>
                <path fill="#0A0A0A" d="M20 45h24v4H20zM31 19h2l8 8-3 3-6-6-6 6-3-3z"/>
              </svg>
              <span className="font-semibold">LandCommand.ai</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm text-neutral-700">
              <Link href="#features" className="hover:underline">Features</Link>
              <Link href="#packages" className="hover:underline">Packages</Link>
              <Link href="#contact" className="hover:underline">Contact</Link>
            </nav>
            <Link href="#packages" className="rounded-xl px-3 py-2 bg-black text-white text-sm">
              List Your Land
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-neutral-600">
            <div>
              <div className="font-semibold text-neutral-900">LandCommand.ai</div>
              <p className="mt-2">
                Advertising by LandCommand.ai. Licensed real estate activities are brokered by
                partner brokers per state law.
              </p>
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Disclaimers</div>
              <p className="mt-2">
                Info deemed reliable but not guaranteed. Verify zoning, utilities, access, and
                buildability with the applicable county and agencies.
              </p>
            </div>
            <div id="contact">
              <div className="font-semibold text-neutral-900">Contact</div>
              <p className="mt-2">hello@landcommand.ai</p>
              <p>Phoenix, Arizona</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

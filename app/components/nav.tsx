"use client";

import Link from "next/link";

const LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/buy", label: "Buy" },
  { href: "/regions", label: "Regions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="section flex items-center justify-between py-6">
        {/* Logo (light mark recommended) */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sight_only.png" alt="LandCommand.ai" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-nav text-white/90 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

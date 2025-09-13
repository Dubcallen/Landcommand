"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left Menu */}
        <nav className="hidden md:flex items-center gap-10 font-serif text-sm uppercase tracking-[0.18em] text-white">
          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("about")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="hover:text-[#CBB26A]">About Land Command ▾</button>
            {openDropdown === "about" && (
              <div className="absolute left-0 mt-2 w-48 bg-[#1B1B1B] border border-white/10 rounded-lg shadow-lg">
                <Link
                  href="/about/firm"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Our Firm
                </Link>
                <Link
                  href="/about/process"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Our Process
                </Link>
                <Link
                  href="/about/press"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Press
                </Link>
                <Link
                  href="/about/stories"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Stories
                </Link>
              </div>
            )}
          </div>

          {/* Properties Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("properties")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="hover:text-[#CBB26A]">Properties ▾</button>
            {openDropdown === "properties" && (
              <div className="absolute left-0 mt-2 w-56 bg-[#1B1B1B] border border-white/10 rounded-lg shadow-lg">
                <Link
                  href="/properties/available"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Available
                </Link>
                <Link
                  href="/properties/under-contract"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Under Contract
                </Link>
                <Link
                  href="/properties/sold"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  Sold
                </Link>
                <Link
                  href="/sell"
                  className="block px-4 py-2 text-sm hover:bg-white/10"
                >
                  List Your Property
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Logo Center */}
        <div className="flex justify-center">
          <Link href="/" className="block">
            <Image
              src="/sight_only.png"
              alt="Land Command Logo"
              width={90}
              height={90}
              className="transition-transform duration-300 hover:scale-125"
              priority
            />
          </Link>
        </div>

        {/* Right Menu */}
        <nav className="hidden md:flex items-center gap-10 font-serif text-sm uppercase tracking-[0.18em] text-white">
          <Link href="/search" className="hover:text-[#CBB26A]">
            Search for Land
          </Link>
          <Link href="/short-films" className="hover:text-[#CBB26A]">
            Short Films
          </Link>
        </nav>

        {/* Hamburger Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1B1B1B] border-t border-white/10">
          <div className="flex flex-col p-4 font-serif uppercase text-white text-sm">
            <Link href="/about/firm" className="py-2 hover:text-[#CBB26A]">
              About Land Command
            </Link>
            <Link href="/properties/available" className="py-2 hover:text-[#CBB26A]">
              Properties
            </Link>
            <Link href="/search" className="py-2 hover:text-[#CBB26A]">
              Search for Land
            </Link>
            <Link href="/short-films" className="py-2 hover:text-[#CBB26A]">
              Short Films
            </Link>
            <Link href="/sell" className="py-2 hover:text-[#CBB26A]">
              List Your Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

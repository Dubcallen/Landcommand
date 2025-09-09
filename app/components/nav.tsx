"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav className="flex items-center justify-between px-10 py-6 text-white text-sm font-medium tracking-wide">
        {/* LEFT SIDE LINKS */}
        <div className="flex space-x-10">
          {/* ABOUT */}
          <div className="group relative">
            <Link
              href="/about"
              className="hover:text-[rgba(203,178,106,1)]"
            >
              ABOUT LAND COMMAND
            </Link>
            <div className="absolute left-0 hidden w-56 bg-[#1B1B1B] p-4 text-sm text-white shadow-lg group-hover:block">
              <Link href="/about" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Our Story
              </Link>
              <Link href="/about/stories" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Featured Stories
              </Link>
            </div>
          </div>

          {/* PROPERTIES */}
          <div className="group relative">
            <Link
              href="/properties"
              className="hover:text-[rgba(203,178,106,1)]"
            >
              PROPERTIES
            </Link>
            <div className="absolute left-0 hidden w-56 bg-[#1B1B1B] p-4 text-sm text-white shadow-lg group-hover:block">
              <Link href="/listings" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Active Listings
              </Link>
              <Link href="/listings/recent" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Recent Sales
              </Link>
            </div>
          </div>

          {/* SERVICES */}
          <div className="group relative">
            <Link
              href="/services"
              className="hover:text-[rgba(203,178,106,1)]"
            >
              SERVICES
            </Link>
            <div className="absolute left-0 hidden w-64 bg-[#1B1B1B] p-4 text-sm text-white shadow-lg group-hover:block">
              <Link href="/services/listing-fees" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Flat Listing Fees
              </Link>
              <Link href="/services/reels" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Reels (Short Films)
              </Link>
              <Link href="/services/stories" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Stories (Editorial Features)
              </Link>
              <Link href="/services/brokerage" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Brokerage (10%)
              </Link>
              <Link href="/services/flipping" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Flipping Land
              </Link>
              <Link href="/services/seller-financing" className="block py-1 hover:text-[rgba(203,178,106,1)]">
                Seller Financing
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="flex space-x-10">
          <Link
            href="/search"
            className="hover:text-[rgba(203,178,106,1)]"
          >
            SEARCH FOR LAND
          </Link>
          <Link
            href="/short-films"
            className="hover:text-[rgba(203,178,106,1)]"
          >
            SHORT FILMS
          </Link>
        </div>
      </nav>
    </header>
  );
}

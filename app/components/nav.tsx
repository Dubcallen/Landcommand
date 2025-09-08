"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-transparent px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-10">
          <div className="group relative">
            <Link
              href="/about"
              className="text-sm font-medium tracking-wide text-white hover:text-[rgba(203,178,106,1)]"
            >
              ABOUT LAND COMMAND
            </Link>
            {/* Dropdown */}
            <div className="absolute left-0 hidden w-48 bg-[#1B1B1B] p-4 text-sm text-white shadow-lg group-hover:block">
              <Link
                href="/about/story"
                className="block py-1 hover:text-[rgba(203,178,106,1)]"
              >
                Our Story
              </Link>
              <Link
                href="/about/team"
                className="block py-1 hover:text-[rgba(203,178,106,1)]"
              >
                Team
              </Link>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/properties"
              className="text-sm font-medium tracking-wide text-white hover:text-[rgba(203,178,106,1)]"
            >
              PROPERTIES
            </Link>
            {/* Dropdown */}
            <div className="absolute left-0 hidden w-48 bg-[#1B1B1B] p-4 text-sm text-white shadow-lg group-hover:block">
              <Link
                href="/properties/land"
                className="block py-1 hover:text-[rgba(203,178,106,1)]"
              >
                Land
              </Link>
              <Link
                href="/properties/farm"
                className="block py-1 hover:text-[rgba(203,178,106,1)]"
              >
                Farm
              </Link>
              <Link
                href="/properties/equestrian"
                className="block py-1 hover:text-[rgba(203,178,106,1)]"
              >
                Equestrian
              </Link>
              <Link
                href="/properties/estate"
                className="block py-1 hover:text-[rgba(203,178,106,1)]"
              >
                Estate
              </Link>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-10">
          <Link
            href="/search"
            className="text-sm font-medium tracking-wide text-white hover:text-[rgba(203,178,106,1)]"
          >
            SEARCH FOR LAND
          </Link>
          <Link
            href="/films"
            className="text-sm font-medium tracking-wide text-white hover:text-[rgba(203,178,106,1)]"
          >
            SHORT FILMS
          </Link>
        </div>
      </div>
    </nav>
  );
}

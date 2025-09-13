"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/**
 * FeatureTiles
 * ------------------------------------------------------------------
 * Three tall cards with background images, luxury overlays, and
 * smooth hover effects (light zoom, vignette, gold highlight).
 *
 * Left   -> “List With Us”   -> /sell
 * Middle -> “Short Films”    -> /short-films
 * Right  -> “Resources”      -> /resources  (or change the href)
 *
 * Images:
 * - Replace the placeholder /public images with your own. If you already
 *   have media, just point the "imgSrc" at those assets.
 */

const GOLD = "#CBB26A";

type Tile = {
  titleTop?: string; // small upper label
  title: string;     // big serif title
  body?: string;     // paragraph copy
  cta?: string;
  href: string;
  imgSrc: string;
  align?: "left" | "center" | "right";
};

const TILES: Tile[] = [
  {
    titleTop: "UNRIVALED MARKETING",
    title: "LIST WITH US",
    body:
      "Flat-fee listing options, premium creative, and a serious buyer network—purpose-built for land sellers.",
    cta: "Start Your Listing",
    href: "/sell",
    imgSrc: "/images/tiles/list-with-us.jpg", // put a real file in /public/images/tiles/
    align: "left",
  },
  {
    titleTop: "CINEMATIC STORYTELLING",
    title: "SHORT FILMS",
    body:
      "Bring your property to life with compelling reels and narrative shorts that convert attention into action.",
    cta: "View Short Films",
    href: "/short-films",
    imgSrc: "/images/tiles/short-films.jpg",
    align: "center",
  },
  {
    titleTop: "EXPERT TIPS & INSIGHTS",
    title: "RESOURCES",
    body:
      "Specialized knowledge on Tennessee land investment, conservation, and improvement from hands-on experience.",
    cta: "Access Land Expertise",
    href: "/resources",
    imgSrc: "/images/tiles/resources.jpg",
    align: "right",
  },
];

export default function FeatureTiles() {
  return (
    <section
      aria-label="Feature Tiles"
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 my-20"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {TILES.map((t, i) => (
          <TileCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}

function TileCard({ titleTop, title, body, cta, href, imgSrc, align = "center" }: Tile) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative block h-[520px] overflow-hidden rounded-2xl"
      style={{
        boxShadow: "0 18px 60px rgba(0,0,0,0.40)",
      }}
    >
      {/* Background image */}
      {/* Use next/image fill for quality & perf */}
      <div className="absolute inset-0">
        <Image
          src={imgSrc}
          alt=""
          fill
          priority={false}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            hover ? "scale-[1.05]" : "scale-100"
          }`}
        />
        {/* warm vignette */}
        <div
          className={`absolute inset-0 transition-opacity duration-700`}
          style={{
            background:
              "radial-gradient(120% 140% at 50% 40%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.75) 100%)",
            opacity: 1,
          }}
        />
        {/* gold wash on hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${hover ? "opacity-35" : "opacity-0"}`}
          style={{ background: "linear-gradient(0deg, rgba(203,178,106,0.28), rgba(203,178,106,0.28))" }}
        />
      </div>

      {/* Content overlay */}
      <div
        className={`relative z-10 h-full w-full px-8 py-10 flex ${
          align === "left"
            ? "items-end justify-start text-left"
            : align === "right"
            ? "items-center justify-center md:items-center md:justify-end text-right"
            : "items-center justify-center text-center"
        }`}
      >
        <div className="max-w-xs md:max-w-sm">
          {titleTop && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.26em] text-white/75">
              {titleTop}
            </div>
          )}
          <h3 className="font-serif text-[28px] leading-tight text-[rgba(237,234,224,0.98)] md:text-[30px]">
            {title}
          </h3>

          {body && (
            <p className="mt-3 text-[14px] leading-7 text-[rgba(255,255,255,0.80)]">
              {body}
            </p>
          )}

          {cta && (
            <span className="mt-5 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-[rgba(237,234,224,0.92)]">
              {cta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke={GOLD} strokeWidth="1.5" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {/* Gold side rail accent (subtle, like reference) */}
      <div
        className={`absolute right-0 top-0 h-full w-[6px] md:w-[8px] transition-opacity duration-500 ${
          hover ? "opacity-80" : "opacity-40"
        }`}
        style={{ backgroundColor: GOLD }}
        aria-hidden
      />
    </Link>
  );
}

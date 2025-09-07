"use client";

import { useState } from "react";

const GOLD = "rgba(203,178,106,0.9)";
const GOLD_BORDER = "rgba(203,178,106,0.75)";
const IVORY = "rgba(239,236,224,1)";
const IVORY_BORDER = "rgba(239,236,224,0.6)";

type PackageKey = "basic" | "featured" | "featured_reel" | "featured_story";

export default function SellPage() {
  const [pkg, setPkg] = useState<PackageKey>("basic");

  const packages: Record<PackageKey, { title: string; price: number; features: string[] }> = {
    basic: {
      title: "Basic Listing",
      price: 800,
      features: [
        "Listing on LandCommand.ai",
        "Standard Photo Gallery",
        "Inquiry Routing to Seller",
      ],
    },
    featured: {
      title: "Featured Listing",
      price: 1200,
      features: [
        "Homepage Featured Placement",
        "Priority in Search",
        "Enhanced Photo Gallery",
      ],
    },
    featured_reel: {
      title: "Featured + Reel",
      price: 5800,
      features: [
        "Everything in Featured",
        "Cinematic Property Reel (1–2 min)",
        "On-Site Filming & Post-Production",
      ],
    },
    featured_story: {
      title: "Featured + Story",
      price: 20800,
      features: [
        "Everything in Featured",
        "Long-Form Editorial Story",
        "Premium Photo Essay & Layout",
      ],
    },
  };

  const active = packages[pkg];

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/sell-hero.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <div className="inline-flex rounded-full border border-white/20 bg-black/30 px-5 py-1.5 backdrop-blur">
            <span className="text-[12px] uppercase tracking-[0.24em] text-white/90">
              List Your Property
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold">Flat-Fee Listing Packages</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Transparent pricing. Premium presentation. Keep control of your sale.
          </p>
        </div>
      </section>

      {/* Packages + Checkout */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-3">
        {/* Package picker */}
        <div className="md:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
            <h2 className="mb-3 text-lg font-semibold">Choose a Package</h2>
            <div className="space-y-2">
              {Object.entries(packages).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setPkg(key as PackageKey)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition
                    ${pkg === key
                      ? "border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.08)]"
                      : "border-white/10 hover:bg-white/5"}`}
                >
                  <div>
                    <div className="font-medium">{val.title}</div>
                    <div className="text-sm text-white/70">${val.price.toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-white/60">Select</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
            <h3 className="mb-2 text-sm uppercase tracking-[0.16em] text-white/60">Need Cinematics?</h3>
            <p className="text-sm text-white/80">
              Add a <strong>Reel</strong> for $5,000 or commission a premium <strong>Story</strong> for $20,000.
            </p>
            <div className="mt-3 flex gap-3">
              <a
                href="/short-films"
                className="inline-flex items-center rounded-md border px-4 py-2"
                style={{ borderColor: GOLD_BORDER, backgroundColor: GOLD, color: "#1B1B1B" }}
              >
                View Reels
              </a>
              <a
                href="/about/stories"
                className="inline-flex items-center rounded-md border px-4 py-2 text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.08)]"
                style={{ borderColor: IVORY_BORDER }}
              >
                View Stories
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="md:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <h2 className="text-2xl font-serif font-semibold">{active.title}</h2>
            <p className="mt-1 text-white/70">${active.price.toLocaleString()}</p>
            <ul className="mt-4 space-y-2 text-white/90">
              {active.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Seller intake + (stub) checkout */}
        <div className="md:col-span-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("In production: connect Stripe checkout & persist form.");
            }}
            className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur"
          >
            <h2 className="mb-4 text-lg font-semibold">Property Details</h2>
            <div className="grid grid-cols-1 gap-3">
              <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                     placeholder="Property Title" required />
              <div className="grid grid-cols-2 gap-3">
                <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                       placeholder="State (e.g., TN)" required />
                <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                       placeholder="County" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                       placeholder="Acreage" />
                <input type="number" className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                       placeholder="Price (USD)" />
              </div>
              <textarea rows={4} className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                        placeholder="Description" />
              <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"
                     placeholder="Photo/Video Links (optional)" />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-md border px-5 py-2.5 font-medium"
                style={{ borderColor: GOLD_BORDER, backgroundColor: GOLD, color: "#1B1B1B", boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset" }}
              >
                Start Listing — ${active.price.toLocaleString()}
              </button>
            </div>
            <p className="mt-3 text-xs text-white/60">You’ll be taken to secure checkout. We’ll email instructions after payment.</p>
          </form>
        </div>
      </section>
    </main>
  );
}

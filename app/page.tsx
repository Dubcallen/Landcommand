// app/page.tsx
"use client";

import Hero from "@/app/components/hero";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#1B1B1B] text-[#EFECE0]">
      {/* Full-width hero */}
      <Hero />

      {/* Below-hero samples (centered content) */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20">
        <h2 className="mb-6 text-2xl font-bold">Short Films</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-video w-full overflow-hidden rounded-2xl border border-[rgba(239,236,224,0.15)] bg-[#2A2A2A] grid place-items-center text-[rgba(239,236,224,0.6)]"
            >
              Video Placeholder
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 pb-24">
        <h2 className="mb-6 text-2xl font-bold">Featured Properties</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[rgba(239,236,224,0.15)] bg-[#2A2A2A] text-[rgba(239,236,224,1)]"
            >
              <div className="aspect-[4/3] w-full bg-neutral-800 grid place-items-center text-neutral-500">
                Image Placeholder
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Property Title {i}</h3>
                  <span className="rounded-full border border-[rgba(239,236,224,0.3)] px-2 py-1 text-xs">
                    Available
                  </span>
                </div>
                <p className="mt-1 text-sm">1,000 acres • Somewhere, TN</p>
                <p className="mt-2 font-medium">$2,450,000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-[rgba(239,236,224,0.1)]">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-[rgba(239,236,224,0.7)]">
          © {new Date().getFullYear()} LandCommand.ai — All rights reserved.
        </div>
      </footer>
    </main>
  );
}

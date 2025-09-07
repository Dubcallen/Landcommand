"use client";

import { useMemo, useState } from "react";

export default function FinancingPage() {
  const [price, setPrice] = useState(150000);
  const [down, setDown] = useState(30000);
  const [apr, setApr] = useState(9.5);
  const [term, setTerm] = useState(120); // months

  const monthly = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = apr / 100 / 12;
    if (r === 0) return principal / term;
    return (principal * r) / (1 - Math.pow(1 + r, -term));
  }, [price, down, apr, term]);

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/financing-hero.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <div className="inline-flex rounded-full border border-white/20 bg-black/30 px-5 py-1.5 backdrop-blur">
            <span className="text-[12px] uppercase tracking-[0.24em] text-white/90">Seller Financing</span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold">Flexible Options for Legacy Land</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Estimate monthly payments and explore financing-eligible properties.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Payment Calculator</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(+e.target.value || 0)}
                     className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
            </div>
            <div>
              <label className="block text-sm text-white/70">Down Payment</label>
              <input type="number" value={down} onChange={(e) => setDown(+e.target.value || 0)}
                     className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
            </div>
            <div>
              <label className="block text-sm text-white/70">APR (%)</label>
              <input type="number" step="0.1" value={apr} onChange={(e) => setApr(+e.target.value || 0)}
                     className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
            </div>
            <div>
              <label className="block text-sm text-white/70">Term (months)</label>
              <input type="number" value={term} onChange={(e) => setTerm(+e.target.value || 0)}
                     className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-center">
            <div className="text-sm text-white/70">Estimated Monthly</div>
            <div className="text-3xl font-serif font-semibold">${Number.isFinite(monthly) ? monthly.toFixed(0) : 0}</div>
          </div>
          <a
            href="/properties/available?financing=true"
            className="mt-4 inline-flex items-center rounded-md border px-6 py-3 font-medium"
            style={{ borderColor: "rgba(203,178,106,0.75)", backgroundColor: "rgba(203,178,106,0.9)", color: "#1B1B1B" }}
          >
            See Financing-Eligible Listings
          </a>
          <p className="mt-3 text-xs text-white/60">Estimates only; not an offer of credit. Terms vary.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">How It Works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-white/90">
            <li>Apply with basic info and property details.</li>
            <li>Review flexible structures and payment schedules.</li>
            <li>Close with secure digital docs and escrow.</li>
          </ol>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center rounded-md border px-6 py-3 text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.08)]"
            style={{ borderColor: "rgba(239,236,224,0.6)" }}
          >
            Get Pre-Qualified
          </a>
        </div>
      </section>
    </main>
  );
}

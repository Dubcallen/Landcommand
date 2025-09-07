"use client";

import { useMemo, useState } from "react";

type Filters = {
  state?: string;
  county?: string;
  minAcreage?: number;
  maxAcreage?: number;
  priceMin?: number;
  priceMax?: number;
  financing?: boolean;
};

const MOCK = Array.from({ length: 12 }).map((_, i) => ({
  slug: `result-${i + 1}`,
  title: `Search Result ${i + 1}`,
  state: ["TN", "KY", "AL"][i % 3],
  county: ["Williamson", "Davidson", "Maury"][i % 3],
  acres: 100 + i * 10,
  price: 200000 + i * 50000,
  financing: i % 4 === 0,
}));

export default function SearchPage() {
  const [f, setF] = useState<Filters>({});

  const results = useMemo(() => {
    return MOCK.filter((p) => {
      if (f.state && p.state !== f.state) return false;
      if (f.county && p.county !== f.county) return false;
      if (f.minAcreage && p.acres < f.minAcreage) return false;
      if (f.maxAcreage && p.acres > f.maxAcreage) return false;
      if (f.priceMin && p.price < f.priceMin) return false;
      if (f.priceMax && p.price > f.priceMax) return false;
      if (f.financing && !p.financing) return false;
      return true;
    });
  }, [f]);

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-serif font-semibold">Search for Land</h1>
        <p className="mt-2 text-white/80">Filter by state, county, acreage, price, and financing.</p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur md:col-span-1">
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="State" value={f.state ?? ""} onChange={(e) => setF({ ...f, state: e.target.value || undefined })}
                     className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"/>
              <input placeholder="County" value={f.county ?? ""} onChange={(e) => setF({ ...f, county: e.target.value || undefined })}
                     className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none placeholder-white/50"/>
              <input type="number" placeholder="Min Acres" value={f.minAcreage ?? ""} onChange={(e) => setF({ ...f, minAcreage: e.target.value ? +e.target.value : undefined })}
                     className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
              <input type="number" placeholder="Max Acres" value={f.maxAcreage ?? ""} onChange={(e) => setF({ ...f, maxAcreage: e.target.value ? +e.target.value : undefined })}
                     className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
              <input type="number" placeholder="Min Price" value={f.priceMin ?? ""} onChange={(e) => setF({ ...f, priceMin: e.target.value ? +e.target.value : undefined })}
                     className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
              <input type="number" placeholder="Max Price" value={f.priceMax ?? ""} onChange={(e) => setF({ ...f, priceMax: e.target.value ? +e.target.value : undefined })}
                     className="rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"/>
              <label className="col-span-2 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!f.financing} onChange={(e) => setF({ ...f, financing: e.target.checked || undefined })}/>
                Financing Available
              </label>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <a key={p.slug} href={`/properties/${p.slug}`} className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <div className="aspect-[4/3] bg-neutral-800 grid place-items-center text-neutral-500">Image</div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      {p.financing && (
                        <span className="rounded-full border border-[rgba(203,178,106,0.6)] px-2 py-0.5 text-xs text-[rgba(203,178,106,0.9)]">
                          Financing
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm">{p.acres.toLocaleString()} acres • {p.county}, {p.state}</p>
                    <p className="mt-2 font-medium">${p.price.toLocaleString()}</p>
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/60">{results.length} results</p>
          </div>
        </div>
      </section>
    </main>
  );
}

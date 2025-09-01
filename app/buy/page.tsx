"use client";

import { useState } from "react";
import type { Filters } from "@/lib/types"; // or "../../lib/types" if not using alias




function formatUSD(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}



export default function BuyPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [ask, setAsk] = useState("");

  // “Ask Land AI” – tiny parser to auto-fill filters from a sentence
  function parseAsk(q: string) {
    const f: Filters = {};
    const lower = q.toLowerCase();

    // state two-letter
    const st = lower.match(/\b(az|nm|co|ut|nv|tx|ok|ca|wa|or)\b/);
    if (st) f.state = st[1].toUpperCase();

    // county “in X county”
    const c = lower.match(/in\s+([a-z]+)\s+county/);
    if (c) f.county = c[1][0].toUpperCase() + c[1].slice(1);

    // price “under 100k / max 250k”
    const price = lower.match(/(?:under|max)\s*\$?([\d.,]+)\s*(k|m)?/);
    if (price) {
      let n = parseFloat(price[1].replace(/,/g, ""));
      if (price[2] === "k") n *= 1_000;
      if (price[2] === "m") n *= 1_000_000;
      f.priceMax = n;
    }

    // acres “10-40 acres”, “at least 5 acres”
    const between = lower.match(/(\d+(?:\.\d+)?)\s*(?:ac|acre|acres)?\s*[-to]+\s*(\d+(?:\.\d+)?)/);
    if (between) {
      f.acresMin = parseFloat(between[1]);
      f.acresMax = parseFloat(between[2]);
    } else {
      const min = lower.match(/(at\s*least|over|>=|\+)\s*(\d+(?:\.\d+)?)\s*(ac|acre|acres)?/);
      if (min) f.acresMin = parseFloat(min[2]);
    }

    // features
    if (lower.includes("road")) f.feature = "Road Access";
    if (lower.includes("power")) f.feature = "Power Nearby";
    if (lower.includes("no hoa")) f.feature = "No HOA";

    setFilters((prev) => ({ ...prev, ...f }));
  }

  const states = [...new Set(listings.map((l) => l.state))];
  const counties = [...new Set(listings
    .filter((l) => !filters.state || l.state === filters.state)
    .map((l) => l.county))];
  const types = [...new Set(listings.map((l) => l.type))];
  const features = [...new Set(listings.flatMap((l) => l.features))];

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (filters.q) {
        const q = filters.q.toLowerCase();
        const text = `${l.title} ${l.county} ${l.state} ${l.type}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      if (filters.state && l.state !== filters.state) return false;
      if (filters.county && l.county !== filters.county) return false;
      if (filters.type && l.type !== filters.type) return false;
      if (filters.feature && !l.features.includes(filters.feature)) return false;
      if (filters.priceMin && l.price < filters.priceMin) return false;
      if (filters.priceMax && l.price > filters.priceMax) return false;
      if (filters.acresMin && l.acreage < filters.acresMin) return false;
      if (filters.acresMax && l.acreage > filters.acresMax) return false;
      return true;
    });
  }, [filters]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Browse Land</h1>
        <button
          className="text-sm underline"
          onClick={() => setFilters({})}
        >
          Reset filters
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="grid md:grid-cols-6 gap-3">
          <input
            placeholder="Search text (county/state/type)"
            className="rounded-xl border px-3 py-2 md:col-span-2"
            value={filters.q || ""}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value || undefined }))}
          />
          <select
            className="rounded-xl border px-3 py-2"
            value={filters.state || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, state: e.target.value || undefined, county: undefined }))
            }
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border px-3 py-2"
            value={filters.county || ""}
            onChange={(e) => setFilters((f) => ({ ...f, county: e.target.value || undefined }))}
          >
            <option value="">All Counties</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border px-3 py-2"
            value={filters.type || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: (e.target.value as any) || undefined }))
            }
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border px-3 py-2"
            value={filters.feature || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, feature: e.target.value || undefined }))
            }
          >
            <option value="">Any Feature</option>
            {features.map((ft) => (
              <option key={ft} value={ft}>
                {ft}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min $"
            className="rounded-xl border px-3 py-2"
            value={filters.priceMin ?? ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                priceMin: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
          <input
            type="number"
            placeholder="Max $"
            className="rounded-xl border px-3 py-2"
            value={filters.priceMax ?? ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                priceMax: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
          <input
            type="number"
            placeholder="Min Acres"
            className="rounded-xl border px-3 py-2"
            value={filters.acresMin ?? ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                acresMin: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
          <input
            type="number"
            placeholder="Max Acres"
            className="rounded-xl border px-3 py-2"
            value={filters.acresMax ?? ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                acresMax: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
        </div>

        {/* Ask Land AI */}
        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-xl border px-3 py-2"
            placeholder='Ask: "20–50 acres in AZ under 100k with road access"'
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && parseAsk(ask)}
          />
          <button className="rounded-xl px-4 py-2 bg-black text-white" onClick={() => parseAsk(ask)}>
            Ask Land AI
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <div className="aspect-[16/9] w-full bg-neutral-100">
              {/* using plain <img> to avoid next/image domain config */}
              <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{l.title}</h3>
                <div className="text-right">
                  <div className="font-bold">{formatUSD(l.price)}</div>
                  <div className="text-xs text-neutral-500">
                    {l.acreage} ac • {l.county}, {l.state}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {l.features.slice(0, 3).map((f) => (
                  <span key={f} className="inline-block border rounded-full px-2 py-0.5 text-xs">
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex justify-between mt-3">
                <Link
                  href={`/listing/${l.id}`}
                  className="rounded-xl px-3 py-2 bg-black text-white text-sm"
                >
                  View
                </Link>
                <a
                  href="/#packages"
                  className="rounded-xl px-3 py-2 border text-sm"
                >
                  Market Similar
                </a>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-neutral-600">No matches. Try adjusting filters or search.</div>
        )}
      </div>
    </section>
  );
}


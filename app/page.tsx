"use client";

import React, { useMemo, useState } from "react";

/** Local Filters type so this page is standalone */
type Filters = {
  state?: string;    // e.g., "AZ"
  county?: string;   // e.g., "Maricopa"
  market?: string;
  status?: "Available" | "Under Contract" | "Sold";
  minAcreage?: number;
  maxAcreage?: number;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
};

export default function BuyPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [ask, setAsk] = useState("");

  const parsed = useMemo(() => parseAskToFilters(ask), [ask]);

  function applyParsed() {
    setFilters((prev) => ({ ...prev, ...parsed }));
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Buy Land</h1>
        <p className="text-sm text-neutral-600">
          Use the quick parser or set filters manually. This starter is self-contained so it won’t break your build.
        </p>
      </header>

      {/* Ask Land AI */}
      <section className="space-y-3">
        <label className="block text-sm font-medium">Ask Land AI</label>
        <textarea
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder="ex: 40 to 80 acres in Maricopa County AZ under $200k, available"
          className="w-full rounded-lg border px-3 py-2 min-h-[110px]"
        />
        <div className="text-sm text-neutral-700">
          <strong>Parsed preview: </strong>
          <span className="text-xs break-all">
            {JSON.stringify(parsed || {}, null, 0)}
          </span>
        </div>
        <button
          onClick={applyParsed}
          className="rounded-lg border px-4 py-2 hover:bg-neutral-50"
        >
          Apply Parsed Filters
        </button>
      </section>

      {/* Manual filters */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="State (2-letter)"
            valu

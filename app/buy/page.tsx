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

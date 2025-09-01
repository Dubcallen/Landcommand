"use client";

import React, { useMemo, useState } from "react";

/**
 * Local, self-contained Filters type so this file compiles without importing anything.
 * If you later want to share this type across the app, you can move it to /lib/types
 * and replace this with: import type { Filters } from "@/lib/types";
 */
type Filters = {
  state?: string;    // e.g., "AZ"
  county?: string;   // e.g., "Maricopa"
  market?: string;   // optional higher-level grouping if you use it
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

  // Very small natural-language → filters helper (safe, optional)
  const parsed = useMemo(() => parseAskToFilters(ask), [ask]);

  const applyParsed = () => {
    setFilters((prev) => ({ ...prev, ...parsed }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Buy Land</h1>
        <p className="text-sm text-neutral-600">
          Use the quick parser or set filters manually. This page is a clean, compiling
          starter you can hook to your listings/results component.
        </p

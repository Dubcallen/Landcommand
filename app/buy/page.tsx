"use client";

import React, { useMemo, useState } from "react";

/** Local Filters type so this page stands alone */
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

  // Parse the free-text query into filters
  const parsed = useMemo(() => parseAskToFilters(ask), [ask]);

  function applyParsed() {
    setFilters((prev) => ({ ...prev, .


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
            value={filters.state ?? ""}
            onChange={(v) => setFilters((f) => ({ ...f, state: v.toUpperCase() }))}
            placeholder="AZ"
          />
          <Input
            label="County"
            value={filters.county ?? ""}
            onChange={(v) => setFilters((f) => ({ ...f, county: v }))}
            placeholder="Maricopa"
          />
          <Input
            label="Min Acreage"
            type="number"
            value={numOrEmpty(filters.minAcreage)}
            onChangeNumber={(v) => setFilters((f) => ({ ...f, minAcreage: v }))}
            placeholder="40"
          />
          <Input
            label="Max Acreage"
            type="number"
            value={numOrEmpty(filters.maxAcreage)}
            onChangeNumber={(v) => setFilters((f) => ({ ...f, maxAcreage: v }))}
            placeholder="80"
          />
          <Input
            label="Min Price ($)"
            type="number"
            value={numOrEmpty(filters.priceMin)}
            onChangeNumber={(v) => setFilters((f) => ({ ...f, priceMin: v }))}
            placeholder="50000"
          />
          <Input
            label="Max Price ($)"
            type="number"
            value={numOrEmpty(filters.priceMax)}
            onChangeNumber={(v) => setFilters((f) => ({ ...f, priceMax: v }))}
            placeholder="200000"
          />
          <Select
            label="Status"
            value={filters.status ?? ""}
            options={[
              { label: "Any", value: "" },
              { label: "Available", value: "Available" },
              { label: "Under Contract", value: "Under Contract" },
              { label: "Sold", value: "Sold" },
            ]}
            onChange={(v) =>
              setFilters((f) => ({ ...f, status: (v || undefined) as Filters["status"] }))
            }
          />
          <Input
            label="Tags (comma-separated)"
            value={(filters.tags ?? []).join(", ")}
            onChange={(v) =>
              setFilters((f) => ({
                ...f,
                tags: v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="seller financing, water rights"
          />
        </div>

        <div className="text-sm text-neutral-700">
          <strong>Active filters: </strong>
          <span className="text-xs break-all">{JSON.stringify(filters, null, 0)}</span>
        </div>

        <div className="rounded-xl border p-4 text-sm text-neutral-600">
          TODO: render <span className="font-mono">ListingGrid</span> here and pull data (local or CMS).
        </div>
      </section>
    </div>
  );
}

/* -------------------------- helpers -------------------------- */

function numOrEmpty(n?: number) {
  return Number.isFinite(n) ? String(n) : "";
}

function clampNum(n: number | undefined, min = 0, max = 10000000) {
  if (typeof n !== "number" || Number.isNaN(n)) return undefined;
  return Math.min(Math.max(n, min), max);
}

function parseAskToFilters(input: string): Filters {
  const f: Filters = {};
  if (!input) return f;

  const lower = input.toLowerCase();

  // state two-letter
  const st = lower.match(/\b(az|nm|co|ut|nv|tx|ok|ca|wa|or)\b/);
  if (st) f.state = st[1].toUpperCase();

  // county: "in X county"
  const c = lower.match(/in\s+([a-z]+)\s+county/);
  if (c) f.county = capitalize(c[1]);

  // acreage range
  const acresRange = lower.match(/\b(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*ac/);
  if (acresRange) {
    f.minAcreage = clampNum(parseFloat(acresRange[1]));
    f.maxAcreage = clampNum(parseFloat(acresRange[2]));
  } else {
    const acresSingle = lower.match(/\b(\d+(?:\.\d+)?)\s*ac/);
    if (acresSingle) f.minAcreage = clampNum(parseFloat(acresSingle[1]));
  }

  // price range
  const money = lower.replace(/[, ]+/g, "").replace(/(\d+)k\b/g, (_m, d) => String(Number(d) * 1000));

  const priceRange = money.match(/\$?(\d{3,})\s*(?:-|to)\s*\$?(\d{3,})/);
  if (priceRange) {
    f.priceMin = clampNum(parseInt(priceRange[1], 10));
    f.priceMax = clampNum(parseInt(priceRange[2], 10));
  } else {
    const under = money.match(/\b(under|<=|≤)\$?(\d{3,})/);
    if (under) f.priceMax = clampNum(parseInt(under[2], 10));
    const over = money.match(/\b(over|>=|≥)\$?(\d{3,})/);
    if (over) f.priceMin = clampNum(parseInt(over[2], 10));
  }

  // status
  if (/\bavailable\b/.test(lower)) f.status = "Available";
  else if (/\bunder\s+contract\b/.test(lower)) f.status = "Under Contract";
  else if (/\bsold\b/.test(lower)) f.status = "Sold";

  return f;
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/* -------------------------- inputs -------------------------- */

function Input(props: {
  label: string;
  value?: string;
  type?: "text" | "number";
  placeholder?: string;
  onChange?: (v: string) => void;
  onChangeNumber?: (v: number | undefined) => void;
}) {
  const { label, value, type = "text", placeholder, onChange, onChangeNumber } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="mt-1 w-full rounded-lg border px-3 py-2"
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => {
          if (type === "number" && onChangeNumber) {
            const v = e.target.value.trim();
            onChangeNumber(v === "" ? undefined : Number(v));
          } else {
            onChange?.(e.target.value);
          }
        }}
      />
    </label>
  );
}

function Select(props: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  const { label, value, options, onChange } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        className="mt-1 w-full rounded-lg border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}


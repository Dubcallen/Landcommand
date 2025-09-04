// lib/listings.ts
import type { Listing } from "./types";

// Static JSON source (fastest for MVP).
// Path is from /lib → /public/data
import data from "../public/data/listings.json" assert { type: "json" };

/** Return all listings (sync for easy use on client or server) */
export function getAllListings(): Listing[] {
  return (data as unknown) as Listing[];
}

/** Find one listing by slug */
export function getListingBySlug(slug: string): Listing | undefined {
  const all = getAllListings();
  return all.find((l) => l.slug === slug);
}

/** Optional filter helper */
export function filterListings(opts: {
  state?: string;
  county?: string;
  status?: Listing["status"];
  minAcreage?: number;
  maxAcreage?: number;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
}): Listing[] {
  const {
    state, county, status,
    minAcreage, maxAcreage,
    priceMin, priceMax, tags,
  } = opts;

  return getAllListings().filter((l) => {
    if (state && l.state !== state) return false;
    if (county && l.county !== county) return false;
    if (status && l.status !== status) return false;
    if (minAcreage != null && l.acreage < minAcreage) return false;
    if (maxAcreage != null && l.acreage > maxAcreage) return false;
    if (priceMin != null && (l.price ?? l.priceMin ?? 0) < priceMin) return false;
    if (priceMax != null && (l.price ?? l.priceMax ?? Infinity) > priceMax) return false;
    if (tags && tags.length > 0) {
      const set = new Set(l.tags ?? []);
      for (const t of tags) if (!set.has(t)) return false;
    }
    return true;
  });
}

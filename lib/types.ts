// lib/types.ts

export type ListingStatus = "Available" | "Under Contract" | "Sold";

export type Listing = {
  slug: string;                 // stable URL id, e.g. "maricopa-40ac"
  title: string;
  market: string;               // e.g. "Arizona"
  county?: string;              // e.g. "Maricopa"
  acreage: number;
  status: ListingStatus;
  price?: number;               // total price in USD
  description?: string;
  highlights?: string[];
  broker?: { name: string; email?: string; phone?: string };
  tags?: string[];
};

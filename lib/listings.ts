// lib/listings.ts
import type { Listing } from "./types";

export const listings: Listing[] = [
  {
    slug: "maricopa-40ac",
    title: "40 Acres Near Tonopah",
    market: "Arizona",
    county: "Maricopa",
    acreage: 40,
    status: "Available",
    price: 125000,
    description: "Flat, easy access. Power nearby. Great for buy-and-hold.",
    highlights: ["Legal access", "Near I-10", "Lightly treed"],
    broker: { name: "Your Broker", email: "hello@example.com" },
    tags: ["seller-financing"]
  },
  {
    slug: "cochise-80ac",
    title: "80 Acres — Cochise County",
    market: "Arizona",
    county: "Cochise",
    acreage: 80,
    status: "Under Contract",
    price: 179000,
    description: "Big views, private, close to services.",
    highlights: ["Surveyed", "Mountain views"]
  }
  // 👆 You can keep adding more listings in the same shape.
];

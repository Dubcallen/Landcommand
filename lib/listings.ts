// lib/listings.ts

// --- Types ---
export type ListingStatus = "Available" | "Under Contract" | "Sold";

export type Listing = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  state: string;
  county?: string;
  market?: string;
  status: ListingStatus;
  acreage: number;
  price?: number;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
  coordinates?: { lat: number; lng: number };
  zoning?: string;
  apn?: string;
  utilities?: string[];
  roadAccess?: string;
  photos: string[];
  heroPhoto?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
};

// --- Sample data ---
const listings: Listing[] = [
  {
    id: "az-mar-001",
    slug: "desert-ridge-10ac",
    title: "Desert Ridge — 10 Acres",
    description: "Flat, buildable acreage with road access; power nearby.",
    state: "AZ",
    county: "Maricopa",
    market: "Phoenix",
    status: "Available",
    acreage: 10,
    price: 180000,
    tags: ["road-access", "power-nearby"],
    coordinates: { lat: 33.4483, lng: -112.0740 },
    zoning: "RU-43",
    apn: "123-45-678",
    utilities: ["Power near", "Well/haul water"],
    roadAccess: "Graded dirt",
    photos: [
      "/images/listings/desert-ridge-10ac/1.jpg",
      "/images/listings/desert-ridge-10ac/2.jpg"
    ],
    heroPhoto: "/images/listings/desert-ridge-10ac/hero.jpg",
    features: ["Level terrain", "Close to Phoenix"],
    createdAt: "2025-08-20T12:00:00.000Z",
    updatedAt: "2025-09-01T12:00:00.000Z"
  },
  {
    id: "az-yal-002",
    slug: "ranch-escape-40ac",
    title: "Ranch Escape — 40 Acres",
    description: "Open range with mountain views; perfect for off-grid.",
    state: "AZ",
    county: "Yavapai",
    market: "Prescott",
    status: "Under Contract",
    acreage: 40,
    price: 240000,
    tags: ["mountain-views", "off-grid"],
    coordinates: { lat: 34.5400, lng: -112.4685 },
    zoning: "Rural Residential",
    apn: "987-65-432",
    utilities: ["Solar potential", "Septic"],
    roadAccess: "County road",
    photos: [
      "/images/listings/ranch-escape-40ac/1.jpg",
      "/images/listings/ranch-escape-40ac/2.jpg"
    ],
    heroPhoto: "/images/listings/ranch-escape-40ac/hero.jpg",
    features: ["Rolling hills", "County-maintained access"],
    createdAt: "2025-08-10T12:00:00.000Z",
    updatedAt: "2025-09-01T12:00:00.000Z"
  }
];

// --- Functions ---
export function getAllListings(): Listing[] {
  return listings;
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

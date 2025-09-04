// lib/types.ts
export type ListingStatus = "Available" | "Under Contract" | "Sold";

export type Listing = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  state: string;        // e.g., "AZ"
  county?: string;      // e.g., "Maricopa"
  market?: string;      // e.g., "Phoenix"
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
  photos: string[];     // public paths (e.g., "/images/listings/slug/1.jpg")
  heroPhoto?: string;
  features?: string[];
  createdAt?: string;   // ISO
  updatedAt?: string;   // ISO
};

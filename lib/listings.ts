// lib/listings.ts
export type Listing = {
  id: string;
  title: string;
  price: number;
  acreage: number;
  county: string;
  state: string;
  type: "Recreational" | "Residential Lot" | "Ranch" | "Commercial";
  image: string;
  features: string[];
  apn: string;
};

export const listings: Listing[] = [
  {
    id: "az-001",
    title: "40 Acres — Williams, AZ (Coconino)",
    price: 88000,
    acreage: 40,
    county: "Coconino",
    state: "AZ",
    type: "Recreational",
    image:
      "https://images.unsplash.com/photo-1543352634-873d39c34845?q=80&w=1600&auto=format&fit=crop",
    features: ["Road Access", "Mountain Views", "No HOA"],
    apn: "123-45-678",
  },
  {
    id: "az-002",
    title: "2.5 Acre Homesite — Florence, AZ (Pinal)",
    price: 59000,
    acreage: 2.5,
    county: "Pinal",
    state: "AZ",
    type: "Residential Lot",
    image:
      "https://images.unsplash.com/photo-1464446066817-4116494586bb?q=80&w=1600&auto=format&fit=crop",
    features: ["Power Nearby", "Level Terrain", "Light CCRs"],
    apn: "200-10-222",
  },
  {
    id: "nm-001",
    title: "160 Acres — Ranch Land, Catron County, NM",
    price: 189000,
    acreage: 160,
    county: "Catron",
    state: "NM",
    type: "Ranch",
    image:
      "https://images.unsplash.com/photo-1501786223405-6d024d7c3b88?q=80&w=1600&auto=format&fit=crop",
    features: ["Fenced", "Seasonal Wash", "Grazing"],
    apn: "777-88-999",
  },
  {
    id: "co-001",
    title: "5 Acres — Off-Grid Cabin Site, San Luis Valley, CO",
    price: 29000,
    acreage: 5,
    county: "Costilla",
    state: "CO",
    type: "Recreational",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1600&auto=format&fit=crop",
    features: ["Dirt Road", "Nearby BLM", "Dark Skies"],
    apn: "R012345",
  },
  {
    id: "az-003",
    title: "20 Acres — Industrial Land, Casa Grande, AZ",
    price: 1250000,
    acreage: 20,
    county: "Pinal",
    state: "AZ",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
    features: ["Paved Access", "Zoned Industrial", "Utilities"],
    apn: "505-44-321",
  },
  {
    id: "az-004",
    title: "10 Acres — Yucca, AZ (Mohave) — NO HOA",
    price: 34900,
    acreage: 10,
    county: "Mohave",
    state: "AZ",
    type: "Recreational",
    image:
      "https://images.unsplash.com/photo-1534216807427-7b56f34f40f3?q=80&w=1600&auto=format&fit=crop",
    features: ["No HOA", "Mountain Views", "Dirt Road"],
    apn: "205-19-777",
  },
];

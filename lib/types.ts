// Define the Filters type you were trying to use
export type Filters = {
  market?: string;
  minAcreage?: number;
  maxAcreage?: number;
  status?: "Available" | "Under Contract" | "Sold";
  priceMin?: number;
  priceMax?: number;
};


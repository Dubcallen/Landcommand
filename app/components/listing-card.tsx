import Link from "next/link";

type CardProps = {
  slug: string;
  title: string;
  acreage: number;
  state: string;
  county?: string;
  price?: number;
  status?: "Available" | "Under Contract" | "Sold";
  hero?: string | null;
};

export default function ListingCard({
  slug, title, acreage, state, county, price, status, hero,
}: CardProps) {
  const fmt = (n?: number) => (n != null ? `$${n.toLocaleString()}` : "Inquire");
  return (
    <Link
      href={`/listings/${slug}`}
      className="group overflow-hidden rounded-2xl border border-brand-linen/15 bg-[#2A2A2A] transition hover:shadow-card"
    >
      <div className="aspect-[4/3] w-full bg-neutral-800 grid place-items-center text-neutral-500">
        {/* swap to next/image when assets are in place */}
        <span>{hero ? "Hero Image" : "Image Placeholder"}</span>
      </div>
      <div className="p-4 text-brand-linen">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          {status && <span className="rounded-full border border-brand-linen/30 px-2 py-1 text-xs">{status}</span>}
        </div>
        <p className="mt-1 text-sm">
          {acreage.toLocaleString()} acres • {county ? `${county}, ` : ""}{state}
        </p>
        <p className="mt-2 font-medium">{fmt(price)}</p>
      </div>
    </Link>
  );
}

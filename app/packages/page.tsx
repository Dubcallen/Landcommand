import Link from "next/link";

const GOLD = "#CBB26A";

export const metadata = {
  title: "Packages — Land Command",
  description:
    "Select your listing package and optional creative add-ons: Short Films and Stories.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="mx-auto w-full max-w-[1100px] px-6 py-16">
        <h1 className="font-serif text-4xl md:text-5xl">Choose Your Package</h1>
        <p className="mt-3 max-w-3xl text-white/75">
          Thank you—your submission was received. Select how you’d like to present
          your property. You can start with the flat listing fee and upgrade to
          premium creative at any time.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card
            title="Flat Listing"
            badge="Most Popular"
            price="$800"
            description="Listing on Land Command with premium photography placement, search indexing, and buyer lead routing."
            cta="Start Listing"
            href="/checkout/listing" // placeholder
          />
          <Card
            title="Short Film Add-On"
            price="$5,000"
            description="Cinematic reel to anchor your listing, elevate brand perception, and boost conversions."
            cta="Book a Reel"
            href="/short-films"
          />
          <Card
            title="Story Feature Add-On"
            price="$20,000"
            description="Long-form written + visual narrative that builds legacy and drives premium buyer interest."
            cta="Commission a Story"
            href="/about/stories"
          />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6">
          <h3 className="font-serif text-2xl">Brokerage & Financing</h3>
          <p className="mt-2 text-white/75">
            When licensed, our brokerage services can represent your sale (10% commission).
            We also support seller financing structures to widen the buyer pool.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/brokerage"
              className="rounded-xl border border-white/25 px-5 py-2 text-white hover:bg-white/10"
            >
              Learn About Brokerage
            </Link>
            <Link
              href="/financing"
              className="rounded-xl border border-white/25 px-5 py-2 text-white hover:bg-white/10"
            >
              Explore Financing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  price,
  description,
  cta,
  href,
  badge,
}: {
  title: string;
  price: string;
  description: string;
  cta: string;
  href: string;
  badge?: string;
}) {
  return (
    <div className="relative flex flex-col rounded-2xl border border-white/10 bg-black/40 p-6">
      {badge && (
        <span className="absolute right-4 top-4 rounded-full border border-[rgba(203,178,106,0.5)] bg-[rgba(203,178,106,0.18)] px-3 py-1 text-[12px] uppercase tracking-[0.2em] text-[rgba(203,178,106,0.95)]">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-2xl">{title}</h3>
      <div className="mt-1 text-lg text-[rgba(203,178,106,0.95)]">{price}</div>
      <p className="mt-3 text-white/75">{description}</p>
      <div className="mt-auto pt-6">
        <Link
          href={href}
          className="inline-block rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.92)] px-5 py-2 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

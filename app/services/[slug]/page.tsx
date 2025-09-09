type Params = { params: { slug: string } };

const SERVICES: Record<
  string,
  {
    title: string;
    price: string;
    bullets: string[];
    cta?: { href: string; label: string };
    body: string;
  }
> = {
  "listing-fees": {
    title: "Flat Listing Fees",
    price: "From $800",
    bullets: [
      "Pro photography + listing copy",
      "MLS / land marketplaces syndication",
      "Lead handling + appointment coordination",
    ],
    cta: { href: "/sell", label: "Start a Listing" },
    body:
      "Fixed-fee listings give sellers professional marketing without commission. " +
      "We package photos, copy, and exposure—then you keep more at the closing table.",
  },
  reels: {
    title: "Reels (Short Films)",
    price: "$5,000 package",
    bullets: [
      "2–3 minute cinematic reel",
      "Licensed music and color grading",
      "Cutdowns for social + listing teasers",
    ],
    cta: { href: "/short-films", label: "View Short Films" },
    body:
      "Nothing sells land like motion. Our field team produces cinematic reels that elevate " +
      "perception, capture mood, and highlight the best of your property.",
  },
  stories: {
    title: "Stories (Editorial Features)",
    price: "$20,000 package",
    bullets: [
      "Magazine-quality narrative + photography",
      "Legend, stewardship, and legacy framing",
      "Perfect for premium and historical properties",
    ],
    cta: { href: "/about/stories", label: "Read Stories" },
    body:
      "Long-form storytelling transforms listings into legacy. We craft narratives that honor " +
      "place, people, and future vision—perfect for discerning buyers.",
  },
  brokerage: {
    title: "Brokerage (10%)",
    price: "10% commission",
    bullets: [
      "Full representation and negotiations",
      "Buyer network + private outreach",
      "If licensed by year end",
    ],
    cta: { href: "/contact", label: "Speak with Brokerage" },
    body:
      "When you want end-to-end representation, our brokerage service handles pricing, positioning, " +
      "negotiation, and closing with white-glove care.",
  },
  flipping: {
    title: "Flipping Land",
    price: "Target: $15,000 / flip",
    bullets: [
      "Selective acquisitions",
      "Light improvements to unlock value",
      "Resell with premium creative",
    ],
    cta: { href: "/contact", label: "Discuss a Deal" },
    body:
      "When we see underloved parcels with upside, we buy, improve, and relaunch with premium creative—" +
      "unlocking returns unavailable to the average seller.",
  },
  "seller-financing": {
    title: "Seller Financing",
    price: "$500/mo example",
    bullets: [
      "Wider buyer pool",
      "Predictable recurring income",
      "Flexible terms and structures",
    ],
    cta: { href: "/contact", label: "Finance a Property" },
    body:
      "Financing unlocks buyers who value monthly terms over lump-sum cash. We structure fair, " +
      "transparent deals that keep income flowing.",
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function ServiceDetail({ params }: Params) {
  const svc = SERVICES[params.slug];

  if (!svc) {
    return (
      <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0] grid place-items-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Not found</h1>
          <p className="mt-1 text-white/70">
            This service doesn’t exist. <a href="/services" className="underline">Back to Services</a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-35" />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="mx-auto max-w-4xl px-6 pt-32 pb-12">
          <div className="inline-flex rounded-full border border-white/20 bg-black/30 px-5 py-1.5 text-[12px] uppercase tracking-[0.24em] text-white/90 backdrop-blur">
            {svc.price}
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold">{svc.title}</h1>
          <p className="mt-3 max-w-3xl text-white/80">{svc.body}</p>
          {svc.cta && (
            <a
              href={svc.cta.href}
              className="mt-6 inline-flex items-center rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              {svc.cta.label}
            </a>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="mb-3 font-serif text-2xl font-semibold">What’s Included</h2>
        <ul className="grid gap-3">
          {svc.bullets.map((b) => (
            <li key={b} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-10 text-sm text-white/70">
          <a href="/services" className="underline">← Back to Services</a>
        </div>
      </section>
    </main>
  );
}

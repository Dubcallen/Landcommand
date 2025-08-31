// before:
// import { listings } from "@/lib/listings";
import { listings } from "../../../lib/listings";


export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Buy • Sell • Discover Land — with a Built-in AI Guide
          </h1>
          <p className="mt-4 text-neutral-600">
            A modern land marketplace and media brand. Programmatic SEO, AI concierge,
            and high-impact marketing packages designed to move land.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <Link href="#packages" className="rounded-xl px-5 py-3 bg-black text-white text-center">
              See Packages
            </Link>
            <Link href="#features" className="rounded-xl px-5 py-3 border text-center">
              How It Works
            </Link>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Disclosure: Advertising by LandCommand.ai. Licensed activities brokered via partner brokers.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg border bg-white">
          <div className="aspect-[16/9] grid place-items-center">
            <span className="text-neutral-500">Hero image/video placeholder</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "AI Land Concierge",
              body: "Natural-language search and buyer targeting. Turn vague requests into qualified matches.",
            },
            {
              title: "Media That Sells",
              body: "Drone, shorts, narrated tours, and distribution across YouTube, IG, TikTok, and email.",
            },
            {
              title: "Nationwide Referrals",
              body: "Partner with top land brokers across states and monetize opportunities at scale.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-neutral-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Marketing Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter Exposure",
              price: "$750",
              bullets: ["Photo enhancement", "AI description", "Site listing", "1x Social feature"],
            },
            {
              name: "Premium Reach",
              price: "$1,500",
              bullets: [
                "Drone photography",
                "SEO blog post",
                "YouTube Short + IG Reel",
                "Email blast",
              ],
            },
            {
              name: "Elite Showcase",
              price: "From $3,000",
              bullets: [
                "Narrated YouTube tour",
                "Homepage feature",
                "Multi-platform ads",
                "Seller report & metrics",
              ],
            },
          ].map((p) => (
            <div key={p.name} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="text-3xl font-extrabold mt-2">{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <a
                href="https://cal.com/" // replace with Stripe Payment Link later
                className="mt-6 inline-flex justify-center rounded-xl px-4 py-2 bg-black text-white"
              >
                Get Started
              </a>
              <p className="text-xs text-neutral-500 mt-3">
                Use Stripe Payment Links here when ready.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

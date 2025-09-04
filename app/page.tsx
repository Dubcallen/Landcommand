// app/page.tsx
import HeroVideo from "./components/HeroVideo";
import AiSearch from "./components/AiSearch";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Full-bleed hero video at the very top */}
      <HeroVideo
        height="72vh"                 // adjust 60–84vh to taste
        title="Land Command"
        subtitle="Find the perfect land with natural-language search, not filters."
        overlay
        showCta
      />

      {/* Pull AI search up to overlap the bottom edge of the video */}
      <div className="relative -mt-14 md:-mt-20 mb-12">
        <AiSearch />
      </div>

      {/* Rest of homepage content */}
      <section className="max-w-5xl mx-auto px-6 pb-16 space-y-3">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">
          Why Land Command
        </h2>
        <p className="text-neutral-300 max-w-3xl">
          Natural-language land search, topo context, and fast investor tools.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-heading text-xl font-semibold">AI Search</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Ask in plain English — we convert to filters automatically.
            </p>
            <a
              href="/buy"
              className="mt-4 inline-block rounded-lg bg-white text-black px-4 py-2 text-sm font-medium"
            >
              Try it →
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-heading text-xl font-semibold">Browse Listings</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Explore acreage, access, utilities, and proximity at a glance.
            </p>
            <a
              href="/listings"
              className="mt-4 inline-block rounded-lg border border-white/70 px-4 py-2 text-sm hover:bg-white/10"
            >
              View listings
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-heading text-xl font-semibold">Work With Us</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Marketing for land sellers and builder partnerships.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-lg border border-white/70 px-4 py-2 text-sm hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


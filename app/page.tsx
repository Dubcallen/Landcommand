import Hero from "./components/hero";

export default function HomePage() {
  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      <Hero />

      {/* Featured Properties */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Featured Properties</h2>
          <a href="/properties/available" className="text-sm text-white/80 hover:text-white">
            View All →
          </a>
        </div>
        {/* Placeholder grid — wire to your data later */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <a key={i} href="/properties/available" className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:bg-black/55 transition">
              <div className="aspect-[4/3] bg-neutral-800/60" />
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">Exclusive</div>
                <h3 className="mt-1 text-xl font-serif font-semibold">Premium Acreage #{i}</h3>
                <p className="mt-1 text-white/75">County, State • 20–200± Acres</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Short Films (Reels) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Short Films</h2>
          <a href="/short-films" className="text-sm text-white/80 hover:text-white">
            View Portfolio →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <a key={i} href="/short-films" className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:bg-black/55 transition">
              <div className="aspect-video bg-neutral-800/60 grid place-items-center text-white/50">
                Reel #{i}
              </div>
              <div className="p-5">
                <p className="text-white/75">Cinematic marketing that sells land.</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="/short-films"
            className="inline-flex items-center rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
          >
            Book a Reel
          </a>
        </div>
      </section>

      {/* Stories / Legacy Land */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Stories</h2>
          <a href="/about/stories" className="text-sm text-white/80 hover:text-white">
            View Stories →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <a key={i} href="/about/stories" className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:bg-black/55 transition">
              <div className="aspect-[4/3] bg-neutral-800/60 grid place-items-center text-white/50">
                Story #{i}
              </div>
              <div className="p-5">
                <p className="text-white/75">Long-form, legacy-grade property features.</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="/about/stories"
            className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10"
          >
            Commission a Story
          </a>
        </div>
      </section>

      {/* Sell Your Land (Listing Fees) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6">
          <h2 className="font-serif text-3xl md:text-4xl">Sell Your Land</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            Fixed-fee listings with premium creative and national exposure. Keep more at the closing table.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="/sell"
            className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
          >
            Start Listing ($800)
          </a>
          <a href="/short-films" className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10">
            Add a Reel ($5K)
          </a>
          <a href="/about/stories" className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10">
            Add a Story ($20K)
          </a>
        </div>
      </section>

      {/* Brokerage (toggle when licensed) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6">
          <h2 className="font-serif text-3xl md:text-4xl">Brokerage Services</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            Full-service land representation, negotiation, and closing. (Visibility can be feature-flagged until licensed.)
          </p>
        </div>
        <a href="/brokerage" className="inline-block rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10">
          List with Brokerage
        </a>
      </section>

      {/* Financing teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6">
          <h2 className="font-serif text-3xl md:text-4xl">Seller Financing</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            Flexible terms open the buyer pool and create recurring income.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="/financing" className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10">
            Get Pre-Qualified
          </a>
          <a href="/properties/available" className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10">
            See financing-eligible listings
          </a>
        </div>
      </section>

      {/* Footer CTAs */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-4">
            <a href="/sell" className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]">
              List Your Property
            </a>
            <a href="/contact" className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10">
              Speak with a Specialist
            </a>
          </div>
          <p className="mt-4 text-sm text-white/60">
            © {new Date().getFullYear()} Land Command. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

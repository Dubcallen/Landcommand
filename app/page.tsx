export const metadata = {
  title: "Land Command — America’s Premiere Land Specialists",
  description:
    "Exclusive land, farm, investment, and estate opportunities. List your property, commission short films and stories, and explore financing.",
};

export default function HomePage() {
  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      {/* HERO */}
      <section className="relative isolate min-h-screen w-full overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Center stack with the same vertical rhythm as before.
            We removed the big logo and keep spacing using a spacer box. */}
        <div className="relative z-10 flex flex-col items-center pt-28 text-center">
          {/* spacer replacing the removed large logo (keeps exact rhythm) */}
          <div className="h-[120px] md:h-[140px]" aria-hidden />

          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
            LAND COMMAND
          </h1>

          <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
            CINEMATIC STORYTELLING. AI PRECISION. FASTER SALES.
          </p>

          {/* Categories */}
          <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            LAND &nbsp; | &nbsp; RANCH &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/properties/available"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-sans text-white hover:bg-white/10"
            >
              Buy
            </a>
            <a
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 text-sm font-sans text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              Sell
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
      </section>

      {/* Tiles Section (List, Films, Resources) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Explore Land Command</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/list.jpg",
              title: "List With Us",
              meta: "Flat Fee • National Exposure",
              link: "/sell",
            },
            {
              src: "/films.jpg",
              title: "Short Films",
              meta: "Cinematic Reels • 4K Aerial",
              link: "/short-films",
            },
            {
              src: "/resources.jpg",
              title: "Resources",
              meta: "Expertise • Insights • Guidance",
              link: "/resources",
            },
          ].map((card, i) => (
            <a
              key={i}
              href={card.link}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:bg-black/55 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Only the image scales on hover */}
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Exclusive
                </div>
                <h3 className="mt-1 text-xl font-serif font-semibold">{card.title}</h3>
                <p className="mt-1 text-white/75">{card.meta}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-4">
            <a
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              List Your Property
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10"
            >
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

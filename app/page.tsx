import HeroVideo from "./components/HeroVideo";
import AiSearch from "./components/AiSearch";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroVideo
        height="72vh"
        title="Land Command"
        subtitle="Find the perfect land with natural-language search, not filters."
        overlay
        showCta
      />

      {/* Overlap the AI search card onto the video edge */}
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
      </section>
    </main>
  );
}

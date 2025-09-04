"use client";

export default function HeroVideo() {
  // Replace the <video> source with your actual file in /public/ if you have one.
  // Using a neutral placeholder so the component compiles even without assets.
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border">
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="p-6">
          <h1 className="text-2xl font-bold">LandCommand.ai</h1>
          <p className="mt-2 text-neutral-600">
            Premium land listings. AI-powered discovery.
          </p>
        </div>
      </div>
      {/* If you have a hero video, uncomment: */}
      {/*
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        src="/videos/hero.mp4"
      />
      */}
    </div>
  );
}

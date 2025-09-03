/** @jsxRuntime automatic */
/** @jsxImportSource react */
"use client";
import * as React from "react";

export default function HomePage() {
  return (
    <main style={{ margin: 0 }}>
      <section
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* MOBILE: show the image */}
        <img
          src="/sight_only.png?v=2" // bump v=2 to bust CDN/browser cache
          alt="LandCommand hero"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          className="md:hidden"
        />

        {/* DESKTOP/TABLET: show the video */}
        <video
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
          loop
          playsInline
          autoPlay
          poster="/sight_only.png?v=2"
        >
          <source src="/hero.mp4?v=2" type="video/mp4" />
        </video>

        {/* dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.35)",
          }}
        />
      </section>
    </main>
  );
}

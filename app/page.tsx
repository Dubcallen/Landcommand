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
        <video
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
          poster="/sight_only.png" // change to /sight-only.png if that’s your actual file
        >
          <source src="/hero.mp4?v=1" type="video/mp4" />
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

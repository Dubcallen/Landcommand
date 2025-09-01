"use client";

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
        {/* Background video */}
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
          poster="/sight_only.png" // fallback image while video loads
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Optional dark overlay so text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />

        {/* Headline + CTA */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>
            Precision Land Intelligence
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1.25rem", maxWidth: "40rem" }}>
            Deal flow for investors and builders. AI-driven sourcing,
            underwrit

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Adapt these to match your logo/target sites (Covey Rise / LANDiO vibe)
        brand: {
          DEFAULT: "#1F2937",   // charcoal for text/buttons
          accent: "#0EA5E9",    // accent (adjust to your brand color)
        },
        surface: {
          soft: "#FAFAF9",      // off-white backgrounds
          card: "#FFFFFF",
          line: "#E5E7EB",      // subtle borders
        },
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0,0,0,0.05)",
        card: "0 6px 20px rgba(0,0,0,0.08)",
      },
      letterSpacing: {
        widehero: ".24em", // for that editorial uppercase kicker
      },
    },
  },
  plugins: [],
};

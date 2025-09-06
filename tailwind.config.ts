/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: "#1B1B1B", // page background / hero base
          linen: "#EFECE0",    // warm ivory text
          green: "#2F4F4F",    // deep forest accent (links, subtle accents)
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        nav: ".24em", // thin uppercase tracking
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

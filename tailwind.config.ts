import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // all route files
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // shared components
    "./styles/**/*.css",                     // ✅ fixed glob pattern
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1B1B1B",
        ivory: "#EFECE0",
        gold: {
          DEFAULT: "#CBB26A",
          light: "rgba(203,178,106,0.9)",
          border: "rgba(203,178,106,0.75)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

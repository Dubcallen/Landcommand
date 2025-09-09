import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"], // Inter
        serif: ["var(--font-serif)", "serif"],   // Playfair Display
      },
      colors: {
        ivory: "#EFECE0",
        charcoal: "#1B1B1B",
        forest: "#2E4E3F",
        gold: "#CBB26A",
      },
    },
  },
  plugins: [],
};

export default config;

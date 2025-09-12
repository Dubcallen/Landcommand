import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css"; // keep your existing global styles (Tailwind etc.)
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  // weight left default so it can use 400/600/700 via CSS; matches the thinner luxury look
});

export const metadata: Metadata = {
  title: "Land Command — America’s Premiere Land Specialists",
  description:
    "Exclusive land, farm, equestrian, and estate opportunities. List your property, commission short films and stories, and explore financing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#1B1B1B] text-[#EFECE0] antialiased">
        {/* ADD: Global header with dropdowns + hamburger */}
        <Nav />
        {/* Your existing pages render here (hero, sections, etc.) */}
        {children}
      </body>
    </html>
  );
}

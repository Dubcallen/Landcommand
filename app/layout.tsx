import "./globals.css";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Nav from "./components/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata = {
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
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-[#1B1B1B] text-[#EFECE0]`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}

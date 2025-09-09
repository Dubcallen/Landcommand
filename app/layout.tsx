import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // 400 gives that thin luxury feel
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "Land Command",
  description: "America's Premiere Land Specialists",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#1B1B1B] text-white">{children}</body>
    </html>
  );
}

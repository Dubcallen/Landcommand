import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LandCommand.ai",
  description: "AI-powered land marketing and builder partnerships",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white">
        {/* Topo contour background (embedded SVG as data URI) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3Cpattern id='topo' x='0' y='0' width='400' height='400' patternUnits='userSpaceOnUse'%3E%3Crect width='400' height='400' fill='none'/%3E%3Cg fill='none' stroke='%236b7280' stroke-opacity='0.25' stroke-widt

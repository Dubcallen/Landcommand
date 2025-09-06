"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Animated Hamburger Icon (3 lines morph into X)
function AnimatedHamburger({ open }: { open: boolean }) {
  return (
    <motion.svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      role="img"
      className="block"
    >
      <motion.line
        x1="4" y1="7" x2="20" y2="7"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        initial={false}
        animate={open ? { y1: 12, y2: 12, rotate: 45, x1: 6, x2: 18 } : { y1: 7, y2: 7, rotate: 0, x1: 4, x2: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{ originX: 12, originY: 12 }}
      />
      <motion.line
        x1="4" y1="12" x2="20" y2="12"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="4" y1="17" x2="20" y2="17"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        initial={false}
        animate={open ? { y1: 12, y2: 12, rotate: -45, x1: 6, x2: 18 } : { y1: 17, y2: 17, rotate: 0, x1: 4, x2: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{ originX: 12, originY: 12 }}
      />
    </motion.svg>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const lagY = useSpring(scrollY, { stiffness: 60, damping: 18, mass: 0.8 });
  const translateY = useTransform(lagY, [0, 600], [0, -40]);
  const backdropOpacity = useTransform(lagY, [0, 200, 600], [0.1, 0.25, 0.35]);

  const [open, setOpen] = React.useState(false);

  return (
    <motion.nav
      style={{ y: translateY, background: "rgba(12,12,12,0.35)", backdropFilter: "saturate(140%) blur(8px)" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
    >
      <motion.div style={{ opacity: backdropOpacity }} className="absolute inset-0 bg-black" />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left menu placeholder */}
        <div className="hidden flex-1 md:flex">{/* NavMenu left here */}</div>

        {/* Center logo */}
        <div className="flex shrink-0 basis-auto items-center justify-center">
          <Link href="/" className="relative inline-flex items-center">
            <Image
              src="/logo.svg"
              alt="LandCommand"
              width={160}
              height={48}
              priority
              className="h-12 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="ml-1 h-10 w-10 p-0">
                <AnimatedHamburger open={open} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 border-l border-white/10 bg-black/70 backdrop-blur-md">
              <SheetHeader className="px-4 py-3 border-b border-white/10">
                <SheetTitle className="flex items-center gap-2">
                  <Image src="/logo.svg" alt="LandCommand" width={120} height={36} className="h-9 w-auto" />
                </SheetTitle>
              </SheetHeader>
              {/* MobileNav here */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

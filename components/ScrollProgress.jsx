"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useNavMenuOpen } from "@/hooks/useNavMenuOpen";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const navMenuOpen = useNavMenuOpen();

  if (navMenuOpen) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-pink via-lavender to-amber safe-top"
    />
  );
}

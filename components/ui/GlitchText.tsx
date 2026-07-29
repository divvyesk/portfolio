"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
  chromatic?: boolean;
};

/** Comic-style text with optional chromatic aberration and glitch flicker. */
export default function GlitchText({ children, className = "", as: Tag = "span", chromatic = true }: Props) {
  return (
    <motion.span
      className={`relative inline-block ${chromatic ? "chromatic" : ""} ${className}`}
      animate={{ x: [0, 0, -1, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, times: [0, 0.92, 0.94, 0.96, 1] }}
    >
      <Tag>{children}</Tag>
    </motion.span>
  );
}

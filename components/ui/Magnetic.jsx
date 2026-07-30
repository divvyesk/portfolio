"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

/** Nudges its child toward the cursor while hovered. */
export default function Magnetic({ children, className, strength = 0.35 }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

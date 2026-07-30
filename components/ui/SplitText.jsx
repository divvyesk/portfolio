"use client";

import { motion } from "framer-motion";

const word = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

/**
 * Reveals a headline word by word, each word masked behind its own line.
 * The unclipped wrapper drives the viewport trigger — observing the masked
 * words themselves never fires, because they start fully clipped.
 */
export default function SplitText({ text, className, delay = 0, stagger = 0.06, once = true }) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-6% 0px" }}
    >
      {words.map((item, i) => (
        <span key={`${item}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span
            className="inline-block"
            variants={word}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {item}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

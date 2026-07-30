"use client";

import { motion } from "framer-motion";

const bars = [34, 52, 41, 68, 58, 84, 72, 96];
const wave = [18, 44, 26, 70, 92, 58, 80, 36, 62, 28, 74, 46, 88, 34, 54, 22];
const qr = Array.from({ length: 64 }, (_, i) => (i * 7 + Math.floor(i / 8) * 3) % 5 < 2);

export default function ProjectArt({ slug, className = "" }) {
  if (slug === "finos") {
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <div aria-hidden className="absolute inset-0 halftone-light opacity-20" />
        <div aria-hidden className="absolute inset-0 grid-lines-dark" />
        <div className="absolute inset-x-6 bottom-8 top-1/4 flex items-end gap-2 md:inset-x-8">
          {bars.map((height, i) => (
            <motion.span
              key={i}
              className={i % 3 === 2 ? "flex-1 bg-volt" : i % 3 === 1 ? "flex-1 bg-pink" : "flex-1 bg-acid"}
              initial={{ height: 4 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        <svg viewBox="0 0 200 120" className="absolute inset-0 size-full" aria-hidden>
          <motion.path
            d="M6 96 L34 78 L62 82 L90 54 L118 60 L146 30 L174 22 L196 8"
            fill="none"
            stroke="#00f5ff"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>
        <span className="label-sm absolute left-5 top-5 text-volt">₹ / $ · surplus → roadmap</span>
      </div>
    );
  }

  if (slug === "hitlab-ai") {
    return (
      <div className={`relative overflow-hidden bg-purple ${className}`}>
        <div aria-hidden className="absolute inset-0 halftone-light opacity-25" />
        <div aria-hidden className="absolute inset-0 grid-lines-dark" />
        <div className="absolute inset-0 flex items-center justify-center gap-[3px] px-6">
          {wave.map((height, i) => (
            <motion.span
              key={i}
              className={i % 4 === 0 ? "w-[3px] bg-volt" : i % 4 === 2 ? "w-[3px] bg-pink" : "w-[3px] bg-bone/70"}
              initial={{ height: 6 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.035, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        <svg viewBox="0 0 200 200" className="absolute -right-14 -top-14 size-48 animate-spin-slow" aria-hidden>
          {[40, 60, 80, 96].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(0,245,255,0.3)" strokeWidth="1.2" />
          ))}
        </svg>
        <span className="label-sm absolute bottom-5 left-5 text-volt">#1 · weeks predicted</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-bone-dim ${className}`}>
      <div aria-hidden className="absolute inset-0 halftone opacity-[0.04]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid size-[62%] grid-cols-8 gap-[3px]">
          {qr.map((filled, i) => (
            <motion.span
              key={i}
              className={filled ? "bg-pink" : "bg-ink/10"}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.03 + Math.floor(i / 8) * 0.03, duration: 0.35 }}
            />
          ))}
        </div>
      </div>
      <span aria-hidden className="absolute left-5 top-5 size-6 border-l-[3px] border-t-[3px] border-volt" />
      <span aria-hidden className="absolute right-5 top-5 size-6 border-r-[3px] border-t-[3px] border-pink" />
      <span aria-hidden className="absolute bottom-5 left-5 size-6 border-b-[3px] border-l-[3px] border-volt" />
      <span aria-hidden className="absolute bottom-5 right-5 size-6 border-b-[3px] border-r-[3px] border-pink" />
      <span className="label-sm absolute bottom-5 left-1/2 -translate-x-1/2 text-ash">scan · offline · vcard</span>
    </div>
  );
}

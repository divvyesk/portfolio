"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/resume";
import SectionHeading from "./ui/SectionHeading";
import { ArrowUpRight } from "./ui/Icons";

export default function Achievements() {
  return (
    <section className="relative comic-border border-x-0 bg-bone-dim">
      <div aria-hidden className="pointer-events-none absolute inset-0 halftone opacity-[0.03]" />

      <div className="page-wrap section-y">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <SectionHeading eyebrow="Receipts" title="Proof of" accentWord="work" className="lg:col-span-4" />

          <ul className="lg:col-span-8">
            {achievements.map((item, i) => {
              const rowClass =
                "group flex items-start gap-5 border-t border-ink/15 px-4 py-6 transition-all duration-300 hover:bg-pink hover:text-white md:gap-8 md:px-5 md:py-8";

              const body = (
                <>
                  <span className="mt-1 font-[family-name:var(--font-hero)] shrink-0 text-sm font-semibold italic text-pink transition-colors group-hover:text-acid md:w-10">
                    {item.tag}
                  </span>
                  <div className="min-w-0 flex-1 md:pr-6">
                    <h3 className="serif-title leading-snug transition-colors group-hover:text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="section-lead mt-2 max-w-xl text-sm transition-colors group-hover:text-white/75">
                      {item.body}
                    </p>
                  </div>
                  {item.href ? (
                    <span className="label-sm mt-1 flex shrink-0 items-center gap-2 text-ash transition-colors group-hover:text-acid">
                      <span className="hidden sm:inline">Profile</span>
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  ) : null}
                </>
              );

              return (
                <motion.li
                  key={item.tag}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="last:border-b last:border-ink/15"
                >
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                      {body}
                    </a>
                  ) : (
                    <div className={rowClass}>{body}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { siteCopy, skillGroups } from "@/lib/resume";
import Reveal from "./ui/Reveal";
import ComicBurst from "./ui/ComicBurst";
import { ArrowUpRight, Spider } from "./ui/Icons";

const glyphs: Record<string, React.ReactNode> = {
  languages: <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />,
  frontend: <path d="M3 5h18v14H3zM3 9h18M7 5v4" />,
  backend: <path d="M4 5h16v5H4zM4 14h16v5H4M8 7.5h.01M8 16.5h.01" />,
  data: <path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />,
  ai: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6.5 6.5l2.8 2.8m5.4 5.4 2.8 2.8m0-11-2.8 2.8m-5.4 5.4-2.8 2.8M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />,
  tools: <path d="M14.5 3.5a5 5 0 0 1-6.6 6.6L4 14v6h6l3.9-3.9a5 5 0 0 0 6.6-6.6l-3 3-3-3 3-3z" />,
};

const cardColors = [
  "hover:bg-pink/90",
  "hover:bg-volt/90",
  "hover:bg-amber/90",
  "hover:bg-lavender/90",
  "hover:bg-pink/90",
  "hover:bg-volt/90",
];

const cellBorder =
  "border-b-[3px] border-r-[3px] border-bone/25 last:border-b-0 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:[&:nth-child(2n)]:border-r-[3px] xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+2)]:border-b-[3px] xl:[&:nth-last-child(-n+3)]:border-b-0";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-x-hidden comic-border border-x-0 bg-city-dusk text-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 halftone-light opacity-20" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines-dark" />

      <div className="relative page-wrap section-y">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="section-eyebrow flex items-center gap-3">
              <Spider className="size-3.5 opacity-70" />
              Toolkit
              <ComicBurst text="POW!" color="amber" className="text-[10px] not-italic normal-case" />
            </div>
            <h2 className="display-serif mt-4 text-bone">
              What I <span className="hero-accent">work</span> with
            </h2>
            <Reveal delay={0.15}>
              <p className="section-lead-dark mt-7 max-w-sm">{siteCopy.skills.intro}</p>
              <div className="mt-9 hidden items-center gap-3 lg:flex">
                <span className="font-[family-name:var(--font-hero)] text-sm italic text-bone/45">
                  {siteCopy.skills.sidebarNote}
                </span>
                <ArrowUpRight className="size-4 text-acid" />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 border-[3px] border-bone/25 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {skillGroups.map((group, i) => (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 22, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative p-5 transition-all duration-300 md:p-6 ${cellBorder} ${cardColors[i]} hover:text-ink`}
              >
                <div className="flex items-start justify-between">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-7 text-volt transition-colors duration-300 group-hover:text-ink"
                    aria-hidden
                  >
                    {glyphs[group.id]}
                  </svg>
                  <span className="font-[family-name:var(--font-hero)] text-xs italic text-bone/35 transition-colors group-hover:text-ink/50">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="serif-title mt-6 text-bone transition-colors group-hover:text-ink">{group.title}</h3>
                <p className="mt-2.5 section-lead-dark text-sm transition-colors group-hover:text-ink/75">
                  {group.blurb}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="label-sm border-[2px] border-bone/30 px-2 py-1 text-bone/80 transition-colors group-hover:border-ink/25 group-hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

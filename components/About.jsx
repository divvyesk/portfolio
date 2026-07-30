"use client";

import { motion } from "framer-motion";
import { currently, education, siteCopy, stats } from "@/lib/resume";
import { openResume } from "@/lib/events";
import Reveal from "./ui/Reveal";
import ComicBurst from "./ui/ComicBurst";
import SpiderWeb from "./ui/SpiderWeb";
import { ArrowUpRight, Spider } from "./ui/Icons";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden comic-border border-x-0 bg-bone">
      <SpiderWeb className="absolute right-4 top-6 size-20 text-lavender/15 md:size-24" color="currentColor" />

      <div className="page-wrap section-y md:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="section-eyebrow mb-4 flex items-center gap-3 md:mb-5">
              <Spider className="size-3.5 opacity-70" />
              About me
              <ComicBurst text="ORIGIN" color="pink" className="ml-1 text-[10px] not-italic normal-case" />
            </div>

            <h2 className="display-serif text-ink">
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  I turn <span className="hero-accent">messy ideas</span> into
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="hero-accent">products</span> people use.
                </motion.span>
              </span>
            </h2>

            <Reveal delay={0.15} className="mt-6 max-w-2xl space-y-4 section-lead md:mt-7">
              {siteCopy.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-9">
              <button
                onClick={openResume}
                className="group inline-flex items-center gap-2 border-b border-ink/25 pb-1 font-[family-name:var(--font-hero)] text-sm font-semibold italic text-ink transition-colors hover:border-pink hover:text-pink"
              >
                {siteCopy.about.resumeLink}
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <Reveal className="border border-ink/12 bg-bone-dim/80 p-6 md:p-8">
              <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-ash">Education</span>
              <h3 className="mt-4 font-[family-name:var(--font-hero)] text-xl font-semibold normal-case leading-snug tracking-tight text-ink md:text-2xl">
                {education.school}
              </h3>
              <p className="mt-2 section-lead text-sm text-ash">
                {education.degree} · {education.location}
              </p>
              <div className="mt-6 flex items-end justify-between border-t border-ink/10 pt-5">
                <div>
                  <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-ash">CGPA</span>
                  <p className="serif-stat mt-1 hero-accent">{education.cgpa.split(" ")[0]}</p>
                </div>
                <span className="font-mono text-[11px] leading-relaxed text-ash">{education.period}</span>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-ash">Currently</span>
              <ul className="mt-4 space-y-3">
                {currently.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3 border-b border-ink/10 pb-3 section-lead text-sm"
                  >
                    <span className="mt-1 font-[family-name:var(--font-hero)] text-sm font-semibold italic text-pink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 comic-border border-x-0 border-b-0 bg-ink text-bone md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border-b border-bone/15 px-4 py-5 transition-colors hover:bg-pink/90 md:border-b-0 md:px-5 md:py-7 [&:not(:nth-child(2n))]:border-r [&:not(:nth-child(2n))]:border-bone/15 md:border-r md:last:border-r-0"
          >
            <p className="serif-stat text-bone transition-colors group-hover:text-acid">{stat.value}</p>
            <p className="label-sm mt-3 text-bone/60 transition-colors group-hover:text-bone">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

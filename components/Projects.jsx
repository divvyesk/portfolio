"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects, siteCopy } from "@/lib/resume";
import Reveal from "./ui/Reveal";
import ProjectThumbnail from "./ui/ProjectThumbnail";
import ComicBurst from "./ui/ComicBurst";
import { ArrowRight, ArrowUpRight, Spider } from "./ui/Icons";

export default function Projects() {
  return (
    <section id="work" className="relative comic-border border-x-0 bg-ink-soft text-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 halftone-light opacity-[0.03]" />

      <div className="page-wrap section-y">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="section-eyebrow flex items-center gap-3">
              <Spider className="size-3.5 opacity-70" />
              Selected work
            </div>
            <h2 className="display-serif mt-4 text-bone">
              Products I&apos;ve <span className="hero-accent">built</span>
            </h2>
            <Reveal delay={0.15}>
              <p className="section-lead-dark mt-7 max-w-sm">{siteCopy.projects.intro}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ComicBurst text="CLICK!" color="rose" className="text-[10px] not-italic normal-case" />
                <span className="font-[family-name:var(--font-hero)] flex items-center gap-2 text-sm italic text-bone/45">
                  <ArrowRight className="size-4 text-volt" />
                  any card
                </span>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-8 lg:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid grid-cols-1 overflow-hidden border-[3px] border-bone/25 bg-ink-soft transition-all duration-300 hover:border-volt hover:comic-shadow-cyan hover:-translate-x-1 hover:-translate-y-1 md:grid-cols-[1.35fr_0.65fr]"
                >
                  <div
                    className="relative w-full overflow-hidden border-b-[3px] border-bone/25 md:h-full md:min-h-0 md:border-b-0 md:border-r-[3px] md:!aspect-auto"
                    style={{ aspectRatio: project.thumbnailAspect }}
                  >
                    <div aria-hidden className="absolute inset-x-0 top-0 z-[1] flex items-center gap-1.5 border-b border-bone/15 bg-ink/90 px-3 py-2">
                      <span className="size-2 rounded-full bg-pink/80" />
                      <span className="size-2 rounded-full bg-acid/80" />
                      <span className="size-2 rounded-full bg-volt/80" />
                      <span className="label-sm ml-2 truncate text-bone/45">{project.live.replace(/^https?:\/\//, "")}</span>
                    </div>

                    <ProjectThumbnail
                      slug={project.slug}
                      thumbnail={project.thumbnail}
                      alt={`${project.title} website screenshot`}
                      priority={i === 0}
                    />

                    <span className="label-sm absolute left-0 top-10 z-[2] flex size-10 items-center justify-center bg-pink text-white comic-border border-l-0 border-t-0">
                      {project.index}
                    </span>
                    <span className="absolute right-0 top-10 z-[2] flex size-10 translate-x-full items-center justify-center bg-volt text-ink transition-transform duration-300 group-hover:translate-x-0">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-5 p-5 md:p-6 lg:p-7">
                    <div>
                      <div className="label-sm mb-3 text-bone/45">{project.category}</div>
                      <h3 className="serif-title text-bone transition-colors group-hover:text-volt md:text-2xl lg:text-[1.75rem]">
                        {project.title}
                      </h3>
                      <p className="mt-2 section-lead-dark text-sm md:text-base">{project.subtitle}</p>
                      <p className="mt-4 line-clamp-2 font-mono text-[11px] leading-relaxed text-bone/55 md:text-xs">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="label-sm border border-bone/20 px-2 py-1 text-bone/60 transition-colors group-hover:border-volt/40 group-hover:text-bone/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-bone/15 pt-4">
                        <span className="label-sm text-volt transition-colors group-hover:text-pink">View case study</span>
                        <span className="label-sm text-bone/40">{project.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

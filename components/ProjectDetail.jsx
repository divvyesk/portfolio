"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/resume";
import { openChat } from "@/lib/events";
import ProjectThumbnail from "./ui/ProjectThumbnail";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import ComicBurst from "./ui/ComicBurst";
import SpiderWeb from "./ui/SpiderWeb";
import { ArrowRight, ArrowUpRight, Spark, Spider } from "./ui/Icons";

type Props = {
  project: Project;
  next: Project;
};

export default function ProjectDetail({ project, next }: Props) {
  return (
    <main className="pt-14 md:pt-[60px]">
      <section className="relative overflow-hidden comic-border border-x-0 border-t-0 bg-ink text-bone">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines-dark" />
        <SpiderWeb className="absolute -right-6 top-6 size-28 text-pink/15 md:size-32" color="currentColor" />

        <div className="relative page-wrap py-10 md:py-14">
          <Link
            href="/#work"
            className="font-[family-name:var(--font-hero)] group inline-flex items-center gap-2 text-sm italic text-bone/50 transition-colors hover:text-volt"
          >
            <ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="section-eyebrow flex flex-col gap-2 not-italic tracking-[0.1em] sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <span className="border border-volt/40 px-2 py-1 font-mono text-[10px] not-italic">{project.index}</span>
                <span>{project.category}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Spider className="size-3 opacity-70" />
                  <ComicBurst text="CASE STUDY" color="cyan" className="text-[10px] not-italic normal-case" />
                </div>
                <span className="font-mono text-[10px] not-italic tracking-normal text-bone/50">{project.date}</span>
              </div>

              <h1 className="display-hero-landing mt-4 text-bone sm:mt-6">{project.title}</h1>
              <p className="mt-4 max-w-2xl font-[family-name:var(--font-hero)] text-lg font-medium italic leading-snug text-pink sm:mt-5 md:text-xl lg:text-2xl">
                {project.subtitle}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-4 lg:justify-end">
              <Magnetic strength={0.18}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label group touch-target flex w-full items-center justify-center gap-3 border-[3px] border-volt bg-volt px-5 py-3.5 text-ink comic-shadow-cyan transition-all hover:-translate-x-1 hover:-translate-y-1 sm:w-auto sm:py-4"
                >
                  Live site
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnetic>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="label touch-target flex w-full items-center justify-center gap-3 border-[3px] border-bone/40 px-5 py-3.5 text-bone transition-colors hover:border-volt hover:bg-volt hover:text-ink sm:w-auto sm:py-4"
              >
                Source
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t-[3px] border-bone/20">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: project.thumbnailAspect }}
          >
            <ProjectThumbnail
              slug={project.slug}
              thumbnail={project.thumbnail}
              alt={`${project.title} website screenshot`}
              className="size-full"
            />
          </div>
        </div>
      </section>

      <section
        className={`grid comic-border border-x-0 bg-acid ${
          project.metrics.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-4"
        }`}
      >
        {project.metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.55 }}
            className="border-b border-r-[3px] border-ink/20 px-4 py-5 last:border-r-0 md:border-b-0 md:px-5 md:py-6"
          >
            <p className="serif-stat text-ink">{metric.value}</p>
            <p className="label-sm mt-3 text-ink/60">{metric.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="comic-border border-x-0 bg-bone">
        <div className="page-wrap section-y md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em]">The story</span>
              <div className="section-lead mt-7 space-y-6 md:text-lg">
                {project.overview.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p>{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-10">
              <Reveal className="border border-ink/12 bg-bone-dim/80 p-6 md:p-7">
                <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-ash">
                  Built with
                </span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="label-sm border border-ink/20 px-2.5 py-1.5">
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="section-lead mt-6 border-t border-ink/10 pt-5 text-sm">{project.summary}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="comic-border border-x-0 bg-bone-dim">
        <div className="page-wrap section-y md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em]">What I built</span>
              <h2 className="display-serif mt-5 text-ink">
                Under the <span className="hero-accent">hood</span>
              </h2>
            </div>

            <ul className="lg:col-span-8">
              {project.highlights.map((highlight, i) => (
                <motion.li
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6% 0px" }}
                  transition={{ delay: (i % 3) * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col gap-3 border-t border-ink/15 px-4 py-6 transition-colors hover:bg-pink/10 last:border-b md:flex-row md:gap-8 md:px-5 md:py-8"
                >
                  <span className="mt-0.5 shrink-0 font-[family-name:var(--font-hero)] text-sm font-semibold italic text-pink md:w-16 md:pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="serif-title md:text-2xl">{highlight.title}</h3>
                    <p className="section-lead mt-2.5 max-w-2xl text-sm md:text-base">{highlight.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 comic-border border-x-0 border-b-0 lg:grid-cols-2">
        <Link
          href={`/projects/${next.slug}`}
          className="group relative overflow-hidden border-b-[3px] border-ink bg-ink p-6 text-bone transition-colors hover:bg-purple md:p-10 lg:border-b-0 lg:border-r-[3px]"
        >
          <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-volt">Next project</span>
          <h2 className="serif-title mt-5 text-2xl text-bone md:text-3xl">{next.title}</h2>
          <p className="section-lead-dark mt-4 max-w-sm text-sm">{next.subtitle}</p>
          <span className="label mt-10 flex items-center gap-3">
            Open case
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </Link>

        <div className="flex flex-col justify-between gap-8 bg-volt p-6 md:p-10">
          <div>
            <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-ink/60">
              Questions about this build?
            </span>
            <h2 className="display-serif mt-5 text-ink">
              Ask my <span className="hero-accent">AI</span> anything
            </h2>
          </div>
          <button
            onClick={() => openChat(`Tell me how you built ${project.title}.`)}
            className="touch-target label group flex w-full max-w-full items-center gap-3 border-[3px] border-ink bg-ink px-5 py-3.5 text-volt transition-all hover:bg-pink hover:text-bone hover:-translate-x-1 hover:-translate-y-1 sm:w-fit sm:py-4"
          >
            <Spark className="size-4 shrink-0 transition-transform duration-500 group-hover:rotate-90" />
            <span className="truncate">Ask my AI about this project</span>
          </button>
        </div>
      </section>
    </main>
  );
}

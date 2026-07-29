"use client";

import { motion } from "framer-motion";
import { contact, profile, socials, siteCopy } from "@/lib/resume";
import { openChat, openResume } from "@/lib/events";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import ComicBurst from "./ui/ComicBurst";
import SpiderWeb from "./ui/SpiderWeb";
import { ArrowUpRight, Doc, Spark, Spider } from "./ui/Icons";

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-svh overflow-x-hidden comic-border border-x-0 bg-golden-hour">
      <div aria-hidden className="pointer-events-none absolute inset-0 halftone opacity-[0.04]" />
      <SpiderWeb className="absolute -bottom-20 -right-16 hidden size-64 text-lavender/15 lg:block" color="currentColor" />

      <div className="relative page-wrap flex min-h-svh flex-col section-y pb-20 md:pb-28">
        <div className="grid flex-1 grid-cols-1 content-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="section-eyebrow flex items-center gap-3">
              <Spider className="size-3.5 opacity-70" />
              Contact
              <ComicBurst text="LET'S GO!" color="rose" className="text-[10px] not-italic normal-case" />
            </div>

            <p className="mt-5 font-[family-name:var(--font-hero)] text-base font-semibold tracking-tight text-ink sm:text-lg md:text-xl">
              {profile.name}
            </p>

            <h2 className="display-serif mt-2 text-ink">
              Let&apos;s build something <span className="hero-accent">cool.</span>
            </h2>

            <Reveal delay={0.15}>
              <p className="section-lead mt-8 max-w-md">{siteCopy.contact.intro}</p>

              <div className="mt-9 flex flex-nowrap items-center gap-5 overflow-x-auto pb-1 no-scrollbar sm:gap-6">
                <Magnetic strength={0.2}>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label group flex shrink-0 items-center gap-3 comic-border bg-pink py-4 pl-5 pr-4 text-white comic-shadow-pink transition-all hover:-translate-x-1 hover:-translate-y-1"
                  >
                    Get in touch
                    <span className="flex size-6 items-center justify-center bg-acid text-ink transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="size-3" />
                    </span>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <button
                    onClick={() => openChat()}
                    className="label flex shrink-0 items-center gap-2 comic-border bg-volt px-5 py-4 text-ink comic-shadow-cyan transition-all hover:-translate-x-1 hover:-translate-y-1"
                  >
                    <Spark className="size-3.5" /> Ask my AI first
                  </button>
                </Magnetic>
                <button
                  onClick={openResume}
                  className="label flex shrink-0 items-center gap-2 comic-border bg-bone px-5 py-4 transition-all hover:bg-ink hover:text-acid"
                >
                  <Doc className="size-3.5" /> Resume
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <span className="section-eyebrow text-[0.6875rem] not-italic tracking-[0.12em] text-ash">Elsewhere</span>
            <ul className="mt-5 border-t border-ink/15">
              {socials.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-ink/15"
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-4 py-5 transition-all hover:bg-ink hover:text-bone md:px-5 md:py-6"
                  >
                    <span className="flex-1 serif-title md:text-2xl">{item.label}</span>
                    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto border-t border-ink/15 pt-10 md:pt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-sm text-ash">{profile.availability}</p>
              <p className="mt-2 font-[family-name:var(--font-hero)] text-lg italic text-ink md:text-xl">
                {profile.location}
              </p>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="font-mono text-sm text-ink/70 transition-colors hover:text-pink md:text-base"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

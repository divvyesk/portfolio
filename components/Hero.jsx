"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { marqueeWords, profile, siteCopy } from "@/lib/resume";
import { scrollToSection } from "@/lib/scroll";
import { openChat } from "@/lib/events";
import Marquee from "./ui/Marquee";
import Magnetic from "./ui/Magnetic";
import SpiderWeb from "./ui/SpiderWeb";
import ComicBurst from "./ui/ComicBurst";
import { ArrowDown, ArrowRight, Spark, Spider } from "./ui/Icons";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden comic-border border-x-0 border-t-0 bg-dusk-sky pt-14 md:pt-[60px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
      <SpiderWeb className="absolute right-0 top-0 size-24 text-lavender/20 md:size-28" color="currentColor" />
      <SpiderWeb className="absolute bottom-0 left-0 size-20 text-volt/10 md:size-24" color="currentColor" />

      <div className="page-wrap relative grid w-full flex-1 grid-cols-1 content-center gap-y-6 py-5 md:grid-cols-2 md:items-center md:gap-8 md:py-6 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ y: textY, opacity: fade }} className="min-w-0 md:col-span-1 lg:col-span-7">
          <div className="label mb-4 flex flex-wrap items-center gap-2 text-ash md:mb-5">
            <span className="flex items-center gap-1.5 comic-border bg-amber/80 px-2.5 py-1 text-ink comic-shadow-sm">
              <Spider className="size-3" />
              {profile.role}
            </span>
            <ComicBurst text="OPEN!" color="rose" className="text-[10px]" />
            <span className="hidden md:inline">{profile.location}</span>
          </div>

          <h1 className="display-hero-landing text-ink">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Hey, I&apos;m <span className="hero-accent">Divvye.</span>
              </motion.span>
            </span>

            <span className="block overflow-hidden md:hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                I build cool
              </motion.span>
            </span>
            <span className="block overflow-hidden md:hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                stuff with <span className="hero-accent">AI.</span>
              </motion.span>
            </span>

            <span className="hidden overflow-hidden md:block">
              <motion.span
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                I build cool stuff with <span className="hero-accent">AI.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mt-7"
          >
            <p className="hero-lead max-w-[38ch] text-ash">
              {siteCopy.hero.bio}{" "}
              <span className="hand text-base text-pink md:text-lg">{siteCopy.hero.bioHighlight}</span>
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Magnetic strength={0.22}>
                <button
                  onClick={() => scrollToSection("work")}
                  className="label group touch-target flex items-center gap-2 comic-border bg-pink py-3 pl-4 pr-3 text-bone comic-shadow-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  {siteCopy.hero.ctaPrimary}
                  <span className="flex size-5 items-center justify-center bg-amber text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
                    <ArrowRight className="size-2.5" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <button
                  onClick={() => openChat()}
                  className="label group touch-target flex items-center gap-1.5 comic-border bg-dusk px-4 py-3 text-bone comic-shadow-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-volt hover:text-ink"
                >
                  <Spark className="size-3 transition-transform duration-500 group-hover:rotate-90" />
                  {siteCopy.hero.ctaSecondary}
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative min-w-0 md:col-span-1 lg:col-span-5">
          <motion.div style={{ y: imageY }} className="relative mx-auto w-full max-w-[220px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-none">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", rotate: 3 }}
              animate={{ clipPath: "inset(0% 0 0 0)", rotate: -1.5 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full max-h-[min(42svh,320px)] lg:max-h-[min(52svh,380px)] comic-border bg-bone comic-shadow"
            >
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 768px) 220px, (max-width: 1024px) 280px, 320px"
                className="object-cover object-top"
              />

              <span className="label-sm absolute bottom-0 left-0 flex items-center gap-1.5 bg-ink px-2.5 py-1.5 text-bone">
                <span className="size-1.5 rounded-full bg-amber animate-pulse" />
                {profile.firstName} K. / Mumbai
              </span>

              <span aria-hidden className="absolute left-1.5 top-1.5 size-4 border-l-2 border-t-2 border-amber/70" />
              <span aria-hidden className="absolute right-1.5 top-1.5 size-4 border-r-2 border-t-2 border-amber/70" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-2 top-1/4 hidden lg:block"
            >
              <ComicBurst text="DEV!" color="amber" className="text-xs rotate-[8deg]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        style={{ opacity: fade }}
        className="label group absolute bottom-14 left-4 hidden items-center gap-2 text-ash transition-colors hover:text-pink md:flex md:left-6"
      >
        <ArrowDown className="size-3 animate-bounce" />
        Scroll
      </motion.button>

      <div className="relative shrink-0 comic-border border-x-0 border-b-0 bg-ink-soft">
        <Marquee items={marqueeWords} className="text-amber/90" />
      </div>
    </section>
  );
}

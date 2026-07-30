"use client";

import { motion } from "framer-motion";
import { openChat } from "@/lib/events";
import { siteCopy } from "@/lib/resume";
import { suggestedQuestions } from "@/lib/chat-prompt";
import Reveal from "./ui/Reveal";
import ComicBurst from "./ui/ComicBurst";
import SpiderWeb from "./ui/SpiderWeb";
import { ArrowUpRight, Spark, Spider } from "./ui/Icons";

export default function AiBand() {
  return (
    <section className="relative overflow-hidden comic-border border-x-0 bg-dusk text-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines-dark" />
      <SpiderWeb className="absolute -left-8 bottom-0 size-36 text-lavender/12" color="currentColor" />

      <div className="relative page-wrap section-y">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="section-eyebrow flex items-center gap-3">
              <Spark className="size-3.5 opacity-70" />
              AI screening
              <ComicBurst text="ASK ME!" color="amber" className="text-[10px] not-italic normal-case" />
            </div>
            <h2 className="display-serif mt-4 text-bone">
              Don&apos;t scroll.
              <br />
              <span className="hero-accent">Interrogate</span> me.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="section-lead-dark max-w-md">{siteCopy.aiBand.description}</p>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, i) => (
                <motion.button
                  key={question}
                  onClick={() => openChat(question)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="label-sm group flex items-center gap-2 border-[2px] border-bone/25 px-3 py-2.5 text-left text-bone/75 transition-all hover:border-volt hover:bg-volt hover:text-ink hover:-translate-y-0.5"
                >
                  {question}
                  <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              ))}
            </div>

            <Reveal delay={0.2}>
              <button
                onClick={() => openChat()}
                className="label mt-8 flex items-center gap-3 border-[3px] border-ink bg-pink px-6 py-4 text-bone comic-shadow-pink transition-all hover:bg-amber hover:text-ink hover:-translate-x-1 hover:-translate-y-1"
              >
                <Spider className="size-4" /> Start the conversation
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

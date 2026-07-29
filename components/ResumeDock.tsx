"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/resume";
import { OPEN_RESUME } from "@/lib/events";
import { startScroll, stopScroll } from "@/lib/scroll";
import { ArrowUpRight, Close, Doc, Download, Spider } from "./ui/Icons";

function ResumePreview() {
  return (
    <div data-lenis-prevent className="h-full overflow-y-auto overscroll-contain bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/resume-preview.png" alt={`${profile.name} resume`} className="w-full" />
      <div className="flex flex-col items-center gap-3 bg-bone-dim px-6 py-8 text-center">
        <p className="font-mono text-[11px] leading-relaxed text-ash">
          Viewing a rendered page. Open the PDF for selectable text and links.
        </p>
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="label flex items-center gap-2 comic-border bg-pink px-5 py-3 text-white comic-shadow-pink"
        >
          Open the PDF <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function ResumeDock() {
  const [open, setOpen] = useState(false);
  const [inlinePdf, setInlinePdf] = useState(false);

  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const handler = () => show();
    window.addEventListener(OPEN_RESUME, handler);
    return () => window.removeEventListener(OPEN_RESUME, handler);
  }, [show]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("resume")) show();
  }, [show]);

  useEffect(() => {
    if (!open) return;
    setInlinePdf(window.matchMedia("(min-width: 768px)").matches);
    stopScroll();
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      startScroll();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.button
        onClick={show}
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group fixed left-0 top-1/2 z-[55] hidden -translate-y-1/2 border-y-[3px] border-r-[3px] border-ink bg-pink px-4 py-7 text-white transition-colors hover:bg-volt hover:text-ink sm:flex sm:items-center sm:justify-center"
        aria-label="View resume"
      >
        <span className="label flex flex-col items-center justify-center gap-2.5">
          <Doc className="size-3.5 shrink-0" />
          <span className="[writing-mode:vertical-rl] [text-orientation:mixed] tracking-[0.18em]">
            Resume
          </span>
          <span className="h-4 w-px shrink-0 bg-current opacity-40" />
          <Spider className="size-3 shrink-0 opacity-70 group-hover:opacity-100" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-ink/85 backdrop-blur-sm p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume viewer"
            onClick={(event) => event.target === event.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.99, rotate: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex h-full w-full max-w-5xl flex-col border-[3px] border-ink bg-bone comic-shadow"
            >
              <div className="flex shrink-0 items-stretch justify-between border-b-[3px] border-ink">
                <div className="flex min-w-0 flex-col justify-center gap-1 px-4 py-3 md:px-6">
                  <span className="label-sm text-pink">Now viewing</span>
                  <span className="truncate font-mono text-xs md:text-sm">
                    {profile.name.replace(" ", "_")}_Resume.pdf
                  </span>
                </div>
                <div className="flex items-stretch">
                  <a
                    href={profile.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label hidden items-center gap-2 border-l-[3px] border-ink px-5 transition-colors hover:bg-volt hover:text-ink sm:flex"
                  >
                    New tab <ArrowUpRight className="size-3.5" />
                  </a>
                  <a
                    href={profile.resumePath}
                    download
                    className="label flex items-center gap-2 border-l-[3px] border-ink bg-pink px-4 text-white transition-colors hover:bg-volt hover:text-ink md:px-5"
                  >
                    <Download className="size-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex items-center border-l-[3px] border-ink px-4 transition-colors hover:bg-ink hover:text-volt"
                    aria-label="Close resume"
                  >
                    <Close className="size-4" />
                  </button>
                </div>
              </div>

              <div data-lenis-prevent className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-bone-dim">
                {inlinePdf ? (
                  <iframe
                    src={`${profile.resumePath}#view=FitH`}
                    title={`${profile.name} resume`}
                    className="block h-full min-h-[70vh] w-full border-0"
                  />
                ) : (
                  <ResumePreview />
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

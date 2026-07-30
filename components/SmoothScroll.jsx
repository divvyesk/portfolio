"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis, syncNavScrollMargin } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    setLenis(lenis);
    syncNavScrollMargin();

    const header = document.querySelector("header");
    let resizeObserver;
    if (header) {
      resizeObserver = new ResizeObserver(() => {
        syncNavScrollMargin();
      });
      resizeObserver.observe(header);
    }

    // Landing on /#section from another page: jump once Lenis owns the scroll.
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) requestAnimationFrame(() => lenis.scrollTo(target, { offset: 0, immediate: true }));
    }

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}

import type Lenis from "lenis";

let instance: Lenis | null = null;

/** Keep CSS scroll-margin in sync with the fixed header — Lenis reads this automatically. */
export const syncNavScrollMargin = () => {
  if (typeof window === "undefined") return;
  const header = document.querySelector("header");
  if (!header) return;
  document.documentElement.style.setProperty(
    "--nav-height",
    `${header.getBoundingClientRect().height}px`,
  );
};

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const stopScroll = () => instance?.stop();
export const startScroll = () => instance?.start();

export const scrollToSection = (id: string) => {
  if (typeof window === "undefined") return;

  syncNavScrollMargin();

  // Mobile menu locks scroll via Lenis.stop() + overflow:hidden — unlock before navigating.
  startScroll();
  document.body.style.overflow = "";

  const target = id === "home" ? 0 : document.getElementById(id);
  if (target === null) return;

  const scroll = () => {
    if (instance) {
      instance.scrollTo(target as 0 | HTMLElement, { offset: 0, duration: 1.3 });
      return;
    }

    if (target === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Wait one frame so menu unmount + overflow reset apply before Lenis scrolls (iOS Safari).
  requestAnimationFrame(() => requestAnimationFrame(scroll));
};

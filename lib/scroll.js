let instance = null;

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

export const setLenis = (lenis) => {
  instance = lenis;
};

export const stopScroll = () => instance?.stop();
export const startScroll = () => instance?.start();

export const scrollToSection = (id) => {
  syncNavScrollMargin();

  const target = id === "home" ? 0 : document.getElementById(id);
  if (target === null) return;

  if (instance) {
    instance.scrollTo(target, { offset: 0, duration: 1.3 });
    return;
  }

  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

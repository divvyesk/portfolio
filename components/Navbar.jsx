"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "@/lib/resume";
import { scrollToSection, startScroll, stopScroll, syncNavScrollMargin } from "@/lib/scroll";
import { openChat, openResume, setNavMenuOpen } from "@/lib/events";
import { Close, Doc, Spark, Spider } from "./ui/Icons";

function NavLink({ link, isHome, isActive, onGo, compact = false }) {
  const className = `label relative touch-target transition-colors ${
    compact ? "px-2 py-2 text-[10px]" : "px-4 py-2.5"
  } ${isActive ? "text-pink" : "text-ash hover:text-ink"}`;

  if (isHome) {
    return (
      <button onClick={() => onGo(link.id)} className={className}>
        {link.label}
        {isActive && !compact ? (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-x-2 -bottom-px h-[3px] bg-volt"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        ) : null}
      </button>
    );
  }

  return (
    <Link href={`/#${link.id}`} className={className}>
      {link.label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    syncNavScrollMargin();
    const header = document.querySelector("header");
    if (!header) return;
    const resizeObserver = new ResizeObserver(() => {
      syncNavScrollMargin();
    });
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el) => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setNavMenuOpen(menuOpen);
    if (!menuOpen) return;

    stopScroll();
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      startScroll();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      setNavMenuOpen(false);
    };
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    if (isHome) scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 box-border w-full max-w-[100vw] overflow-visible safe-top transition-colors duration-300 ${
          scrolled ? "bg-bone/90 backdrop-blur-md" : "bg-bone/40 backdrop-blur-[2px]"
        }`}
      >
        <nav className="flex h-14 items-stretch justify-between pl-3 pr-0 sm:pl-4 md:h-[60px] md:pl-6">
          <Link
            href="/"
            onClick={() => isHome && go("home")}
            className="group flex min-w-0 shrink-0 items-center gap-2 self-center sm:gap-3"
            aria-label="Divvye Kansara home"
          >
            <span className="flex size-9 shrink-0 items-center justify-center comic-border bg-pink text-bone transition-all group-hover:bg-volt group-hover:text-ink comic-shadow-sm">
              <Spider className="size-4 transition-transform duration-500 group-hover:rotate-12" />
            </span>
            <span className="hidden min-w-0 font-[family-name:var(--font-hero)] text-sm font-semibold normal-case leading-tight tracking-tight sm:block">
              Divvye
              <br />
              <span className="italic text-pink">Kansara</span>
            </span>
          </Link>

          {/* Tablet nav — md to lg */}
          <ul className="hidden max-w-[42vw] items-center gap-0.5 self-center overflow-x-auto no-scrollbar md:flex lg:hidden">
            {navLinks.map((link) => (
              <li key={link.id} className="shrink-0">
                <NavLink
                  link={link}
                  isHome={isHome}
                  isActive={isHome && active === link.id}
                  onGo={go}
                  compact
                />
              </li>
            ))}
          </ul>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 self-center lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  link={link}
                  isHome={isHome}
                  isActive={isHome && active === link.id}
                  onGo={go}
                />
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-stretch self-stretch">
            <span className="label-sm mr-3 hidden max-w-[11rem] items-center gap-2 self-center truncate text-ash xl:mr-5 xl:flex xl:max-w-none">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-pink" />
              </span>
              <span className="truncate">{profile.availability}</span>
            </span>

            <button
              onClick={() => openChat()}
              className="label group flex touch-target items-center gap-2 self-stretch border-l-[3px] border-ink bg-volt px-4 text-ink transition-colors hover:bg-pink hover:text-bone md:flex lg:px-6"
            >
              <Spark className="size-3.5 transition-transform duration-500 group-hover:rotate-90" />
              <span className="hidden lg:inline">Ask my AI</span>
              <span className="lg:hidden">AI</span>
            </button>

            {/* CV — mobile + tablet (desktop uses side dock) */}
            <button
              onClick={openResume}
              className="label flex touch-target items-center gap-2 self-stretch border-l-[3px] border-ink bg-acid px-3 text-ink sm:px-4 lg:hidden"
              aria-label="View resume"
            >
              <Doc className="size-3.5" />
              <span className="hidden sm:inline">CV</span>
            </button>

            {/* Hamburger — phones only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="label flex touch-target items-center gap-2 self-stretch border-l-[3px] border-ink bg-ink px-4 text-bone md:hidden"
              aria-label="Open menu"
            >
              Menu
              <span className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-4 bg-volt" />
                <span className="block h-[2px] w-4 bg-pink" />
                <span className="block h-[2px] w-4 bg-acid" />
              </span>
            </button>
          </div>
        </nav>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] bg-ink"
        />
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink text-bone safe-top safe-bottom"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b-[3px] border-volt/30 pl-4">
              <span className="label text-volt">Navigation</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="label flex h-14 touch-target items-center gap-2 border-l-[3px] border-volt/30 px-5 text-bone"
                aria-label="Close menu"
              >
                Close <Close className="size-4" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-4 py-6 sm:gap-2 sm:px-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isHome ? (
                    <button
                      onClick={() => go(link.id)}
                      className="display-serif touch-target block w-full py-2 text-left text-3xl text-bone hover:text-volt"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={`/#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="display-serif touch-target block py-2 text-3xl text-bone"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="flex shrink-0 flex-col">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openResume();
                }}
                className="label flex touch-target items-center justify-center gap-2 border-t-[3px] border-volt/30 py-4 text-bone sm:py-5"
              >
                <Doc className="size-4" /> View resume
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openChat();
                }}
                className="label flex touch-target items-center justify-center gap-2 bg-pink py-4 text-bone sm:py-5"
              >
                <Spark className="size-4" /> Ask my AI anything
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

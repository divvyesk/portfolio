import Link from "next/link";
import { ArrowRight, Spider } from "@/components/ui/Icons";
import ComicBurst from "@/components/ui/ComicBurst";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-ink px-6 text-center text-bone">
      <Spider className="size-12 animate-spin-slow text-pink" />
      <ComicBurst text="404!" color="pink" className="text-lg not-italic normal-case" />
      <h1 className="display-serif text-bone">
        Page not <span className="hero-accent">found</span>
      </h1>
      <p className="section-lead-dark max-w-sm text-center">
        That link doesn&apos;t exist, but the work does. Wrong universe, maybe?
      </p>
      <Link
        href="/"
        className="label group flex items-center gap-3 border-[3px] border-volt bg-volt px-6 py-4 text-ink comic-shadow-cyan transition-all hover:-translate-x-1 hover:-translate-y-1"
      >
        Back to the portfolio
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </main>
  );
}

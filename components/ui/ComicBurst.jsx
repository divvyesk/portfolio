const colors = {
  pink: "bg-pink text-bone",
  rose: "bg-pink text-bone",
  cyan: "bg-volt text-ink",
  yellow: "bg-acid text-ink",
  amber: "bg-acid text-ink",
};

/** Comic-book burst badge — "POW!", "BAM!" style. */
export default function ComicBurst({ text, className = "", color = "pink" }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-0.5 font-display text-xs tracking-wider comic-border comic-shadow-sm rotate-[-4deg] ${colors[color]} ${className}`}
    >
      {text}
    </span>
  );
}

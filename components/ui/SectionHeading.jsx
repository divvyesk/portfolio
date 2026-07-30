import { Spider } from "./Icons";

export default function SectionHeading({ eyebrow, title, accentWord, dark = false, className = "" }) {
  return (
    <div className={className}>
      <div className="section-eyebrow mb-4 flex items-center gap-3 md:mb-5">
        <Spider className="size-3.5 opacity-70" />
        {eyebrow}
      </div>
      <h2 className={`display-serif ${dark ? "text-bone" : "text-ink"}`}>
        {title}
        {accentWord ? (
          <>
            {" "}
            <span className="hero-accent">{accentWord}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

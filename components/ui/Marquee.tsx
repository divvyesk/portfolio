import { Spider } from "./Icons";

type Props = {
  items: string[];
  className?: string;
  itemClassName?: string;
  slow?: boolean;
};

export default function Marquee({ items, className = "", itemClassName, slow = false }: Props) {
  const track = [...items, ...items];
  const itemStyles = itemClassName ?? "label flex items-center whitespace-nowrap";

  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max shrink-0 items-center ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
        aria-hidden
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className={itemStyles}>
            <span className="px-4 py-2">{item}</span>
            <Spider className="size-3 shrink-0 text-pink" />
          </span>
        ))}
      </div>
    </div>
  );
}

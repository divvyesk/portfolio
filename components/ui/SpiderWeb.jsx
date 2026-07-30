/** Decorative spider-web SVG — Spider-Verse corner accent. */
export default function SpiderWeb({ className = "size-32", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      {[20, 35, 50, 65].map((r) => (
        <circle key={r} cx="60" cy="60" r={r} stroke={color} strokeWidth="0.8" opacity="0.5" />
      ))}
      {[0, 30, 60, 90, 120, 150].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 60 + 65 * Math.cos(rad);
        const y2 = 60 + 65 * Math.sin(rad);
        return <line key={angle} x1="60" y1="60" x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.5" />;
      })}
    </svg>
  );
}

/** Global halftone + film grain overlay — Spider-Verse comic print texture. */
export default function Halftone() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1225 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}

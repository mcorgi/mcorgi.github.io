// Small hand-drawn SVG scenes. The moving parts use SMIL, and a still copy
// is shown instead when the visitor prefers reduced motion (see globals.css).

// Fixed so server and client render the same stars.
const STARS: [number, number, number][] = [
  [24, 30, 1.2], [70, 64, 0.8], [118, 22, 1], [160, 86, 0.7], [214, 18, 1.3],
  [262, 52, 0.8], [318, 26, 1], [362, 70, 1.2], [384, 140, 0.8], [340, 230, 1],
  [300, 268, 0.7], [236, 284, 1.1], [150, 270, 0.8], [96, 240, 1.2], [36, 206, 0.9],
  [18, 120, 0.7], [58, 160, 1], [372, 196, 0.7], [126, 128, 0.6], [286, 130, 0.6],
];

// A satellite going around a little planet. For the Amazon Leo card.
export function SatelliteScene({ className = "" }: { className?: string }) {
  const orbit = "M 50 150 A 150 52 0 1 1 350 150 A 150 52 0 1 1 50 150";
  const satellite = (
    <g>
      <line x1="-8" y1="0" x2="8" y2="0" stroke="#f5f8fd" strokeWidth="1.5" />
      <rect x="-27" y="-5" width="17" height="10" rx="1" fill="#6d4fd8" stroke="#f5f8fd" strokeWidth="1.2" />
      <line x1="-21" y1="-5" x2="-21" y2="5" stroke="#f5f8fd" strokeWidth="0.8" />
      <line x1="-16" y1="-5" x2="-16" y2="5" stroke="#f5f8fd" strokeWidth="0.8" />
      <rect x="10" y="-5" width="17" height="10" rx="1" fill="#6d4fd8" stroke="#f5f8fd" strokeWidth="1.2" />
      <line x1="16" y1="-5" x2="16" y2="5" stroke="#f5f8fd" strokeWidth="0.8" />
      <line x1="21" y1="-5" x2="21" y2="5" stroke="#f5f8fd" strokeWidth="0.8" />
      <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#f5f8fd" />
      <line x1="0" y1="-6" x2="0" y2="-12" stroke="#f5f8fd" strokeWidth="1.2" />
      <circle cx="0" cy="-13" r="1.8" fill="#e0679a" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="A cartoon satellite orbiting a small planet"
      className={`block w-full h-auto rounded-lg ${className}`}
    >
      <rect width="400" height="300" fill="#1b1545" />
      {STARS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#f5f8fd" className={i % 3 === 0 ? "twinkle" : ""} style={{ animationDelay: `${(i % 5) * 0.6}s` }} opacity={0.8} />
      ))}

      {/* orbit, back half */}
      <path d={orbit} fill="none" stroke="#9b87f5" strokeOpacity="0.45" strokeDasharray="3 5" transform="rotate(-14 200 150)" />

      {/* planet */}
      <defs>
        <radialGradient id="planet" cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#5fa0d6" />
          <stop offset="100%" stopColor="#2a3f9e" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="150" r="58" fill="url(#planet)" />
      <path d="M168 120 q14 -10 26 0 q8 8 -4 16 q-16 6 -22 -4 q-4 -6 0 -12z" fill="#54b6bf" opacity="0.85" />
      <path d="M210 160 q18 -6 28 6 q4 12 -12 16 q-14 2 -18 -8z" fill="#54b6bf" opacity="0.85" />
      <path d="M186 186 q8 -4 14 2 q-2 6 -10 6z" fill="#54b6bf" opacity="0.7" />

      {/* satellite */}
      <g transform="rotate(-14 200 150)">
        <g className="motion-only">
          {satellite}
          <animateMotion dur="14s" repeatCount="indefinite" path={orbit} rotate="0" />
        </g>
        <g className="still-only" transform="translate(320 120)">
          {satellite}
        </g>
      </g>
    </svg>
  );
}

// A plane flying laps around a dashed course. Background for the SUAS block.
export function FlyingPlane({ className = "" }: { className?: string }) {
  const course = "M 170 70 H 630 A 110 110 0 0 1 630 290 H 170 A 110 110 0 0 1 170 70 Z";
  // Top-down plane, nose pointing +x so rotate="auto" follows the path.
  const plane = (
    <g fill="#f5f8fd" transform="scale(1.7)">
      <path d="M15 0 L9 -2.2 L-12 -2 L-15 0 L-12 2 L9 2.2 Z" />
      <path d="M3 -2 L-3 -17 L-8 -17 L-5 -2 Z" />
      <path d="M3 2 L-3 17 L-8 17 L-5 2 Z" />
      <path d="M-10 -2 L-14 -7.5 L-16.5 -7.5 L-14.5 -2 Z" />
      <path d="M-10 2 L-14 7.5 L-16.5 7.5 L-14.5 2 Z" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 800 360"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <path d={course} fill="none" stroke="#f5f8fd" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="6 10" />
      {[
        [170, 70],
        [630, 70],
        [740, 180],
        [630, 290],
        [170, 290],
        [60, 180],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#e0679a" opacity="0.7" />
      ))}
      <g opacity="0.35">
        <g className="motion-only">
          {plane}
          <animateMotion dur="16s" repeatCount="indefinite" path={course} rotate="auto" />
        </g>
        <g className="still-only" transform="translate(420 70)">
          {plane}
        </g>
      </g>
    </svg>
  );
}

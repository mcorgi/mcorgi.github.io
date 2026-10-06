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

// The MPS pipeline as a chalkboard drawing: the GoPro under the plane takes a
// photo, the Pi pairs it with Pixhawk telemetry, and the pair goes down the
// radio link to the ground station. One 6 s loop; every animation shares it.
const CHALK = {
  cream: "#eef1f7",
  blue: "#8ec5ff",
  purple: "#b69cff",
  pink: "#ff9ec7",
  green: "#9fe0a8",
  yellow: "#ffe08a",
  teal: "#7fe0d8",
};
const LOOP = "6s";

function Photo() {
  return (
    <g>
      <rect x="-20" y="-14" width="40" height="28" rx="1.5" fill="#f4f1e8" />
      <rect x="-17" y="-11" width="34" height="19" fill="#3d6b4f" />
      <path d="M-17 2 Q-8 -6 0 0 T17 -2 V8 H-17Z" fill="#5c8f5a" />
      <path d="M-17 6 Q-4 2 6 6 T17 5" stroke={CHALK.blue} strokeWidth="1.4" fill="none" />
      <path d="M2 2 L5 -3 L8 2Z" fill={CHALK.pink} />
    </g>
  );
}

function TelemetryTag() {
  return (
    <g fontFamily="var(--font-mono), monospace" fontSize="8.5" fill={CHALK.yellow}>
      <rect x="0" y="-15" width="98" height="30" rx="4" fill={CHALK.yellow} fillOpacity="0.12" stroke={CHALK.yellow} />
      <text x="6" y="-3">42.4436, -76.4411</text>
      <text x="6" y="9">alt 100 · yaw 0°</text>
    </g>
  );
}

export function MpsScene({ className = "" }: { className?: string }) {
  const label = { fontFamily: "var(--font-display), sans-serif", fontWeight: 700, letterSpacing: "0.12em" } as const;

  return (
    <svg
      viewBox="0 0 560 320"
      role="img"
      aria-label="Animated sketch of MPS: the GoPro under the plane takes a photo, the onboard Pi pairs it with GPS from the Pixhawk, and the photo and its position are sent over the radio to the ground station."
      className={`block w-full h-auto rounded-xl ${className}`}
    >
      <defs>
        <filter id="mps-chalk">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id="mps-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHALK.purple} stopOpacity="0.55" />
          <stop offset="100%" stopColor={CHALK.blue} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <rect width="560" height="320" fill="#22252f" />

      {/* sparkles */}
      {[[30, 30, CHALK.purple], [300, 22, CHALK.yellow], [540, 160, CHALK.purple], [26, 228, CHALK.yellow]].map(([x, y, c]) => (
        <path key={`${x}`} d={`M${x} ${Number(y) - 6} L${Number(x) + 1.5} ${Number(y) - 1.5} L${Number(x) + 6} ${y} L${Number(x) + 1.5} ${Number(y) + 1.5} L${x} ${Number(y) + 6} L${Number(x) - 1.5} ${Number(y) + 1.5} L${Number(x) - 6} ${y} L${Number(x) - 1.5} ${Number(y) - 1.5}Z`} fill={String(c)} className="twinkle" opacity="0.8" />
      ))}

      {/* camera cone + footprint, lit on each shutter */}
      <g className="motion-only">
        <polygon points="187,101 132,272 258,272" fill="url(#mps-cone)">
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;1;0.25;0;0" keyTimes="0;0.03;0.2;0.3;1" />
        </polygon>
        <ellipse cx="195" cy="272" rx="63" ry="6" fill="none" stroke={CHALK.purple} strokeDasharray="3 4">
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;1;0.4;0;0" keyTimes="0;0.03;0.2;0.3;1" />
        </ellipse>
      </g>

      <g filter="url(#mps-chalk)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* ground: mountains, field, river, trees, the tent target */}
        <path d="M0 262 L40 240 L70 255 L110 228 L150 252 L190 236 L230 258 L270 242 L300 262" stroke={CHALK.purple} strokeOpacity="0.55" strokeWidth="1.6" />
        <path d="M0 274 Q140 262 300 272 T560 270" stroke={CHALK.green} strokeWidth="1.8" />
        <path d="M14 320 C80 292 140 302 170 286 S250 280 300 296 S360 318 380 320" stroke={CHALK.blue} strokeWidth="3" strokeOpacity="0.7" />
        {[[40, 270], [60, 274], [250, 266], [278, 268], [300, 272], [92, 276]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 6} ${y} L${x} ${y - 14} L${x + 6} ${y}Z M${x} ${y} V${y + 4}`} stroke={CHALK.green} strokeWidth="1.4" />
        ))}
        <path d="M195 286 L205 268 L215 286Z M205 268 V286" stroke={CHALK.pink} strokeWidth="1.6" />

        {/* ground station: NanoStation on a tripod, laptop running hawk-ai */}
        <path d="M412 284 L403 302 M412 284 L421 302 M412 284 V302" stroke={CHALK.cream} strokeWidth="1.4" />
        <rect x="407" y="244" width="10" height="40" rx="3" stroke={CHALK.cream} strokeWidth="1.6" />
        <rect x="445" y="232" width="68" height="44" rx="3" fill="#1a1d26" stroke={CHALK.cream} strokeWidth="1.6" />
        <path d="M438 278 L520 278 L528 288 L430 288Z" stroke={CHALK.cream} strokeWidth="1.6" />

        {/* onboard callout */}
        <rect x="318" y="26" width="226" height="118" rx="10" stroke={CHALK.purple} strokeWidth="1.5" strokeDasharray="5 5" />
        <path d="M240 82 Q280 70 318 84" stroke={CHALK.purple} strokeWidth="1.3" strokeDasharray="2 5" />
        <rect x="330" y="108" width="62" height="24" rx="4" stroke={CHALK.green} strokeWidth="1.5" />
      </g>

      {/* laptop screen: the latest photo, as hawk-ai sees it */}
      <g transform="translate(479 254) scale(1.5)">
        <Photo />
        <rect x="-1" y="-5" width="12" height="10" fill="none" stroke={CHALK.pink} strokeWidth="1.2">
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.86;0.9;1" />
        </rect>
      </g>
      <rect x="447" y="234" width="64" height="40" fill="#fff" opacity="0">
        <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;0;0.7;0;0" keyTimes="0;0.82;0.85;0.93;1" />
      </rect>
      <text x="479" y="226" textAnchor="middle" fontSize="9" fill={CHALK.pink} style={label} opacity="0">
        TARGET!
        <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.86;0.9;1" />
      </text>

      {/* radio link down to the ground */}
      <path d="M455 144 C470 182 430 212 414 242" fill="none" stroke={CHALK.teal} strokeWidth="1.8" strokeDasharray="4 6" className="dash-flow" />
      {[10, 17].map((r, i) => (
        <path key={r} d={`M${412 - r} ${244 - r * 0.4} A${r} ${r} 0 0 1 ${412 + r} ${244 - r * 0.4}`} fill="none" stroke={CHALK.teal} strokeWidth="1.4">
          <animate attributeName="opacity" dur="1.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" values="0;1;0" />
        </path>
      ))}

      {/* the plane, bobbing a little */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="3s" repeatCount="indefinite" />
        <g filter="url(#mps-chalk)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" stroke={CHALK.cream}>
          <path d="M150 70 L128 48 L142 48 L186 70" fill="#2c3142" />
          <path d="M100 75 L88 52 L102 52 L122 70" fill="#2c3142" />
          <path d="M92 78 C100 70 120 69 140 69 L228 71 C244 72 252 76 254 79 C252 82 244 86 228 87 L140 89 C120 89 100 86 92 78Z" fill="#2c3142" />
          <path d="M98 80 L84 90 L96 90 L112 82" fill="#2c3142" />
          <path d="M152 86 L122 116 L140 116 L192 86" fill="#2c3142" />
          <path d="M136 103 L170 89" stroke={CHALK.blue} strokeWidth="2.4" />
          <path d="M200 72 Q212 66 226 72" stroke={CHALK.blue} />
          <path d="M187 86 V88" />
          <rect x="176" y="88" width="22" height="15" rx="2.5" fill="#3a3f52" />
          <circle cx="187" cy="96" r="4.6" fill="#5fa0d6" />
        </g>
        <ellipse cx="257" cy="79" rx="2" ry="13" fill="none" stroke={CHALK.cream} strokeWidth="1.6">
          <animate attributeName="ry" values="13;3;13" dur="0.25s" repeatCount="indefinite" />
        </ellipse>
        {/* GoPro highlight + shutter flash */}
        <circle cx="187" cy="96" r="14" fill="none" stroke={CHALK.pink} strokeWidth="1.6" strokeDasharray="4 4" />
        <circle cx="187" cy="96" r="10" fill="#fff" opacity="0" className="motion-only">
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;1;0;0" keyTimes="0;0.02;0.08;1" />
        </circle>
      </g>

      {/* labels */}
      <g style={label} fontSize="11">
        <text x="226" y="136" fill={CHALK.pink}>GOPRO</text>
        <path d="M222 132 Q206 128 200 112" fill="none" stroke={CHALK.pink} strokeWidth="1.4" />
        <text x="36" y="168" fill={CHALK.blue}>1 · CAPTURE</text>
        <text x="332" y="46" fill={CHALK.purple}>2 · PAIR ON THE PI</text>
        <text x="458" y="200" fill={CHALK.teal}>3 · SEND</text>
      </g>
      <g fontFamily="var(--font-mono), monospace" fontSize="9" fill={CHALK.cream}>
        <text x="361" y="124" textAnchor="middle" fill={CHALK.green}>Pixhawk</text>
        <text x="479" y="306" textAnchor="middle" opacity="0.7">ground station</text>
      </g>
      <circle cx="398" cy="114" r="2.4" fill={CHALK.green}>
        <animate attributeName="opacity" values="1;0.15;1" dur="0.4s" repeatCount="indefinite" />
      </circle>

      {/* moving parts: photo, telemetry tag, "paired" */}
      <g className="motion-only">
        <g opacity="0">
          <animateTransform attributeName="transform" type="translate" dur={LOOP} repeatCount="indefinite" values="187 104; 187 104; 290 112; 362 76; 362 76; 452 250; 452 250" keyTimes="0;0.06;0.17;0.28;0.6;0.82;1" />
          <animateTransform attributeName="transform" type="scale" additive="sum" dur={LOOP} repeatCount="indefinite" values="0.2;0.2;0.6;1;1;0.45;0.45" keyTimes="0;0.06;0.17;0.28;0.6;0.82;1" />
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;0;1;1;1;0;0" keyTimes="0;0.05;0.1;0.6;0.78;0.83;1" />
          <Photo />
        </g>
        <g opacity="0">
          <animateTransform attributeName="transform" type="translate" dur={LOOP} repeatCount="indefinite" values="398 120; 398 120; 386 76; 386 76; 452 250; 452 250" keyTimes="0;0.3;0.42;0.6;0.82;1" />
          <animateTransform attributeName="transform" type="scale" additive="sum" dur={LOOP} repeatCount="indefinite" values="0.3;0.3;1;1;0.35;0.35" keyTimes="0;0.3;0.42;0.6;0.82;1" />
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;0;1;1;1;0;0" keyTimes="0;0.29;0.33;0.6;0.78;0.83;1" />
          <TelemetryTag />
        </g>
        <text x="500" y="124" textAnchor="middle" fontSize="10" fill={CHALK.green} style={label} opacity="0">
          PAIRED ✓
          <animate attributeName="opacity" dur={LOOP} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.42;0.45;0.58;0.62;1" />
        </text>
      </g>

      {/* still frame for reduced motion */}
      <g className="still-only">
        <g transform="translate(362 76)"><Photo /></g>
        <g transform="translate(386 76)"><TelemetryTag /></g>
        <text x="500" y="124" textAnchor="middle" fontSize="10" fill={CHALK.green} style={label}>PAIRED ✓</text>
      </g>
    </svg>
  );
}

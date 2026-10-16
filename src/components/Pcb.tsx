// The Embedded projects card is drawn as a circuit board: green solder mask,
// gold traces and mounting holes, white silkscreen.
const GOLD = "#d9b45a";
const BOARD = "#0e5c45";
const TOP = 3; // the two trace tracks in an edge strip, in px from its top
const BOTTOM = 11;

export function MountingHole({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-5 w-5 rounded-full border-[3px] border-[#d9b45a] bg-[#062c21] ${className}`} />;
}

function Via({ y }: { y: number }) {
  return (
    <svg width={8} height={14} className="shrink-0">
      <line x1={4} x2={8} y1={y} y2={y} stroke={GOLD} strokeWidth={2} />
      <circle cx={4} cy={y} r={3.2} fill={BOARD} stroke={GOLD} strokeWidth={1.8} />
    </svg>
  );
}

function Trace({ y, grow }: { y: number; grow: number }) {
  return (
    <span
      className="h-[2px] min-w-2"
      style={{
        flex: `${grow} 1 0`,
        background: GOLD,
        alignSelf: y === TOP ? "flex-start" : "flex-end",
        margin: y === TOP ? "2px 0 0" : "0 0 2px",
      }}
    />
  );
}

// Via, trace, a 45° jog to the other track, trace, via.
function TraceRun({ from, reverse = false }: { from: number; reverse?: boolean }) {
  const to = from === TOP ? BOTTOM : TOP;
  return (
    <span className={`flex h-[14px] min-w-0 flex-1 ${reverse ? "-scale-x-100" : ""}`}>
      <Via y={from} />
      <Trace y={from} grow={2} />
      <svg width={8} height={14} className="shrink-0">
        <path d={`M0 ${from} L8 ${to}`} stroke={GOLD} strokeWidth={2} fill="none" />
      </svg>
      <Trace y={to} grow={3} />
      <Via y={to} />
    </span>
  );
}

// A strip along the top or bottom edge of the board: traces either side of a silkscreen label.
export function PcbEdge({ label, flip = false }: { label: string; flip?: boolean }) {
  const from = flip ? BOTTOM : TOP;
  return (
    <div aria-hidden className="flex h-10 items-center gap-3 px-7 font-mono text-[11px] sm:text-[12px] tracking-[0.2em] text-[#f4f1e6]/85">
      <TraceRun from={from} />
      <span className="shrink-0 whitespace-nowrap">{label}</span>
      <TraceRun from={from} reverse />
    </div>
  );
}

export function ChipIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className={className}>
      <g stroke="var(--line)" strokeWidth={1.5}>
        {[13, 18, 23].map((v) => (
          <g key={v}>
            <line x1={3} x2={8} y1={v} y2={v} />
            <line x1={28} x2={33} y1={v} y2={v} />
            <line y1={3} y2={8} x1={v} x2={v} />
            <line y1={28} y2={33} x1={v} x2={v} />
          </g>
        ))}
        <rect x={8} y={8} width={20} height={20} rx={2} fill="currentColor" />
      </g>
      <circle cx={12.5} cy={12.5} r={1.6} fill="var(--line)" />
    </svg>
  );
}

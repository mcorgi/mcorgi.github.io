"use client";

import { useEffect, useReducer, useRef } from "react";

// A browser version of run_test.py (not the lab code): the same 8-step test
// loop, START, panic stop / resume, QUIT and the 120 s timeout, checked every
// 50 ms like the program's main loop. The piTFT screen is drawn at the
// program's own 320×240 pygame coordinates.

export type Motor = "clockwise" | "counter-clockwise" | "stopped";
export type History = [Motor, number][];

// (name, left motor, right motor, seconds), as in run_test.py.
const SEQUENCE: [string, Motor, Motor, number][] = [
  ["forward", "clockwise", "clockwise", 2],
  ["stop", "stopped", "stopped", 1],
  ["backward", "counter-clockwise", "counter-clockwise", 2],
  ["stop", "stopped", "stopped", 1],
  ["pivot left", "counter-clockwise", "clockwise", 2],
  ["stop", "stopped", "stopped", 1],
  ["pivot right", "clockwise", "counter-clockwise", 2],
  ["stop", "stopped", "stopped", 1],
];
const TIMEOUT_S = 120;
const LOOP_MS = 50;

// The top-down view: arena units per second at full speed, degrees per second pivoting.
const SPEED = 32;
const TURN = 90;
const HOME = { x: 100, y: 118, deg: 0 };

type Sim = {
  phase: "off" | "running" | "quit";
  t0: number;
  last: number;
  started: boolean;
  panicked: boolean;
  step: number;
  stepEnd: number;
  timeLeft: number;
  left: Motor;
  right: Motor;
  lh: History;
  rh: History;
  pose: { x: number; y: number; deg: number };
  log: string[];
};

type Action =
  | { type: "boot"; now: number }
  | { type: "tick"; now: number }
  | { type: "start"; now: number }
  | { type: "panic"; now: number }
  | { type: "quit"; now: number; why: string };

const blankHistory = (): History => [
  ["stopped", 0],
  ["stopped", 0],
  ["stopped", 0],
];

const initial: Sim = {
  phase: "off",
  t0: 0,
  last: 0,
  started: false,
  panicked: false,
  step: 0,
  stepEnd: 0,
  timeLeft: 0,
  left: "stopped",
  right: "stopped",
  lh: blankHistory(),
  rh: blankHistory(),
  pose: HOME,
  log: [],
};

// add_history(): only a change of state gets a new entry, newest first, 3 kept.
function addHistory(h: History, state: Motor, s: Sim, now: number): History {
  if (h[0][0] === state) return h;
  return [[state, Math.floor((now - s.t0) / 1000)] as [Motor, number], ...h].slice(0, 3);
}

function setMotors(s: Sim, left: Motor, right: Motor, now: number): Sim {
  return {
    ...s,
    left,
    right,
    lh: addHistory(s.lh, left, s, now),
    rh: addHistory(s.rh, right, s, now),
  };
}

function startStep(s: Sim, step: number, now: number): Sim {
  const [name, left, right, seconds] = SEQUENCE[step];
  return {
    ...setMotors(s, left, right, now),
    step,
    stepEnd: now + seconds * 1000,
    log: [...s.log, `Robot: ${name}`],
  };
}

const dir = (m: Motor) => (m === "clockwise" ? 1 : m === "counter-clockwise" ? -1 : 0);
const clamp = (v: number) => Math.min(178, Math.max(22, v));

// Differential drive: both wheels the same way moves, opposite ways pivots.
function drive(s: Sim, now: number): Sim["pose"] {
  const dt = Math.min((now - s.last) / 1000, 0.2);
  const vl = dir(s.left);
  const vr = dir(s.right);
  const deg = s.pose.deg + ((vl - vr) / 2) * TURN * dt;
  const v = ((vl + vr) / 2) * SPEED * dt;
  const rad = (deg * Math.PI) / 180;
  return {
    x: clamp(s.pose.x + v * Math.sin(rad)),
    y: clamp(s.pose.y - v * Math.cos(rad)),
    deg,
  };
}

function quit(s: Sim, why: string): Sim {
  return { ...s, phase: "quit", left: "stopped", right: "stopped", log: [...s.log, why, "Cleaning up", "Quit"] };
}

function reducer(s: Sim, a: Action): Sim {
  if (a.type === "boot") {
    return {
      ...initial,
      phase: "running",
      t0: a.now,
      last: a.now,
      log: ["run_test.py started - press START on the piTFT", "GPIO27 = physical quit / bailout", `Timeout after ${TIMEOUT_S} seconds`],
    };
  }
  if (s.phase !== "running") return s;

  switch (a.type) {
    case "tick": {
      let next: Sim = { ...s, pose: drive(s, a.now), last: a.now };
      if (a.now - s.t0 > TIMEOUT_S * 1000) return quit(next, "Timeout");
      // run_sequence(): move on once the current step has run its time.
      if (next.started && !next.panicked && a.now >= next.stepEnd) {
        next = startStep(next, (next.step + 1) % SEQUENCE.length, a.now);
      }
      return next;
    }
    case "start": {
      if (s.started || s.panicked) return s;
      return startStep({ ...s, started: true, log: [...s.log, "START"] }, 0, a.now);
    }
    case "panic": {
      if (!s.panicked) {
        // remember how much of the current step was left
        return {
          ...setMotors(s, "stopped", "stopped", a.now),
          panicked: true,
          timeLeft: s.stepEnd - a.now,
          log: [...s.log, "PANIC STOP"],
        };
      }
      // RESUME: the same step again, for only the time that was left.
      if (!s.started) return { ...s, panicked: false, log: [...s.log, "RESUME"] };
      const [, left, right] = SEQUENCE[s.step];
      return {
        ...setMotors(s, left, right, a.now),
        panicked: false,
        stepEnd: a.now + s.timeLeft,
        log: [...s.log, "RESUME"],
      };
    }
    case "quit":
      return quit(s, a.why);
  }
}

export default function RobotDemo() {
  const [s, dispatch] = useReducer(reducer, initial);
  const box = useRef<HTMLDivElement>(null);

  // Start the program when the demo scrolls into view, so the timeout isn't
  // already running down before anyone sees it.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          dispatch({ type: "boot", now: performance.now() });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = s.phase === "running";
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => dispatch({ type: "tick", now: performance.now() }), LOOP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const now = () => performance.now();
  const status = !s.started ? "Press START" : s.panicked ? "PANIC" : SEQUENCE[s.step][0];

  return (
    <div ref={box} className="window">
      <div className="window-title">
        <span className="truncate">run_test.py — in your browser</span>
        <span className="ml-auto text-[14px] text-muted hidden sm:inline">a simulation, not the robot</span>
      </div>

      <div className="p-5 sm:p-6 bg-cream grid md:grid-cols-[1.15fr_1fr] gap-6 [&>*]:min-w-0">
        <div>
          <div className="rounded-xl border-[1.5px] border-line bg-navy p-2.5 sm:p-3 shadow-[4px_4px_0_0_var(--line)]">
            {s.phase === "quit" ? (
              <Console lines={s.log} onRestart={() => dispatch({ type: "boot", now: now() })} />
            ) : (
              <PiTftScreen
                left={s.left}
                right={s.right}
                lh={s.lh}
                rh={s.rh}
                started={s.started}
                panicked={s.panicked}
                status={s.phase === "off" ? "starting…" : status}
                onStart={running ? () => dispatch({ type: "start", now: now() }) : undefined}
                onPanic={running ? () => dispatch({ type: "panic", now: now() }) : undefined}
                onQuit={running ? () => dispatch({ type: "quit", now: now(), why: "Touchscreen quit" }) : undefined}
              />
            )}
          </div>

          {/* the piTFT's four tactile buttons; run_test.py only uses 27 */}
          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[14px]">
            {[17, 22, 23].map((pin) => (
              <span key={pin} className="inline-flex items-center gap-1.5 text-muted" title="not used by run_test.py">
                <span aria-hidden className="h-4 w-4 rounded-full border-[1.5px] border-line/40 bg-cream-2" />
                {pin}
              </span>
            ))}
            <button
              type="button"
              disabled={!running}
              onClick={() => dispatch({ type: "quit", now: now(), why: "Physical quit / bailout" })}
              className="inline-flex items-center gap-1.5 rounded-md px-1 hover:text-accent disabled:opacity-40"
            >
              <span aria-hidden className="h-4 w-4 rounded-full border-[1.5px] border-line bg-pink" />
              27 · physical quit
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <Arena pose={s.pose} left={s.left} right={s.right} />
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[14px] text-ink-soft">
            <Swatch className="bg-accent" label="clockwise" />
            <Swatch className="bg-pink" label="counter-clockwise" />
            <Swatch className="bg-muted" label="stopped" />
          </div>
          <div className="rounded-lg border-[1.5px] border-line bg-white px-3 py-2 font-mono text-[13px] leading-relaxed text-[#262626] h-[132px] overflow-hidden flex flex-col justify-end">
            {s.log.slice(-6).map((l, i) => (
              <div key={`${s.log.length}-${i}`} className="truncate">
                {l}
              </div>
            ))}
            {s.log.length === 0 && <div className="text-[#5c5f66]">stdout shows up here</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

const PYGAME_FONT = "Arial, Helvetica, sans-serif";
const historyName = (m: Motor) => (m === "clockwise" ? "Clkwise" : m === "counter-clockwise" ? "Counter-Clk" : "Stop");

// The piTFT screen, drawn from run_test.py's draw_screen(). With no handlers it's a still picture.
export function PiTftScreen({
  left,
  right,
  lh,
  rh,
  started,
  panicked,
  status,
  onStart,
  onPanic,
  onQuit,
}: {
  left: Motor;
  right: Motor;
  lh: History;
  rh: History;
  started: boolean;
  panicked: boolean;
  status: string;
  onStart?: () => void;
  onPanic?: () => void;
  onQuit?: () => void;
}) {
  const center = (text: string, x: number, y: number, size: number) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={size}
      fontWeight="bold"
      fontFamily={PYGAME_FONT}
      fill="#fff"
    >
      {text}
    </text>
  );
  const history = (h: History, x: number) =>
    h.map(([m, t], i) => (
      <text
        key={i}
        x={x}
        y={[82, 105, 128][i]}
        dominantBaseline="hanging"
        fontSize={14}
        fontWeight="bold"
        fontFamily={PYGAME_FONT}
        fill="#fff"
        style={{ whiteSpace: "pre" }}
      >
        {`${historyName(m)}  ${t}`}
      </text>
    ));

  return (
    <div className="relative">
      <svg
        viewBox="0 0 320 240"
        className="block w-full h-auto rounded-[3px]"
        role="img"
        aria-label={`piTFT screen. Left motor ${left}, right motor ${right}. ${status}.`}
      >
        <rect width={320} height={240} fill="#000" />
        {center("Left", 75, 15, 16)}
        {center(left, 75, 34, 14)}
        {center("Right", 245, 15, 16)}
        {center(right, 245, 34, 14)}
        {center("Left History", 75, 58, 16)}
        {center("Right History", 245, 58, 16)}
        {history(lh, 10)}
        {history(rh, 185)}
        <rect x={95} y={155} width={130} height={45} fill={panicked ? "rgb(0,180,0)" : "rgb(255,0,0)"} />
        {center(panicked ? "RESUME" : "PANIC STOP", 160, 177.5, 17)}
        {!started && (
          <>
            <rect x={11} y={201} width={68} height={30} fill="none" stroke="rgb(0,180,0)" strokeWidth={2} />
            {center("START", 45, 216, 17)}
          </>
        )}
        <rect x={241} y={201} width={68} height={30} fill="none" stroke="#fff" strokeWidth={2} />
        {center("QUIT", 275, 216, 17)}
        {center(status, 160, 216, 14)}
      </svg>
      {onPanic && <Hit x={95} y={155} w={130} h={45} label={panicked ? "Resume" : "Panic stop"} onClick={onPanic} />}
      {onStart && !started && <Hit x={10} y={200} w={70} h={32} label="Start" onClick={onStart} />}
      {onQuit && <Hit x={240} y={200} w={70} h={32} label="Quit" onClick={onQuit} />}
    </div>
  );
}

// The screen 9 s into a run that was STARTed at 3 s: the first pivot left.
export function PiTftSnapshot() {
  return (
    <PiTftScreen
      left="counter-clockwise"
      right="clockwise"
      lh={[["counter-clockwise", 9], ["stopped", 8], ["counter-clockwise", 6]]}
      rh={[["clockwise", 9], ["stopped", 8], ["counter-clockwise", 6]]}
      started
      panicked={false}
      status="pivot left"
    />
  );
}

// A real button over a drawn one, placed in the screen's 320×240 coordinates.
function Hit({ x, y, w, h, label, onClick }: { x: number; y: number; w: number; h: number; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="absolute cursor-pointer rounded-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-2)]"
      style={{ left: `${(x / 320) * 100}%`, top: `${(y / 240) * 100}%`, width: `${(w / 320) * 100}%`, height: `${(h / 240) * 100}%` }}
    />
  );
}

// After QUIT the screen goes back to the Linux console.
function Console({ lines, onRestart }: { lines: string[]; onRestart: () => void }) {
  return (
    <div className="relative aspect-[4/3] rounded-[3px] bg-black p-3 font-mono text-[12px] sm:text-[13px] leading-snug text-[#d0d0d0] overflow-hidden flex flex-col justify-end">
      <div>pi@raspberrypi:~/lab3 $ python3 run_test.py</div>
      {lines.slice(-8).map((l, i) => (
        <div key={i} className="truncate">
          {l}
        </div>
      ))}
      <div>
        pi@raspberrypi:~/lab3 ${" "}
        <button type="button" onClick={onRestart} className="underline underline-offset-2 text-white hover:text-[#8db4ff]">
          python3 run_test.py
        </button>
      </div>
    </div>
  );
}

// The robot from above. The wheels take the color of what their motor is doing.
function Arena({ pose, left, right }: { pose: Sim["pose"]; left: Motor; right: Motor }) {
  const wheel = (m: Motor) =>
    m === "clockwise" ? "var(--accent)" : m === "counter-clockwise" ? "var(--pink)" : "var(--muted)";
  return (
    <div className="rounded-lg border-[1.5px] border-line bg-cream-2 overflow-hidden">
      <svg viewBox="0 0 200 200" className="block w-full h-auto" role="img" aria-label="The robot seen from above">
        {[40, 80, 120, 160].map((v) => (
          <g key={v} stroke="var(--line)" strokeOpacity={0.08}>
            <line x1={v} x2={v} y1={0} y2={200} />
            <line y1={v} y2={v} x1={0} x2={200} />
          </g>
        ))}
        <circle cx={HOME.x} cy={HOME.y} r={32} fill="none" stroke="var(--line)" strokeOpacity={0.3} strokeDasharray="3 4" />
        <text x={HOME.x} y={HOME.y + 44} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill="var(--muted)">
          start
        </text>
        <g transform={`translate(${pose.x} ${pose.y}) rotate(${pose.deg}) scale(1.5)`}>
          <rect x={-20} y={-9} width={6} height={18} rx={2} fill={wheel(left)} stroke="var(--line)" strokeWidth={1.2} />
          <rect x={14} y={-9} width={6} height={18} rx={2} fill={wheel(right)} stroke="var(--line)" strokeWidth={1.2} />
          <rect x={-14} y={-16} width={28} height={34} rx={5} fill="var(--cream)" stroke="var(--line)" strokeWidth={1.5} />
          <rect x={-8} y={-3} width={16} height={12} rx={1.5} fill="var(--navy)" />
          <circle cx={0} cy={14} r={2.5} fill="var(--line)" />
          <path d="M -5 -11 L 0 -16 L 5 -11" fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <i aria-hidden className={`inline-block h-3 w-3 rounded-sm border border-line ${className}`} />
      {label}
    </span>
  );
}

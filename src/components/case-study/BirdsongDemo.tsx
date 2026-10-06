"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// A browser version of the synthesizer's behavior (not the lab code): a slider
// sets the pitch, recordings store slider values at 100 Hz, and playback steps
// through them every 1 ms, so it plays 10x faster than it was recorded.
const MAX_HZ = 10000;
const RECORD_MS = 10; // 100 Hz
const PLAY_MS = 1; // 1 kHz -> 10x
const MAX_SAMPLES = 10000;
const VOLUME = 0.06;
const RAMP_S = 0.005; // the 5 ms ramp we designed for the board, to avoid pops

// Three steep rising sweeps with silence between them, like our chirp spectrogram.
// 0 Hz is silence, the same as the slider at the bottom of its travel.
function exampleChirp(): number[] {
  const out: number[] = [];
  for (let n = 0; n < 3; n++) {
    for (let i = 0; i < 40; i++) out.push(0);
    for (let i = 0; i < 8; i++) out.push(1900);
    for (let i = 0; i < 28; i++) out.push(Math.round(1900 + (3300 * i) / 27));
    for (let i = 0; i < 6; i++) out.push(5200 + i * 40);
  }
  for (let i = 0; i < 40; i++) out.push(0);
  return out;
}

type Mode = "idle" | "recording" | "playing";

export default function BirdsongDemo() {
  const [hz, setHz] = useState(2500);
  const [toneOn, setToneOn] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [rec, setRec] = useState<number[]>([]);
  const [playhead, setPlayhead] = useState<number | null>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const hzRef = useRef(hz);
  const recTimer = useRef<number | null>(null);
  const recBuf = useRef<number[]>([]);
  const raf = useRef<number | null>(null);
  const playEnd = useRef<number | null>(null);

  hzRef.current = hz;

  const audio = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = hzRef.current;
      gain.gain.value = 0;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      ctxRef.current = ctx;
      oscRef.current = osc;
      gainRef.current = gain;
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return { ctx: ctxRef.current, osc: oscRef.current!, gain: gainRef.current! };
  }, []);

  const rampTo = useCallback((level: number, at?: number) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    const t = at ?? ctx.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(level, t + RAMP_S);
  }, []);

  // Live tone follows the slider, unless a recording is playing.
  useEffect(() => {
    if (mode === "playing" || !ctxRef.current || !oscRef.current) return;
    oscRef.current.frequency.setTargetAtTime(hz, ctxRef.current.currentTime, 0.004);
  }, [hz, mode]);

  useEffect(() => {
    if (mode === "playing" || !ctxRef.current) return;
    rampTo(toneOn || mode === "recording" ? VOLUME : 0);
  }, [toneOn, mode, rampTo]);

  const stopRecording = useCallback(() => {
    if (recTimer.current !== null) window.clearInterval(recTimer.current);
    recTimer.current = null;
    setRec(recBuf.current.slice());
    setMode("idle");
  }, []);

  const startRecording = () => {
    audio();
    recBuf.current = [];
    setRec([]);
    setMode("recording");
    recTimer.current = window.setInterval(() => {
      recBuf.current.push(hzRef.current);
      if (recBuf.current.length >= MAX_SAMPLES) stopRecording();
      else if (recBuf.current.length % 10 === 0) setRec(recBuf.current.slice());
    }, RECORD_MS);
  };

  const stopPlayback = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    playEnd.current = null;
    setPlayhead(null);
    setMode("idle");
  }, []);

  const play = (samples: number[]) => {
    if (!samples.length) return;
    const { ctx, osc, gain } = audio();
    const t0 = ctx.currentTime + 0.03;
    const step = PLAY_MS / 1000;
    const end = t0 + samples.length * step;
    osc.frequency.cancelScheduledValues(t0);
    samples.forEach((f, i) => osc.frequency.setValueAtTime(Math.max(f, 1), t0 + i * step));
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, t0);
    // Silence the 0 Hz samples, ramp in and out everywhere else.
    let on = false;
    samples.forEach((f, i) => {
      const t = t0 + i * step;
      if (f > 0 && !on) {
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(VOLUME, t + RAMP_S);
        on = true;
      } else if (f === 0 && on) {
        gain.gain.setValueAtTime(VOLUME, t);
        gain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        on = false;
      }
    });
    if (on) {
      gain.gain.setValueAtTime(VOLUME, end);
      gain.gain.linearRampToValueAtTime(0, end + RAMP_S);
    }
    setMode("playing");
    playEnd.current = end;
    const tick = () => {
      const now = ctx.currentTime;
      if (now >= end + RAMP_S) {
        osc.frequency.setValueAtTime(hzRef.current, now);
        stopPlayback();
        return;
      }
      setPlayhead(Math.max(0, (now - t0) / step));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(
    () => () => {
      if (recTimer.current !== null) window.clearInterval(recTimer.current);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      void ctxRef.current?.close();
    },
    [],
  );

  const recMs = rec.length * RECORD_MS;
  const playMs = rec.length * PLAY_MS;

  return (
    <div className="window">
      <div className="window-title">
        <span className="truncate">birdsong.synth — in your browser</span>
        <span className="ml-auto text-[11px] opacity-70 hidden sm:inline">turn your volume down a little</span>
      </div>

      <div className="p-5 sm:p-6 space-y-5 bg-cream">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">pitch</div>
            <div className="display text-4xl sm:text-5xl tabular-nums text-accent">
              {hz.toLocaleString()} <span className="text-2xl">Hz</span>
            </div>
          </div>
          <div className="font-mono text-[12px] text-ink-soft text-right">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full mr-2 align-middle ${
                mode === "recording"
                  ? "bg-pink animate-pulse"
                  : mode === "playing"
                    ? "bg-accent animate-pulse"
                    : toneOn
                      ? "bg-accent-2"
                      : "bg-line/30"
              }`}
            />
            {mode === "recording"
              ? "recording at 100 Hz…"
              : mode === "playing"
                ? "playing back at 10×"
                : toneOn
                  ? "tone on"
                  : "tone off"}
          </div>
        </div>

        <label className="block">
          <span className="sr-only">Pitch slider, 0 to 10 kilohertz</span>
          <input
            type="range"
            min={0}
            max={MAX_HZ}
            step={10}
            value={hz}
            disabled={mode === "playing"}
            onChange={(e) => setHz(Number(e.target.value))}
            onPointerDown={() => audio()}
            className="w-full accent-[var(--accent)] h-8 cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between font-mono text-[10.5px] opacity-60">
            <span>0 Hz (silent)</span>
            <span>5 kHz</span>
            <span>10 kHz</span>
          </div>
        </label>

        <div className="flex flex-wrap gap-2.5 font-mono text-[13px]">
          <button
            type="button"
            onClick={() => {
              audio();
              setToneOn((v) => !v);
            }}
            disabled={mode !== "idle"}
            className="arrow-link disabled:opacity-40"
          >
            <Key>0</Key> tone {toneOn ? "off" : "on"}
          </button>
          {mode === "recording" ? (
            <button type="button" onClick={stopRecording} className="arrow-link !bg-pink !text-cream">
              <Key>*</Key> ■ stop recording
            </button>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              disabled={mode !== "idle"}
              className="arrow-link disabled:opacity-40"
            >
              <Key>*</Key> ● record a sweep
            </button>
          )}
          <button
            type="button"
            onClick={() => play(rec)}
            disabled={mode !== "idle" || rec.length === 0}
            className="arrow-link !bg-ink !text-cream disabled:opacity-40"
          >
            <Key dark>1</Key> ▶ play back at 10×
          </button>
          <button
            type="button"
            onClick={() => {
              const c = exampleChirp();
              setRec(c);
              play(c);
            }}
            disabled={mode !== "idle"}
            className="arrow-link disabled:opacity-40"
          >
            try an example chirp
          </button>
        </div>

        <Trace samples={rec} playhead={playhead} />

        <p className="font-mono text-[12px] leading-relaxed text-ink-soft">
          {rec.length > 0 ? (
            <>
              {rec.length.toLocaleString()} samples · recorded over{" "}
              {(recMs / 1000).toFixed(2)} s · plays back in {(playMs / 1000).toFixed(2)} s
            </>
          ) : (
            <>
              Press record, drag the slider slowly up (or up and back down), then stop and play it
              back. A two-second sweep comes out as a 0.2 s call.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function Key({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 text-[11px] mr-1.5 ${
        dark ? "border-cream/50" : "border-line/60 bg-cream-2"
      }`}
    >
      {children}
    </span>
  );
}

// The recording drawn like a spectrogram line: frequency over time.
function Trace({ samples, playhead }: { samples: number[]; playhead: number | null }) {
  const W = 600;
  const H = 120;
  const n = Math.max(samples.length, 1);
  const x = (i: number) => (i / Math.max(n - 1, 1)) * W;
  const y = (f: number) => H - 6 - (f / MAX_HZ) * (H - 12);
  const runs: string[] = [];
  let cur: string[] = [];
  samples.forEach((f, i) => {
    if (f > 0) cur.push(`${x(i).toFixed(1)},${y(f).toFixed(1)}`);
    else if (cur.length) {
      runs.push(cur.join(" "));
      cur = [];
    }
  });
  if (cur.length) runs.push(cur.join(" "));

  return (
    <div className="rounded-lg border-[1.5px] border-line bg-white overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-[120px]" preserveAspectRatio="none" aria-label="Recorded pitch over time">
        {[2500, 5000, 7500].map((f) => (
          <line key={f} x1={0} x2={W} y1={y(f)} y2={y(f)} stroke="currentColor" strokeOpacity={0.08} />
        ))}
        {runs.map((pts, i) => (
          <polyline
            key={i}
            points={pts}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={2.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {playhead !== null && (
          <line
            x1={x(playhead)}
            x2={x(playhead)}
            y1={0}
            y2={H}
            stroke="#c0392b"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        )}
        {samples.length === 0 && (
          <text x={W / 2} y={H / 2 + 4} textAnchor="middle" className="font-mono" fontSize={12} fill="currentColor" opacity={0.4}>
            your recording shows up here
          </text>
        )}
      </svg>
    </div>
  );
}

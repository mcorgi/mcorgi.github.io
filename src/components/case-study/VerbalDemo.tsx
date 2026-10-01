"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Verbal Memory for the browser, written for this site with the same rules as the terminal game.
const WORDS = [
  "apple", "banana", "orange", "table", "chair", "computer", "phone", "window",
  "bottle", "keyboard", "mouse", "headphones", "river", "mountain", "pencil",
  "notebook", "screen", "speaker", "coffee", "bridge", "forest", "cloud", "stone",
  "camera", "ticket", "garden", "library", "candle", "pillow", "engine", "station",
  "mirror", "island", "market", "flower", "shadow", "planet", "pocket", "letter",
  "button", "school", "teacher", "student", "castle", "valley", "ocean", "harbor",
  "compass",
];
const STARTING_LIVES = 3;

type Event = "AnswerNew" | "AnswerSeen" | "Quit" | "InvalidInput";
type State =
  | {
      kind: "Playing";
      score: number;
      lives: number;
      seen: boolean[];
      word: string;
      isNew: boolean;
      lastMsg: string | null;
    }
  | { kind: "GameOver"; score: number; livesLeft: number };

const rand = (n: number) => Math.floor(Math.random() * n);

function nextWord(seen: boolean[]) {
  // Bias toward repeats once a few words are seen, so the demo gets interesting quickly.
  const seenIdx = seen.flatMap((s, i) => (s ? [i] : []));
  const idx =
    seenIdx.length > 2 && Math.random() < 0.45
      ? seenIdx[rand(seenIdx.length)]
      : rand(WORDS.length);
  const isNew = !seen[idx];
  const nextSeen = isNew ? seen.map((s, i) => (i === idx ? true : s)) : seen;
  return { word: WORDS[idx], isNew, seen: nextSeen };
}

function initialState(): State {
  const idx = rand(WORDS.length);
  const seen = WORDS.map((_, i) => i === idx);
  return {
    kind: "Playing",
    score: 0,
    lives: STARTING_LIVES,
    seen,
    word: WORDS[idx],
    isNew: true,
    lastMsg: null,
  };
}

function parseInput(raw: string): Event {
  const s = raw.trim().toLowerCase();
  if (s === "n" || s === "new") return "AnswerNew";
  if (s === "s" || s === "seen") return "AnswerSeen";
  if (s === "q") return "Quit";
  return "InvalidInput";
}

function nextState(st: State, ev: Event): State {
  if (st.kind === "GameOver") return st;
  if (ev === "Quit") return { kind: "GameOver", score: st.score, livesLeft: st.lives };
  if (ev === "InvalidInput") return st;
  const correct = (ev === "AnswerNew") === st.isNew;
  const score = correct ? st.score + 1 : st.score;
  const lives = correct ? st.lives : st.lives - 1;
  if (lives <= 0) return { kind: "GameOver", score, livesLeft: 0 };
  const nw = nextWord(st.seen);
  return {
    kind: "Playing",
    score,
    lives,
    seen: nw.seen,
    word: nw.word,
    isNew: nw.isNew,
    lastMsg: correct ? "Correct :)" : "Incorrect :(",
  };
}

export default function VerbalDemo() {
  const [state, setState] = useState<State | null>(null);
  const [invalid, setInvalid] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  // Random first word only on the client, so server and client HTML match.
  useEffect(() => setState(initialState()), []);

  const send = useCallback((input: string) => {
    const ev = parseInput(input);
    setState((st) => {
      if (!st) return st;
      setInvalid(ev === "InvalidInput" && st.kind === "Playing");
      return nextState(st, ev);
    });
  }, []);

  const restart = () => {
    setState(initialState());
    setInvalid(false);
    termRef.current?.focus();
  };

  return (
    <div
      ref={termRef}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.target instanceof HTMLButtonElement && (e.key === "Enter" || e.key === " ")) return;
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          send(e.key);
        }
      }}
      aria-label="Playable Verbal Memory demo. Press n for new, s for seen, q to quit."
      className="window focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="window-title">
        <span className="window-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="ml-2 truncate">verbal memory · click here, then press n / s / q</span>
      </div>
      <div style={{ background: "var(--ink)" }} className="text-cream">
        <pre
          aria-live="polite"
          className="min-h-[230px] p-5 font-mono text-[13px] leading-[1.7] whitespace-pre-wrap"
        >
          {!state ? (
            " "
          ) : state.kind === "Playing" ? (
            <>
              {state.lastMsg ? (
                <span className={state.lastMsg.startsWith("Correct") ? "text-[#7EDC8F]" : "text-[#FF7A7A]"}>
                  {state.lastMsg}
                </span>
              ) : (
                <span className="opacity-60">Type &apos;n&apos; if the word is NEW and &apos;s&apos; if you&apos;ve SEEN it.</span>
              )}
              {"\n"}Lives: <span className="text-[#F27BBE] font-bold">{"♥ ".repeat(state.lives).trim()}</span>
              {"   "}
              <span className="opacity-60">score {state.score}</span>
              {"\n\n"}Word: <span className="text-[#5FD4E6] font-bold text-[17px]">{state.word}</span>
              {"\n\n"}Have you seen this word before? (n/new, s/seen, q/quit):
              {invalid && (
                <>
                  {"\n"}
                  <span className="text-[#F0C35A]">Please type only (n/new, s/seen, q/quit).</span>
                </>
              )}
            </>
          ) : (
            <>
              <span className="text-[#F27BBE] font-bold">Game Over!</span>
              {"\n"}You scored {state.score} points and had {state.livesLeft} lives left.
              {"\n\n"}
              <span className="opacity-60">Score saved to leaderboard!{"\n\n"}Press restart to play again.</span>
            </>
          )}
        </pre>
        <div className="flex flex-wrap gap-2 px-5 pb-5 font-mono text-[13px]">
          {[
            ["n", "new"],
            ["s", "seen"],
            ["q", "quit"],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => send(k)}
              className="rounded-md border-[1.5px] border-cream/30 px-3 py-1.5 hover:border-accent-2 hover:text-accent-2 transition-colors"
            >
              <kbd className="font-bold text-[#F0C35A]">{k}</kbd> {label}
            </button>
          ))}
          <button
            type="button"
            onClick={restart}
            className="rounded-md border-[1.5px] border-cream/30 px-3 py-1.5 hover:border-accent-2 hover:text-accent-2 transition-colors"
          >
            ↻ restart
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Typewriter from "@/components/Typewriter";
import { Seg, Tone, useTerminal } from "./TerminalProvider";

const toneClass: Record<Tone, string> = {
  dim: "opacity-60",
  accent: "text-accent",
  accent2: "text-accent-2",
  ok: "text-[#2e7d32]",
  err: "text-[#c0392b]",
  warn: "text-[#b7791f]",
  bold: "font-semibold",
};

const chips = ["help", "ls", "cd projects", "cat contact.txt", "play"];

function SegView({ seg }: { seg: Seg }) {
  const cls = seg.tone ? toneClass[seg.tone] : "";
  if (seg.href) {
    const external = /^https?:/.test(seg.href);
    return (
      <a
        href={seg.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className={`${cls} underline underline-offset-2`}
        onClick={(e) => e.stopPropagation()}
      >
        {seg.t}
      </a>
    );
  }
  return <span className={cls}>{seg.t}</span>;
}

export default function TerminalView({
  heightClass = "h-[260px]",
  autoFocus = false,
  showChips = true,
}: {
  heightClass?: string;
  autoFocus?: boolean;
  showChips?: boolean;
}) {
  const { lines, prompt, run, complete, history } = useTerminal();
  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const submit = (cmd: string) => {
    run(cmd);
    setValue("");
    setHistIdx(null);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
    } else if (e.key === "Tab") {
      e.preventDefault();
      setValue(complete(value));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const i = histIdx + 1;
      if (i >= history.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(i);
        setValue(history[i]);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      run("clear");
    } else if (e.key.toLowerCase() === "c" && e.ctrlKey && !window.getSelection()?.toString()) {
      e.preventDefault();
      setValue("");
    }
  };

  return (
    <div
      className="font-mono text-[13.5px] sm:text-[14px] leading-relaxed"
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <div ref={scrollRef} className={`${heightClass} overflow-y-auto px-5 pt-4 pb-2 cursor-text`}>
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words min-h-[1.5em]">
            {l.welcome ? (
              <Typewriter text={l.segs.map((x) => x.t).join("")} speed={45} />
            ) : (
              l.segs.map((seg, j) => <SegView key={j} seg={seg} />)
            )}
          </div>
        ))}
        <label className="flex items-baseline gap-0 whitespace-pre">
          <span className="text-accent-2">sandra@cornell</span>
          <span>:</span>
          <span className="text-accent">{prompt}</span>
          <span>$ </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input. Type help for commands."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent outline-none caret-accent text-ink"
          />
        </label>
      </div>
      {showChips && (
        <div className="flex flex-wrap gap-1.5 px-5 pb-4 pt-1">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                submit(c);
              }}
              className="rounded-md border border-line/40 bg-cream-2/70 px-2 py-0.5 text-[11.5px] hover:bg-ink hover:text-cream transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

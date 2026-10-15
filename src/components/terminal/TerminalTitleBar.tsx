"use client";

import { useTerminal } from "./TerminalProvider";

// Window chrome for the terminal: close, minimize and maximize buttons, then
// the title, like a desktop terminal. The title follows `cd`. Only the close
// button does anything, and only when there's something to close.
export default function TerminalTitleBar({ onClose }: { onClose?: () => void }) {
  const { prompt } = useTerminal();

  return (
    <div className="term-titlebar">
      <span className="flex items-center gap-1.5">
        {onClose ? (
          <button type="button" onClick={onClose} aria-label="Minimize the terminal" className="term-btn term-btn--close">
            ×
          </button>
        ) : (
          <span aria-hidden className="term-btn term-btn--close">×</span>
        )}
        <span aria-hidden className="term-btn">−</span>
        <span aria-hidden className="term-btn">□</span>
      </span>
      <span className="truncate">sandra@cornell: {prompt}</span>
    </div>
  );
}

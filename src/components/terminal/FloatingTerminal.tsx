"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTerminal } from "./TerminalProvider";
import TerminalView from "./TerminalView";

// The home page has the terminal inline. Everywhere else it lives in a
// corner so `cd ..` and friends keep working as you move around.
export default function FloatingTerminal() {
  const pathname = usePathname();
  const { floatingOpen, setFloatingOpen, prompt } = useTerminal();
  const onHome = (pathname.replace(/\/+$/, "") || "/") === "/";

  // ` toggles the terminal (when you're not typing somewhere else).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable=true]")) {
        if (e.key === "Escape" && t.closest("[data-floating-terminal]")) setFloatingOpen(false);
        return;
      }
      if (e.key === "`" && !onHome) {
        e.preventDefault();
        setFloatingOpen(!floatingOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [floatingOpen, onHome, setFloatingOpen]);

  if (onHome) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[60] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {floatingOpen && (
          <motion.div
            data-floating-terminal
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto w-full sm:w-[540px] window"
          >
            <div className="window-title">
              <span className="truncate">sandra@cornell: {prompt}</span>
              <button
                type="button"
                onClick={() => setFloatingOpen(false)}
                className="ml-auto text-[11px] opacity-70 hover:opacity-100"
              >
                minimize ✕
              </button>
            </div>
            <div className="scanlines">
              <TerminalView heightClass="h-[240px] sm:h-[280px]" autoFocus />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!floatingOpen && (
        <button
          type="button"
          onClick={() => setFloatingOpen(true)}
          className="pointer-events-auto arrow-link font-mono text-sm"
          aria-label="Open the site terminal"
        >
          <span className="text-pink-ink">&gt;_</span> terminal
        </button>
      )}
    </div>
  );
}

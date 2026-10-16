// One turn of Camel Benchmark's Verbal Memory, laid out the way the game draws
// each turn: feedback, lives, the word, then the prompt.
export default function VerbalTerminal({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A terminal showing one turn of Verbal Memory: the word functor, two lives left, and a prompt asking seen or new."
      className={`flex flex-col overflow-hidden bg-navy font-mono text-[14px] text-[#e8edf7] ${className}`}
    >
      <div aria-hidden className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <i className="h-3 w-3 rounded-full bg-pink" />
        <i className="h-3 w-3 rounded-full bg-white/25" />
        <i className="h-3 w-3 rounded-full bg-white/25" />
        <span className="ml-2 truncate text-white/60">camel-benchmark: verbal memory</span>
      </div>
      <div aria-hidden className="flex flex-1 flex-col justify-center px-5 py-4 leading-relaxed">
        <div className="text-[#7ee2a0]">✓ correct, you saw that one</div>
        <div className="mt-1 flex justify-between gap-4">
          <span>
            lives <span className="text-pink">♥ ♥</span> <span className="text-white/30">♥</span>
          </span>
          <span className="text-white/60">score 12</span>
        </div>
        <div className="my-5 text-center font-display text-3xl tracking-wide">functor</div>
        <div>
          <span className="text-[#9ad0f5]">[S]</span>een or <span className="text-[#9ad0f5]">[N]</span>ew?{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 bg-[#e8edf7] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

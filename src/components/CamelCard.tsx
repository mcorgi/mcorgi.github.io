import Link from "next/link";
import Reveal from "@/components/Reveal";

// Camel Benchmark's card on /projects: the text next to a terminal showing one
// turn of Verbal Memory, laid out the way the game draws each turn (feedback,
// lives, the word, then the prompt).
export default function CamelCard() {
  return (
    <Reveal className="py-12">
      <div className="lift">
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-accent" />
          <div className="relative grid md:grid-cols-[1fr_1.05fr] gap-10 items-center rounded-2xl border-[1.5px] border-line bg-cream p-6 sm:p-10">
            <div>
              <span className="inline-flex items-center rounded-full border-[1.5px] border-line bg-cream-2 px-3 py-1 font-mono text-[14px]">
                CS 3110 · OCaml · team of 4
              </span>
              <h3 className="display text-[34px] sm:text-[44px] leading-[0.95] mt-5">
                <Link href="/projects/camel-benchmark" className="hover:text-accent transition-colors">
                  Camel Benchmark
                </Link>
              </h3>
              <p className="mt-4 font-display text-xl sm:text-2xl leading-snug">
                Five brain games that run in the terminal, with logins and a leaderboard.
              </p>
              <p className="mt-4 max-w-[60ch] font-sans text-[17px] leading-relaxed text-ink-soft">
                The final project for Cornell&apos;s functional programming class. I built Verbal
                Memory, then rebuilt it as a pure state machine so 47 tests can play the whole game
                without a terminal.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/projects/camel-benchmark#play" className="arrow-link text-sm font-mono">
                  play verbal memory
                </Link>
                <Link href="/projects/camel-benchmark" className="arrow-link text-sm font-mono">
                  read the case study
                </Link>
              </div>
            </div>

            <div
              role="img"
              aria-label="A terminal showing one turn of Verbal Memory: the word functor, two lives left, and a prompt asking seen or new."
              className="overflow-hidden rounded-xl border-[1.5px] border-line bg-navy font-mono text-[14px] text-[#e8edf7] shadow-[4px_4px_0_0_var(--line)]"
            >
              <div aria-hidden className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <i className="h-3 w-3 rounded-full bg-pink" />
                <i className="h-3 w-3 rounded-full bg-white/25" />
                <i className="h-3 w-3 rounded-full bg-white/25" />
                <span className="ml-2 truncate text-white/60">camel-benchmark: verbal memory</span>
              </div>
              <div aria-hidden className="px-5 py-6 leading-relaxed">
                <div className="text-[#7ee2a0]">✓ correct, you saw that one</div>
                <div className="mt-1 flex justify-between gap-4">
                  <span>
                    lives <span className="text-pink">♥ ♥</span> <span className="text-white/30">♥</span>
                  </span>
                  <span className="text-white/60">score 12</span>
                </div>
                <div className="my-7 text-center font-display text-3xl tracking-wide">functor</div>
                <div>
                  <span className="text-[#9ad0f5]">[S]</span>een or <span className="text-[#9ad0f5]">[N]</span>ew?{" "}
                  <span className="inline-block h-4 w-2 translate-y-0.5 bg-[#e8edf7] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

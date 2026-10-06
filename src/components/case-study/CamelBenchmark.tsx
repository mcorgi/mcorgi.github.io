import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { camelSections } from "@/data/siteMap";
import { Callout, Diagram, LinkList, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";
import VerbalDemo from "./VerbalDemo";

const games = [
  {
    name: "Verbal Memory",
    what: "Words appear one at a time. Say whether each one is new or already seen. You have three lives.",
    who: "built by me",
    mine: true,
  },
  {
    name: "Number Memory",
    what: "A number flashes for three seconds, then disappears. Type it back. Each correct answer adds one digit.",
    who: "I fixed its I/O bugs",
    mine: true,
  },
  {
    name: "Syntax Sprint",
    what: "Type a programming-themed sentence. You get WPM, accuracy, and feedback based on your past runs.",
    who: "Sophia",
  },
  {
    name: "Reaction Test",
    what: "Press Enter when “GO!” appears. Hard mode shows decoys like “GOAT” and “GROW” first.",
    who: "Allison",
  },
  {
    name: "Stroop Test",
    what: "A color word is printed in a different ANSI color. Type the color of the ink, not the word.",
    who: "Vinesha",
  },
];

const challenges = [
  {
    where: "Verbal Memory",
    title: "Game logic mixed with I/O",
    body: [
      "My first version of Verbal Memory was one chain of async steps. It cleared the screen, printed the word, read the keyboard, scored the answer and picked the next word all in one place. It worked, but you could only test it by playing it.",
      "I rewrote it as a state machine: the current state plus the player's input gives the next state. All the printing and keyboard reading moved into a small loop in the I/O layer, so the game logic doesn't touch the terminal at all.",
    ],
    win: "This let me write 47 deterministic tests and raised our test coverage. The team applied the same logic and I/O split to every game.",
  },
  {
    where: "Number Memory",
    title: "Typed-ahead keystrokes",
    body: [
      "While a number was on screen for three seconds, anything the player typed was echoed next to it and stayed in the input buffer, then got submitted as their answer. The 10-second timeout also printed “Time's up!” twice.",
      "I switched off the terminal's echo while the number is shown, threw away any buffered keys before the prompt, then restored the normal settings. The answer and the timer now race each other, and the timeout message prints in one place only.",
    ],
    win: "I also added validation: only digits are accepted, spaces around the answer are ignored, and a lost game shows the correct number.",
  },
  {
    where: "terminal UI",
    title: "Clearing the screen reliably",
    body: [
      "In a memory game, old output on screen gives away the answer. The standard clear-screen code left earlier words in the scrollback in some terminals, so a player could scroll up and cheat.",
      "The fix clears the scrollback as well as the screen and moves the cursor home, then prints a block of blank lines as a fallback for terminals that ignore the first part.",
    ],
    win: "With the clear fixed, every turn uses the same screen order: feedback, lives, the word, then the prompt.",
  },
  {
    where: "Dec 1 → Dec 3",
    title: "Building a GUI, then dropping it",
    body: [
      "I built a windowed version of Verbal Memory and the main menu with OCaml's Graphics library, with clickable SEEN and NEW buttons and a shared drawing module.",
      "It didn't fit the rest of the codebase, which was built around a terminal and async input. Two days before the deadline we dropped it. I removed the graphics modules from the build and spent that time on color and layout instead.",
    ],
    win: "The team shipped one consistent interface instead of two half-finished ones, which meant deciding not to ship code I had already written.",
  },
  {
    where: "build · tests",
    title: "Tests couldn't find the data files",
    body: [
      "Our PM suggested moving hardcoded word lists into data files. After that, the tests failed: the build tool runs tests from its own sandbox folder, where the data files don't exist.",
      "I made the game look for its word list in a few likely places, and told the build to copy the data folder into the test sandbox.",
    ],
    win: "The game now works from any directory, and the same fallback was reused for the Stroop color list.",
  },
  {
    where: "end of every game",
    title: "Two kinds of input loop",
    body: [
      "The menus read input the simple, blocking way, but most games run inside the async scheduler and read input through it. So each game ended differently, and some jumped back to the menu before the player could read their score.",
      "I wrote one “Press Enter to continue” helper for each kind of code and used them at the end of every game.",
    ],
    win: "Every game now ends the same way, and players always get time to read their results.",
  },
];

const timeline = [
  { when: "Oct 27", what: "Joined the repo", note: "Team setup for milestone 1." },
  { when: "Nov 19", what: "Implemented Verbal Memory", note: "First working version with lives, a seen-word tracker and async input.", key: true },
  { when: "Dec 1", what: "Graphics prototype", note: "Windowed Verbal Memory and main menu with a shared drawing module." },
  { when: "Dec 3", what: "Back to the terminal", note: "Removed Graphics, moved words to data files, fixed the test paths, added coverage to the build." },
  { when: "Dec 4", what: "Number Memory fixes and UI", note: "Echo control, input flushing, validation, colors, and the Camel Benchmark name." },
  { when: "Dec 5", what: "State machine refactor", note: "Split Verbal Memory logic from I/O, wrote 47 tests and the interface specs, made every test failure readable.", key: true },
];

export default function CamelBenchmark({ project: p }: { project: Project }) {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-xs opacity-70">
          <Link href="/projects" className="hover:text-accent">
            ← projects
          </Link>
          <span>/</span>
          <span>{p.slug}</span>
        </div>
      </Reveal>

      {/* HERO */}
      <div className="mt-6 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center [&>*]:min-w-0">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-3 flex flex-wrap items-center gap-2">
            <span className="tag !py-0.5 !px-2 text-[10px]">shipped</span>
            <span>· {p.org}</span>
            <span>· {p.year}</span>
            <span>· {p.readTime}</span>
          </div>
          <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">
            Camel <span className="text-accent">Benchmark</span>
          </h1>
          <p className="mt-4 max-w-xl font-mono text-[15px] leading-relaxed text-ink-soft">
            Five cognitive games that run in the terminal, inspired by Human Benchmark: a typing
            test, number and verbal memory, reaction time and a Stroop test, plus logins and a
            leaderboard that keeps scores between sessions.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
            <li><span className="text-accent">▸</span> software engineer, team of 4</li>
            <li><span className="text-accent">▸</span> owner of Verbal Memory</li>
            <li><span className="text-accent">▸</span> terminal UI + bug fixing</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.youtube.com/watch?v=VpvceHyf-n0"
              target="_blank"
              rel="noreferrer noopener"
              className="arrow-link text-sm font-mono !bg-ink !text-cream"
            >
              ▶ watch the demo
            </a>
            <a href="#play" className="arrow-link text-sm font-mono">
              play it here ↓
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <pre
              style={{ background: "var(--ink)" }}
              className="rounded-lg text-cream p-5 font-mono text-[12px] leading-[1.6] overflow-x-auto"
            >
              <span className="text-[#5FD4E6] font-bold">{`╔══════════════════════════════════╗
║   WELCOME TO CAMEL BENCHMARK     ║
║     Test Your Cognitive Skills   ║
╚══════════════════════════════════╝`}</span>
              {"\n\n"}Welcome, sandra!{"\n"}Total Games Played: 3{"\n\n"}
              {[
                "Play Syntax Sprint (Typing)",
                "Play Number Memory",
                "Play Verbal Memory",
                "Play Reaction Test",
                "Play Stroop Text Test",
                "View Leaderboard",
                "Logout",
                "Quit",
              ].map((o, i) => (
                <span key={o}>
                  <span className="text-[#F0C35A] font-bold">{i + 1}.</span> {o}
                  {"\n"}
                </span>
              ))}
              <span className="text-[#5FD4E6] font-bold">====================</span>
              {"\n"}Choose an option: 3<span className="cursor-blink" aria-hidden />
            </pre>
            <div className="mt-2 font-mono text-[12px] text-ink-soft">The main menu, in a terminal.</div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="5" label="games in one suite" />
          <Stat value="~2,900" label="lines of OCaml" />
          <Stat value="47 / 143" label="OUnit tests I wrote, out of the suite total" />
          <Stat value="23" label="commits by me, Oct – Dec 2025" />
        </div>
      </Reveal>

      <SectionNav items={camelSections} />

      {/* OVERVIEW */}
      <Section id="overview" eyebrow="the project" title="Five games, one camel.">
        <Prose>
          <p>
            Camel Benchmark is the final project for Cornell&apos;s CS 3110 (Functional
            Programming in OCaml). Players log in with a username, choose a game from a menu, and
            every score goes to a per-game top-10 leaderboard. Scores are saved to a JSON file, so a
            player can log out and back in during a session and still see their results.
          </p>
          <p>
            We started from a prototype where each game handled its own printing, input and
            timing. By the final milestone every game was split into a pure logic module and a thin
            I/O layer. That split is what made the games testable, and I did it first, for Verbal
            Memory.
          </p>
        </Prose>
        <Reveal>
          <div className="max-w-4xl border-t border-line/30">
            {games.map((g) => (
              <div
                key={g.name}
                className="grid sm:grid-cols-[190px_1fr_auto] gap-x-6 gap-y-1 py-4 border-b border-line/30 items-baseline"
              >
                <h3 className="font-display text-lg">{g.name}</h3>
                <p className="font-mono text-[13.5px] leading-relaxed text-ink-soft">{g.what}</p>
                <span
                  className={`tag font-mono !text-[10px] justify-self-start ${g.mine ? "!bg-accent !text-cream" : ""}`}
                >
                  {g.who}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ROLE */}
      <Section
        id="role"
        eyebrow="my contributions"
        title="What I owned."
        intro="I built Verbal Memory from scratch, rebuilt it so its logic is fully separate from I/O, and did much of the terminal UI and bug fixing across the app."
      >
        <Steps
          items={[
            <>
              <strong>Verbal Memory, end to end.</strong>{" "}I wrote the game, then rewrote it as a
              pure state machine with no async code at all. The game logic only describes what
              should be shown, and the I/O layer decides how to print it.
            </>,
            <>
              <strong>47 unit tests.</strong>{" "}They cover input parsing, scoring, every state
              transition, the path to game over, and edge cases like empty input, mixed case and
              extra whitespace, all without a terminal. I also made every test failure print the
              values it compared, and wrote the module&apos;s interface specs.
            </>,
            <>
              <strong>Terminal UI.</strong>{" "}Color for the banner, menus, login and leaderboard
              boxes; a screen clear that works across terminals; and one consistent &quot;Press
              Enter to continue&quot; at the end of every game.
            </>,
            <>
              <strong>Number Memory I/O bugs.</strong>{" "}Typed-ahead input leaking into answers, a
              duplicated &quot;Time&apos;s up!&quot;, and missing validation. It now also shows the
              correct number when you lose.
            </>,
          ]}
        />
      </Section>

      {/* ARCHITECTURE */}
      <Section
        id="architecture"
        eyebrow="how it works"
        title="Pure logic inside, I/O outside."
        intro="The game modules decide what happens. The I/O layer reads keys, runs timers and prints. Tests talk to the game modules directly, without a terminal."
      >
        <Diagram
          src="/diagrams/camel-architecture.drawio.svg"
          alt="Architecture: the terminal talks to the I/O layer, which calls the pure game modules, which load data files. User and leaderboard modules save to a JSON file. Tests call the game modules directly."
        />
        <Reveal>
          <div className="border-t-[1.5px] border-line pt-4">
            <div className="flex flex-wrap gap-4 font-mono text-[12px] text-ink-soft mb-4">
              <span className="inline-flex items-center gap-2">
                <i className="inline-block h-3.5 w-3.5 rounded-sm border-[1.5px] border-[#0a7c92] bg-[#ddf1f5]" />
                I/O layer (side effects)
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="inline-block h-3.5 w-3.5 rounded-sm border-[1.5px] border-[#b0226a] bg-[#f7e3ee]" />
                Verbal Memory logic (pure)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[12.5px]">
              {[
                ["print", "clear screen, show word + lives", false],
                ["read", "wait for the player", false],
                ["parse", "new / seen / quit / other", true],
                ["update", "score, lives, next word", true],
                ["describe", "what to show next", true],
              ].map(([t, s, pure], i, arr) => (
                <span key={t as string} className="inline-flex items-center gap-2.5">
                  <span
                    className={`rounded-md border-[1.5px] px-3 py-2 ${pure ? "border-[#b0226a] bg-[#f7e3ee]" : "border-[#0a7c92] bg-[#ddf1f5]"}`}
                  >
                    <span className="block">{t}</span>
                    <span className="block text-[10.5px] opacity-75">{s}</span>
                  </span>
                  <span className="opacity-60">{i === arr.length - 1 ? "↺" : "→"}</span>
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[12.5px] text-ink-soft">
              <strong className="text-ink">One turn of Verbal Memory.</strong>{" "}Only the two cyan
              steps touch the terminal. Everything in magenta is a plain function you can call in a
              test.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* STATE MACHINE */}
      <Section
        id="verbal"
        eyebrow="inside my module"
        title="Verbal memory as a state machine."
        intro="The game has two states and four kinds of input. Every rule lives in one place, and the compiler checks that each case is handled."
      >
        <Diagram
          src="/diagrams/camel-verbal-state-machine.drawio.svg"
          alt="State machine: the game starts in Playing. Answers loop back to Playing with updated score and lives. Invalid input loops without changes. Losing the last life or quitting moves to GameOver, which ignores any further input."
        />
        <Reveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {[
              ["Illegal states are hard to write.", "Game over holds only the final result, so there's no current word to read by mistake once the game ends."],
              ["Invalid input stays on the same word.", "Invalid input returns the exact state it received, so a typo never costs a life or skips a word."],
              ["Tests can play the whole game.", "A test sets up a game with one life, answers \"seen\" for a new word, and checks that the game is over. No keyboard, no scheduler, no timing."],
              ["The display is separate.", "The game logic returns a description of what to show, not printed text, so the same game can run in a web page without changing it. (Which is what the demo below does.)"],
            ].map(([t, b]) => (
              <div key={t} className="border-t-[1.5px] border-line pt-3">
                <h3 className="font-display text-lg leading-tight">{t}</h3>
                <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-ink-soft">{b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* PLAY */}
      <Section
        id="play"
        eyebrow="try it"
        title="Play verbal memory here."
        intro="A JavaScript version written for this site, with the same rules and word list. Repeats come up a bit more often than in the original, so it gets harder sooner. Any other key counts as invalid input: the word and your lives stay the same, just like in the terminal version."
      >
        <div className="max-w-2xl">
          <VerbalDemo />
        </div>
      </Section>

      {/* CHALLENGES */}
      <Section
        id="challenges"
        eyebrow="hard parts"
        title="Challenges, and how I solved them."
        intro="An interactive program that reads raw keystrokes, runs timers and redraws the screen is hard to write in a functional language. These were the hardest problems I worked on."
      >
        <div className="border-t border-line/30">
          {challenges.map((c) => (
            <Reveal key={c.title}>
              <div className="grid md:grid-cols-[230px_1fr] gap-x-9 gap-y-3 py-7 border-b border-line/30">
                <div>
                  <div className="font-mono text-[11.5px] text-accent-3">{c.where}</div>
                  <h3 className="font-display text-xl leading-tight mt-1">{c.title}</h3>
                </div>
                <div className="max-w-3xl space-y-3 font-mono text-[13.5px] leading-relaxed text-ink-soft">
                  {c.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                  <p className="border-l-2 border-accent pl-4 text-ink">{c.win}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Callout>
          Looking back (from our final report): more architectural planning up front would have
          saved most of the refactoring it took to separate I/O from logic. We only discovered the
          right shape after building the wrong one.
        </Callout>
      </Section>

      {/* TIMELINE */}
      <Section id="timeline" eyebrow="from my commit history" title="How my work progressed.">
        <Reveal>
          <div className="max-w-3xl relative pl-6 border-l-2 border-line">
            {timeline.map((t) => (
              <div key={t.when} className="relative pl-4 py-2.5">
                <span
                  className={`absolute -left-[31px] top-4 inline-block h-3 w-3 rounded-full border-2 ${t.key ? "border-accent bg-accent" : "border-line bg-cream"}`}
                />
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">{t.when}</div>
                <div className="font-display text-lg leading-snug">{t.what}</div>
                <div className="font-mono text-[13px] text-ink-soft">{t.note}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* TEAM + STACK */}
      <Section id="team" eyebrow="team · group 16" title="Who built what.">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 [&>*]:min-w-0">
          <Reveal>
            <div className="border-t border-line/30">
              {[
                ["Sandra Tang (me)", "Verbal Memory and its state machine refactor, 47 tests, terminal UI and color, screen clearing, end-of-game pauses, Number Memory bug fixes, Graphics prototype."],
                ["Sophia Dasser", "Syntax Sprint typing game and ghost stats, user sessions and saving to JSON, leaderboard submission, user manual."],
                ["Vinesha Shaik", "Stroop test, splitting Number Memory logic from I/O, initial interface specs, JSON saving, test outline."],
                ["Allison Fung", "Reaction Test hard mode, per-user stats, refactoring Reaction logic, leaderboard sort order."],
              ].map(([n, w], i) => (
                <div key={n} className="py-3.5 border-b border-line/30">
                  <div className={`font-display text-lg ${i === 0 ? "text-accent" : ""}`}>{n}</div>
                  <div className="font-mono text-[13px] text-ink-soft leading-relaxed">{w}</div>
                </div>
              ))}
              <p className="mt-3 font-mono text-[12px] opacity-60">
                Each of us logged about 15 hours between the last two milestones.
              </p>
            </div>
          </Reveal>
          <Table
            head={["", "Built with"]}
            rows={[
              ["Language", "OCaml 5"],
              ["Build", "Dune, opam"],
              ["Concurrency", "Lwt, Lwt_unix (timers, Lwt.pick, termios)"],
              ["Terminal", "ANSITerminal, raw ANSI escape codes"],
              ["Testing", "OUnit2, Bisect_ppx coverage"],
              ["Persistence", "JSON (users.json), plain-text data files"],
            ]}
          />
        </div>
      </Section>

      <LinkList links={p.links} />

      <div className="mt-20 flex items-center justify-between">
        <Link href="/projects" className="arrow-link text-sm font-mono">
          ← all projects
        </Link>
        <Link href="/" className="arrow-link text-sm font-mono">
          home ↗
        </Link>
      </div>
    </div>
  );
}

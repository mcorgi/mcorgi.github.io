import Link from "next/link";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { birdsongSections } from "@/data/siteMap";
import { Callout, Card, Code, Diagram, LinkList, Prose, Section, SectionNav, Stat, Table } from "./Parts";
import BirdsongDemo from "./BirdsongDemo";

const img = (name: string) => `/images/birdsong/${name}`;

// What each key does, from the keypad table in our report.
const keys: { k: string; role: "slot" | "record" | "tone" | "compose" }[] = [
  { k: "1", role: "slot" },
  { k: "2", role: "slot" },
  { k: "3", role: "slot" },
  { k: "4", role: "slot" },
  { k: "5", role: "slot" },
  { k: "6", role: "slot" },
  { k: "7", role: "slot" },
  { k: "8", role: "slot" },
  { k: "9", role: "slot" },
  { k: "*", role: "record" },
  { k: "0", role: "tone" },
  { k: "#", role: "compose" },
];

const keyStyle = {
  slot: "bg-cream text-ink",
  record: "bg-pink text-cream",
  tone: "bg-accent text-cream",
  compose: "bg-accent-3 text-cream",
} as const;

const keyHelp: { role: keyof typeof keyStyle; title: string; body: string }[] = [
  {
    role: "record",
    title: "* record mode",
    body: "Press to arm recording. Then hold any key 1–9 and move the slider; letting go saves the recording to that key.",
  },
  {
    role: "slot",
    title: "1–9 recording slots",
    body: "Press a key that has a recording to play it back at 10× speed. Each key has its own buffer.",
  },
  {
    role: "tone",
    title: "0 live tone",
    body: "Turns the slider's tone on and off, so you can find a pitch before recording.",
  },
  {
    role: "compose",
    title: "# compose",
    body: "The first press starts compose mode, and every recording you play gets added to a sequence. The next press plays the whole song.",
  },
];

export default function BirdsongSynth({ project: p }: { project: Project }) {
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
      <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center [&>*]:min-w-0">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-3 flex flex-wrap items-center gap-2">
            <span className="tag !py-0.5 !px-2 text-[10px]">demoed</span>
            <span>· {p.org}</span>
            <span>· {p.year}</span>
            <span>· {p.readTime}</span>
          </div>
          <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">
            Birdsong <span className="text-accent">Synthesizer</span>
          </h1>
          <p className="mt-4 max-w-xl font-mono text-[15px] leading-relaxed text-ink-soft">
            Real-time audio synthesis in C on a Raspberry Pi Pico 2. You play it with a slider and a
            keypad, and the goal was to recreate the call of a northern cardinal.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
            <li><span className="text-accent">▸</span> team of 3, with Nathaniel Su and Benson Zhuo</li>
            <li><span className="text-accent">▸</span> RP2350 · C · Pico SDK</li>
            <li><span className="text-accent">▸</span> 3 weeks</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#play" className="arrow-link text-sm font-mono !bg-ink !text-cream">
              ▶ play it in your browser
            </a>
            <a href="#realtime" className="arrow-link text-sm font-mono">
              the 5 µs budget ↓
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img("build.jpg")}
              alt="The finished build on a breadboard: a Raspberry Pi Pico 2 and DAC wired to a 12-key keypad, a slide potentiometer and two speakers, next to a laptop."
              className="block w-full aspect-[4/3.4] object-cover rounded-lg border-[1.5px] border-line"
            />
            <figcaption className="mt-2 font-mono text-[12px] text-ink-soft">The finished build.</figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="200 kHz" label="audio sample rate, one sample per timer interrupt" />
          <Stat value="3.04 µs" label="worst-case interrupt time, measured, out of a 5 µs budget" />
          <Stat value="10×" label="playback speed, turning slow hand sweeps into bird calls" />
          <Stat value="9" label="recording slots, 176 KB of on-chip SRAM" />
        </div>
      </Reveal>

      <SectionNav items={birdsongSections} />

      {/* OVERVIEW */}
      <Section id="overview" eyebrow="what it is" title="A synthesizer you play with a slider.">
        <Prose>
          <p>
            Birdsong Synthesizer was the first lab in Cornell&apos;s ECE 4760 (Digital Systems Design
            Using Microcontrollers). Cardinals sing almost pure whistles that sweep between roughly 2
            and 7 kHz, so one sine wave with a moving pitch gets surprisingly close to the real thing.
          </p>
          <p>
            A slide potentiometer sets the pitch anywhere from 0 to 10 kHz. The chip generates a sine
            wave at that pitch, 200,000 samples a second, and sends it to a DAC that
            drives a speaker. A 12-key keypad turns the tone on and off, records slider movements
            onto keys 1–9, plays them back, and chains recordings into a song. At the demo, there was
            no resetting or reflashing allowed: everything had to work from the keypad.
          </p>
          <p>
            The course&apos;s source code isn&apos;t public, so this page covers the design, the
            measurements and the results.
          </p>
        </Prose>
        <Credit>
          The lab itself (the goal, the requirements and the cardinal song to recreate) comes from V.
          Hunter Adams&apos;s{" "}
          <CreditLink href="https://vanhunteradams.com/Pico/Birds/Birdsong.html">
            ECE 4760 birdsong lab page
          </CreditLink>
          , which has much more background on the lab. The implementation, code and design choices
          were all ours: Nathaniel Su, Benson Zhuo and me.
        </Credit>

        <Reveal>
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start [&>*]:min-w-0">
            <div
              className="mx-auto md:mx-0 rounded-2xl border-[1.5px] border-line p-4 shadow-[6px_6px_0_0_var(--line)]"
              style={{ background: "var(--ink)" }}
              aria-label="The 4 by 3 keypad"
            >
              <div className="grid grid-cols-3 gap-2.5">
                {keys.map(({ k, role }) => (
                  <span
                    key={k}
                    className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg border-[1.5px] border-line font-display text-xl ${keyStyle[role]}`}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {keyHelp.map((h) => (
                <div key={h.title} className="border-t-[1.5px] border-line pt-3">
                  <div className="flex items-center gap-2">
                    <i className={`inline-block h-3.5 w-3.5 rounded-sm border-[1.5px] border-line ${keyStyle[h.role]}`} />
                    <h3 className="font-display text-lg leading-tight">{h.title}</h3>
                  </div>
                  <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-ink-soft">{h.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* PLAY */}
      <Section
        id="play"
        eyebrow="try it"
        title="Play it here."
        intro={
          <>
            A browser version of how the board behaves, written for this page. The slider runs 0 to
            10 kHz, recordings are sampled at 100 Hz and played back one sample per millisecond, so
            they come out 10× faster. It also has the 5 ms fade in and out that we designed to stop
            the speaker popping (more on that{" "}
            <a href="#problems" className="underline decoration-accent underline-offset-2 hover:text-accent">
              below
            </a>
            ).
          </>
        }
      >
        <div className="max-w-3xl">
          <BirdsongDemo />
        </div>
      </Section>

      {/* HARDWARE */}
      <Section
        id="hardware"
        eyebrow="hardware"
        title="What's on the breadboard."
        intro="A Pico 2, a 12-bit DAC, a keypad, a slider and a pair of speakers. The oscilloscope is part of the design too: one pin exists only so we could measure timing."
      >
        <Diagram
          src={img("hardware-diagram.png")}
          alt="Hardware block diagram: the keypad connects to Pico pins 12 to 20 through 330 ohm resistors, the slide potentiometer to the ADC on pin 32, the MCP4822 DAC over SPI on pins 7, 9 and 10, the DAC output to a 3.5 mm audio socket and speaker, and an ISR timing pin to the oscilloscope."
          caption={<span className="text-[11px] opacity-70">Diagram by Benson Zhuo.</span>}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Card title="Slider → ADC" tag="input">
            <p>
              The potentiometer is a voltage divider from 0 to 3.3 V, which matches the RP2350&apos;s
              12-bit ADC exactly, so it connects with no extra circuitry. One ADC step is about 2.44 Hz
              of pitch.
            </p>
          </Card>
          <Card title="Chip → DAC over SPI" tag="output">
            <p>
              The Pico has no true analog output, so an MCP4822 makes the waveform. Each 16-bit SPI
              transfer at 20 MHz carries 4 config bits and a 12-bit sample.
            </p>
          </Card>
          <Card title="4×3 keypad" tag="input">
            <p>
              Rows are driven as outputs and columns are read with internal pull-ups. Pressing a key
              shorts its row to its column, so scanning one row low at a time finds it.
            </p>
          </Card>
          <Card title="Timing pin" tag="debug">
            <p>
              One GPIO goes high when the audio interrupt starts and low when it ends, so the scope
              shows exactly how long each sample takes.
            </p>
          </Card>
        </div>
      </Section>

      {/* SOFTWARE */}
      <Section
        id="software"
        eyebrow="software"
        title="One interrupt, three threads."
        intro="Everything runs on one core. A hardware timer interrupt produces every audio sample. Three cooperative threads (protothreads) handle everything that isn't time-critical, and they talk to the interrupt through shared variables, mainly the current slider value."
      >
        <Diagram
          src={img("software-architecture.png")}
          alt="Software architecture: the slider feeds the Slider/Record thread, which sets the live slider value for the timer ISR and stores samples at 100 Hz into recording buffers. The keypad thread scans and debounces the keypad and starts recording or playback. The playback thread steps through a key's recording at 10x speed and feeds it to the ISR, which sends samples to the DAC over SPI."
          caption={
            <>
              Threads on the left and bottom, the interrupt at the top right. Blue boxes yield to each
              other; the orange one interrupts all of them.{" "}
              <span className="text-[11px] opacity-70">Diagram by me.</span>
            </>
          }
        />
        <Table
          head={["Piece", "Runs", "What it does"]}
          rows={[
            ["Timer ISR", "every 5 µs", "Turns the slider value into a frequency, computes the next sine sample, sends it to the DAC."],
            ["Slider / Record", "~every 100 µs", "Reads the ADC. While recording, saves the slider value at a steady 100 Hz into that key's buffer."],
            ["Keypad", "~every 100 µs", "Scans and debounces the keypad and switches modes (tone, record, playback, compose)."],
            ["Playback", "every 1 ms", "Feeds a recording back in as the slider value, so the ISR plays it exactly as if someone were moving the slider."],
          ]}
        />
        <Reveal>
          <div className="border-t-[1.5px] border-line pt-4 max-w-3xl">
            <div className="flex items-baseline justify-between font-mono text-[12px] mb-2">
              <span className="text-ink">RP2350 on-chip SRAM</span>
              <span className="text-ink-soft">520 KB</span>
            </div>
            <div className="flex h-8 rounded-md border-[1.5px] border-line overflow-hidden font-mono text-[11px]">
              <div className="bg-accent text-cream flex items-center px-2 whitespace-nowrap" style={{ width: "34%" }}>
                <span className="sm:hidden">176 KB</span>
                <span className="hidden sm:inline">9 recordings · 176 KB</span>
              </div>
              <div className="flex-1 bg-cream-2 flex items-center px-2 text-ink-soft">free</div>
            </div>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-soft">
              <strong className="text-ink">Recording slider positions, not audio, keeps memory small.</strong>{" "}
              9 buffers of 10,000 two-byte samples is 176 KB, about a third of the chip. That&apos;s
              100 seconds per key. Storing the 200 kHz audio itself would fill all of the SRAM in about
              a second.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* REAL TIME */}
      <Section
        id="realtime"
        eyebrow="the real-time constraint"
        title="Every sample has 5 microseconds."
        intro="Pitch depends on samples leaving at an exact, constant rate, and ears notice when they don't. So the waveform is generated inside the timer interrupt, which re-arms itself 5 µs ahead each time, and the work inside it has to be tiny."
      >
        <Prose>
          <p>
            <strong>Direct digital synthesis (DDS).</strong>{" "}A 32-bit counter stands in for the angle
            of a rotating phasor, and each time it overflows is one full period of the sine wave. Each
            sample adds a fixed step to the counter (a bigger step means a higher pitch), and the top 8
            bits pick an entry from a 256-entry sine table built once at startup. That&apos;s one add,
            one shift and one lookup per sample, with no call to <Code>sin()</Code> in the interrupt.
          </p>
        </Prose>

        <Reveal>
          <div className="border-t-[1.5px] border-line pt-4">
            <div className="font-mono text-[12px] text-ink mb-3">one sample, every 5 µs</div>
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[12.5px]">
              {[
                ["slider value", "0 – 4095"],
                ["step size", "∝ pitch"],
                ["phase += step", "32-bit, wraps around"],
                ["top 8 bits", "0 – 255"],
                ["sine table", "256 entries"],
                ["DAC over SPI", "12-bit sample"],
              ].map(([t, s], i, arr) => (
                <span key={t} className="inline-flex items-center gap-2.5">
                  <span
                    className={`rounded-md border-[1.5px] px-3 py-2 ${i === 2 ? "border-accent bg-accent/10" : "border-line bg-cream"}`}
                  >
                    <span className="block text-ink">{t}</span>
                    <span className="block text-[10.5px] opacity-70">{s}</span>
                  </span>
                  {i < arr.length - 1 && <span className="opacity-60">→</span>}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t-[1.5px] border-line pt-4">
            <div className="flex items-baseline justify-between font-mono text-[12px] mb-2">
              <span className="text-ink">one sample period</span>
              <span className="text-ink-soft">5.00 µs</span>
            </div>
            <div className="flex h-10 rounded-md border-[1.5px] border-line overflow-hidden font-mono text-[11.5px]">
              <div className="bg-ink text-cream flex items-center px-3 whitespace-nowrap" style={{ width: "60.8%" }}>
                <span className="sm:hidden">ISR 3.04 µs</span>
                <span className="hidden sm:inline">interrupt · 3.04 µs</span>
              </div>
              <div className="flex-1 bg-cream-2 flex items-center px-3 text-ink-soft whitespace-nowrap overflow-hidden">
                <span className="sm:hidden">1.96</span>
                <span className="hidden sm:inline">threads · 1.96 µs</span>
              </div>
            </div>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-soft">
              Worst case measured on the scope: the interrupt uses about 61% of every period, and it
              never overran the next alarm.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-start [&>*]:min-w-0">
          <Shot
            src={img("scope-isr-timing.jpg")}
            alt="Oscilloscope capture of the timing pin: a square wave whose high time, marked with cursors, is 3.04 microseconds."
            caption="The timing pin on the scope: 3.04 µs inside the interrupt, out of every 5 µs."
          />
          <Reveal>
            <div className="space-y-4 font-mono text-[13.5px] leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">Measured, not assumed.</strong>{" "}We started at 50 kHz
                (a sample every 20 µs). Before cutting the period to 5 µs for 200 kHz, we scoped the
                timing pin to make sure the interrupt would still finish in time, with room left for
                the three threads.
              </p>
              <p>
                <strong className="text-ink">What we&apos;d change next.</strong>{" "}Most of those 3 µs
                are double-precision math that converts the slider value to a frequency on every
                sample, even though the slider value only changes every 100 µs or so. Recomputing the
                step only when the slider moves would take that math out of the interrupt entirely.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* INPUT */}
      <Section
        id="input"
        eyebrow="input"
        title="One press means one press."
        intro="Mechanical keys bounce: the contacts open and close several times before settling, which looks like several presses."
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start [&>*]:min-w-0">
          <Shot
            src={img("debounce-fsm.png")}
            alt="Debouncing state machine with four states: not pressed, maybe pressed, pressed, and maybe not pressed. Each maybe state waits 50 ms and checks the keypad again. The press action happens on entering pressed, and the release action on returning to not pressed."
            caption={
              <>
                The four-state debouncer.{" "}
                <span className="text-[11px] opacity-70">
                  Adapted from V. Hunter Adams&apos;s{" "}
                  <CreditLink href="https://vanhunteradams.com/Pico/Keypad/Keypad.html">
                    keypad page
                  </CreditLink>
                  .
                </span>
              </>
            }
          />
          <Reveal>
            <div className="space-y-4 font-mono text-[13.5px] leading-relaxed text-ink-soft">
              <p>
                A four-state machine (not pressed, maybe pressed, pressed, maybe not pressed) only
                accepts a press or a release after a second scan agrees, with a{" "}
                50 ms wait in each &quot;maybe&quot; state.
              </p>
              <p>
                This mattered more than usual here, because one bounced press could start a
                recording on the wrong key, overwrite a buffer, or add a stray key to a song.
              </p>
              <p>
                <strong className="text-ink">Press vs. release.</strong>{" "}Entering record mode and
                starting a recording happen on the confirmed press. Everything else (stopping a
                recording, playing back, toggling the tone, compose) happens on the confirmed release.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* RESULTS */}
      <Section
        id="results"
        eyebrow="results"
        title="Slow hands, fast birds."
        intro="A cardinal's chirp sweeps faster than anyone can move a slider. Recording at 100 Hz and playing back at 1 kHz compresses a slow, careful sweep 10× into a real-sounding call."
      >
        <div className="grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
          <Shot
            src={img("spectrogram-chirp.jpg")}
            alt="Spectrogram of three chirps: each is a fast rising sweep."
            caption="Chirp: a fast rising sweep, repeated."
          />
          <Shot
            src={img("spectrogram-swoop.jpg")}
            alt="Spectrogram of three swoops: each rises, holds briefly and falls, like an upside-down V."
            caption="Swoop: a broader curved path, up and back down."
          />
        </div>
        <Prose>
          <p>
            The scope can only show when the tone is on: at 50 ms per division, thousands of sine
            periods blur into a solid block. So we checked the actual frequency sweeps with
            spectrograms from Cornell Lab of Ornithology&apos;s Merlin bird ID app, the same app the
            demo uses to judge whether it sounds like a cardinal.
          </p>
        </Prose>
        <div className="grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
          <Shot
            src={img("scope-swoop.png")}
            alt="Oscilloscope capture of a swoop playing back: flat, then a dense block labeled sustain, then flat again, with the abrupt start and end labeled."
            caption="A swoop on the scope. The abrupt start and end are where the pop comes from."
          />
          <Shot
            src={img("scope-chirp.png")}
            alt="Oscilloscope capture of a chirp playing back: a dense rectangular block between two flat lines."
            caption="A chirp. The pitch is changing inside the block; only the spectrogram shows it."
          />
        </div>
      </Section>

      {/* PROBLEMS */}
      <Section
        id="problems"
        eyebrow="what went wrong"
        title="Problems, and what we did about them."
      >
        <Table
          head={["Problem", "Cause", "Fix"]}
          rows={[
            [
              "“Robotic” pitch",
              "The slider thread waited 100 ms between ADC reads, so the pitch could only change 10 times a second.",
              "Cut the wait to 100 µs. Slider sweeps now sound continuous.",
            ],
            [
              "Pop at start/end",
              "The DAC jumps straight from rest to full amplitude, and the speaker cone gets shoved.",
              "Designed but not built: a 5 ms (1,000-sample) linear fade in and out at every start and stop. The browser demo above uses it.",
            ],
            [
              "Hidden mode",
              "Without a laptop on the serial port, nothing showed whether record or compose mode was on.",
              "Proposed: a mode LED or a small display, since a press in the wrong mode can overwrite a recording.",
            ],
          ]}
        />
        <Prose>
          <p>
            <strong>Testing.</strong>{" "}We built and tested one feature at a time with the scope and the
            serial monitor: pressing 0 over and over to confirm one toggle per press, recording on
            every key to confirm the buffers were independent, and checking compose sequences against
            serial output.
          </p>
        </Prose>
        <Callout>
          The biggest lesson was to measure before trusting. The 200 kHz sample rate, the 100 µs
          slider loop and the 10× playback were all chosen by looking at the scope or a spectrogram,
          not by guessing.
        </Callout>
      </Section>

      <Section id="stack" eyebrow="built with" title="Stack.">
        <div className="flex flex-wrap gap-2">
          {p.stack?.map((s) => (
            <span key={s} className="tag font-mono">
              {s}
            </span>
          ))}
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

// A photo or screenshot with a caption.
function Shot({ src, alt, caption }: { src: string; alt: string; caption: ReactNode }) {
  return (
    <Reveal>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto bg-white rounded-lg border-[1.5px] border-line" />
        <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}

// Small attribution text.
function Credit({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="max-w-3xl font-mono text-[11.5px] leading-relaxed opacity-70">{children}</p>
    </Reveal>
  );
}

function CreditLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="underline decoration-accent underline-offset-2 hover:text-accent"
    >
      {children}
    </a>
  );
}

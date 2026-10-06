import { videos } from "@/data/music";

// The one page that isn't a computer. Laid out like a concert program,
// in its own warm palette (.theme-concert in globals.css).
const serif = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

const anchor = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// [top, left, size px, glyph, tilt deg, delay s, color]
const notes: [string, string, number, string, number, number, string][] = [
  ["4%", "4%", 44, "♪", -12, 0, "text-accent"],
  ["11%", "88%", 56, "♫", 10, 1.2, "text-accent-2"],
  ["24%", "93%", 30, "♩", -6, 2.1, "text-pink-ink"],
  ["31%", "2%", 34, "♬", 8, 0.6, "text-accent-2"],
  ["46%", "90%", 40, "♪", -4, 1.8, "text-accent"],
  ["55%", "5%", 52, "♪", 14, 2.6, "text-pink-ink"],
  ["68%", "94%", 34, "♫", -10, 0.3, "text-accent-2"],
  ["78%", "3%", 30, "♩", 6, 1.5, "text-accent"],
  ["88%", "89%", 46, "♬", -8, 2.3, "text-pink-ink"],
];

export default function MusicPage() {
  return (
    <div className="theme-concert relative overflow-hidden -mb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {notes.map(([top, left, size, glyph, tilt, delay, color], i) => (
          <span
            key={i}
            className={`drift absolute leading-none opacity-60 ${color}`}
            style={{
              top,
              left,
              fontSize: size,
              animationDelay: `${delay}s`,
              ["--tilt" as string]: `${tilt}deg`,
              ...serif,
            }}
          >
            {glyph}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-5 pt-14 pb-40">
        <h1 className="display text-5xl sm:text-7xl">
          Duets <span className="text-accent">&amp;</span> solos.
        </h1>
        <p className="mt-5 max-w-2xl font-mono text-[14.5px] leading-relaxed text-ink-soft">
          Piano and violin, and every duet here is me playing both parts. I take a piece that
          usually only has one melody, write a second part that sounds the way I want it to, then
          record the two and put them together. That last step is the part that excites me most.
          So far: one Shostakovich waltz, a lot of game and anime soundtracks, and Rush E.
        </p>

        {/* now playing */}
        <div className="mt-10 flex items-center gap-5 border-y border-line/20 py-5">
          <div className="spin-slow relative h-16 w-16 shrink-0 rounded-full bg-ink text-cream flex items-center justify-center">
            <span className="text-2xl" style={serif}>
              ♫
            </span>
            <span className="absolute inset-[6px] rounded-full border border-cream/15" />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
              Currently working on
            </div>
            <div className="text-xl" style={serif}>
              A new violin + piano duet
            </div>
            <div className="font-mono text-[12px] opacity-70 mt-0.5">Recording coming soon.</div>
          </div>
          <div aria-hidden className="ml-auto hidden sm:flex items-end gap-1 h-10">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="eq-bar block w-1.5 h-full rounded-sm bg-accent"
                style={{
                  animationDelay: `${(i * 0.13) % 0.9}s`,
                  animationDuration: `${0.9 + (i % 4) * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* program */}
        <div
          className="mt-14 mx-auto max-w-xl bg-cream px-6 sm:px-12 py-10 border border-line outline outline-1 outline-line outline-offset-4 text-ink"
          style={serif}
        >
          <div className="text-center">
            <div className="text-[12px] uppercase tracking-[0.35em] opacity-70">Program</div>
            <div className="mt-2 text-[22px] italic">Sandra Tang, violin &amp; piano</div>
            <div className="mt-1 text-[13px] italic text-ink-soft">(both parts)</div>
            <div className="mx-auto mt-4 h-px w-16 bg-line/40" />
          </div>
          <ol className="mt-8 space-y-5">
            {videos.map((v) => (
              <li key={v.youtubeId}>
                <a href={`#${anchor(v.title)}`} className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="text-[18px] group-hover:text-accent">{v.title}</span>
                  <span aria-hidden className="hidden sm:block flex-1 border-b border-dotted border-line/40 translate-y-[-4px]" />
                  <span className="text-[15px] italic text-ink-soft sm:text-right">{v.subtitle}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center text-[13px] italic text-ink-soft">
            Please silence your phones.
          </p>
        </div>

        {/* recordings */}
        <section className="mt-20 grid sm:grid-cols-2 gap-x-8 gap-y-12">
          {videos.map((v) => (
            <figure key={v.youtubeId} id={anchor(v.title)} className="scroll-mt-24 min-w-0">
              <div className="relative aspect-video w-full bg-ink border border-line rounded-sm overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3" style={serif}>
                <span className="min-w-0">
                  <span className="text-[19px]">{v.title}</span>
                  {v.subtitle && <span className="italic text-ink-soft">, {v.subtitle}</span>}
                </span>
                <a
                  href={`https://youtu.be/${v.youtubeId}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="shrink-0 font-mono text-[11.5px] opacity-60 hover:opacity-100 hover:text-accent"
                  aria-label={`Watch ${v.title} on YouTube`}
                >
                  youtube ↗
                </a>
              </figcaption>
            </figure>
          ))}
        </section>
      </div>
    </div>
  );
}

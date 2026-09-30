import { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-28">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
          /{eyebrow}
        </div>
        <h2 className="display text-3xl sm:text-4xl">{title}</h2>
        {intro && (
          <p className="mt-4 max-w-3xl font-mono text-[14.5px] leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
      </Reveal>
      <div className="mt-7 space-y-6">{children}</div>
    </section>
  );
}

// Section jump links, pinned under the site nav (like the Hermes page).
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Sections"
      className="sticky top-[57px] z-30 -mx-5 mt-10 px-5 py-2 bg-cream/90 backdrop-blur-sm border-y border-line"
    >
      <div className="flex gap-1 overflow-x-auto font-mono text-[12px] whitespace-nowrap">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="px-2.5 py-1 rounded-md hover:bg-ink hover:text-cream transition-colors"
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// A draw.io diagram (.drawio.svg) in a window frame. Click opens it full size.
export function Diagram({
  src,
  alt,
  caption,
  file,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  file?: string;
}) {
  const name = file ?? src.split("/").pop();
  return (
    <Reveal>
      <figure className="window">
        <div className="window-title">
          <span className="window-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="ml-2 truncate">{name}</span>
          <a
            href={src}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto text-[11px] opacity-70 hover:opacity-100 hover:text-accent"
          >
            full size ↗
          </a>
        </div>
        <div className="bg-white overflow-x-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="block w-full min-w-[640px] h-auto" />
        </div>
        {caption && (
          <figcaption className="border-t border-line px-5 py-3 font-mono text-[12.5px] leading-relaxed text-ink-soft">
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

export function Table({
  head,
  rows,
  file = "table.csv",
}: {
  head: string[];
  rows: ReactNode[][];
  file?: string;
}) {
  return (
    <Reveal>
      <div className="window-soft overflow-hidden">
        <div className="window-title">
          <span className="window-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="ml-2 truncate">{file}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-mono text-[13px] leading-relaxed">
            <thead>
              <tr className="bg-cream-2/60">
                {head.map((h) => (
                  <th
                    key={h}
                    className="text-left align-bottom px-4 py-2.5 border-b border-line text-[10.5px] uppercase tracking-widest opacity-70 font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-line/15 last:border-0 align-top">
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="window-soft p-4 h-full">
      <div className="display text-3xl sm:text-4xl text-accent">{value}</div>
      <div className="mt-2 font-mono text-[12.5px] leading-snug">{label}</div>
      {note && <div className="mt-1 font-mono text-[11px] opacity-60">{note}</div>}
    </div>
  );
}

export function Card({
  title,
  tag,
  children,
  accent = false,
}: {
  title: string;
  tag?: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`window-soft p-5 h-full ${accent ? "bg-cream-2/50" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-tight">{title}</h3>
        {tag && <span className="tag font-mono !text-[9.5px] shrink-0">{tag}</span>}
      </div>
      <div className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft space-y-2">
        {children}
      </div>
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="px-1 py-[1px] rounded bg-cream-2 text-ink text-[0.92em]">{children}</code>
  );
}

export function Pre({ title, children }: { title: string; children: string }) {
  return (
    <Reveal>
      <div className="window scanlines">
        <div className="window-title">
          <span className="window-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="ml-2 truncate">{title}</span>
        </div>
        <pre className="bg-ink text-cream p-5 sm:p-6 text-[12px] sm:text-[13px] leading-[1.65] font-mono overflow-x-auto">
          {children}
        </pre>
      </div>
    </Reveal>
  );
}

// Plain reading column: one idea after another, top to bottom.
export function Prose({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="max-w-3xl space-y-4 font-mono text-[14.5px] leading-[1.75] text-ink-soft [&_strong]:text-ink [&_strong]:font-semibold">
        {children}
      </div>
    </Reveal>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <Reveal>
      <ol className="max-w-3xl space-y-3 font-mono text-[14px] leading-relaxed">
        {items.map((it, i) => (
          <li key={i} className="flex gap-4">
            <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-md border-[1.5px] border-line bg-cream-2 text-[12px] font-semibold">
              {i + 1}
            </span>
            <span className="pt-0.5 text-ink-soft [&_strong]:text-ink [&_strong]:font-semibold">{it}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="max-w-3xl border-l-4 border-pink bg-pink-soft/60 rounded-r-lg px-5 py-4 font-mono text-[14px] leading-relaxed text-ink">
        {children}
      </div>
    </Reveal>
  );
}


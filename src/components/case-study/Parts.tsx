import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import type { ProjectLink } from "@/data/projects";

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
      className="sticky top-[57px] z-30 -mx-5 mt-10 px-5 py-2 bg-cream border-y border-line"
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

// A draw.io diagram (.drawio.svg) with a plain border. Click opens it full size.
export function Diagram({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
}) {
  return (
    <Reveal>
      <figure>
        <div className="bg-white overflow-x-auto rounded-lg border-[1.5px] border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="block w-full min-w-[640px] h-auto" />
        </div>
        <figcaption className="mt-2.5 flex items-start justify-between gap-6 font-mono text-[12.5px] leading-relaxed text-ink-soft">
          <span>{caption}</span>
          <a
            href={src}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 text-[11.5px] opacity-60 hover:opacity-100 hover:text-accent"
          >
            full size ↗
          </a>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Reveal>
      <div className="overflow-x-auto border-y-[1.5px] border-line">
        <table className="w-full min-w-[640px] border-collapse font-mono text-[13px] leading-relaxed">
          <thead>
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  className="text-left align-bottom px-3 py-2.5 border-b border-line text-[10.5px] uppercase tracking-widest opacity-70 font-normal"
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
                  <td key={j} className={`px-3 py-3 ${j === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="border-t-[1.5px] border-line pt-3 h-full">
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
}: {
  title: string;
  tag?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t-[1.5px] border-line pt-3 h-full">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg leading-tight">{title}</h3>
        {tag && <span className="font-mono text-[11px] opacity-60 shrink-0">{tag}</span>}
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
      <div>
        <div className="mb-2 font-mono text-[11.5px] opacity-60">{title}</div>
        <pre className="rounded-lg bg-ink text-cream p-5 sm:p-6 text-[12px] sm:text-[13px] leading-[1.65] font-mono overflow-x-auto">
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
      <div className="max-w-3xl border-l-4 border-pink bg-pink-soft rounded-r-lg px-5 py-4 font-mono text-[14px] leading-relaxed text-ink">
        {children}
      </div>
    </Reveal>
  );
}


// Related links at the bottom of a case study.
export function LinkList({ links }: { links?: ProjectLink[] }) {
  if (!links?.length) return null;
  return (
    <section className="mt-16">
      <h2 className="display text-2xl sm:text-3xl">Links</h2>
      <ul className="mt-4 max-w-3xl border-y border-line/25 divide-y divide-line/15 font-mono text-[14px]">
        {links.map((l) => {
          const external = l.href && !l.href.startsWith("/");
          return (
            <li key={l.label} className="py-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              {l.href ? (
                <a
                  href={l.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="underline decoration-pink underline-offset-4 hover:text-accent"
                >
                  {l.label}
                  {external && " ↗"}
                </a>
              ) : (
                <span>{l.label}</span>
              )}
              {l.note && <span className="text-[12px] opacity-60">{l.note}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

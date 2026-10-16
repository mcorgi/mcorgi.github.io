"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { GrillScene, SatelliteScene } from "@/components/Illustrations";
import { ChipIcon, MountingHole, PcbEdge } from "@/components/Pcb";
import { OpeningCountdown, SuasBanner, embedded } from "@/components/ProjectShowcase";
import Reveal from "@/components/Reveal";
import VerbalTerminal from "@/components/VerbalTerminal";
import { projects } from "@/data/projects";

const mps = projects.find((p) => p.slug === "mini-plane-system");

// /projects: the same projects as the home page, as smaller cards three to a
// row, so more of them fit on screen at once. Each keeps its home page look.
export default function ProjectGrid() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 mt-10">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <Card
            href="/projects/mini-plane-system"
            shadow="bg-accent"
            badge={<Pill className="bg-accent text-cream">★ my proudest project</Pill>}
            kicker="CUAir · 2025 – present"
            title="Mini Plane System (MPS)"
            blurb="The software that gets photos off our plane while it's still in the air, each one paired with GPS and attitude from the Pixhawk. I ran it from the flightline at SUAS 2026."
            cta="read the case study"
            visual={
              mps?.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mps.photo.src}
                  alt={mps.photo.alt}
                  loading="lazy"
                  className="block h-full w-full object-cover scale-[2.2]"
                  style={{ objectPosition: "46% 45%" }}
                />
              )
            }
          />
          <Card
            href="/projects/automated-analytics"
            shadow="bg-[#9b87f5]"
            theme="theme-violet"
            badge={<Pill className="bg-accent text-cream">shipped to prod</Pill>}
            kicker="Amazon Leo · Summer 2026"
            title="Automated Analytics Platform"
            blurb="A serverless service that runs engineers' analysis scripts on a schedule or when an event lands, and tickets the right person when a run breaks. In production before my internship ended."
            cta="read the case study"
            visual={<SatelliteScene className="!rounded-none" />}
          />
          <EmbeddedCard />
        </div>
      </section>

      <SuasBanner />

      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <Card
            href="/projects/bbq-land"
            shadow="bg-pink"
            theme="theme-bbq-night"
            badge={
              <span className="flex flex-wrap items-center gap-2 font-mono text-[14px]">
                <Pill className="bg-pink text-white">live</Pill>
                <OpeningCountdown />
              </span>
            }
            kicker="Client website · Oct 2026"
            title="BBQ Land"
            blurb="The first website for a new yakiniku restaurant in Shrewsbury, MA. Launched during soft opening, then redesigned the next day from the owner's feedback."
            cta="how I built it"
            visual={<GrillScene className="!rounded-none" />}
          />
          <Card
            href="/projects/song-saver"
            shadow="bg-pink"
            theme="theme-cozy"
            kicker="Personal project · for my aunt"
            title="Song Saver"
            blurb="YouTube-to-MP3 sites are full of pop-ups and fake Download buttons, so I made her an app of her own, right on her home screen: paste a link, wait, save."
            cta="read the story"
            visual={
              <div className="flex h-full items-center justify-center bg-pink-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/song-saver/start.png"
                  alt="Song Saver's start screen on an iPhone, with a big Paste link button."
                  loading="lazy"
                  className="h-[86%] w-auto rotate-3 rounded-[16px] border-[1.5px] border-line bg-white object-cover object-top shadow-[4px_4px_0_0_var(--pink)]"
                />
              </div>
            }
          />
          <Card
            href="/projects/camel-benchmark"
            shadow="bg-accent"
            kicker="CS 3110 · OCaml · Fall 2025"
            title="Camel Benchmark"
            blurb="Five brain games that run in the terminal, with logins and a leaderboard. I built Verbal Memory and rebuilt it as a pure state machine, tested by 47 tests."
            cta="play verbal memory"
            ctaHref="/projects/camel-benchmark#play"
            visual={<VerbalTerminal className="h-full" />}
          />
        </div>
      </section>
    </>
  );
}

// A compact card: picture on top, then the text, with the link pinned to the bottom
// so cards in a row line up.
function Card({
  href,
  shadow,
  theme,
  badge,
  kicker,
  title,
  blurb,
  cta,
  ctaHref = href,
  visual,
}: {
  href: string;
  shadow: string;
  theme?: string;
  badge?: ReactNode;
  kicker: string;
  title: string;
  blurb: string;
  cta: string;
  ctaHref?: string;
  visual: ReactNode;
}) {
  return (
    <Reveal className="h-full">
      <article className={`lift relative h-full rounded-2xl ${theme ?? ""}`}>
        <div aria-hidden className={`absolute inset-0 translate-x-2 translate-y-2 rounded-2xl ${shadow}`} />
        <div className={`relative flex h-full flex-col rounded-2xl border-[1.5px] border-line p-5 ${theme ? "bg-cream" : "bg-white"}`}>
          <Link
            href={href}
            tabIndex={-1}
            className="block aspect-[4/3] overflow-hidden rounded-lg border-[1.5px] border-line"
          >
            {visual}
          </Link>
          {badge && <div className="mt-4">{badge}</div>}
          <div className="mt-4 font-mono text-[14px] text-muted">{kicker}</div>
          <h3 className="display mt-1.5 text-[26px] leading-[1.05]">
            <Link href={href} className="hover:text-accent transition-colors">
              {title}
            </Link>
          </h3>
          <p className="mt-3 font-sans text-[16px] leading-relaxed text-ink-soft">{blurb}</p>
          <Link href={ctaHref} className="mt-auto self-start pt-5">
            <span className="arrow-link text-sm font-mono">{cta}</span>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

function Pill({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[14px] ${className}`}>
      {children}
    </span>
  );
}

// The Embedded projects board, shrunk to one card: both labs as rows on the board.
function EmbeddedCard() {
  return (
    <Reveal className="h-full">
      <article className="lift relative h-full">
        <div className="relative flex h-full flex-col rounded-2xl border-[1.5px] border-line bg-[#0e5c45] px-3 shadow-[8px_8px_0_0_var(--line)] [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_9px)]">
          {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((pos) => (
            <MountingHole key={pos} className={pos} />
          ))}
          <PcbEdge label="EMB-01" />
          <div className="flex flex-1 flex-col rounded-lg border-[1.5px] border-line bg-cream">
            <div className="flex items-center gap-3 border-b-[1.5px] border-line px-4 py-4">
              <ChipIcon className="h-8 w-8 shrink-0 text-accent-3" />
              <div>
                <h3 className="display text-[26px] leading-none">Embedded projects</h3>
                <p className="mt-1.5 font-mono text-[14px] text-muted">two labs this semester</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col divide-y-[1.5px] divide-line">
              {embedded.map((e) => (
                <div key={e.href} className="flex flex-1 items-center gap-4 p-4">
                  <Link
                    href={e.href}
                    tabIndex={-1}
                    className="relative block w-32 shrink-0 overflow-hidden rounded-md border-[1.5px] border-line"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.img} alt={e.alt} loading="lazy" className={`block aspect-[4/3] w-full object-cover ${e.imgPos}`} />
                    <span aria-hidden className="absolute left-1 top-1 rounded-sm bg-[#0e5c45] px-1 font-mono text-[11px] tracking-widest text-[#f4f1e6]">
                      {e.refdes}
                    </span>
                  </Link>
                  <div className="flex min-w-0 flex-col">
                    <h4 className="display text-[20px] leading-tight">
                      <Link href={e.href} className="hover:text-accent transition-colors">
                        {e.title}
                      </Link>
                    </h4>
                    <p className="mt-1 font-sans text-[15px] leading-snug text-ink-soft">{e.short}</p>
                    <Link
                      href={`${e.href}#play`}
                      className="mt-2 self-start font-mono text-[14px] underline decoration-pink underline-offset-4 hover:text-accent"
                    >
                      {e.ctaShort}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PcbEdge label="U1 + U2" flip />
        </div>
      </article>
    </Reveal>
  );
}

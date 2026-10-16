"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GrillScene, PlaneBanner } from "@/components/Illustrations";
import FeaturedProject from "@/components/FeaturedProject";
import { ChipIcon, MountingHole, PcbEdge } from "@/components/Pcb";
import Reveal from "@/components/Reveal";
import { featuredProjects } from "@/data/projects";

const proudest = featuredProjects.find((p) => p.slug === "mini-plane-system") ?? featuredProjects[0];
const otherFeatured = featuredProjects.filter((p) => p !== proudest);
const featuredTags: Record<string, string> = {
  "automated-analytics": "shipped to prod",
};

// The home page's project cards, each in its own style: the featured projects,
// the Embedded projects board, the SUAS banner, BBQ Land and Song Saver.
// /projects shows the same projects as smaller cards (see ProjectGrid).
export default function ProjectShowcase() {
  return (
    <>
      {/* PROJECTS: each on its own card, divided by lines, with a tag saying why
          it's here. The SUAS banner runs full width in the middle. */}
      <section className="mx-auto max-w-6xl px-5 mt-8">
        <h2 className="display text-3xl sm:text-4xl pb-6 border-b-[1.5px] border-line">
          Projects
        </h2>
        <div className="divide-y-[1.5px] divide-line">
          <Reveal className="py-12">
            <div className="lift">
              <FeaturedProject project={proudest} badge="★ my proudest project" />
            </div>
          </Reveal>

          {otherFeatured.map((fp) => (
            <Reveal key={fp.slug} className="py-12">
              <div className="lift">
                <FeaturedProject project={fp} badge={featuredTags[fp.slug]} />
              </div>
            </Reveal>
          ))}

          {/* Embedded projects: two class labs on one circuit board, split down the middle */}
          <Reveal className="py-12">
            <div className="lift">
              <div className="relative rounded-2xl border-[1.5px] border-line bg-[#0e5c45] px-3 sm:px-5 shadow-[6px_6px_0_0_var(--line)] [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_9px)]">
                {/* mounting holes */}
                {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((pos) => (
                  <MountingHole key={pos} className={pos} />
                ))}

                <PcbEdge label="EMB-01 · REV F26" />

                <div className="rounded-lg border-[1.5px] border-line bg-cream">
                  <div className="flex items-start gap-4 border-b-[1.5px] border-line px-6 py-6 sm:px-10">
                    <ChipIcon className="mt-1 h-9 w-9 shrink-0 text-accent-3" />
                    <div>
                      <h3 className="display text-[30px] sm:text-[38px] leading-none">
                        Embedded projects
                      </h3>
                      <p className="mt-2 font-mono text-[14px] text-muted">
                        two labs this semester: bare-metal C, and embedded Linux
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-line">
                    {embedded.map((e) => (
                      <article key={e.href} className="flex flex-col p-6 sm:p-8">
                        <Link href={e.href} className="relative block overflow-hidden rounded-lg border-[1.5px] border-line">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={e.img}
                            alt={e.alt}
                            loading="lazy"
                            className={`block w-full aspect-[4/3] object-cover ${e.imgPos} transition-transform duration-500 hover:scale-[1.03]`}
                          />
                          <span aria-hidden className="absolute left-2 top-2 rounded border border-[#f4f1e6]/70 bg-[#0e5c45] px-1.5 py-0.5 font-mono text-[12px] tracking-widest text-[#f4f1e6]">
                            {e.refdes}
                          </span>
                        </Link>
                        <span className="mt-5 self-start inline-flex items-center rounded-full border-[1.5px] border-line bg-cream-2 px-3 py-1 font-mono text-[14px]">
                          {e.course}
                        </span>
                        <h4 className="display text-[28px] sm:text-[34px] leading-[0.95] mt-4">
                          <Link href={e.href} className="hover:text-accent transition-colors">
                            {e.title}
                          </Link>
                        </h4>
                        <p className="mt-3 font-sans text-[17px] leading-relaxed text-ink-soft">{e.blurb}</p>
                        <Link href={`${e.href}#play`} className="mt-auto pt-6 self-start">
                          <span className="arrow-link text-sm font-mono">{e.cta}</span>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>

                <PcbEdge label="ECE 4760 + ECE 5725" flip />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SuasBanner />

      <section className="mx-auto max-w-6xl px-5">
        <div className="divide-y-[1.5px] divide-line">
          {/* BBQ Land, dark like bbqlandma.com's hero */}
          <Reveal className="py-12">
            <div className="lift">
              <div className="theme-bbq-night relative rounded-2xl">
                <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-pink" />
                <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10 rounded-2xl border-[1.5px] border-line bg-cream p-6 sm:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[14px]">
                      <span className="inline-flex items-center rounded-full bg-pink px-3 py-1 text-white">
                        newest, just launched
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-cream-2 px-3 py-1">
                        <span aria-hidden className="h-2 w-2 rounded-full bg-accent" /> live
                      </span>
                      <OpeningCountdown />
                    </div>
                    <h3 className="display text-[40px] sm:text-[56px] leading-[0.95] mt-5">
                      <Link href="/projects/bbq-land" className="hover:text-accent transition-colors">
                        BBQ Land
                      </Link>
                    </h3>
                    <p className="mt-4 font-display text-xl sm:text-2xl leading-snug">
                      A new restaurant had no website. Now it has one, and I built it from scratch.
                    </p>
                    <p className="mt-4 max-w-[60ch] font-sans text-[17px] leading-relaxed text-ink-soft">
                      BBQ Land is a modern Asian yakiniku restaurant in Shrewsbury, MA. I designed and
                      built the site, launched it during soft opening, and redesigned it the next day
                      from the owner&apos;s feedback. Now almost every dish on the menu links straight
                      to Toast for ordering.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a
                        href="https://www.bbqlandma.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-pink bg-pink px-4 py-2 font-mono text-sm text-white shadow-[3px_3px_0_0_var(--line)] transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_var(--line)]"
                      >
                        visit bbqlandma.com ↗
                      </a>
                      <Link
                        href="/projects/bbq-land"
                        className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-line px-4 py-2 font-mono text-sm hover:bg-navy hover:text-cream transition-colors"
                      >
                        how I built it →
                      </Link>
                    </div>
                  </div>
                  <div>
                    <GrillScene className="border-[1.5px] border-line" />
                    <dl className="mt-5 font-sans text-[16px] leading-relaxed">
                      {[
                        ["OCT 11", "The first version goes live on bbqlandma.com."],
                        ["OCT 12", "Redesigned the same day, from the owner's feedback."],
                        ["NOV 16", "Grand opening."],
                      ].map(([when, what]) => (
                        <div key={when} className="grid grid-cols-[84px_1fr] gap-3 py-2.5 border-t border-line/15">
                          <dt className="font-mono text-pink-ink tracking-widest text-[14px] pt-0.5">{when}</dt>
                          <dd className="text-ink-soft">{what}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Song Saver, as a scrapbook page in its cozy palette */}
          <Reveal className="py-12">
            <div className="lift">
              <div className="theme-cozy relative overflow-hidden rounded-[28px] border-[1.5px] border-line px-5 py-10 sm:px-12 sm:py-14">
                {/* hearts and notes scattered in the background */}
                {[
                  ["♥", "left-[6%] top-[8%] -rotate-12 text-[28px]"],
                  ["♪", "left-[44%] top-[6%] rotate-6 text-[32px]"],
                  ["♥", "right-[5%] top-[10%] rotate-12 text-[22px]"],
                  ["♫", "left-[3%] bottom-[8%] -rotate-6 text-[30px]"],
                  ["♥", "right-[38%] bottom-[5%] rotate-6 text-[24px]"],
                ].map(([ch, pos]) => (
                  <span key={pos} aria-hidden className={`absolute font-hand text-pink ${pos}`}>
                    {ch}
                  </span>
                ))}

                <div className="relative grid md:grid-cols-[1.25fr_1fr] gap-12 md:gap-8 items-center">
                  {/* the note */}
                  <div className="relative -rotate-1 rounded-sm border-[1.5px] border-line bg-white px-6 pt-9 pb-7 shadow-[5px_5px_0_0_var(--pink)] sm:px-9">
                    <span aria-hidden className="tape -top-3 left-8 -rotate-3" />
                    <span className="inline-flex items-center rounded-full border-[1.5px] border-pink bg-pink-soft px-3 py-1 font-mono text-[14px] text-pink-ink">
                      a smaller personal project
                    </span>
                    <p className="mt-5 font-hand text-[26px] sm:text-[30px] leading-none text-pink-ink">
                      for my aunt, with love <span aria-hidden>♥</span>
                    </p>
                    <h3 className="display text-[34px] sm:text-[44px] leading-[0.95] mt-4">
                      <Link href="/projects/song-saver" className="hover:text-accent transition-colors">
                        Song Saver
                      </Link>
                    </h3>
                    <p className="mt-4 font-sans text-[17px] leading-relaxed text-ink-soft">
                      She isn&apos;t comfortable with technology, and YouTube-to-MP3 sites are full of
                      pop-ups and fake Download buttons. So I made her an app of her own, right on her
                      home screen: paste a link, wait, save.
                    </p>
                    <Link href="/projects/song-saver" className="mt-6 arrow-link text-sm font-mono">
                      read the story
                    </Link>
                  </div>

                  {/* her actual start screen, tucked in at an angle */}
                  <div className="relative mx-auto w-[200px] sm:w-[230px]">
                    <div className="rotate-3 overflow-hidden rounded-[30px] border-[1.5px] border-line bg-white shadow-[6px_6px_0_0_var(--line)] aspect-[9/16]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/song-saver/start.png"
                        alt="Song Saver's start screen on an iPhone, with a big Paste link button and numbered instructions."
                        loading="lazy"
                        className="block w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* the app icon, cropped from a photo of her home screen */}
                    <div className="absolute -right-6 -top-6 h-16 w-16 -rotate-6 overflow-hidden rounded-[22%] shadow-[3px_3px_0_0_var(--pink)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/song-saver/icon.jpg"
                        alt=""
                        className="absolute left-[-7%] top-[-3%] w-[122%] max-w-none"
                      />
                    </div>
                    <p className="absolute -left-10 bottom-6 -rotate-6 rounded-sm bg-pink-soft px-4 py-2 font-hand text-[24px] leading-none text-ink shadow-[3px_3px_0_0_var(--pink)]">
                      paste, wait, save <span aria-hidden>♪</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}

// The two class labs in the shared Embedded projects box.
export const embedded = [
  {
    href: "/projects/birdsong-synthesizer",
    refdes: "U1",
    title: "Birdsong Synthesizer",
    course: "ECE 4760 · C · RP2350",
    blurb:
      "A synthesizer that sounds like a northern cardinal. A timer interrupt computes every audio sample at 200 kHz, in 3.04 µs out of a 5 µs budget, and a keypad records slow slider sweeps and plays them back 10× faster.",
    short: "Real-time audio synthesis in C, 200,000 samples a second.",
    cta: "play it in your browser",
    ctaShort: "play it",
    img: "/images/birdsong/build.jpg",
    imgPos: "object-center",
    alt: "The birdsong synthesizer on a breadboard: a Raspberry Pi Pico 2 and DAC wired to a 12-key keypad, a slide potentiometer and speakers.",
  },
  {
    href: "/projects/pi-robot",
    refdes: "U2",
    title: "Raspberry Pi Robot",
    course: "ECE 5725 · Python · Raspberry Pi",
    blurb:
      "Power it on, press START, and it drives itself until you hit the red button. It boots into a touchscreen control panel I wrote in pygame, and a panic stop can pause its test pattern mid-move.",
    short: "Boots into a touchscreen control panel and drives itself.",
    cta: "drive it in your browser",
    ctaShort: "drive it",
    img: "/images/pi-robot/robot.jpg",
    imgPos: "object-[50%_35%]",
    alt: "The robot from above: a Raspberry Pi with a touchscreen showing the control panel, two wheels, and a breadboard with the motor driver.",
  },
];

// Whole days to the grand opening, counted in Eastern time like bbqlandma.com
// does. Worked out after mount so the static HTML doesn't
// freeze the build day's count.
export function OpeningCountdown() {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
    const days = Math.round((Date.parse("2026-11-16") - Date.parse(today)) / 86400000);
    setText(
      days > 1 ? `${days} days to grand opening`
      : days === 1 ? "grand opening tomorrow"
      : days === 0 ? "grand opening today!"
      : "now open",
    );
  }, []);
  if (!text) return null;
  return <span className="text-pink-ink">{text}</span>;
}

// SUAS 2026, one line per day. Every entry is from the /suas-2026 page.
const flightLog: [string, string][] = [
  ["MON", "Safety inspection. Passed on the first try, at 34.9 lb."],
  ["TUE", "Our first autonomous takeoff at a competition: 4 laps at 96 mph. Then the tail came off."],
  ["WED", "Setup in 3:00, our record. Then it tipped onto a prop on auto-takeoff."],
  ["THU", "Awards: 4th for website, 11th for design report, 38th in the mission."],
];

// SUAS 2026: a thin banner across the whole page, with a plane towing a flag
// from left to right along the top.
export function SuasBanner() {
  return (
    <Reveal>
      <section aria-labelledby="suas-banner" className="relative my-14 py-5">
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-y-2.5 bg-pink" />
          <div className="surface-dark relative border-y-[1.5px] border-line text-cream">
            <PlaneBanner flag="CUAir · SUAS 2026" />
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-7 lg:grid-cols-[1fr_1.9fr] lg:items-start">
              <div>
                <div className="font-mono text-[14px] opacity-80">Skyway Range, Tulsa · Sep 14–17, 2026</div>
                <h2 id="suas-banner" className="display mt-2 text-3xl sm:text-4xl">
                  On the flightline at SUAS 2026
                </h2>
                <p className="mt-3 max-w-[48ch] font-sans text-[16px] leading-relaxed opacity-90">
                  I was CUAir&apos;s Intelligence operator, the one person running our imaging
                  pipeline during live missions. It didn&apos;t all go well.
                </p>
                <Link
                  href="/suas-2026"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border-[1.5px] border-cream px-4 py-2 font-mono text-sm hover:bg-cream hover:text-ink transition-colors"
                >
                  the whole week →
                </Link>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 font-sans text-[15px] leading-snug sm:grid-cols-4">
                {flightLog.map(([day, entry]) => (
                  <div key={day} className="border-t border-cream/20 pt-3">
                    <dt className="font-mono text-[14px] tracking-widest text-pink">{day}</dt>
                    <dd className="mt-1.5 opacity-90">{entry}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

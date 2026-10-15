"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TerminalView from "@/components/terminal/TerminalView";
import TerminalTitleBar from "@/components/terminal/TerminalTitleBar";
import { BirdIcon, Bubble, CameraIcon, Float, SatelliteIcon } from "@/components/HeroLinks";
import { FlyingPlane, GrillScene } from "@/components/Illustrations";
import FeaturedProject from "@/components/FeaturedProject";
import Reveal from "@/components/Reveal";
import { featuredProjects, visibleProjects } from "@/data/projects";
import { contact } from "@/data/siteMap";

const proudest = featuredProjects.find((p) => p.slug === "mini-plane-system") ?? featuredProjects[0];
const otherFeatured = featuredProjects.filter((p) => p !== proudest);
const featuredTags: Record<string, string> = {
  "automated-analytics": "shipped to prod",
};

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-5 pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-x-clip">
        {/* circular photo */}
        <div className="absolute top-16 right-6 sm:top-24 sm:right-24 md:top-32 md:right-48 lg:top-36 lg:right-56 z-10">
          <motion.a
            href="/about"
            aria-label="About Sandra"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="block relative w-[110px] sm:w-[150px] md:w-[180px] lg:w-[200px]"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-accent"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-[1.5px] border-line bg-cream-2 shadow-[3px_3px_0_0_var(--line)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/seniorPic.jpg"
                alt="Sandra Tang"
                className="absolute inset-0 w-full h-full object-cover scale-[1.3]"
                style={{ objectPosition: "55% -35%" }}
              />
            </div>
          </motion.a>
        </div>

        {/* big rotating music note bubble → music page */}
        <motion.div
          className="absolute -top-4 right-4 md:top-8 md:right-6 lg:right-10 hidden md:block z-10"
          animate={{ rotate: [0, 8, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bubble href="/music" label="my music" shadow="bg-pink" size="h-24 w-24 lg:h-28 lg:w-28">
            <span className="font-retro text-[38px] lg:text-[44px] leading-none">♪</span>
          </Bubble>
        </motion.div>

        {/* camera → Mini Plane System */}
        <Float className="absolute hidden md:block z-10 md:top-[290px] md:right-[76px] lg:top-[312px] lg:right-[108px]" delay={1.2}>
          <Bubble href="/projects/mini-plane-system" label="mini plane system" shadow="bg-accent" size="h-[72px] w-[72px] lg:h-[88px] lg:w-[88px]" round>
            <CameraIcon className="h-9 w-9 lg:h-11 lg:w-11" />
          </Bubble>
        </Float>

        {/* bird → Birdsong Synthesizer */}
        <Float className="absolute hidden md:block z-10 md:top-[414px] md:right-12 lg:top-[468px] lg:right-[100px]" delay={0.6}>
          <Bubble href="/projects/birdsong-synthesizer" label="birdsong synthesizer" shadow="bg-pink" size="h-14 w-14 lg:h-16 lg:w-16" round>
            <BirdIcon className="h-7 w-7 lg:h-8 lg:w-8" />
          </Bubble>
        </Float>

        {/* satellite → Amazon Leo analytics platform */}
        <Float className="absolute hidden md:block z-10 md:top-[535px] md:right-[130px] lg:top-[600px] lg:right-[190px]" delay={1.8}>
          <Bubble href="/projects/automated-analytics" label="satellite analytics" shadow="bg-accent-3" size="h-[68px] w-[68px] lg:h-20 lg:w-20" round>
            <SatelliteIcon className="h-8 w-8 lg:h-10 lg:w-10" />
          </Bubble>
        </Float>

        <div className="md:pr-[400px] lg:pr-[440px]">
          <h1 className="arrive display text-[58px] sm:text-[88px] md:text-[112px]">
            sandra
            <br />
            <span className="text-accent">tang</span>
          </h1>

          <p className="arrive arrive-2 mt-6 max-w-xl font-sans text-[20px] leading-snug text-ink-soft">
            CS @ Cornell Engineering · Class of 2028.
          </p>

          <div className="arrive arrive-3 mt-8 max-w-2xl">
            <div className="mb-2 font-mono text-[14px] text-muted">
              this terminal is real, type in it ↓
            </div>
            <div className="window terminal-window">
              <TerminalTitleBar />
              <TerminalView heightClass="h-[230px]" />
            </div>
          </div>

          <div className="arrive arrive-3 mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="arrow-link text-sm font-mono">
              see my projects
            </Link>
            <Link href="/about" className="arrow-link text-sm font-mono">
              about me
            </Link>
            <Link href="/music" className="arrow-link text-sm font-mono">
              my music <span aria-hidden>♪</span>
            </Link>
          </div>

          {/* phones: the right-side bubbles don't fit, so show them inline */}
          <div className="mt-10 flex items-center gap-5 md:hidden">
            <Bubble href="/projects/mini-plane-system" label="mini plane system" shadow="bg-accent" size="h-14 w-14" round>
              <CameraIcon className="h-7 w-7" />
            </Bubble>
            <Bubble href="/projects/automated-analytics" label="satellite analytics" shadow="bg-accent-3" size="h-14 w-14" round>
              <SatelliteIcon className="h-7 w-7" />
            </Bubble>
            <Bubble href="/projects/birdsong-synthesizer" label="birdsong synthesizer" shadow="bg-pink" size="h-12 w-12" round>
              <BirdIcon className="h-6 w-6" />
            </Bubble>
          </div>
        </div>
      </section>

      {/* PROJECTS: each on its own card, divided by lines, with a tag saying why
          it's here. */}
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

      {/* SUAS: dark panel, with a plane flying laps behind the text */}
      <Reveal>
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <h2 className="display text-3xl sm:text-4xl mb-8">
          On the flightline at SUAS 2026
        </h2>
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-pink" />
          <div className="surface-dark relative overflow-hidden rounded-2xl border-[1.5px] border-line text-cream">
            <FlyingPlane className="absolute inset-0 h-full w-full" />
            <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-10 p-6 sm:p-10">
              <div>
                <p className="font-display text-2xl sm:text-3xl leading-tight">
                  I was CUAir&apos;s Intelligence operator, the one person running our imaging
                  pipeline during live missions.
                </p>
                <p className="mt-4 max-w-[60ch] font-sans text-[17px] leading-relaxed opacity-90">
                  Bring-up, launch, watching every photo land on the ground over the radio link,
                  and stepping in when something stalled. It didn&apos;t all go well.
                </p>
                <Link
                  href="/suas-2026"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border-[1.5px] border-cream px-4 py-2 font-mono text-sm hover:bg-cream hover:text-ink transition-colors"
                >
                  the whole week →
                </Link>
              </div>
              <dl className="font-sans text-[16px] leading-relaxed">
                <div className="mb-3 font-mono text-[14px] opacity-80">
                  Skyway Range, Tulsa · Sep 14–17, 2026
                </div>
                {flightLog.map(([day, entry]) => (
                  <div key={day} className="grid grid-cols-[56px_1fr] gap-3 py-3 border-t border-cream/15">
                    <dt className="font-mono text-pink tracking-widest text-[14px] pt-0.5">{day}</dt>
                    <dd className="opacity-90">{entry}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* MORE PROJECTS, as a directory listing */}
      <Reveal>
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <p className="font-mono text-[15px] sm:text-[17px]">
          <span className="text-pink-ink">sandra@cornell</span>:
          <span className="text-accent">~</span>$ ls -l projects/
        </p>
        <div className="mt-4 font-mono text-[14px]">
          {visibleProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group grid sm:grid-cols-[100px_150px_250px_1fr] gap-x-5 py-2.5 border-b border-line/15 hover:bg-cream-2"
            >
              <span className="hidden sm:block text-muted">drwxr-xr-x</span>
              <span className="text-muted order-2 sm:order-none">{p.year}</span>
              <span className="text-accent group-hover:underline underline-offset-2 truncate">{p.slug}/</span>
              <span className="hidden sm:block text-ink-soft truncate">{p.subtitle}</span>
            </Link>
          ))}
        </div>
      </section>
      </Reveal>

      {/* SMALL ABOUT TEASER */}
      <Reveal>
      <section className="mx-auto max-w-6xl px-5 mt-28">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <dl className="md:col-span-2 border-t-[1.5px] border-line font-mono text-[14px] leading-relaxed">
            {[
              ["Name", "Sandra Tang"],
              ["School", "Cornell Engineering"],
              ["Major", "Computer Science"],
              ["Class", "2028"],
              ["Likes", "CS, embedded systems, piano + violin duets"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[76px_1fr] gap-3 py-2.5 border-b border-line/15">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="md:col-span-3">
            <h2 className="display text-3xl sm:text-4xl mb-4">
              Hi, I&apos;m Sandra
            </h2>
            <p className="prose-text text-ink-soft">
              I study computer science at Cornell Engineering. On the side, I lead CUAir&apos;s
              Intelligence subteam, which owns the{" "}
              <Link
                href="/projects/mini-plane-system"
                className="underline decoration-pink underline-offset-2 hover:text-accent"
              >
                onboard imaging pipeline
              </Link>{" "}
              that ties a GoPro and a flight controller together. This semester I&apos;m also in
              ECE 4760 and 5725, so a lot of my week is breadboards and an oscilloscope. Outside
              of code I play piano and violin, and write duets where I play both parts.
            </p>
            <div className="mt-5">
              <Link href="/about" className="arrow-link text-sm font-mono">
                more about me
              </Link>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* CONTACT: same thing `cat contact.txt` prints */}
      <Reveal>
      <section id="contact" className="mx-auto max-w-6xl px-5 mt-28 scroll-mt-24">
        <h2 className="display text-4xl sm:text-6xl">Let&apos;s talk</h2>
        <p className="mt-4 prose-text text-ink-soft">
          For an internship, a project, or just to talk about music:
        </p>
        <dl className="mt-6 font-mono text-[15px] sm:text-[18px] leading-loose">
          {[
            { k: "email", v: contact.email, href: `mailto:${contact.email}` },
            { k: "phone", v: contact.phone, href: contact.phoneHref },
            { k: "linkedin", v: contact.linkedinLabel, href: contact.linkedin, external: true },
            { k: "github", v: "github.com/mcorgi", href: contact.github, external: true },
          ].map((c) => (
            <div key={c.k} className="grid grid-cols-[84px_1fr] sm:grid-cols-[120px_1fr]">
              <dt className="text-muted">{c.k}</dt>
              <dd className="min-w-0 [overflow-wrap:anywhere]">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer noopener" : undefined}
                  className="underline decoration-pink decoration-2 underline-offset-4 hover:text-accent"
                >
                  {c.v}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-sans text-[15px] text-muted">
          (Or type <span className="font-mono text-accent">cat contact.txt</span> in the terminal up top.
          Same thing.)
        </p>
      </section>
      </Reveal>
    </div>
  );
}

// The two class labs in the shared Embedded projects box on the home page.
const embedded = [
  {
    href: "/projects/birdsong-synthesizer",
    refdes: "U1",
    title: "Birdsong Synthesizer",
    course: "ECE 4760 · C · RP2350",
    blurb:
      "A synthesizer that sounds like a northern cardinal. A timer interrupt computes every audio sample at 200 kHz, in 3.04 µs out of a 5 µs budget, and a keypad records slow slider sweeps and plays them back 10× faster.",
    cta: "play it in your browser",
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
    cta: "drive it in your browser",
    img: "/images/pi-robot/robot.jpg",
    imgPos: "object-[50%_35%]",
    alt: "The robot from above: a Raspberry Pi with a touchscreen showing the control panel, two wheels, and a breadboard with the motor driver.",
  },
];

// The Embedded projects box is drawn as a circuit board: green solder mask,
// gold traces and mounting holes, white silkscreen.
const GOLD = "#d9b45a";
const BOARD = "#0e5c45";
const TOP = 3; // the two trace tracks in an edge strip, in px from its top
const BOTTOM = 11;

function MountingHole({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-5 w-5 rounded-full border-[3px] border-[#d9b45a] bg-[#062c21] ${className}`} />;
}

function Via({ y }: { y: number }) {
  return (
    <svg width={8} height={14} className="shrink-0">
      <line x1={4} x2={8} y1={y} y2={y} stroke={GOLD} strokeWidth={2} />
      <circle cx={4} cy={y} r={3.2} fill={BOARD} stroke={GOLD} strokeWidth={1.8} />
    </svg>
  );
}

function Trace({ y, grow }: { y: number; grow: number }) {
  return (
    <span
      className="h-[2px] min-w-2"
      style={{
        flex: `${grow} 1 0`,
        background: GOLD,
        alignSelf: y === TOP ? "flex-start" : "flex-end",
        margin: y === TOP ? "2px 0 0" : "0 0 2px",
      }}
    />
  );
}

// Via, trace, a 45° jog to the other track, trace, via.
function TraceRun({ from, reverse = false }: { from: number; reverse?: boolean }) {
  const to = from === TOP ? BOTTOM : TOP;
  return (
    <span className={`flex h-[14px] min-w-0 flex-1 ${reverse ? "-scale-x-100" : ""}`}>
      <Via y={from} />
      <Trace y={from} grow={2} />
      <svg width={8} height={14} className="shrink-0">
        <path d={`M0 ${from} L8 ${to}`} stroke={GOLD} strokeWidth={2} fill="none" />
      </svg>
      <Trace y={to} grow={3} />
      <Via y={to} />
    </span>
  );
}

// A strip along the top or bottom edge of the board: traces either side of a silkscreen label.
function PcbEdge({ label, flip = false }: { label: string; flip?: boolean }) {
  const from = flip ? BOTTOM : TOP;
  return (
    <div aria-hidden className="flex h-10 items-center gap-3 px-7 font-mono text-[11px] sm:text-[12px] tracking-[0.2em] text-[#f4f1e6]/85">
      <TraceRun from={from} />
      <span className="shrink-0 whitespace-nowrap">{label}</span>
      <TraceRun from={from} reverse />
    </div>
  );
}

function ChipIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className={className}>
      <g stroke="var(--line)" strokeWidth={1.5}>
        {[13, 18, 23].map((v) => (
          <g key={v}>
            <line x1={3} x2={8} y1={v} y2={v} />
            <line x1={28} x2={33} y1={v} y2={v} />
            <line y1={3} y2={8} x1={v} x2={v} />
            <line y1={28} y2={33} x1={v} x2={v} />
          </g>
        ))}
        <rect x={8} y={8} width={20} height={20} rx={2} fill="currentColor" />
      </g>
      <circle cx={12.5} cy={12.5} r={1.6} fill="var(--line)" />
    </svg>
  );
}

// Whole days to the grand opening, counted in Eastern time like bbqlandma.com
// does. Worked out after mount so the static HTML doesn't
// freeze the build day's count.
function OpeningCountdown() {
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
  ["TUE", "Flight 1. Hooking up the pipeline and autopilot pushed takeoff to T+7. Then our first autonomous takeoff at a competition: 4 laps, almost 950 ft, 96 mph. Then the tail came off."],
  ["WED", "Flight 2. Setup in 3:00, our record. Tipped onto the front-left prop on auto-takeoff: a taped XT60 under the wing had come loose."],
  ["THU", "Awards. 4th for website, 11th for design report, 38th in the mission."],
];

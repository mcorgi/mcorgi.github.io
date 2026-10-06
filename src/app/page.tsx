"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TerminalView from "@/components/terminal/TerminalView";
import { BirdIcon, Bubble, CameraIcon, Float, SatelliteIcon } from "@/components/HeroLinks";
import { FlyingPlane } from "@/components/Illustrations";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProjects, visibleProjects } from "@/data/projects";
import { contact } from "@/data/siteMap";

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
          <h1 className="display text-[58px] sm:text-[88px] md:text-[112px]">
            sandra
            <br />
            <span className="text-accent">tang.</span>
          </h1>

          <p className="mt-6 max-w-xl font-mono text-[15px] leading-relaxed text-ink-soft">
            CS @ Cornell Engineering · Class of 2028.
          </p>

          <div className="mt-8 max-w-2xl">
            <div className="mb-2 font-mono text-[12px] opacity-60">
              this terminal is real, type in it ↓
            </div>
            <div className="window scanlines">
              <TerminalView heightClass="h-[230px]" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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

      {/* FEATURED PROJECT */}
      <section className="mx-auto max-w-6xl px-5 mt-8">
        <h2 className="display text-3xl sm:text-4xl mb-6">
          What I&apos;m most proud of.
        </h2>

        <div className="space-y-16">
          {featuredProjects.map((fp) => (
            <FeaturedProject key={fp.slug} project={fp} />
          ))}
        </div>
      </section>

      {/* SUAS: dark panel, with a plane flying laps behind the text */}
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <h2 className="display text-3xl sm:text-4xl mb-8">
          On the flightline at SUAS 2026.
        </h2>
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-pink" />
          <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-line text-cream" style={{ background: "var(--ink)" }}>
            <FlyingPlane className="absolute inset-0 h-full w-full" />
            <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-10 p-6 sm:p-10">
              <div>
                <p className="font-display text-2xl sm:text-3xl leading-tight">
                  I was CUAir&apos;s Intelligence operator, the one person running our imaging
                  pipeline during live missions.
                </p>
                <p className="mt-4 max-w-xl font-mono text-[13.5px] leading-relaxed opacity-80">
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
              <dl className="font-mono text-[13px] leading-relaxed">
                <div className="mb-3 text-[11px] uppercase tracking-[0.2em] opacity-60">
                  Skyway Range, Tulsa · Sep 14–17, 2026
                </div>
                {flightLog.map(([day, entry]) => (
                  <div key={day} className="grid grid-cols-[52px_1fr] gap-3 py-2.5 border-t border-cream/15">
                    <dt className="text-pink tracking-widest text-[11.5px] pt-0.5">{day}</dt>
                    <dd className="opacity-90">{entry}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* MORE PROJECTS, as a directory listing */}
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <p className="font-mono text-[15px] sm:text-[17px]">
          <span className="text-pink-ink">sandra@cornell</span>:
          <span className="text-accent">~</span>$ ls -l projects/
        </p>
        <div className="mt-4 font-mono text-[13px] sm:text-[13.5px]">
          {visibleProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group grid sm:grid-cols-[96px_150px_250px_1fr] gap-x-5 py-2 border-b border-line/15 hover:bg-cream-2"
            >
              <span className="hidden sm:block opacity-40">drwxr-xr-x</span>
              <span className="opacity-60 order-2 sm:order-none text-[12px] sm:text-[13px]">{p.year}</span>
              <span className="text-accent group-hover:underline underline-offset-2 truncate">{p.slug}/</span>
              <span className="hidden sm:block text-ink-soft truncate">{p.subtitle}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SMALL ABOUT TEASER */}
      <section className="mx-auto max-w-6xl px-5 mt-28">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <dl className="md:col-span-2 border-t-[1.5px] border-line font-mono text-[13px] leading-relaxed">
            {[
              ["Name", "Sandra Tang"],
              ["School", "Cornell Engineering"],
              ["Major", "Computer Science"],
              ["Class", "2028"],
              ["Likes", "CS, embedded systems, piano + violin duets"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[72px_1fr] gap-3 py-2 border-b border-line/15">
                <dt className="opacity-55">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="md:col-span-3">
            <h2 className="display text-3xl sm:text-4xl mb-4">
              Hi, I&apos;m Sandra.
            </h2>
            <p className="font-mono text-[15px] leading-relaxed text-ink-soft">
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
              <Link href="/about" className="arrow-link text-xs font-mono">
                more about me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT: same thing `cat contact.txt` prints */}
      <section id="contact" className="mx-auto max-w-6xl px-5 mt-28 scroll-mt-24">
        <h2 className="display text-4xl sm:text-6xl">Let&apos;s talk<span className="text-pink">.</span></h2>
        <p className="mt-4 max-w-2xl font-mono text-[15px] leading-relaxed text-ink-soft">
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
              <dt className="opacity-50">{c.k}</dt>
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
        <p className="mt-6 font-mono text-[12.5px] opacity-60">
          (Or type <span className="text-accent">cat contact.txt</span> in the terminal up top.
          Same thing.)
        </p>
      </section>
    </div>
  );
}

// SUAS 2026, one line per day. Every entry is from the /suas-2026 page.
const flightLog: [string, string][] = [
  ["MON", "Safety inspection. Passed on the first try, at 34.9 lb."],
  ["TUE", "Flight 1. Hooking up the pipeline and autopilot pushed takeoff to T+7. Then our first autonomous takeoff at a competition: 4 laps, almost 950 ft, 96 mph. Then the tail came off."],
  ["WED", "Flight 2. Setup in 3:00, our record. Tipped onto the front-left prop on auto-takeoff: a taped XT60 under the wing had come loose."],
  ["THU", "Awards. 4th for website, 11th for design report, 38th in the mission."],
];

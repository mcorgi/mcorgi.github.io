"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TerminalView from "@/components/terminal/TerminalView";
import { Bubble, CameraIcon, Float, SatelliteIcon } from "@/components/HeroLinks";
import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProjects, otherProjects } from "@/data/projects";
import { contact } from "@/data/siteMap";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-6xl px-5 pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-x-clip"
      >
        {/* circular photo */}
        <motion.div
          className="absolute top-16 right-6 sm:top-24 sm:right-24 md:top-32 md:right-48 lg:top-36 lg:right-56 z-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
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
        </motion.div>

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

        {/* small curly-braces CS decoration */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute hidden md:block md:top-[330px] md:right-20 lg:top-[360px] lg:right-28"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-accent-2" />
            <div className="relative h-16 w-16 lg:h-20 lg:w-20 rounded-2xl border-[1.5px] border-line bg-cream-2 flex items-center justify-center">
              <span className="font-retro text-[28px] lg:text-[34px] leading-none">
                {"{ }"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* camera → Mini Plane System */}
        <Float className="absolute hidden md:block z-10 md:top-[430px] md:right-10 lg:top-[485px] lg:right-[88px]" delay={1.2}>
          <Bubble href="/projects/mini-plane-system" label="mini plane system" shadow="bg-accent" size="h-[72px] w-[72px] lg:h-[88px] lg:w-[88px]" round>
            <CameraIcon className="h-9 w-9 lg:h-11 lg:w-11" />
          </Bubble>
        </Float>

        {/* satellite → Amazon Leo analytics platform */}
        <Float className="absolute hidden md:block z-10 md:top-[535px] md:right-[130px] lg:top-[600px] lg:right-[190px]" delay={1.8}>
          <Bubble href="/projects/automated-analytics" label="satellite analytics" shadow="bg-accent-3" size="h-[68px] w-[68px] lg:h-20 lg:w-20" round>
            <SatelliteIcon className="h-8 w-8 lg:h-10 lg:w-10" />
          </Bubble>
        </Float>

        <motion.div
          style={{ y, opacity }}
          className="md:pr-[400px] lg:pr-[440px]"
        >
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em]">
            <span className="inline-block w-6 h-px bg-line" />
            <span>personal site · v1.0</span>
          </div>

          <h1 className="display text-[58px] sm:text-[88px] md:text-[112px]">
            sandra
            <br />
            <span className="text-accent">tang.</span>
          </h1>

          <p className="mt-6 max-w-xl font-mono text-[15px] leading-relaxed text-ink-soft">
            cs @ cornell engineering · class of 2028.
          </p>

          <div className="mt-8 max-w-2xl">
            <Window title="terminal — sandra@cornell (it's real, type in it)" scanlines>
              <TerminalView heightClass="h-[230px]" />
            </Window>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="arrow-link text-sm font-mono">
              see my projects <span aria-hidden>↗</span>
            </Link>
            <Link href="/about" className="arrow-link text-sm font-mono">
              about me <span aria-hidden>↗</span>
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
          </div>
        </motion.div>
      </section>

      <Marquee
        items={[
          "Computer Science",
          "Cornell University",
          "Violin",
          "Piano",
          "Building Things",
          "Class of 2028",
          "Design",
          "Music",
        ]}
      />

      {/* QUICK LINKS */}
      <section className="mx-auto max-w-6xl px-5 mt-20">
        <Reveal>
          <div className="flex items-end justify-between mb-6">
            <h2 className="display text-3xl sm:text-4xl">quick links</h2>
            <span className="font-mono text-xs opacity-60 hidden sm:block">
              jump in →
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/projects", label: "Projects", sub: "things I built" },
            { href: "/about", label: "About", sub: "who I am" },
            { href: "/music", label: "Music", sub: "piano + violin" },
            { href: "/resume", label: "Resume", sub: "the formal one" },
          ].map((q, i) => (
            <Reveal key={q.href} delay={i * 0.05}>
              <Link href={q.href} className="block">
                <motion.div
                  whileHover={{ y: -4, x: -4 }}
                  className="relative window-soft p-5 transition-shadow hover:shadow-[8px_8px_0_0_var(--line)]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-display text-xl">{q.label}</div>
                      <div className="font-mono text-[11px] opacity-60 mt-1">
                        {q.sub}
                      </div>
                    </div>
                    <span aria-hidden className="text-xl">
                      ↗
                    </span>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <Reveal>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                /featured · my biggest projects
              </div>
              <h2 className="display text-3xl sm:text-4xl">
                what i&apos;m most proud of.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="space-y-12">
          {featuredProjects.map((fp) => (
            <FeaturedProject key={fp.slug} project={fp} />
          ))}
        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
            /highlight · beyond the code
          </div>
          <h2 className="display text-3xl sm:text-4xl mb-6">
            on the flightline at SUAS 2026.
          </h2>
        </Reveal>
        <Reveal>
          <Link href="/suas-2026" className="group relative block">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-[14px] bg-pink transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"
            />
            <div className="relative window text-cream" style={{ background: "var(--ink)" }}>
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-3">
                    Student Unmanned Aerial Systems competition · CUAir
                  </div>
                  <p className="font-display text-2xl sm:text-3xl leading-tight">
                    I was CUAir&apos;s Intelligence operator, the one person running our
                    imaging pipeline during live missions.
                  </p>
                  <p className="mt-4 max-w-2xl font-mono text-[13.5px] leading-relaxed opacity-80">
                    Bring-up, launch, watching every photo land on the ground over the radio
                    link, and stepping in when something stalled.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 self-start md:self-center rounded-lg border-[1.5px] border-cream px-4 py-2 font-mono text-sm group-hover:bg-cream group-hover:text-ink transition-colors">
                  read the story →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* MORE PROJECTS */}
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <Reveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
                /also built
              </div>
              <h2 className="display text-3xl sm:text-4xl">more projects.</h2>
            </div>
            <Link
              href="/projects"
              className="arrow-link text-xs font-mono hidden sm:inline-flex"
            >
              all projects ↗
            </Link>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-7 [&>*]:min-w-0">
          {otherProjects.slice(0, 4).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link href="/projects" className="arrow-link text-xs font-mono">
            all projects ↗
          </Link>
        </div>
      </section>

      {/* SMALL ABOUT TEASER */}
      <section className="mx-auto max-w-6xl px-5 mt-28">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <Reveal className="md:col-span-2" x={-30} y={0}>
            <Window title="about.txt">
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <p>
                  <span className="opacity-60"># name:</span> sandra tang
                </p>
                <p>
                  <span className="opacity-60"># school:</span> cornell
                  engineering
                </p>
                <p>
                  <span className="opacity-60"># major:</span> computer science
                </p>
                <p>
                  <span className="opacity-60"># class:</span> 2028
                </p>
                <p>
                  <span className="opacity-60"># likes:</span> cs, embedded
                  systems, piano + violin duets
                </p>
              </div>
            </Window>
          </Reveal>

          <Reveal className="md:col-span-3" x={30} y={0}>
            <h2 className="display text-3xl sm:text-4xl mb-4">
              hi, i&apos;m sandra.
            </h2>
            <p className="font-mono text-[15px] leading-relaxed text-ink-soft">
              i study computer science at cornell university engineering. on the
              side, i lead cuair&apos;s intelligence subteam, which owns the{" "}
              <Link
                href="/projects/mini-plane-system"
                className="underline decoration-pink underline-offset-2 hover:text-accent"
              >
                onboard imaging pipeline
              </Link>{" "}
              that ties a GoPro and a flight controller together. outside of code, i play piano and violin (mostly duets),
              and i&apos;m always trying to learn something new.
            </p>
            <div className="mt-5">
              <Link href="/about" className="arrow-link text-xs font-mono">
                more about me ↗
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-5 mt-28 scroll-mt-24">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            /contact
          </div>
          <h2 className="display text-4xl sm:text-6xl">let&apos;s talk<span className="text-pink">.</span></h2>
          <p className="mt-4 max-w-2xl font-mono text-[15px] leading-relaxed text-ink-soft">
            whether it&apos;s an internship, a project, or a duet, i&apos;d love to hear from
            you. reach me any of these ways.
          </p>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            { k: "email", v: contact.email, href: `mailto:${contact.email}`, cta: "send an email" },
            { k: "phone", v: contact.phone, href: contact.phoneHref, cta: "call or text" },
            { k: "linkedin", v: "in/sandra-tang", href: contact.linkedin, cta: "connect", external: true },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.06}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer noopener" : undefined}
                className="group relative block h-full"
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 translate-x-2 translate-y-2 rounded-[14px] ${i === 1 ? "bg-pink" : "bg-accent"} transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3`}
                />
                <div className="relative window h-full p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">{c.k}</div>
                  <div className="mt-3 font-display text-xl lg:text-2xl [overflow-wrap:anywhere] group-hover:text-accent transition-colors">
                    {c.v}
                  </div>
                  <div className={`mt-5 font-mono text-[13px] ${i === 1 ? "text-pink-ink" : "text-accent"}`}>{c.cta} →</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

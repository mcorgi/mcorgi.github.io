"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Typewriter from "@/components/Typewriter";
import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProject, otherProjects } from "@/data/projects";

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
        className="relative mx-auto max-w-6xl px-5 pt-14 pb-20 sm:pt-20 sm:pb-28"
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

        {/* big rotating music note bubble */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-4 right-4 md:top-8 md:right-6 lg:right-10 hidden md:block"
          animate={{ rotate: [0, 8, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-accent" />
            <div className="relative h-24 w-24 lg:h-28 lg:w-28 rounded-2xl border-[1.5px] border-line bg-cream-2 flex items-center justify-center">
              <span className="font-retro text-[38px] lg:text-[44px] leading-none">
                ♪
              </span>
            </div>
          </div>
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
            <Window title="terminal — welcome.sh" scanlines>
              <div className="p-5 font-mono text-[15px] leading-relaxed">
                <div className="opacity-60">
                  <span className="text-accent-2">sandra@cornell</span>:
                  <span className="text-accent">~</span>$ ./welcome.sh
                </div>
                <div className="mt-2">
                  <Typewriter
                    text="welcome to my personal website!"
                    speed={55}
                  />
                </div>
              </div>
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
                /featured · my biggest project
              </div>
              <h2 className="display text-3xl sm:text-4xl">
                what i&apos;m most proud of.
              </h2>
            </div>
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="arrow-link text-xs font-mono hidden sm:inline-flex"
            >
              full case study ↗
            </Link>
          </div>
        </Reveal>

        <FeaturedProject project={featuredProject} />
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

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
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
                className="underline decoration-accent underline-offset-2 hover:text-accent"
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
    </div>
  );
}

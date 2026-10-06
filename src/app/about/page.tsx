"use client";

import Reveal from "@/components/Reveal";
import Link from "next/link";

const facts = [
  { k: "Name", v: "Sandra Tang" },
  { k: "School", v: "Cornell University, College of Engineering" },
  { k: "Major", v: "B.S. Computer Science" },
  { k: "Class", v: "2028" },
  { k: "Based in", v: "Boston, MA · Ithaca, NY" },
  { k: "Email", v: "st2232@cornell.edu", href: "mailto:st2232@cornell.edu" },
  { k: "Likes", v: "Small UIs, embedded systems, duets" },
];

const nowList = [
  "Leading the Intelligence subteam at CUAir (Cornell UAS)",
  "Freelance web dev for Hao Shi Guang Restaurant",
  "Taking embedded systems courses (ECE 4760 and ECE 5725)",
  "Writing violin and piano duets, and recording both parts myself",
];

const skills = [
  {
    title: "Languages",
    items: ["Java", "TypeScript", "Python", "C", "C++", "Rust", "JavaScript", "SQL", "OCaml", "HTML/CSS"],
  },
  {
    title: "Systems",
    items: ["Embedded Linux", "MAVLink", "Pixhawk", "Bash/Shell", "Git", "Docker", "AWS (CDK, Lambda, Step Functions, SNS, S3, DynamoDB)"],
  },
  {
    title: "Tools",
    items: ["REST APIs", "React.js", "Node.js", "Flask", "Prisma", "MongoDB", "MySQL", "PyTorch", "OpenCV", "NumPy"],
  },
];

const link = "underline decoration-pink underline-offset-2 hover:text-accent";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-14 pb-24">
      <h1 className="display text-5xl sm:text-7xl">
        Hi, I&apos;m <span className="text-accent">Sandra</span>.
      </h1>

      <div className="mt-10 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3 space-y-5 font-mono text-[15px] leading-relaxed">
          <p>
            I&apos;m a computer science major at Cornell Engineering, class of 2028. I grew up
            between keyboards: a piano one since I was little, and a laptop one not long after.
          </p>
          <p>
            The CS I like best ends up touching something physical: a camera, a flight
            controller, a speaker on a breadboard. My biggest project right now is the{" "}
            <Link href="/projects/mini-plane-system" className={link}>
              Mini Plane System
            </Link>{" "}
            on Cornell&apos;s autonomous aircraft team, where I now lead the Intelligence
            subteam. It&apos;s onboard software that ties a GoPro and a flight controller together
            and streams geotagged photos to the ground during flight. I ran it live from the
            flightline at{" "}
            <Link href="/suas-2026" className={link}>
              SUAS 2026
            </Link>
            .
          </p>
          <p>
            This past summer I was a flight dynamics software developer intern at Amazon Leo,
            building a service that runs engineers&apos; analysis scripts on its own. I&apos;ve
            also been a backend engineering intern at Data Legion AI, a software engineer at
            Cornell Engineering World Health, and a freelance web developer for a family-owned
            restaurant. Earlier on, I did computer vision research and built a handwriting
            recognition system.
          </p>
          <p>
            Outside of code I play violin and piano. My favorite thing is making duets: I take a
            piece that usually has one melody, write a second part that sounds the way I want it
            to, and record both parts myself. I also like newspapers and slow walks across
            campus.
          </p>
          <p>
            If you want to talk about planes, synthesizers, or music,{" "}
            <Link href="/#contact" className={link}>
              say hi
            </Link>
            .
          </p>
        </div>

        <aside className="md:col-span-2 space-y-12">
          <dl className="border-t-[1.5px] border-line font-mono text-[13px] leading-relaxed">
            {facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[84px_1fr] gap-3 py-2 border-b border-line/15">
                <dt className="opacity-55">{f.k}</dt>
                <dd className="min-w-0 [overflow-wrap:anywhere]">
                  {f.href ? (
                    <a href={f.href} className={link}>
                      {f.v}
                    </a>
                  ) : (
                    f.v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl">Right now</h2>
              <span className="font-mono text-[11.5px] opacity-55">Fall 2026</span>
            </div>
            <ul className="mt-3 space-y-2 font-mono text-[13px] leading-relaxed">
              {nowList.map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="text-pink-ink">›</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Timeline */}
      <section className="mt-20">
        <Reveal>
          <h2 className="display text-3xl sm:text-4xl">How I got here.</h2>
        </Reveal>

        <div className="mt-8 relative pl-6 border-l-2 border-line">
          {[
            {
              when: "Aug 2024 — May 2028",
              role: "B.S. Computer Science",
              where: "Cornell University · College of Engineering",
              kind: "education",
              what: "Coursework: Systems Programming, Design with Embedded Operating Systems, Digital Systems Design Using Microcontrollers, Computer System Organization & Programming, Analysis of Algorithms, Object-Oriented Programming & Data Structures, Computer Vision, Machine Learning, Functional Programming.",
            },
            {
              when: "Jun — Aug 2026",
              role: "Flight Dynamics Software Developer Intern",
              where: "Amazon Leo · Redmond, WA",
              kind: "work",
              what: "Built and owned a service that runs engineers' analytics scripts automatically, on a schedule or when an upstream event lands, so work that had been triggered by hand now runs itself. Designed the serverless architecture in TypeScript CDK (Lambda, Step Functions, SNS, S3, DynamoDB) and wrote the Java handlers for triggering, running, and failure triage that routes a broken run to the script owner or the platform team. Gathered requirements directly from the engineers who use it, and shipped to production in a 12-week internship.",
              link: { href: "/projects/automated-analytics", label: "read the case study" },
            },
            {
              when: "2026",
              role: "Intelligence Operator — SUAS 2026",
              where: "Student Unmanned Aerial Systems competition",
              kind: "highlight",
              what: "Solely responsible for CUAir's imaging pipeline on the flightline during live missions.",
              link: { href: "/suas-2026", label: "read more" },
            },
            {
              when: "Feb 2025 — present",
              role: "Intelligence Subteam Lead (since Aug 2026)",
              where: "Cornell Unmanned Air Systems (CUAir)",
              kind: "work",
              what: "Lead a subteam of 15 engineers owning the onboard imaging and telemetry pipeline for an autonomous UAV end to end. It aligns 1,300+ GoPro images per 45-minute flight to their GPS and attitude samples within 125 ms, timestamping everything against one onboard clock, and runs on a Raspberry Pi bridged to the ground over a Ubiquiti Rocket and NanoStation link. Every change goes up a staged test ladder (bench, ground rig, test drone, competition aircraft), with a preflight check before each flight. I review the subteam's code, onboard new members each semester, and own the data interface with the Autopilot subteam.",
              link: { href: "/projects/mini-plane-system", label: "read the case study" },
            },
            {
              when: "Fall 2026",
              role: "Birdsong Synthesizer",
              where: "ECE 4760 · C · RP2350",
              kind: "project",
              what: "A birdsong synthesizer on an RP2350 in C, using direct digital synthesis in a 200 kHz timer interrupt, streamed over SPI to an MCP4822 12-bit DAC configured from its datasheet, with a debounced keypad state machine.",
              link: { href: "/projects/birdsong-synthesizer", label: "case study" },
            },
            {
              when: "Fall 2026",
              role: "Embedded Linux Touch Controller",
              where: "ECE 5725 · Python · Raspberry Pi",
              kind: "project",
              what: "GPIO-button and touchscreen controls on a Raspberry Pi 4 for video playback and a PyGame collision animation, replacing polling with interrupt callbacks and profiling both with Linux perf.",
            },
            {
              when: "Jun 2025 — present",
              role: "Freelance Web Developer",
              where: "Hao Shi Guang Restaurant · Boston, MA",
              kind: "work",
              what: "Sole developer of a live restaurant web app (15+ months): menus, MongoDB reservations, and Toast ordering.",
            },
            {
              when: "Fall 2025",
              role: "Camel Benchmark",
              where: "CS 3110 Final Project · OCaml",
              kind: "project",
              what: "Refactored a game module into a pure state machine, separating core logic from async I/O so it could be tested in isolation, then wrote tests for state transitions, input parsing, and edge cases to reach 100% Bisect coverage.",
              link: { href: "/projects/camel-benchmark", label: "case study" },
            },
            {
              when: "Aug 2025 — Nov 2025",
              role: "Backend Engineering Intern",
              where: "Data Legion AI · Ithaca, NY",
              kind: "work",
              what: "Designed and built backend services to ingest, process, rank, and serve large document collections through modular, multi-stage pipelines. Implemented APIs + storage workflows and containerized services for deterministic builds.",
            },
            {
              when: "Nov 2024 — May 2025",
              role: "Software Engineer",
              where: "Cornell Engineering World Health",
              kind: "work",
              what: "Developed backend logic supporting structured data delivery for a curriculum platform used in resource-constrained environments.",
            },
            {
              when: "Dec 2024",
              role: "Backend Lead — StudyCentral App",
              where: "Cornell AppDev Hack Challenge",
              kind: "project",
              what: "Designed and implemented REST APIs and containerized backend services for a study companion app, with reproducible dev/test/deploy workflows.",
              link: { href: "/projects/studycentral", label: "project page" },
            },
            {
              when: "Jun — Aug 2023",
              role: "Dynamic Stimuli Prediction Model (DSPM)",
              where: "NeurIPS 2023 Sensorium Competition",
              kind: "project",
              what: "Fine-tuned a Video Vision Transformer (ViViT) with 4-bit QLoRA to predict spiking activity in mouse V1 from natural video — work later published in NeurIPS 2024 Datasets & Benchmarks.",
              link: { href: "/projects/mice-video-classification", label: "case study" },
            },
            {
              when: "Jul 2023",
              role: "Handwriting Recognition Web App",
              where: "Tufts University · Boston, MA",
              kind: "project",
              what: "End-to-end handwriting recognition system combining numerical data processing, model inference, and API-based serving.",
              link: { href: "/projects/handwriting-recognition", label: "project page" },
            },
          ].map((row, i) => {
            const dotColor =
              row.kind === "education"
                ? "bg-accent-3"
                : row.kind === "highlight"
                ? "bg-pink"
                : row.kind === "work"
                  ? "bg-accent"
                  : "bg-accent-2";
            return (
              <Reveal key={i} delay={i * 0.04}>
                <div className="relative pl-4 py-5">
                  <span
                    className={`absolute -left-[31px] top-7 inline-block h-3 w-3 rounded-full border-2 border-line ${dotColor}`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest opacity-60">
                      {row.when}
                    </span>
                  </div>
                  <div className="mt-1.5 font-display text-lg leading-tight">
                    {row.role}
                  </div>
                  <div className="font-mono text-[12px] opacity-70 mt-0.5">
                    {row.where}
                  </div>
                  <div className="mt-2 font-mono text-[13.5px] leading-relaxed max-w-3xl">
                    {row.what}
                  </div>
                  {row.link && (
                    <Link
                      href={row.link.href}
                      className="mt-2 inline-block font-mono text-[12px] underline decoration-pink underline-offset-2 hover:text-accent"
                    >
                      {row.link.label} →
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Legend */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] opacity-70">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              work
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-3" />
              education
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-2" />
              project
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-pink" />
              highlight
            </span>
          </div>
        </Reveal>
      </section>

      {/* Skills, from the resume */}
      <section className="mt-20">
        <h2 className="display text-3xl sm:text-4xl">Stuff I work with.</h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-x-10 gap-y-8">
          {skills.map((g) => (
            <div key={g.title} className="border-t-[1.5px] border-line pt-3">
              <h3 className="font-mono text-[11px] uppercase tracking-widest opacity-60">{g.title}</h3>
              <ul className="mt-3 space-y-1 font-mono text-[13.5px] leading-relaxed">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

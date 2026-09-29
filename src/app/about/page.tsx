"use client";

import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import { motion } from "framer-motion";
import Link from "next/link";

const facts = [
  { k: "name", v: "Sandra Tang" },
  { k: "school", v: "Cornell University Engineering" },
  { k: "major", v: "B.S. Computer Science" },
  { k: "class", v: "2028" },
  { k: "based in", v: "Boston, MA · Ithaca, NY" },
  { k: "email", v: "st2232@cornell.edu" },
  { k: "likes", v: "small UIs, embedded systems, duets" },
];

const nowList = [
  "leading the intelligence subteam @ CUAir (Cornell UAS)",
  "freelance web dev for Hao Shi Guang Restaurant",
  "studying CS coursework at cornell engineering",
  "playing piano + violin (mostly duets w/ friends)",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-14 pb-24">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
          /about
        </div>
        <h1 className="display text-5xl sm:text-7xl">
          hi, i&apos;m <span className="text-accent">sandra</span>.
        </h1>
      </Reveal>

      <div className="mt-10 grid md:grid-cols-5 gap-8">
        <Reveal className="md:col-span-3" y={20}>
          <div className="space-y-5 font-mono text-[15px] leading-relaxed">
            <p>
              i&apos;m a computer science major at cornell university
              engineering, class of 2028. i grew up between keyboards
              — a piano keyboard since i was little, and a laptop keyboard
              not long after.
            </p>
            <p>
              i love the parts of CS that feel close to the real world —
              interfaces, tools, embedded systems, anything you can
              actually <em>use</em>. my biggest project right now is the{" "}
              <Link
                href="/projects/mini-plane-system"
                className="underline decoration-pink underline-offset-2 hover:text-accent"
              >
                mini plane system
              </Link>{" "}
              on cornell&apos;s autonomous aircraft team, where i now lead
              the intelligence subteam: onboard software that ties a GoPro
              and a flight controller together and streams geotagged imagery
              to the ground during flight. i ran it live from the flightline
              at{" "}
              <Link
                href="/suas-2026"
                className="underline decoration-pink underline-offset-2 hover:text-accent"
              >
                SUAS 2026
              </Link>
              .
            </p>
            <p>
              this past summer i was a flight dynamics software developer
              intern at amazon leo, building a service that runs
              astrodynamics engineers&apos; analytics scripts on its own. i&apos;ve
              also worked as a backend engineering intern at data legion ai, a software engineer at cornell engineering world
              health, and a freelance web developer for a family-owned
              restaurant. earlier on, i did computer vision research and
              built a handwriting recognition system.
            </p>
            <p>
              outside of code, i play violin and piano, mostly duets — there
              is something really special about a piece that needs two people
              to exist. i also like newspapers, slow walks across campus, and
              websites that have a little personality.
            </p>
            <p>
              if you&apos;re building something thoughtful, or want to play a
              duet, please{" "}
              <Link href="/resume" className="underline decoration-pink underline-offset-2">
                say hi
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" x={20}>
          <Window title="profile.cfg">
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[90px_1fr] gap-2 py-0.5">
                  <span className="opacity-60">{f.k}</span>
                  <span>{f.v}</span>
                </div>
              ))}
            </div>
          </Window>

          <div className="mt-5">
            <Window title="now.txt" soft>
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <div className="opacity-60 mb-2"># what i&apos;m up to</div>
                <ul className="list-none space-y-1">
                  {nowList.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span className="text-accent">›</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Window>
          </div>
        </Reveal>
      </div>

      {/* Timeline */}
      <section className="mt-20">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
            /timeline · from resume.pdf
          </div>
          <h2 className="display text-3xl sm:text-4xl">how i got here.</h2>
        </Reveal>

        <div className="mt-8 relative pl-6 border-l-2 border-line">
          {[
            {
              when: "Aug 2024 — May 2028",
              role: "B.S. Computer Science",
              where: "Cornell University · College of Engineering",
              kind: "education",
              what: "Coursework: Systems Programming, Design with Embedded Operating Systems, Digital Systems Design Using Microcontrollers, Computer System Organization & Programming, Analysis of Algorithms, Computer Vision, Machine Learning, Functional Programming.",
            },
            {
              when: "Jun — Aug 2026",
              role: "Flight Dynamics Software Developer Intern",
              where: "Amazon Leo (GNC & Propulsion) · Redmond, WA",
              kind: "work",
              what: "Built and owned a service that runs astrodynamics engineers' analytics scripts automatically, on a schedule or on satellite events like an ephemeris update. Serverless architecture in TypeScript CDK (Lambda, Step Functions, SNS, S3, DynamoDB) with a Java handler package for triggering, execution, and failure triage. Shipped to production for 100+ engineers.",
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
              what: "Lead a subteam of 15 engineers owning the onboard imaging and telemetry pipeline end to end. Aligns 1,300+ GoPro images per 45-minute flight to GPS and attitude within 125 ms, on a Raspberry Pi bridged to the ground over a Ubiquiti link. Review the subteam's code, onboard new members, and own the data interface with Autopilot.",
              link: { href: "/projects/mini-plane-system", label: "read the case study" },
            },
            {
              when: "Jun 2025 — present",
              role: "Freelance Web Developer",
              where: "Hao Shi Guang Restaurant · Boston, MA",
              kind: "work",
              what: "Built and deployed a full-stack web app with live users — owning development, deployment, and ongoing maintenance.",
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
                <motion.div
                  whileHover={{ x: 4 }}
                  className="relative pl-4 py-5"
                >
                  <span
                    className={`absolute -left-[31px] top-7 inline-block h-3 w-3 rounded-full border-2 border-line ${dotColor}`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest opacity-60">
                      {row.when}
                    </span>
                    <span className="tag font-mono !text-[9.5px] !py-0.5 !px-2">
                      {row.kind}
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
                      {row.link.label} ↗
                    </Link>
                  )}
                </motion.div>
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
          </div>
        </Reveal>
      </section>

      {/* Skills section pulled from resume */}
      <section className="mt-20">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
            /skills · also from resume.pdf
          </div>
          <h2 className="display text-3xl sm:text-4xl">stuff i work with.</h2>
        </Reveal>

        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <Reveal>
            <Window title="languages.txt" soft>
              <div className="p-5 font-mono text-[12.5px] leading-relaxed">
                <p>
                  Rust · C++ · C · Python · Java · Go · JavaScript ·
                  TypeScript · OCaml · SQL · HTML · CSS
                </p>
              </div>
            </Window>
          </Reveal>
          <Reveal delay={0.05}>
            <Window title="systems.txt" soft>
              <div className="p-5 font-mono text-[12.5px] leading-relaxed">
                <p>
                  Real-time + asynchronous pipelines · fault-tolerant
                  systems · distributed services · hardware/software
                  interfaces
                </p>
              </div>
            </Window>
          </Reveal>
          <Reveal delay={0.1}>
            <Window title="tools.txt" soft>
              <div className="p-5 font-mono text-[12.5px] leading-relaxed">
                <p>
                  Linux · Docker · Git · FastAPI · REST APIs · AWS · Azure ·
                  React · Node · Spring Boot · mySQL · OpenCV · NumPy ·
                  Pandas · TensorFlow · PyTorch · Hugging Face
                </p>
              </div>
            </Window>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

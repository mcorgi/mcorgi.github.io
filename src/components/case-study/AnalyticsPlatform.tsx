import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { analyticsSections } from "@/data/siteMap";
import { Callout, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";

// Internship project, written to stay inside the NDA: no internal names,
// no diagrams, no code, no user/volume numbers, no roadmap. Only public AWS
// services and a high-level description of the design, in prose.

export default function AnalyticsPlatform({ project: p }: { project: Project }) {
  return (
    <div className="theme-violet">
      <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-xs opacity-70">
            <Link href="/projects" className="hover:text-accent">
              ← projects
            </Link>
            <span>/</span>
            <span>{p.slug}</span>
          </div>
        </Reveal>

        {/* HERO */}
        <Reveal>
          <div className="mt-6">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-3 flex flex-wrap items-center gap-2">
              <span className="tag !py-0.5 !px-2 text-[10px]">in production</span>
              <span>· {p.org}</span>
              <span>· {p.readTime}</span>
            </div>
            <h1 className="display text-[44px] sm:text-[72px] leading-[0.95]">
              Automated Analytics Platform<span className="text-pink">.</span>
            </h1>
            <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
              You write the analysis. The platform runs it.
            </p>
            <p className="mt-5 max-w-3xl font-mono text-[15px] leading-relaxed text-ink-soft">
              A serverless service I designed and built during my internship on Amazon Leo&apos;s
              flight dynamics software team. It runs engineers&apos; analysis scripts on its own, on
              a schedule or the moment an upstream event lands, so they get results delivered
              instead of running notebooks by hand.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="12 wk" label="from gathering requirements to production" />
            <Stat value="2" label="ways to trigger a script: events or schedules" />
            <Stat value="9" label="public AWS services, all defined in CDK" />
            <Stat value="0" label="manual runs left for its first live use case" />
          </div>
        </Reveal>

        <SectionNav items={analyticsSections} />

        {/* OVERVIEW */}
        <Section id="overview" eyebrow="overview" title="What it is.">
          <Prose>
            <p>
              Engineers write analysis scripts: check how accurate the latest estimate was, compare
              a forecast against what actually happened, and so on. Before this platform, those
              ran whenever someone remembered to open a notebook and run them.
            </p>
            <p>
              The platform takes the script and runs it for them, automatically,
              either on a schedule or in response to an event published by another team.
            </p>
          </Prose>
          <Steps
            items={[
              <>
                <strong>Saves time.</strong>{" "}No babysitting scripts or context-switching through
                the day.
              </>,
              <>
                <strong>Trusted and reviewed.</strong>{" "}Scripts live in one place and are
                code-reviewed like any other code.
              </>,
              <>
                <strong>Keeps running.</strong>{" "}If the owner is out of office, their analysis
                still runs, and the results are waiting when they come back.
              </>,
              <>
                <strong>Traceable.</strong>{" "}Every run is tracked: what triggered it, when,
                whether it succeeded, and where the output lives.
              </>,
            ]}
          />
          <Prose>
            <p>
              <strong>My role.</strong>{" "}I owned the project end to end over a 12-week internship.
              I gathered requirements directly from the engineers who would use it rather than
              working from a spec, designed the serverless infrastructure as code in{" "}
              TypeScript CDK, and wrote the Java Lambda handlers
              that trigger, run, and triage every job.
            </p>
          </Prose>
        </Section>

        {/* SKILLS */}
        <Section
          id="skills"
          eyebrow="what i learned"
          title="The AWS toolbox I got hands-on with."
          intro="Over the summer I designed, deployed and debugged a production system across all of these public AWS services, most of it defined in code. Here's what I did with each one."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["AWS CDK", "TypeScript", "Defined the whole system as code. Each script's config is validated at build time and turned into that script's infrastructure, so a bad config fails the build instead of production."],
              ["Step Functions", "orchestration", "Designed the job workflow as a state machine that waits on long-running jobs, catches errors instead of crashing, and branches on what kind of failure happened."],
              ["Lambda", "Java", "Wrote small, single-purpose Java handlers for each step of a job, sharing typed models so every step agrees on the data it passes along."],
              ["EventBridge", "event routing", "Routed incoming events so each script only fires on the events it asks for, and used scheduled rules for scripts that run on a timer."],
              ["SNS + SQS", "messaging", "Consumed other teams' event notifications through queues, so nothing is lost when a handler is slow, with dead-letter queues for messages that keep failing."],
              ["AWS Batch", "compute", "Ran each script in a container with its own time limit, and read the job's exit status to understand why a run failed."],
              ["DynamoDB", "state", "Tracked every job from queued to succeeded or failed, with what triggered it and why it failed."],
              ["S3 + CloudWatch", "storage + logs", "Stored each run's result files, and kept per-job logs for debugging."],
              ["Code organization", "the glue", "Split the code into packages that build and deploy independently, following the team's existing Java and CDK standards."],
            ].map(([name, kind, what], i) => (
              <Reveal key={name} delay={(i % 3) * 0.05}>
                <div className="border-t-[1.5px] border-line pt-4 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl leading-tight text-accent">{name}</h3>
                    <span className="tag font-mono !text-[9.5px] shrink-0">{kind}</span>
                  </div>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft">{what}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="border-y-[1.5px] border-line py-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-pink-ink mb-4">
                beyond the services
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 font-mono text-[13.5px] leading-relaxed">
                {[
                  ["Designing for scale", "Making \"add a script\" a config change, not an infrastructure change, so the platform grows without new code."],
                  ["Event-driven architecture", "Decoupling producers from consumers with queues and event routing, so upstream teams don't need to change anything."],
                  ["Failure triage as a feature", "Treating \"who should fix this?\" as part of the design, and routing it automatically."],
                  ["Working from users, not a spec", "Gathering requirements straight from the people who'd use it, then shipping to them in production."],
                ].map(([t, b]) => (
                  <div key={t}>
                    <div className="text-ink font-semibold">
                      <span className="text-pink-ink">✦</span> {t}
                    </div>
                    <div className="text-ink-soft">{b}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* THE CORE DESIGN CHOICE */}
        <Section
          id="design"
          eyebrow="the core design choice"
          title="Put the orchestration in a state machine."
          intro="Every run goes through one AWS Step Functions workflow. It was the biggest piece of the project to figure out, and the major design choice I made was to put the orchestration and all of the error handling inside it."
        >
          <Table
            head={["Option", "How it would work", "Why it lost / won"]}
            rows={[
              [
                "Lambdas only",
                "Each function calls the next one and handles its own errors.",
                "Routing, retries and error handling would all be hand-written and scattered across functions, with no single place to see where a run died.",
              ],
              [
                "EventBridge Pipes",
                "Connect an event source straight to a target, with filtering along the way.",
                "We tried it. Pipes is great for one hop, but a job here needs several steps, branching, and different handling for different failures.",
              ],
              [
                <strong key="c" className="text-accent">Step Functions ✓</strong>,
                "One state machine owns the whole run, from queuing to the final outcome.",
                "Routing and error handling are built in, it integrates directly with DynamoDB and AWS Batch, and every execution's history is visible, so failures are easy to monitor and debug.",
              ],
            ]}
          />
          <Prose>
            <p>
              <strong>The distinction that matters most</strong>{" "}is who caused a failure. A
              platform that runs other people&apos;s code will see plenty of failures that
              aren&apos;t its fault, and it has to tell them apart from its own:
            </p>
          </Prose>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="border-t-[1.5px] border-line pt-4 h-full">
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent-3">user error</div>
                <h3 className="font-display text-xl mt-1">Something in the script went wrong</h3>
                <ul className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed text-ink-soft">
                  <li>› the script&apos;s container reports that the script itself failed</li>
                  <li>› the job is recorded as failed, with the reason</li>
                  <li>› the <strong className="text-ink">script&apos;s owner</strong> is notified</li>
                  <li>› the workflow still ends <strong className="text-ink">successfully</strong>: the platform did its job</li>
                </ul>
              </div>
              <div className="border-t-[1.5px] border-line pt-4 h-full">
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent">infrastructure failure</div>
                <h3 className="font-display text-xl mt-1">The platform couldn&apos;t run it</h3>
                <ul className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed text-ink-soft">
                  <li>› anything that isn&apos;t the script&apos;s fault</li>
                  <li>› the job is recorded as failed, with the reason</li>
                  <li>› the <strong className="text-ink">platform team</strong> is notified</li>
                  <li>› the workflow ends <strong className="text-ink">failed</strong>, so it shows up as a platform problem</li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Callout>
            The payoff: a failed workflow execution always means something is wrong with the
            platform itself, and a script bug never pages the platform team.
          </Callout>
        </Section>

        {/* EXAMPLE USE CASE */}
        <section id="example" className="mt-24 scroll-mt-28">
          <Reveal>
            <div className="relative">
              <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[18px] bg-pink" />
              <div
                className="relative rounded-[18px] border-[1.5px] border-line p-6 sm:p-10"
                style={{ background: "linear-gradient(160deg, #fff1f7 0%, #fde4ef 100%)" }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-widest">
                    <span aria-hidden className="text-pink-ink">✦</span> an example
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">
                    the kind of analysis it runs
                  </span>
                </div>
                <h2 className="display text-4xl sm:text-5xl mt-4">
                  space weather is a <span className="text-pink-ink">&quot;drag&quot;</span>.
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-[13.5px] leading-relaxed text-ink-soft">
                  A textbook example from orbital mechanics, to show why engineers want analyses
                  like this to run on their own.
                </p>

                <div className="mt-8 grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
                  {[
                    ["step 1", "staying in place", "Satellites have to stay within an assigned region, and planning a maneuver means predicting atmospheric drag, which depends on space weather."],
                    ["step 2", "forecasts change", "Space-weather forecasts shift from day to day, and the drag you plan for may not be the drag you get."],
                    ["step 3", "check the plan", "So engineers want to compare each day's forecast against what actually happened, every day."],
                  ].map(([k, t, b], i) => (
                    <div key={k} className="contents">
                      <div className="rounded-[14px] border-[1.5px] border-line bg-white p-5 shadow-[4px_4px_0_0_var(--line)]">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-pink-ink">{k}</div>
                        <h3 className="font-display text-xl mt-1">{t}</h3>
                        <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft">{b}</p>
                      </div>
                      {i < 2 && (
                        <div aria-hidden className="hidden md:flex items-center font-display text-3xl text-pink-ink">
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid md:grid-cols-[1.2fr_1fr] gap-6 items-center rounded-[14px] border-[1.5px] border-line bg-white p-5 sm:p-6">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-pink-ink">the question</div>
                    <p className="mt-2 font-display text-2xl leading-snug">
                      &quot;Did the forecast dip line up with what we saw?&quot;
                    </p>
                    <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-soft">
                      Answering it means plotting each day&apos;s forecast over a rolling window and
                      spotting the dip. By hand, that&apos;s a notebook someone has to remember to run
                      every single day.
                    </p>
                  </div>
                  <figure>
                    <svg viewBox="0 0 320 150" role="img" aria-label="Illustrative forecast over seven days, dipping on day 4 and then recovering." className="w-full h-auto">
                      <line x1="20" y1="120" x2="305" y2="120" stroke="#2b2166" strokeOpacity="0.25" />
                      <polyline points="30,40 75,40 120,60 165,112 210,90 255,62 300,42" fill="none" stroke="#6d4fd8" strokeWidth="3" strokeLinejoin="round" />
                      {[30, 75, 120, 210, 255, 300].map((x, i) => (
                        <circle key={x} cx={x} cy={[40, 40, 60, 90, 62, 42][i]} r="4" fill="#6d4fd8" />
                      ))}
                      <circle cx="165" cy="112" r="7" fill="#f472b6" stroke="#2b2166" strokeWidth="1.5" />
                      <text x="165" y="140" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="#c9407c" fontWeight="bold">day 4 dip</text>
                      <text x="20" y="20" fontSize="11" fontFamily="monospace" fill="#4d4580">7-day forecast</text>
                    </svg>
                    <figcaption className="font-mono text-[10.5px] opacity-60 text-center">illustrative, not real data</figcaption>
                  </figure>
                </div>

                <div className="mt-6 rounded-[14px] border-[1.5px] border-line px-5 py-4 sm:px-6 sm:py-5 text-cream" style={{ background: "var(--ink)" }}>
                  <span className="font-display text-xl">Enter the platform.</span>{" "}
                  <span className="font-mono text-[13.5px] leading-relaxed opacity-90">
                    Write that analysis once. The platform runs it automatically and drops the
                    results wherever you define, so nobody has to run a notebook by hand every day.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* HOW A SCRIPT RUNS */}
        <Section
          id="lifecycle"
          eyebrow="how a script runs"
          title="From config to results."
          intro="From the script author's side, it's four stages. Only the first one is their job."
        >
          <Steps
            items={[
              <>
                <strong>Author.</strong>{" "}Write the analysis script and a small config: who owns
                it, when it should run, and what it produces.
              </>,
              <>
                <strong>Build.</strong>{" "}At deploy time, the infrastructure code validates every
                config and generates what each script needs to be triggered. A bad config fails
                the build, not production.
              </>,
              <>
                <strong>Trigger.</strong>{" "}When a matching event arrives, or the schedule comes
                up, the platform starts a run for that script and only that script.
              </>,
              <>
                <strong>Run and record.</strong>{" "}The workflow queues the job, runs the script in
                a container, stores the results, and records the outcome. If something breaks, the
                right person hears about it.
              </>,
            ]}
          />
        </Section>

        {/* IMPACT */}
        <Section id="impact" eyebrow="impact" title="What it changed.">
          <Steps
            items={[
              <>
                <strong>Shipped to production</strong>{" "}and designed to grow: adding a script is a
                config change, not an infrastructure change.
              </>,
              <>
                <strong>First live use case:</strong>{" "}an analysis that someone used to run by hand
                every week now triggers itself whenever new data lands.
              </>,
              <>
                <strong>Failures go to the right person.</strong>{" "}A broken run is triaged and
                routed to the script&apos;s owner or the platform team automatically, instead of
                failing silently.
              </>,
            ]}
          />
        </Section>

        {/* TAKEAWAYS */}
        <Section id="takeaways" eyebrow="takeaways" title="What I took away.">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["01", "Build for change", "Not just making it work, but building it to grow without breaking. Clean, readable code with abstractions where they earn their place, following the team's existing standards."],
              ["02", "The 'why' mattered most", "The tech wasn't the main thing that drove me this summer; the why was. Learning the engineers' real workflows firsthand is what pushed me to build something they'd actually rely on."],
              ["03", "How to ask for help", "I didn't stay stuck. I'd dig into a problem myself first, then bring a clearly outlined question to senior engineers. A failed attempt is just information for the next one."],
            ].map(([n, t, b], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className="border-t-[1.5px] border-line pt-4 h-full">
                  <div className="font-mono text-[12px] text-pink-ink">{n}</div>
                  <h3 className="font-display text-xl mt-1">{t}</h3>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Callout>
            Building on AWS was super cool and fun to learn. But the real challenge, and where I
            actually grew, was figuring out how to design all those pieces to fit together and hold
            up as it grows.
          </Callout>
        </Section>

        <div className="mt-20 flex items-center justify-between">
          <Link href="/projects" className="arrow-link text-sm font-mono">
            ← all projects
          </Link>
          <Link href="/" className="arrow-link text-sm font-mono">
            home ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

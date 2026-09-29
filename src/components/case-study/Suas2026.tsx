import Link from "next/link";
import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import { placeholderCount, suasPhotos } from "@/data/suas2026";
import { suasSections } from "@/data/siteMap";
import { Card, Code, Diagram, Section, SectionNav, Table } from "./Parts";

const nav = suasSections;

export default function Suas2026() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-xs opacity-70">
          <Link href="/" className="hover:text-accent">
            ← home
          </Link>
          <span>/</span>
          <span>highlights</span>
          <span>/</span>
          <span>suas-2026</span>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-6">
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-3 flex flex-wrap items-center gap-2">
            <span className="tag !py-0.5 !px-2 text-[10px]">highlight</span>
            <span>· Cornell Unmanned Air Systems (CUAir)</span>
            <span>· 2026</span>
          </div>
          <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">SUAS 2026</h1>
          <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
            Intelligence operator on the flightline
          </p>
          <p className="mt-5 max-w-3xl font-mono text-[15px] leading-relaxed text-ink-soft">
            SUAS is an international competition where university teams fly autonomous aircraft
            through a search-and-rescue mission. At SUAS 2026 I was CUAir&apos;s Intelligence
            operator on the flightline, solely responsible for the onboard imaging pipeline during
            live missions.
          </p>
        </div>
      </Reveal>

      <SectionNav items={nav} />

      <Section id="overview" eyebrow="overview" title="the competition.">
        <div className="grid md:grid-cols-3 gap-5">
          <Reveal>
            <Card title="SUAS" tag="event">
              <p>
                The Student Unmanned Aerial Systems competition: university teams from around
                the world fly autonomous aircraft through a timed search-and-rescue mission.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card title="Storm Response" tag="2026 theme">
              <p>
                Find and locate targets on the ground after a storm, map the area, and deliver
                aid packages, with as little human input as possible.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card title="Hermes" tag="aircraft">
              <p>
                CUAir&apos;s 2026 aircraft: a search-and-rescue VTOL that takes off vertically
                and cruises on its wing. Its imaging runs on the{" "}
                <Link
                  href="/projects/mini-plane-system"
                  className="underline decoration-accent underline-offset-2 hover:text-accent"
                >
                  Mini Plane System
                </Link>
                .
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section
        id="role"
        eyebrow="my role"
        title="intelligence operator."
        intro="During live missions I was the one person responsible for the imaging pipeline: getting every photo from the aircraft to the ground, tagged with the right position, for the targeting software to use."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <Window title="responsibilities.md">
              <div className="p-5 sm:p-6 font-mono text-[13.5px] leading-relaxed">
                <ul className="space-y-2.5">
                  {[
                    "Bring up the onboard Pi, the GoPro and the radio link before each mission, and clear preflight.",
                    "Start the pipeline and load the competition search area for distance mode.",
                    "Watch capture, pairing and upload counts live over the link during the flight.",
                    "Step in by hand if anything stalls: force capture, restart a task.",
                    "After landing, recover anything that didn't make it down over the link.",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-accent shrink-0">›</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Window>
          </Reveal>
          <Reveal delay={0.06}>
            <Window title="who-i-worked-with.md" soft>
              <div className="p-5 sm:p-6 font-mono text-[13.5px] leading-relaxed space-y-3">
                <p>
                  <span className="font-semibold">Safety pilot + GCS operator</span>{" "}
                  <span className="text-ink-soft">
                    fly the aircraft and run the ground control station.
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Targeting</span>{" "}
                  <span className="text-ink-soft">
                    runs hawk-ai on the images I deliver and sends target coordinates to
                    Autopilot.
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Autopilot subteam</span>{" "}
                  <span className="text-ink-soft">
                    owns the Pixhawk and the telemetry link; I own the data interface between
                    their flight controller and our pipeline.
                  </span>
                </p>
              </div>
            </Window>
          </Reveal>
        </div>
      </Section>

      <Section
        id="flightline"
        eyebrow="flightline ops"
        title="a mission, start to finish."
        intro="Setup time counts at competition, so the sequence follows a written runbook and one launch script instead of steps from memory."
      >
        <Diagram
          src="/diagrams/suas-flightline-ops.drawio.svg"
          alt="Flightline sequence. Before takeoff: hardware checklist, power-up order, reach the Pi over ping and ssh, run launch_all.sh. During and after the mission: arm distance mode, monitor in flight, intervene if needed, recover data after landing."
          caption={
            <>
              <Code>launch_all.sh</Code> runs the preflight check on the Pi first and refuses to
              start anything if the GoPro, Pixhawk, ground server or disk space fails a check.
            </>
          }
        />
      </Section>

      <Section
        id="watching"
        eyebrow="what i watched"
        title="reading the pipeline mid-flight."
        intro="With the aircraft in the air, all I have is a terminal over the radio link and the dashboard. These are the signals I kept an eye on, and what each one told me."
      >
        <Table
          file="signals.csv"
          head={["Signal", "What it means", "What I'd do"]}
          rows={[
            [
              "processed climbing, upload_ok keeping pace",
              "Photos are being taken, paired and delivered.",
              "Nothing. Confirm images are showing up in hawk-ai.",
            ],
            [
              "upload_fail climbing",
              "The radio link is struggling.",
              "Keep going. Everything is saved on the Pi and the SD card for recovery.",
            ],
            [
              "upload_skip_no_telem climbing",
              "Photos have no telemetry within tolerance.",
              "Check the Pixhawk connection and the telemetry poller.",
            ],
            [
              "No \"Entering search area\" line",
              "Distance mode hasn't triggered.",
              "Force capture with cc so the search leg isn't lost.",
            ],
            [
              "Status shows a mode, but no running task",
              "The capture task died.",
              "Restart it from the dashboard with one call.",
            ],
          ]}
        />
      </Section>

      <Section id="photos" eyebrow="photos" title="from the field.">
        <div className="grid sm:grid-cols-2 gap-5">
          {suasPhotos.length > 0
            ? suasPhotos.map((ph, i) => (
                <Reveal key={ph.src} delay={i * 0.04}>
                  <figure className="window-soft overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ph.src} alt={ph.caption} className="block w-full h-auto" />
                    <figcaption className="border-t border-line px-4 py-2.5 font-mono text-[12px] text-ink-soft">
                      {ph.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))
            : Array.from({ length: placeholderCount }, (_, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="aspect-[4/3] rounded-[14px] border-[1.5px] border-dashed border-line bg-cream-2/40 flex items-center justify-center font-mono text-[12px] opacity-60">
                    photo coming soon
                  </div>
                </Reveal>
              ))}
        </div>
      </Section>

      <div className="mt-20 flex items-center justify-between">
        <Link href="/" className="arrow-link text-sm font-mono">
          ← home
        </Link>
        <Link href="/projects/mini-plane-system" className="arrow-link text-sm font-mono">
          the pipeline I ran →
        </Link>
      </div>
    </div>
  );
}

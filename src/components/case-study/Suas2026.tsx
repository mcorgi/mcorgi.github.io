import Link from "next/link";
import Reveal from "@/components/Reveal";
import { gallery, photos, type Photo } from "@/data/suas2026";
import { suasSections } from "@/data/siteMap";
import { Callout, Code, Diagram, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";

function Figure({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="block w-full aspect-[3/2] object-cover rounded-lg border-[1.5px] border-line"
      />
      {photo.caption && (
        <figcaption className="mt-2 font-mono text-[12px] leading-snug text-ink-soft">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

const tasks = [
  { name: "Search, Detect, and Deliver", pts: "up to 100 per delivery", what: "Find a mannequin and a pop-up tent among debris, then drop a water bottle on the mannequin and a strobe beacon on the tent, within 50 ft.", intel: true },
  { name: "Risk Mapping", pts: "up to 150", what: "Stitch the aircraft's photos into one map of the area, good enough to pass for a professional map, handed in before mission time ends.", intel: true },
  { name: "Efficient Operators", pts: "up to 200", what: "Fly with as few people as possible. Two operators (safety pilot + GCS) earn all 200 points; a third costs 100; a fourth costs everything.", intel: false },
  { name: "Flight Endurance", pts: "", what: "Keep flying waypoint laps: the aircraft has to prove it can stay up and on course before any deliveries count.", intel: false },
  { name: "Design for Rapid Response", pts: "", what: "Points for a system built to deploy quickly in a disaster. Most teams designed for it; it gave them a big boost.", intel: false },
];

const week: { day: string; title: string; points: string[]; photos?: Photo[] }[] = [
  {
    day: "Sat – Sun",
    title: "Prep",
    points: [
      "Cut about 0.7 lb from Hermes: gimbal reprints, new landing-gear feet, electronics bay optimizations.",
      "Lots of software ground testing. We found and fixed a dynamic-IP issue with the GoPro, and confirmed every other system was nominal.",
      "Uploaded tuned flight-control gains and configured everything for flight.",
    ],
  },
  {
    day: "Monday",
    title: "Flightline drills + safety inspection",
    points: [
      "Two teammates and I practiced setting up the plane for flight over and over. Our best time was about 3:30, from nothing powered to ready to fly.",
      "Passed safety inspection on the first try, at 34.9 lb. Every software kill system worked.",
    ],
  },
  {
    day: "Tuesday",
    title: "Flight day one",
    photos: [photos.takeoff, photos.airborne],
    points: [
      "The mission clock started, and issues connecting the intelligence pipeline and autopilot pushed takeoff to around T+7 minutes.",
      "Then a successful autonomous takeoff, our first ever at a competition. Hermes flew four laps, climbing to almost 950 ft at 96 mph ground speed.",
      "Extreme flight forces detached the tail and it came down in the field. Afterwards we found debris in the pitot tube entry, and the tube had split.",
    ],
  },
  {
    day: "Wednesday",
    title: "Flight day two",
    points: [
      "Software and airdrop setup in a record 3:00, faster than any drill we'd run.",
      "On auto-takeoff Hermes tipped onto its front-left prop. A teammate joined as a fourth operator to debug, but after four attempts we weren't allowed to continue.",
      "The cause: a taped XT60 connector under the wing had loosened enough to cut power during takeoff vibrations. We fixed the landing gear and passed the post-crash inspection in record time, but the competition didn't run third flights.",
    ],
  },
  {
    day: "Thursday",
    title: "Awards",
    points: ["4th for best website, 11th for best technical design report, and 38th in the mission."],
  },
];

export default function Suas2026() {
  return (
    <div className="pb-24">
      {/* HERO: the photo is the title card */}
      <div className="mx-auto max-w-6xl px-5 pt-8">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-xs opacity-70 mb-4">
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
          <div className="relative">
            <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[18px] bg-pink" />
            <div className="relative overflow-hidden rounded-[18px] border-[1.5px] border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos.hero.src}
                alt={photos.hero.alt}
                className="block w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] object-cover object-[50%_70%]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(18,33,66,0) 30%, rgba(18,33,66,0.85) 100%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-cream">
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-90 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-cream/70 px-2 py-0.5">highlight</span>
                  <span>Cornell Unmanned Air Systems (CUAir)</span>
                </div>
                <h1 className="display mt-3 text-[48px] sm:text-[80px] lg:text-[96px] leading-[0.9]">
                  SUAS 2026<span className="text-pink">.</span>
                </h1>
                <p className="mt-3 font-display text-xl sm:text-3xl">Intelligence operator on the flightline</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="Sep 14–17" label="2026, at Skyway Range in Tulsa, OK" />
            <Stat value="45 min" label="to set up and fly the whole mission, clock included" />
            <Stat value="3:00" label="our record software + airdrop setup, on flight day two" />
            <Stat value="1 of 3" label="operators on our flightline crew: I ran intelligence" />
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-3xl font-mono text-[15px] leading-relaxed text-ink-soft">
            SUAS is RoboNation&apos;s international Student Unmanned Aerial Systems competition.
            University teams fly autonomous aircraft through a search-and-rescue mission. In 2026 I
            went as CUAir&apos;s Intelligence operator: on the flightline during each mission, I was
            the one person responsible for the imaging pipeline that finds the targets.
          </p>
        </Reveal>

        <SectionNav items={suasSections} />

        {/* MISSION */}
        <Section
          id="mission"
          eyebrow="the mission"
          title="Storm response, in 45 minutes."
          intro="The 2026 scenario is a storm response. A team gets 45 minutes, starting from nothing powered on, to set up, fly, find what matters on the ground, deliver supplies, and hand in a map."
        >
          <Reveal>
            <div className="border-t border-line/30">
              {tasks.map((t) => (
                <div
                  key={t.name}
                  className="grid sm:grid-cols-[220px_1fr_auto] gap-x-6 gap-y-1 py-4 border-b border-line/30 items-baseline"
                >
                  <div>
                    <h3 className="font-display text-lg leading-tight">{t.name}</h3>
                    {t.pts && <div className="font-mono text-[11px] opacity-60">{t.pts}</div>}
                  </div>
                  <p className="font-mono text-[13.5px] leading-relaxed text-ink-soft">{t.what}</p>
                  {t.intel ? (
                    <span className="tag font-mono !text-[10px] !bg-pink-soft justify-self-start">runs on my pipeline</span>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5 [&>*]:min-w-0">
            <Reveal><Figure photo={photos.runway1} /></Reveal>
            <Reveal delay={0.05}><Figure photo={photos.carry} /></Reveal>
            <Reveal delay={0.1}><Figure photo={photos.booms} /></Reveal>
          </div>
        </Section>

        {/* ROLE */}
        <Section id="role" eyebrow="my role" title="Intelligence operator.">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 items-start [&>*]:min-w-0">
            <Reveal>
              <Figure photo={photos.nanostation} />
            </Reveal>
            <Prose>
              <p>
                The imaging pipeline is how the aircraft sees. Every photo the GoPro takes has to
                reach the ground tagged with where the plane was, so our targeting software can find
                the mannequin and the tent, and our mapping can stitch the area together.
              </p>
              <p>
                That pipeline is the{" "}
                <Link href="/projects/mini-plane-system" className="underline decoration-pink underline-offset-2 hover:text-accent">
                  Mini Plane System
                </Link>
                , the software I built and now lead as Intelligence subteam lead. At competition I
                was the person running it live, from the moment the clock started to the moment we
                handed in our deliverables.
              </p>
            </Prose>
          </div>

          <Callout>
            <strong>Why this role is interesting:</strong>{" "}the rules only require two operators, a
            safety pilot and a GCS operator. Every extra person costs 100 of the 200
            efficient-operator points. We flew with three, and I was the third. The better my
            pipeline runs on its own, the closer we get to not needing that seat at all.
          </Callout>

          <Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                ["before takeoff", "Bring up the link", "Power the Pi and radios, aim the NanoStation at the plane, SSH in, and run the launch script. Preflight has to pass before anything starts."],
                ["in the air", "Keep the photos flowing", "Load the competition search area so capture starts over it on its own, then watch photos get captured, tagged and uploaded in real time. Step in if anything stalls."],
                ["after landing", "Nothing gets lost", "Anything that didn't make it down over the link is still saved on the Pi and the GoPro's card, ready to recover and hand in before mission time ends."],
              ].map(([when, title, body], i) => (
                <div key={when} className="border-t-[1.5px] border-line pt-4 h-full">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-pink-ink">
                    {String(i + 1).padStart(2, "0")} · {when}
                  </div>
                  <h3 className="font-display text-xl mt-1">{title}</h3>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5 [&>*]:min-w-0">
            <Reveal><Figure photo={photos.groundTable} /></Reveal>
            <Reveal delay={0.05}><Figure photo={photos.groundSetup} /></Reveal>
            <Reveal delay={0.1}><Figure photo={photos.laptop} /></Reveal>
          </div>
        </Section>

        {/* FLIGHTLINE */}
        <Section
          id="flightline"
          eyebrow="a mission, start to finish"
          title="On the clock."
          intro="Nothing can be powered on before the judges start the clock, and setup counts against the same 45 minutes as the flight. So the whole sequence follows a written runbook and one launch script instead of steps from memory."
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
          <Prose>
            <p>
              <strong>Reading the pipeline mid-flight.</strong>{" "}With the plane in the air, all I
              have is a terminal over the radio link and the dashboard. These are the signals I
              watch:
            </p>
          </Prose>
          <Table
            head={["Signal", "What it means", "What I do"]}
            rows={[
              ["processed climbing, upload_ok keeping pace", "Photos are being taken, paired and delivered.", "Nothing. Confirm they're landing in the targeting software."],
              ["upload_fail climbing", "The radio link is struggling.", "Keep going: everything is saved on the Pi and the SD card."],
              ["upload_skip_no_telem climbing", "Photos have no telemetry close enough to pair.", "Check the Pixhawk connection and the telemetry poller."],
              ["No \"Entering search area\" line", "Distance mode hasn't triggered.", "Force capture with cc so the search leg isn't lost."],
              ["Status shows a mode, but no running task", "The capture task died.", "Restart it from the dashboard with one call."],
            ]}
          />
        </Section>

        {/* WEEK */}
        <Section id="week" eyebrow="the week" title="Five days in Tulsa.">
          <div className="relative pl-6 border-l-2 border-line space-y-2">
            {week.map((d) => (
              <Reveal key={d.day}>
                <div className="relative pl-4 py-4">
                  <span className="absolute -left-[31px] top-6 inline-block h-3 w-3 rounded-full border-2 border-line bg-pink" />
                  <div className="font-mono text-[11px] uppercase tracking-widest text-pink-ink">{d.day}</div>
                  <h3 className="font-display text-2xl leading-tight mt-0.5">{d.title}</h3>
                  <ul className="mt-3 max-w-3xl space-y-2 font-mono text-[13.5px] leading-relaxed text-ink-soft">
                    {d.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-accent shrink-0">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {d.photos && (
                    <div className="mt-5 grid sm:grid-cols-2 gap-5 max-w-3xl [&>*]:min-w-0">
                      {d.photos.map((ph) => (
                        <Figure key={ph.src} photo={ph} />
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* RESULTS */}
        <Section id="results" eyebrow="results" title="How it went.">
          <Reveal>
            <div className="grid grid-cols-3 gap-4">
              <Stat value="4th" label="best website" />
              <Stat value="11th" label="best technical design report" />
              <Stat value="38th" label="mission" />
            </div>
          </Reveal>
          <Reveal>
            <Figure photo={photos.team} />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
            <Prose>
              <p>
                We didn&apos;t place as high as we hoped in the mission. Most teams designed for
                rapid response, which gave them a big boost, and 70% of our mission points were
                deducted as penalties: breaching the flight boundary and the ceiling, two things
                falling off the aircraft, and unsafe operations.
              </p>
              <p>
                But the platform held its own, even against drones. By our own count, if we had
                done everything we set out to do, we would have ranked 5th without the
                rapid-response design points, and with two operators we would have won.
              </p>
            </Prose>
            <Reveal>
              <div className="border-t-[1.5px] border-line pt-4 h-full">
                <div className="font-mono text-[11px] uppercase tracking-widest text-pink-ink mb-3">firsts for CUAir</div>
                <ul className="space-y-2 font-mono text-[13.5px] leading-relaxed">
                  {[
                    "First autonomous takeoff sequence at a competition",
                    "First successful autonomous horizontal flight since SUAS 2024",
                    "Built and tested an aircraft in record time: 4 months",
                    "First time at SUAS in Tulsa, under the new revamped rules",
                  ].map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-pink-ink shrink-0">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* NEXT */}
        <Section id="next" eyebrow="what's next" title="On to SUAS 2027.">
          <Steps
            items={[
              <>
                <strong>Make the operator seat unnecessary.</strong>{" "}Two operators would have
                won it. As Intelligence lead, the goal is a pipeline that comes up, runs and
                recovers on its own, so intelligence doesn&apos;t need a person on the flightline.
              </>,
              <>
                <strong>Checklists, every time.</strong>{" "}Flight one&apos;s delay came from
                connecting the pipeline and autopilot. The whole team&apos;s top lesson was sharper
                focus on preflight checklists, inspection and readiness.
              </>,
              <>
                <strong>Full mission demos before comp.</strong>{" "}We&apos;re setting up a full
                SUAS mission demo at Ovid in the coming weeks, and aiming for complete mission
                demos well ahead of SUAS 2027.
              </>,
              <>
                <strong>Hermes, again.</strong>{" "}Hermes goes back to competition in 2027, with
                tilt rotors, and with less weight.
              </>,
            ]}
          />
        </Section>

        {/* PHOTOS */}
        <Section id="photos" eyebrow="photos" title="More from the field.">
          <div className="columns-1 sm:columns-2 gap-5 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {gallery.map((ph) => (
              <Figure key={ph.src} photo={ph} />
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
    </div>
  );
}

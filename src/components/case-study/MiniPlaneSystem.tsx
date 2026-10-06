import Link from "next/link";
import Reveal from "@/components/Reveal";
import { MpsScene } from "@/components/Illustrations";
import type { Project } from "@/data/projects";
import { mpsSections } from "@/data/siteMap";
import { Callout, Code, Diagram, LinkList, Pre, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";

const nav = mpsSections;

const milestones = [
  { when: "Sep 2025", title: "Learned the old Rust system and the ground-server schema" },
  { when: "Sep 2025", title: "First photo reaches the ground server" },
  { when: "Nov 2025", title: "Continuous capture: every photo gets its JSON and uploads on its own" },
  { when: "Dec 2025", title: "Runs on the Pi as a single arm64 binary" },
  { when: "Jan 2026", title: "Field CLI (the mps> prompt)" },
  { when: "Jan – Feb 2026", title: "Pixhawk telemetry + pairing on the Pi clock" },
  { when: "Mar 2026", title: "End to end over the radio link to the ground" },
  { when: "Mar – May 2026", title: "Flight tests on the Matrice + distance mode" },
  { when: "2026", title: "Flown at SUAS 2026, with me as Intelligence operator", href: "/suas-2026" },
];

export default function MiniPlaneSystem({ project: p }: { project: Project }) {
  return (
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
            <span className="tag !py-0.5 !px-2 text-[10px]">flight-tested</span>
            {p.org && <span>· {p.org}</span>}
            <span>· {p.year}</span>
            <span>· {p.readTime}</span>
          </div>
          <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">{p.title}</h1>
          {p.subtitle && (
            <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
              {p.subtitle}
            </p>
          )}
        </div>
      </Reveal>

      <figure className="mt-8">
        <MpsScene className="border-[1.5px] border-line" />
        <figcaption className="mt-2 font-mono text-[11.5px] opacity-60">
          Roughly how it works: the GoPro shoots, the Pi pairs each photo with the Pixhawk&apos;s
          position, and the pair goes down to the ground over the radio. The rest of this page is
          the long version.
        </figcaption>
      </figure>

      <Reveal>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="1,300+" label="photos per 45-minute flight" />
          <Stat value="≤125 ms" label="photo-to-telemetry alignment" />
          <Stat value="10 Hz" label="GPS + attitude samples" />
          <Stat value="0" label="manual steps mid-flight" />
        </div>
      </Reveal>

      <SectionNav items={nav} />

      {/* 01 */}
      <Section id="what" eyebrow="01 · what it is" title="The software that flies with the plane.">
        <Prose>
          <p>
            The Mini Plane System (MPS) is the software that runs onboard CUAir&apos;s aircraft,
            on a Raspberry Pi. During a flight it does four things:
          </p>
        </Prose>
        <Steps
          items={[
            <>
              <strong>Take photos.</strong>{" "}It controls a GoPro to take photos continuously during
              flight.
            </>,
            <>
              <strong>Read telemetry.</strong>{" "}It reads GPS and attitude (yaw, pitch, roll) from the
              flight controller, a Pixhawk.
            </>,
            <>
              <strong>Tag each photo</strong>{" "}with where the plane was and how it was tilted at the
              moment the photo was taken.
            </>,
            <>
              <strong>Send it to the ground</strong>{" "}over a wireless link while the plane is still
              flying, so our targeting software (hawk-ai) can start finding targets before landing.
            </>,
          ]}
        />
        <Prose>
          <p>
            <strong>My role.</strong>{" "}I was the point person for the core onboard pipeline: camera
            capture, download and upload, the Pixhawk integration, telemetry pairing, the field
            CLI, Pi deployment, and the preflight/launch scripts. Teammates built distance mode and
            the HTTP control API. Since August 2026 I lead the Intelligence subteam (15 engineers),
            which owns MPS end to end, and I ran it live at{" "}
            <Link
              href="/suas-2026"
              className="underline decoration-pink underline-offset-2 hover:text-accent"
            >
              SUAS 2026
            </Link>
            .
          </p>
          <p>
            <strong>Why it was rebuilt.</strong>{" "}The previous onboard system was written in Rust and
            depended on camera events the GoPro doesn&apos;t expose over its HTTP interface. It was
            hard for current members to build, deploy, and fix at the field. MPS is Python, ships as
            one file, and runs from a terminal.
          </p>
        </Prose>
      </Section>

      {/* 02 */}
      <Section
        id="hardware"
        eyebrow="02 · hardware"
        title="What's in the air, and what's on the ground."
      >
        <Diagram
          src="/images/mps/hardware-data-flow.png"
          alt="Top half, on the plane: a Ubiquiti Rocket radio connects through a PoE injector to the Raspberry Pi, which connects to the Pixhawk (Cube) flight controller and a GoPro. Bottom half, on the ground: a portable power station, a Ubiquiti NanoStation receiving the wifi signal, a PoE injector, a router, and a laptop."
          caption="Top: on the plane. Bottom: the ground station. The only link between them is the 5 GHz signal from the Rocket to the NanoStation."
        />
        <Prose>
          <p>
            <strong>On the plane</strong>, the plane&apos;s batteries power the Pi. The GoPro and
            the Pixhawk plug into the Pi over USB. The Pi talks to a Ubiquiti Rocket radio over
            ethernet, with a PoE injector powering the Rocket.
          </p>
          <p>
            <strong>On the ground</strong>, a portable power station runs a Ubiquiti NanoStation,
            which catches the Rocket&apos;s signal and feeds a router. The ground laptop on that
            router runs the ground server. Everything shares one static subnet, so I can SSH into
            the Pi mid-flight.
          </p>
          <p>
            Before anything flies on the competition plane, we test on the{" "}
            Matrice, the team&apos;s testbed drone. Here&apos;s exactly how
            it&apos;s wired, including power:
          </p>
        </Prose>
        <Diagram
          src="/diagrams/mps-matrice-wiring.drawio.svg"
          alt="Matrice wiring: the flight electronics battery feeds a 3-way splitter that powers the Mauch module, the PoE injector and the GoPro. The Mauch powers the Pi and Pixhawk. The PoE injector links the Pi and the Rocket over ethernet. The Pi connects over USB to the Pixhawk, the gimbal board and the GoPro. The gimbal board drives roll and pitch motors from its own battery."
          caption="Power in red, ethernet in blue, USB in black. The gimbal has its own battery because its board needs about 11–12 V."
        />
        <Prose>
          <p>
            <strong>When something doesn&apos;t come up at the field</strong>, I go through the
            hardware in this order before touching any code:
          </p>
        </Prose>
        <Steps
          items={[
            "Pi lights: power and boot LEDs on, and the ethernet port shows green + yellow.",
            "Rocket: all blue lights, and it shows up on the Ubiquiti page.",
            "Cables: re-seat the camera USB and both ethernet cables.",
            "Camera: light is green, and the zoom lens is removed.",
            "Gimbal: the board is getting enough power, around 11–12 V.",
            "Pixhawk: its startup sound plays.",
          ]}
        />
        <Reveal>
          <details className="max-w-3xl border-y-[1.5px] border-line">
            <summary className="cursor-pointer px-5 py-3 font-mono text-[13px] hover:bg-cream-2/60">
              see the original sketch from my notebook
            </summary>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mps/matrice-wiring-sketch.png"
              alt="My hand-drawn sketch of the Matrice wiring, the ground station, and the debugging checklist."
              className="block w-full h-auto bg-white border-t border-line"
            />
          </details>
        </Reveal>
      </Section>

      {/* 03 */}
      <Section id="software" eyebrow="03 · software" title="One program, four jobs at once.">
        <Prose>
          <p>
            MPS runs as a single program, <Code>mps</Code>. When you start it you get an
            interactive command line, and it also starts a small HTTP API so the ground dashboard
            can control it. When capture is running, three tasks run side by side on one{" "}
            asyncio event loop, plus one separate thread:
          </p>
        </Prose>
        <Table
          head={["Task", "Kind", "What it does"]}
          rows={[
            [<Code key="1">continuous_capture</Code>, "asyncio task", "Fires the GoPro shutter on an interval (currently every 5 s)."],
            [<Code key="2">download_and_upload_worker</Code>, "asyncio task", "Detects new photos → downloads → pairs telemetry → uploads."],
            [<Code key="3">stats_logger</Code>, "asyncio task", "Logs pipeline counts every few seconds."],
            [<Code key="4">Pixhawk listener</Code>, "OS thread", "Reads GPS + attitude from the Pixhawk over MAVLink, nonstop."],
          ]}
        />
        <Prose>
          <p>Here&apos;s how those pieces connect to the hardware and the ground:</p>
        </Prose>
        <Diagram
          src="/diagrams/mps-system-architecture.drawio.svg"
          alt="MPS architecture: the Pixhawk and GoPro connect to Python modules on the Raspberry Pi; the Pi uploads over the Rocket/NanoStation radio link to gs-backend and hawk-ai on the ground; the hawk-ai dashboard sends control commands back to the Pi."
          caption="Solid arrows carry data. The blue dashed path is control from the ground dashboard (start/stop, search-area presets, live logs). Grey links belong to other subteams."
        />
      </Section>

      {/* 04 */}
      <Section id="photo" eyebrow="04 · one photo" title="What happens to every photo.">
        <Diagram
          src="/diagrams/mps-pipeline.drawio.svg"
          alt="Per-image pipeline: fire shutter, detect new file, download, pair telemetry from the TelemetryBuffer, write JSON, upload. If the nearest telemetry sample is more than 2 seconds away, the upload is skipped."
        />
        <Steps
          items={[
            <>
              <strong>Fire the shutter.</strong>{" "}The Pi sends the GoPro an HTTP request. The instant
              it gets HTTP 200 back, it records the Pi&apos;s time and puts it in a queue, one entry
              per photo, in order.
            </>,
            <>
              <strong>Spot the new file.</strong>{" "}The worker checks the GoPro&apos;s list of files
              and picks up anything newer than the last one it handled.
            </>,
            <>
              <strong>Download it</strong>, retrying if the transfer fails.
            </>,
            <>
              <strong>Pair it with telemetry.</strong>{" "}Take that photo&apos;s time from the queue
              and look up where the plane was at that moment (section 05).
            </>,
            <>
              <strong>Write the JSON</strong>{" "}next to the image on the Pi, so nothing is lost even
              if the upload fails.
            </>,
            <>
              <strong>Upload</strong>{" "}the image and JSON to the ground server in the background, so
              a slow link never holds up the next photo.
            </>,
          ]}
        />
        <Pre title="GOPR0123_gs.json (what the ground server receives)">{`{
  "timestamp": 1758557462,
  "imgMode": "fixed",
  "telemetry": {
    "altitude": 100,
    "planeYaw": 0,
    "gps": {
      "latitude": 42.443626,
      "longitude": -76.44113
    },
    "gimOrt": { "pitch": 0, "roll": 0 }
  }
}`}</Pre>
      </Section>

      {/* 05 */}
      <Section
        id="time"
        eyebrow="05 · the time problem"
        title="Where was the plane when the shutter fired?"
      >
        <Callout>
          By the time a photo finishes downloading, the plane has already moved. The camera and the
          Pixhawk never talk to each other. So how do we know where the plane was at the exact
          moment the shutter fired?
        </Callout>
        <Prose>
          <p>
            <strong>The obvious answer doesn&apos;t work.</strong>{" "}The GoPro stamps each file with
            its own internal clock, and that clock drifts away from the Pi&apos;s. Matching on the
            file timestamp pairs photos with the wrong position. (We still record the GoPro time,
            but only so the ground server can identify the image.)
          </p>
        </Prose>
        <Diagram
          src="/images/mps/two-clocks.png"
          alt="Two timelines. On the Pi clock the shutter fires just after t=3. On the GoPro clock, the file timestamp for the same photo lands slightly later: the drift between the two clocks."
          caption="The same photo, on two clocks. The gap between them is drift, and it changes over time."
        />
        <Prose>
          <p>
            <strong>The fix: make the Pi&apos;s clock the only clock.</strong>{" "}The Pi timestamps
            both sides with the same <Code>time.time()</Code>: each photo the moment the GoPro
            confirms the shutter, and each Pixhawk reading the moment it arrives. Now the two are
            directly comparable.
          </p>
          <p>
            <strong>The rolling buffer.</strong>{" "}The Pi reads the Pixhawk every 100 ms and keeps the
            readings in a rolling buffer (a deque) that always holds the last 5 seconds of the
            plane&apos;s position. To pair a photo, it finds the reading whose timestamp is closest
            to the shutter time. If the closest one is more than 2 seconds away, the photo is marked
            &quot;no telemetry&quot; and isn&apos;t uploaded. Wrong coordinates are worse than none,
            because hawk-ai would place a target in the wrong spot.
          </p>
        </Prose>
        <Diagram
          src="/diagrams/mps-time-alignment.drawio.svg"
          alt="On the Pi clock, Pixhawk samples arrive every 100 ms into a rolling 5-second buffer. A shutter fires and the nearest sample, 45 ms away, is paired. A second shutter fires during a telemetry gap; the nearest sample is more than 2 seconds away, so the upload is skipped."
          caption="Left: a normal pairing. Right: the plane lost telemetry, so the photo is kept on the Pi but not sent."
        />
        <Callout>
          The buffer is what lets two completely separate devices, the camera and the Pixhawk, get
          matched up. Neither one talks to the other. The Pi&apos;s clock is the common thread.
        </Callout>
      </Section>

      {/* 06 */}
      <Section
        id="concurrency"
        eyebrow="06 · concurrency"
        title="Why asyncio, and where threads come in."
      >
        <Prose>
          <p>
            Almost everything MPS does is waiting: for the GoPro to respond, for
            the Pixhawk to send a reading, for the ground server to accept an upload. That makes
            asyncio a better fit than running many threads in parallel.
          </p>
        </Prose>
        <Table
          head={["", "Parallelism", "Concurrency (asyncio)"]}
          rows={[
            ["How", "Multiple workers at the same moment", "One worker that switches smartly"],
            ["Runs on", "Multiple CPU cores", "A single thread and an event loop"],
            ["Cost", "Expensive, hard to coordinate", "Lightweight, great for I/O waits"],
          ]}
        />
        <Prose>
          <p>
            With asyncio, one thread manages many tasks. When a task hits an <Code>await</Code>{" "}
            (&quot;I&apos;m waiting on something&quot;), the event loop switches to another task
            right away. There are two places this needs help:
          </p>
        </Prose>
        <Steps
          items={[
            <>
              <strong>The Pixhawk gets its own thread.</strong>{" "}Reading MAVLink blocks forever while
              it waits for the next message, and it can&apos;t be awaited, so it runs on a separate
              background thread and feeds the buffer.
            </>,
            <>
              <strong>The GoPro call gets handed off.</strong>{" "}The shutter request is a blocking
              HTTP call. <Code>asyncio.to_thread</Code> runs it on a small pool of threads Python
              manages, so the event loop stays free. When the call finishes, the capture task
              picks up where it left off.
            </>,
          ]}
        />
        <Pre title="how it's wired in the code">{`# Pixhawk: blocking MAVLink reads get their own thread
self.listener_thread = threading.Thread(
    target=self.continuous_listener, daemon=True
)

# Capture + worker run concurrently on the event loop
self.capture_task  = asyncio.create_task(self.continuous_capture())
self.consumer_task = asyncio.create_task(self.run_download_and_upload_worker())

# Inside continuous_capture: the blocking HTTP call goes to a thread pool
ok = await asyncio.to_thread(self.capture)`}</Pre>
      </Section>

      {/* 07 */}
      <Section
        id="distance-mode"
        eyebrow="07 · distance mode (teammate-led)"
        title="Only shoot over the search area."
      >
        <Prose>
          <p>
            Photos taken on the way to the search area waste radio bandwidth and give hawk-ai more
            to sort through. Distance mode watches the plane&apos;s GPS position and turns capture
            on when the plane enters the search area (a polygon of GPS coordinates) and off when it
            leaves.
          </p>
        </Prose>
        <Diagram
          src="/diagrams/mps-distance-mode.drawio.svg"
          alt="A flight path crossing a search-area polygon: capture is off outside, starts on entering the trigger radius around the area, takes a photo every N seconds inside, and stops when leaving."
          caption="Search areas are saved presets rather than corners typed in at the field: two swapped corners turn a rectangle into a bowtie and the check fails silently."
        />
      </Section>

      {/* 08 */}
      <Section id="failures" eyebrow="08 · when things break" title="What breaks, and what still works.">
        <Prose>
          <p>
            Honestly, the hardest part of this project was hardware: Rocket
            connectivity, router issues early on, flaky ethernet cables and PoE injectors, GoPro SD
            cards that were too slow to keep up. The software is built so that any one of these
            failing doesn&apos;t lose the flight:
          </p>
        </Prose>
        <Table
          head={["If this fails", "What happens", "What keeps us going"]}
          rows={[
            ["Radio link", "Uploads fail and get counted", "Every image + JSON stays on the Pi, and the GoPro SD keeps the originals. Recover after landing."],
            ["Telemetry", "Upload skipped, so hawk-ai never gets bad coordinates", "The JSON is still saved on the Pi."],
            ["One download", "Retries, then moves on", "The next photo isn't affected."],
            ["Distance mode", "Capture starts late or not at all", "The operator forces capture from the CLI or the dashboard."],
            ["The capture task", "Status shows it isn't running", "Restart it from the dashboard with one call."],
            ["Setup at the field", "–", "A preflight script checks the GoPro, Pixhawk, ground server, network, and disk space, and blocks launch if anything fails."],
          ]}
        />
      </Section>

      {/* 09 */}
      <Section id="testing" eyebrow="09 · testing" title="Bench → ground → drone → plane.">
        <Prose>
          <p>
            Each stage needs more hardware and more people, so the goal is to catch problems at the
            cheapest stage possible.
          </p>
        </Prose>
        <Steps
          items={[
            <>
              <strong>Bench (laptop + GoPro).</strong>{" "}Pairing logic, search-area geometry, and a
              stress run at 1 photo per second to make sure the worker keeps up.
            </>,
            <>
              <strong>Ground rig (full kit, no flight).</strong>{" "}Preflight passes, GPS gets a fix
              outdoors, and every photo from a 2-minute run shows up in hawk-ai with real
              coordinates.
            </>,
            <>
              <strong>Matrice (testbed drone).</strong>{" "}Positions check out over a known point and
              the link holds at altitude. In one field test over Starlink, the pipeline delivered an
              image every 5 seconds to ground and cloud processing.
            </>,
            <>
              <strong>Hermes (competition plane).</strong>{" "}Full mission rehearsals: distance mode
              starts and stops on its own, and hawk-ai finds placed targets.
            </>,
          ]}
        />
      </Section>

      {/* 10 */}
      <Section id="timeline" eyebrow="10 · timeline" title="How it got built.">
        <Reveal>
          <div className="max-w-3xl relative pl-6 border-l-2 border-line">
            {milestones.map((m) => (
              <div key={m.title} className="relative pl-4 py-2.5">
                <span className="absolute -left-[31px] top-4 inline-block h-3 w-3 rounded-full border-2 border-line bg-accent" />
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
                  {m.when}
                </div>
                <div className="font-mono text-[14px] leading-snug mt-0.5">
                  {m.href ? (
                    <Link href={m.href} className="underline decoration-pink underline-offset-2 hover:text-accent">
                      {m.title}
                    </Link>
                  ) : (
                    m.title
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 11 */}
      <Section id="learned" eyebrow="11 · what i learned" title="Takeaways.">
        <Steps
          items={[
            <>
              <strong>Concurrency vs. threads, for real.</strong>{" "}When to await, when a blocking call
              needs its own thread, and how to hand work to a thread pool without stalling the event
              loop.
            </>,
            <>
              <strong>Pick one clock.</strong>{" "}When devices can&apos;t share time, stamp everything
              on the one you control.
            </>,
            <>
              <strong>Hardware is half the job.</strong>{" "}Cables, PoE injectors, SD cards and radios
              gave us more trouble than the code did, which is why the debugging checklist and
              preflight script exist.
            </>,
            <>
              <strong>Build for the field.</strong>{" "}One-file deploys, clear logs, and a launch
              script matter as much as the core logic when you have minutes to fix something.
            </>,
          ]}
        />
        <Prose>
          <p>I learned so much, and loved seeing it all come together :)</p>
        </Prose>
      </Section>

      <LinkList links={p.links} />

      <div className="mt-20 flex items-center justify-between">
        <Link href="/projects" className="arrow-link text-sm font-mono">
          ← all projects
        </Link>
        <Link href="/suas-2026" className="arrow-link text-sm font-mono">
          SUAS 2026 →
        </Link>
      </div>
    </div>
  );
}

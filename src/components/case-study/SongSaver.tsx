import Link from "next/link";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { songSaverSections } from "@/data/siteMap";
import { Callout, Card, Code, LinkList, Pre, Prose, Section, SectionNav, Table } from "./Parts";
import Screenshot from "./Screenshot";

// The app is private and built for one person, so this page has no live link,
// demo URL, access key, or tailnet address on purpose. Don't add one.

export default function SongSaver({ project: p }: { project: Project }) {
  return (
    <div className="theme-cozy">
      <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[14px] text-muted">
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
            <div className="font-mono text-[14px] text-muted mb-3 flex flex-wrap items-center gap-2">
              <span className="tag !py-0.5 !px-2 text-[14px]">private</span>
              <span>· {p.org}</span>
              <span>· {p.year}</span>
            </div>
            <p className="font-hand text-[26px] sm:text-[30px] leading-none text-pink-ink -rotate-2 origin-left mb-3">
              made with love, for my aunt <span aria-hidden>♥</span>
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Cropped from a photo of her home screen: the icon, minus its label. */}
              <div className="relative h-16 w-16 sm:h-[88px] sm:w-[88px] shrink-0 overflow-hidden rounded-[22%] shadow-[3px_3px_0_0_var(--pink)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/song-saver/icon.jpg"
                  alt="Song Saver's app icon: a white music note with a down arrow on orange."
                  className="absolute left-[-7%] top-[-3%] w-[122%] max-w-none"
                />
              </div>
              <h1 className="display text-[44px] sm:text-[72px] leading-[0.95]">
                Song Saver<span className="text-pink">.</span>
              </h1>
            </div>
            <p className="mt-4 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
              A little app I made for my aunt.
            </p>
            <p className="mt-5 max-w-3xl font-sans text-[17px] leading-relaxed text-ink-soft">
              She isn&apos;t comfortable with technology, but she regularly needs to turn YouTube
              videos into MP3s so she can listen to them. The websites that do that are built to
              trick people, and I didn&apos;t want her getting stuck on one. So I made her an app
              of her own: paste a link, wait, save. It lives on her iPhone and iPad home screen as
              an orange music-note icon.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-white px-4 py-1.5 font-mono text-[14px]">
              <span aria-hidden className="text-pink-ink">♥</span>
              It&apos;s just for her, so there&apos;s no public link. This page is the story behind it.
            </p>
          </div>
        </Reveal>

        <SectionNav items={songSaverSections} />

        {/* STORY */}
        <Section id="story" eyebrow="the story" title="Made for one person.">
          <Prose>
            <p>
              This whole app is just for her. She regularly needs to turn
              YouTube videos into MP3s so she can listen to them, and she wants to pull the audio
              out of videos saved on her own phone, too.
            </p>
            <p>
              The sites people normally use for this, YouTube-to-MP3 converters, are built to
              trick people: pop-up ads, fake &quot;Download&quot; buttons, redirects. They&apos;re
              exactly the kind of thing that trips up someone who isn&apos;t tech-savvy. She&apos;d
              get stuck, or click the wrong thing, and I didn&apos;t want her to have to deal with
              that.
            </p>
            <p>
              So I built her something of her own. It does one thing:{" "}
              <strong>paste a link</strong> (or pick a video), <strong>wait</strong>,{" "}
              <strong>save</strong>. No ads, no fake buttons, nothing else on screen. It sits on her
              home screen and opens full screen, like any other app on her phone.
            </p>
          </Prose>
          <Reveal>
            <div className="relative mx-auto mt-4 max-w-xl -rotate-1 rounded-sm border-[1.5px] border-line bg-white px-6 pt-8 pb-6 shadow-[5px_5px_0_0_var(--pink)] sm:px-10">
              <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
              <p className="font-mono text-[14px] text-ink-soft">
                the question behind every decision
              </p>
              <p className="mt-2 font-hand text-[34px] sm:text-[40px] leading-[1.05] text-ink">
                Could my aunt do this alone, without calling me?
              </p>
            </div>
          </Reveal>
        </Section>

        {/* DESIGN */}
        <Section
          id="design"
          eyebrow="designing for one person"
          title="Every choice, made with her in mind."
          intro="Every screen had to pass the same test: could she do it alone?"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Card title="One big button per step" tag="no long-press">
              <p>
                A <strong className="text-ink">Paste link</strong>{" "}button reads the clipboard for her,
                so she never has to press and hold a text field. Large type, high contrast, and
                numbered instructions in plain words: &quot;In YouTube, tap Share, then Copy
                link.&quot;
              </p>
            </Card>
            <Card title="Progress she can understand" tag="in words">
              <p>
                &quot;Getting your song… 42%&quot;, then &quot;Making your MP3…&quot;, with a
                progress bar, so she can see it&apos;s working.
              </p>
            </Card>
          </div>

          <Prose>
            <p>
              <strong>Kind, plain words when something goes wrong.</strong>{" "}Instead of a technical
              error, the app tells her what happened in words she&apos;d use:
            </p>
          </Prose>
          <Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ["if the video is private", "That video is private, so it can’t be saved."],
                ["if the video has no audio", "That video doesn’t have any sound."],
                ["if my PC can’t be reached", "Can’t reach Song Saver right now. The computer it runs on may be off."],
              ].map(([when, msg]) => (
                <figure key={when}>
                  <figcaption className="mb-2 font-mono text-[14px] text-muted">
                    {when}
                  </figcaption>
                  <blockquote className="rounded-2xl rounded-bl-sm border-[1.5px] border-line bg-white px-4 py-3 font-display text-[17px] leading-snug shadow-[3px_3px_0_0_var(--pink)]">
                    {msg}
                  </blockquote>
                </figure>
              ))}
            </div>
          </Reveal>

          <Prose>
            <p>
              <strong>Saving that works the iPhone way.</strong>{" "}iOS doesn&apos;t let you add MP3s
              to the Music app from the phone itself. So the app hands the finished file straight
              to the iOS share sheet, where she taps &quot;Save to Files&quot;, and the song lands
              in the Files app.
            </p>
            <p>
              <strong>A home-screen web app, not an App Store app.</strong>
            </p>
          </Prose>
          <Table
            head={["Option", "Why it lost / won"]}
            rows={[
              ["App Store app", "Apple doesn't allow YouTube downloaders in the App Store."],
              ["Sideloading", "Needs a $99/year Apple developer account."],
              [
                <strong key="web" className="text-accent">Home-screen web app ✓</strong>,
                "Gets an icon and full-screen launch for free, and updates the moment I change the code.",
              ],
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {[
              {
                name: "start",
                label: "start screen",
                alt: "Song Saver's start screen on an iPhone, with a big Paste link button and numbered instructions in plain words.",
                caption: "Start: one big button, and the steps in plain words.",
              },
              {
                name: "progress",
                label: "progress screen",
                alt: "Song Saver's progress screen on an iPhone, showing \"Sending your video… 42%\" with a progress bar and a note to keep the screen open.",
                caption: "Waiting: uploading a video from her phone, in words, with a bar.",
              },
              {
                name: "save",
                label: "“Save to my phone” screen",
                alt: "Song Saver's finished screen on an iPhone, with a big Save to my phone button.",
                caption: "Done: one tap opens the share sheet.",
              },
            ].map((s) => (
              <div key={s.name} className="mx-auto w-full max-w-[280px]">
                <Screenshot
                  dir="images/song-saver"
                  name={s.name}
                  label={s.label}
                  size="iPhone screenshot, portrait"
                  aspect="aspect-[1179/2556]"
                  alt={s.alt}
                  caption={s.caption}
                  phone
                />
              </div>
            ))}
          </div>
        </Section>

        {/* HOW IT WORKS */}
        <Section
          id="how"
          eyebrow="how it works"
          title="Her phone, my PC, and a private link between them."
        >
          <Pre title="the whole path, from her tap to a saved MP3">{`Her iPhone/iPad (home-screen web app)
   → private network link (Tailscale)
   → my Windows PC: Flask server
       → yt-dlp downloads the audio   (YouTube links)
       → ffmpeg converts to MP3       (YouTube audio or uploaded phone videos)
   → MP3 sent back → iOS share sheet → Save to Files`}</Pre>
          <Prose>
            <p>
              <strong>Why it&apos;s private.</strong>{" "}I first tried Tailscale Funnel, which gives
              the app a public URL, but its public DNS record never propagated on my new account.
              Instead of fighting it, I installed Tailscale on her devices. That turned out better:
              the app is fully private, and nothing is reachable from the public internet. On top
              of that, access is gated by a secret key in her home-screen link.
            </p>
          </Prose>
        </Section>

        {/* PROBLEMS */}
        <Section
          id="problems"
          eyebrow="problems i hit"
          title="Four things that were harder than they looked."
          intro="The parts she never has to see."
        >
          <Problem n="01" title="Cloud hosting doesn't work for this.">
            <p>
              YouTube blocks requests from cloud and datacenter IPs (Vercel, AWS, and so on) with
              &quot;confirm you&apos;re not a bot&quot; errors. Serverless platforms also time out
              long conversions and can&apos;t easily run ffmpeg.
            </p>
            <p>
              A home internet connection doesn&apos;t get blocked, so the architecture became
              <strong> home server + secure tunnel</strong>: the server runs on my PC, and her
              devices reach it through Tailscale.
            </p>
          </Problem>

          <Problem n="02" title="YouTube changed the rules while I was building.">
            <p>
              Partway through, yt-dlp started needing a JavaScript runtime to unlock most of
              YouTube&apos;s video formats. I wired in Node.js and the <Code>yt-dlp-ejs</Code>{" "}
              solver package.
            </p>
            <p>
              It&apos;s also why yt-dlp runs as a subprocess and updates itself every 24 hours.
              YouTube regularly breaks old versions, and a subprocess picks up the new version
              without restarting the server.
            </p>
          </Problem>

          <Problem n="03" title="Saving a file on iOS is harder than it sounds.">
            <p>
              Plain download links are unreliable inside a home-screen web app on iPhone. Instead,
              the page fetches the finished MP3 into memory first. When she taps{" "}
              <strong>Save to my phone</strong>, it hands the file to the native share sheet with
              the Web Share API, and she taps &quot;Save to Files&quot;.
            </p>
          </Problem>

          <Problem n="04" title="Uploading big phone videos over a weak cell signal.">
            <p>
              Phone videos can be hundreds of MB. Uploads go in 4 MB chunks, with offset-based
              resume:
            </p>
          </Problem>
          <Table
            head={["When", "What happens"]}
            rows={[
              ["A chunk is re-sent", "The server truncates the file at that offset and overwrites it."],
              ["A chunk arrives out of order", <>The server rejects it with a <Code key="409">409</Code>.</>],
              ["A chunk fails", "The phone retries it, with backoff."],
            ]}
          />
          <Callout>
            One dropped connection doesn&apos;t restart a 300 MB upload, and every request stays
            under proxy limits like Cloudflare&apos;s 100 MB per request.
          </Callout>
        </Section>

        {/* STACK */}
        <Section
          id="stack"
          eyebrow="under the hood"
          title="The stack."
          intro="One Python server, one HTML file, and a handful of tools that each do one job."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card title="Backend" tag="Python 3.12">
              <p>Flask, served by Waitress, a production WSGI server that runs on Windows.</p>
            </Card>
            <Card title="Media" tag="yt-dlp + ffmpeg">
              <p>
                yt-dlp runs as a subprocess, with Node.js as the JavaScript runtime YouTube now
                requires. ffmpeg encodes 192 kbps MP3s, with the title, artist, and thumbnail
                embedded as album art.
              </p>
            </Card>
            <Card title="Frontend" tag="no framework">
              <p>
                One HTML file with vanilla JS and CSS. A web app manifest and Apple touch icon for
                home-screen install, the Clipboard API for one-tap paste, and the Web Share API to
                share files for &quot;Save to Files&quot;.
              </p>
            </Card>
            <Card title="Networking" tag="Tailscale">
              <p>A private network with automatic HTTPS. Nothing is exposed to the public internet.</p>
            </Card>
            <Card title="Ops" tag="Windows">
              <p>
                Task Scheduler starts the server at login and restarts it if it crashes. yt-dlp
                updates itself every 24 hours. Converted files are deleted after 2 hours, and access
                needs the secret key in her home-screen link.
              </p>
            </Card>
            <Card title="App icon" tag="no dependencies">
              <p>
                The orange music-note icon is drawn by a small Python script that writes the PNG
                directly, without any image libraries.
              </p>
            </Card>
          </div>
        </Section>

        {/* WHAT'S NEXT */}
        <Section id="next" eyebrow="what's next" title="Handing it over.">
          {/* TODO(Sandra): replace with how my aunt reacted and how she uses it, once she's tried it. */}
          {process.env.NODE_ENV === "development" && (
            <Reveal>
              <div className="max-w-3xl rounded-lg border-2 border-dashed border-accent bg-cream-2 px-5 py-4 font-sans text-[16px] leading-relaxed">
                <span className="text-[14px] text-pink-ink">
                  TODO (only shows in local dev)
                </span>
                <br />
                How my aunt reacted and how she uses it. Edit the &quot;what&apos;s next&quot; section
                in src/components/case-study/SongSaver.tsx.
              </div>
            </Reveal>
          )}
          <Prose>
            <p>
              My aunt hasn&apos;t tried it yet, and I&apos;m so excited to show her. I&apos;ll
              update this once she has. The real test is the same question as always: can she do
              it without calling me? (She&apos;s always welcome to call anyway.)
            </p>
          </Prose>
          <Reveal>
            <p className="font-hand text-[30px] leading-none text-pink-ink -rotate-2 pl-1">
              made with love, Sandra <span aria-hidden>♥</span>
            </p>
          </Reveal>
        </Section>

        <LinkList links={p.links} />

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

// One engineering problem: a number, a headline, and the story.
function Problem({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="max-w-3xl border-t-[1.5px] border-line pt-4">
        <div className="font-mono text-[14px] text-pink-ink">{n}</div>
        <h3 className="font-display text-xl sm:text-2xl mt-1">{title}</h3>
        <div className="mt-3 space-y-3 font-sans text-[17px] leading-[1.75] text-ink-soft [&_strong]:text-ink [&_strong]:font-semibold">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

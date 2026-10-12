import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { bbqSections } from "@/data/siteMap";
import { Callout, Card, Code, LinkList, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";

const LIVE = "https://www.bbqlandma.com";

export default function BbqLand({ project: p }: { project: Project }) {
  return (
    <div className="theme-ember">
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
              <span className="tag !py-0.5 !px-2 text-[10px]">live</span>
              <span>· {p.org}</span>
              <span>· {p.year}</span>
            </div>
            <h1 className="display text-[44px] sm:text-[72px] leading-[0.95]">
              BBQ Land<span className="text-pink">.</span>
            </h1>
            <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
              A website for a restaurant that didn&apos;t have one.
            </p>
            <p className="mt-5 max-w-3xl font-mono text-[15px] leading-relaxed text-ink-soft">
              BBQ Land is a new Asian grill &amp; barbecue restaurant in Shrewsbury, MA, opening
              its doors in October 2026. It had no web presence at all, so I designed and built
              its website from scratch, took the photos, and launched it on its own domain while
              the restaurant was still in soft opening.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={LIVE}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-line bg-accent px-5 py-3 font-mono text-[15px] text-cream shadow-[4px_4px_0_0_var(--line)] transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--line)]"
              >
                Visit the live site ↗
              </a>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[13px] underline decoration-pink underline-offset-4 hover:text-accent"
              >
                source on GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <Screenshot
            name="home-hero-desktop"
            label="(a) desktop · home page hero"
            size="1440 × 900 browser window"
            aspect="aspect-[16/10]"
            alt="The BBQ Land home page on a desktop browser: the storefront hero with the slogan Where Fire Meets Flavor."
            caption={
              <>
                The home page: a storefront hero with rising embers and the slogan &quot;Where Fire
                Meets Flavor&quot; in brush stroke.
              </>
            }
          />
        </div>

        <Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="6" label="pages, for a restaurant that had none" />
            <Stat value="0" label="frameworks or build steps: plain HTML, CSS, JS" />
            <Stat value="2" label="sizes of every photo, ~2048 and ~900 px wide" />
            <Stat value="1" label="hours config behind every hours table and the Open now badge" />
          </div>
        </Reveal>

        <SectionNav items={bbqSections} />

        {/* OVERVIEW */}
        <Section id="overview" eyebrow="overview" title="What it is.">
          <Prose>
            <p>
              BBQ Land, Asian Grill &amp; Barbecue is a modern Asian yakiniku restaurant, where you
              grill at the table, at 31 Boston Turnpike in Shrewsbury, MA. It soft-opened in October
              2026, and the grand opening is October 21.
            </p>
            <p>
              The site is six pages of plain HTML, CSS, and JavaScript, with no framework and no
              build step. It&apos;s hosted on Vercel and deploys automatically from GitHub.
            </p>
            <p>
              <strong>My role.</strong>{" "}Sole designer and developer. I planned and built every
              page, working directly with the restaurant&apos;s management on content and review.
              I also photographed the restaurant, transcribed the printed menu, and handled the
              launch.
            </p>
          </Prose>
          <Reveal>
            <div className="flex flex-wrap gap-2 font-mono text-[13px]">
              {["Home", "Menu", "Drinks", "About", "Savenor's", "Visit"].map((page) => (
                <span key={page} className="rounded-md border-[1.5px] border-line bg-cream-2 px-3 py-1">
                  {page}
                </span>
              ))}
            </div>
            <p className="mt-3 font-mono text-[12.5px] text-ink-soft">
              Savenor&apos;s is the restaurant&apos;s butcher, and it gets a page of its own.
            </p>
          </Reveal>
        </Section>

        {/* MENU */}
        <Section
          id="menu"
          eyebrow="the menu"
          title="The printed menu, made searchable."
          intro="I transcribed the restaurant's printed menu into a web menu you can search and filter."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card title="Sticky section tabs" tag="scroll-spy">
              <p>The section tabs stay pinned as you scroll, and the one you&apos;re in lights up.</p>
            </Card>
            <Card title="Live search" tag="as you type">
              <p>The menu filters as you type, with the matching text highlighted in each dish.</p>
            </Card>
            <Card title="Filters" tag="one tap">
              <p>Show only the chef&apos;s picks, or only vegetarian dishes.</p>
            </Card>
            <Card title="Grill sets" tag="per person">
              <p>Each grill-set card has a party-size toggle that recomputes the price per person.</p>
            </Card>
            <Card title="The paper menu" tag="lightbox">
              <p>Photos of the printed menu open in a lightbox that works with the keyboard or a swipe.</p>
            </Card>
          </div>
          <div className="grid md:grid-cols-[1fr_240px] gap-6 items-start">
            <Screenshot
              name="menu-desktop"
              label="(b) menu page"
              size="1440 × 900 browser window"
              aspect="aspect-[16/10]"
              alt="The BBQ Land menu page on a desktop browser, with section tabs, search, and filters."
              caption="The menu, scrolled to Beef: the sticky tabs highlight the section you're in."
            />
            <Screenshot
              name="home-phone"
              label="(c) phone width"
              size="390 × 844 phone"
              aspect="aspect-[390/844]"
              alt="The BBQ Land website on a phone-width screen."
              caption="The home page on a phone."
            />
          </div>
        </Section>

        {/* SELF-UPDATING */}
        <Section
          id="self-updating"
          eyebrow="self-updating"
          title="Parts that keep themselves current."
          intro="Hours and the grand opening are the details most likely to go stale, so the site works them out on its own."
        >
          <Steps
            items={[
              <>
                <strong>One hours config.</strong>{" "}The restaurant&apos;s hours live in a single
                config, and both the hours table and the &quot;Open now / Closed&quot; badge are
                generated from it.
              </>,
              <>
                <strong>Eastern time.</strong>{" "}Whether the restaurant is open is computed in
                Eastern time, whatever time zone the visitor&apos;s device is in.
              </>,
              <>
                <strong>One-line updates.</strong>{" "}Changing a day&apos;s hours is a one-line
                edit, and every hours table and the badge follow.
              </>,
            ]}
          />
          <Table
            head={["When (Eastern time)", "The banner says"]}
            rows={[
              ["Until Oct 20", <Code key="soft">Now in soft opening · N days to go</Code>],
              ["Oct 20", <Code key="tomorrow">Grand opening tomorrow</Code>],
              ["Oct 21, 2026", <Code key="today">Grand opening today!</Code>],
              ["After", <Code key="open">Now open</Code>],
            ]}
          />
        </Section>

        {/* PHOTOS */}
        <Section
          id="photos"
          eyebrow="photos"
          title="I took the photos too."
          intro="I photographed the food, the interior, the printed menu, and the sauce card, then turned them into an optimized image set."
        >
          <div className="grid sm:grid-cols-3 gap-5">
            <Card title="Two sizes per photo" tag="srcset">
              <p>
                Every photo comes in two sizes, about 2048 px and 900 px wide, and the browser
                picks the right one with a responsive <Code>srcset</Code>.
              </p>
            </Card>
            <Card title="Gallery" tag="masonry">
              <p>A hand-tuned masonry grid, with a lightbox for viewing photos full size.</p>
            </Card>
            <Card title="House favorites" tag="hover">
              <p>Hover a dish in the list and the photo swaps to show it.</p>
            </Card>
          </div>
        </Section>

        {/* DETAILS */}
        <Section id="details" eyebrow="details" title="The small stuff.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card title="Storefront hero">
              <p>Rising embers behind a brush-stroke slogan: &quot;Where Fire Meets Flavor.&quot;</p>
            </Card>
            <Card title="Manifesto">
              <p>Lights up word by word as you scroll through it.</p>
            </Card>
            <Card title="3D tilt cards">
              <p>Cards tilt in 3D as the cursor moves across them.</p>
            </Card>
            <Card title="Magnetic buttons">
              <p>Buttons follow the cursor a little while you hover them.</p>
            </Card>
            <Card title="Count-up numbers">
              <p>Numbers count up when they scroll into view.</p>
            </Card>
          </div>
          <Callout>
            All of it respects <Code>prefers-reduced-motion</Code>, so the animations stay still for
            visitors who&apos;ve turned motion off.
          </Callout>
        </Section>

        {/* LAUNCH */}
        <Section
          id="launch"
          eyebrow="launch"
          title="Getting it online."
          intro="I handled the launch too: the domain, deployment, and getting the site set up on Google search."
        >
          <Steps
            items={[
              <>
                <strong>Domain.</strong>{" "}The site lives at bbqlandma.com, its own custom domain.
              </>,
              <>
                <strong>Deploys.</strong>{" "}Hosted on Vercel, with a new deploy every time I push
                to GitHub.
              </>,
              <>
                <strong>Search.</strong>{" "}Set up in Google Search Console, with schema.org{" "}
                <Code>Restaurant</Code> structured data (hours, address, menu, and other names the
                restaurant goes by), a sitemap, and canonical URLs.
              </>,
              <>
                <strong>Link previews.</strong>{" "}Open Graph tags, so a shared link shows a preview
                card.
              </>,
            ]}
          />
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

const SHOT_DIR = "images/bbq-land";

// A screenshot from public/images/bbq-land/. Until the file is added, a
// labeled placeholder shows where it goes. Checked at build time.
function Screenshot({
  name,
  label,
  size,
  aspect,
  alt,
  caption,
}: {
  name: string;
  label: string;
  size: string;
  aspect: string;
  alt: string;
  caption: ReactNode;
}) {
  const file = [".png", ".jpg", ".webp"]
    .map((ext) => `${SHOT_DIR}/${name}${ext}`)
    .find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));

  return (
    <Reveal>
      <figure>
        {file ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/${file}`}
            alt={alt}
            loading="lazy"
            className="block w-full h-auto rounded-lg border-[1.5px] border-line bg-white"
          />
        ) : (
          <div
            className={`${aspect} flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-accent bg-cream-2 p-4 text-center font-mono`}
          >
            <span className="text-[10.5px] uppercase tracking-widest text-pink-ink">
              screenshot placeholder
            </span>
            <span className="font-display text-lg leading-tight">{label}</span>
            <span className="text-[11.5px] text-ink-soft break-all">
              public/{SHOT_DIR}/{name}.png
            </span>
            <span className="text-[11px] opacity-60">{size}</span>
          </div>
        )}
        <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}

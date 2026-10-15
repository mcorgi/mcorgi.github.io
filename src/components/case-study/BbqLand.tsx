import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { bbqSections } from "@/data/siteMap";
import { Card, Code, LinkList, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";
import Screenshot from "./Screenshot";

const LIVE = "https://www.bbqlandma.com";

export default function BbqLand({ project: p }: { project: Project }) {
  return (
    <div className="theme-bbq">
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
              <span className="tag !py-0.5 !px-2 text-[14px]">live</span>
              <span>· {p.org}</span>
              <span>· {p.year}</span>
            </div>
            <h1 className="display text-[44px] sm:text-[72px] leading-[0.95]">
              BBQ Land
            </h1>
            <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
              A website for a restaurant that didn&apos;t have one.
            </p>
            <p className="mt-5 max-w-3xl font-sans text-[17px] leading-relaxed text-ink-soft">
              BBQ Land is a new Asian grill &amp; barbecue restaurant in Shrewsbury, MA. It had no
              web presence at all, so I designed and built its website from scratch and launched
              it during soft opening. The next day the owner sent feedback, and I redesigned the
              whole site around it. This page is about the version that&apos;s live now.
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
                className="font-mono text-[14px] underline decoration-pink underline-offset-4 hover:text-accent"
              >
                source on GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <Screenshot
            dir="images/bbq-land"
            name="home-hero-desktop"
            label="(a) desktop · home page hero"
            size="1440 × 900 browser window"
            aspect="aspect-[16/10]"
            alt="The BBQ Land home page on a desktop browser: a video of wagyu on the grill behind the slogan Where Fire Meets Flavor, with the visit and hours bar beneath it."
            caption="The home page: a grilling video behind the slogan, with the visit & hours bar underneath."
          />
        </div>

        <Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="4" label="pages: Home, Menu, Reservations, About" />
            <Stat value="0" label="frameworks or build steps: still plain HTML, CSS, JS" />
            <Stat value="75" label="of 76 dishes link to their own Toast ordering page, plus all 4 signature sets" />
            <Stat value="1" label="hours config behind the hours and the Open now line" />
          </div>
        </Reveal>

        <SectionNav items={bbqSections} />

        {/* OVERVIEW */}
        <Section id="overview" eyebrow="overview" title="What it is">
          <Prose>
            <p>
              BBQ Land, Asian Grill &amp; Barbecue is a modern Asian yakiniku restaurant, where you
              grill at the table, at 31 Boston Turnpike in Shrewsbury, MA. It&apos;s in soft opening
              now, and the grand opening is Monday, November 16.
            </p>
            <p>
              The first version of the site went live around October 11. The next day the owner
              sent written feedback and a mockup of the layout they wanted, so I took the site down
              to a maintenance page and redesigned it the same day. The redesign went live on
              October 12.
            </p>
            <p>
              It&apos;s four pages of plain HTML, CSS, and JavaScript, with no framework and no
              build step, hosted on Vercel and deployed automatically from GitHub.
            </p>
            <p>
              <strong>My role.</strong>{" "}Sole designer and developer. I planned and built every
              page, working directly with the restaurant&apos;s owner on content and review. I also
              transcribed the menu and handled the launch.
            </p>
          </Prose>
          <Reveal>
            <div className="flex flex-wrap gap-2 font-mono text-[14px]">
              {["Home", "Menu", "Reservations", "About"].map((page) => (
                <span key={page} className="rounded-md border-[1.5px] border-line bg-cream-2 px-3 py-1">
                  {page}
                </span>
              ))}
            </div>
            <p className="mt-3 max-w-3xl font-mono text-[14px] text-ink-soft">
              The old Contact, Drinks, and Savenor&apos;s pages redirect to Reservations, the
              menu&apos;s drinks section, and About, so existing links and Google results still
              work.
            </p>
          </Reveal>
        </Section>

        {/* MENU */}
        <Section
          id="menu"
          eyebrow="the menu"
          title="Printed menus up top, a clickable list below"
          intro="I rebuilt the menu page around two things: the restaurant's own printed menus, and a list where every dish goes straight to ordering."
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Card title="Printed menus" tag="PDF → images">
              <p>
                At the top, the printed menus are converted from PDF to images, with a Dinner /
                Lunch switch. Lunch shows the English and Chinese pages side by side. Each has an
                &quot;Open full size&quot; link and a PDF download.
              </p>
            </Card>
            <Card title="A clickable list" tag="Toast">
              <p>
                Below that, every dish is listed as text and links straight to its own item page on
                Toast for pickup orders. I pulled each item&apos;s link from the restaurant&apos;s
                Toast online-ordering page and matched them by menu code. The one dish Toast
                doesn&apos;t list stays plain text.
              </p>
            </Card>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card title="Sticky section tabs" tag="kept">
              <p>The tabs stay pinned and follow your scroll position.</p>
            </Card>
            <Card title="Chef's picks & vegetarian" tag="kept">
              <p>Markers on the dishes, like on the printed menu.</p>
            </Card>
            <Card title="Dipping-sauce guide" tag="new">
              <p>A guide to the dipping sauces and seasonings.</p>
            </Card>
            <Card title="Allergy notice" tag="new">
              <p>At the top of the page, before anyone orders.</p>
            </Card>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Screenshot
              dir="images/bbq-land"
              name="menu-desktop"
              label="(b) menu page · printed menu"
              size="1440 × 900 browser window"
              aspect="aspect-[16/10]"
              alt="The BBQ Land menu page on a desktop browser: Dinner and Lunch tabs above the restaurant's printed dinner menu."
              caption="The top of the menu page: the printed dinner menu, with the Dinner / Lunch switch."
            />
            <Screenshot
              dir="images/bbq-land"
              name="menu-list-desktop"
              label="(c) menu page · dish list"
              size="1440 × 900 browser window"
              aspect="aspect-[16/10]"
              alt="Further down the BBQ Land menu page: sticky section tabs, and dishes listed with codes, prices, and Order links to Toast."
              caption="Further down: every dish has an Order link to its own Toast page."
            />
          </div>
          <p className="max-w-3xl font-mono text-[14px] text-ink-soft">
            Gone from the first version: live search, the filters, the per-person price toggle,
            and the lightbox.
          </p>
        </Section>

        {/* SELF-UPDATING */}
        <Section
          id="self-updating"
          eyebrow="self-updating"
          title="Parts that keep themselves current"
          intro="Hours and the grand opening are the details most likely to go stale, so the site works them out on its own."
        >
          <Steps
            items={[
              <>
                <strong>One hours config.</strong>{" "}The restaurant&apos;s hours live in a single
                config, and both the hours and the &quot;Open now / Closed&quot; line are generated
                from it.
              </>,
              <>
                <strong>Eastern time.</strong>{" "}Whether the restaurant is open is computed in
                Eastern time, whatever time zone the visitor&apos;s device is in.
              </>,
            ]}
          />
          <Table
            head={["When (Eastern time)", "The grand-opening line says"]}
            rows={[
              ["Until Nov 15", <Code key="soft">Soft opening now · Grand opening Monday, November 16</Code>],
              ["Nov 16, 2026", <Code key="today">Grand opening today</Code>],
              ["Nov 17 – 22", <Code key="open">Now open</Code>],
              ["After that", "Nothing. The line hides itself."],
            ]}
          />
        </Section>

        {/* PHOTOS & VIDEO */}
        <Section
          id="photos"
          eyebrow="photos & video"
          title="Professional photos, ready for the web"
          intro="The redesign uses the restaurant's professional food photos and clean interior shots. My part was getting them, the logo, and the hero video ready for the site."
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Card title="Two sizes per photo" tag="srcset">
              <p>
                Converted from HEIC and JPEG with ImageMagick into two sizes, about 2200 px and
                960 px wide, served through a responsive <Code>srcset</Code>.
              </p>
            </Card>
            <Card title="A clean logo" tag="recut">
              <p>
                I recut the logo from the owner&apos;s original artwork. The first version&apos;s
                was cut from a photo of a business card.
              </p>
            </Card>
            <Card title="The hero video" tag="~29 s loop">
              <p>
                I joined two vertical phone clips of wagyu and kalbi on the grill into one silent,
                roughly 29-second loop with a crossfade. Desktop gets a 4:3 crop, compressed from
                15 MB to 4.9 MB, and phones get the vertical version (3.8 MB).
              </p>
            </Card>
            <Card title="Polite playback" tag="pause button">
              <p>
                It has a pause button, and it doesn&apos;t autoplay for visitors who have reduced
                motion or data-saver turned on.
              </p>
            </Card>
          </div>
          <p className="max-w-3xl font-mono text-[14px] text-ink-soft">
            Gone from the first version: the masonry gallery, its lightbox, and the
            hover-to-swap favorites.
          </p>
        </Section>

        {/* DESIGN DIRECTION */}
        <Section
          id="design"
          eyebrow="design direction"
          title="High-end and minimal"
          intro="The owner asked for a &quot;high-end, minimalist&quot; look, so the first version's effects came out: the rising embers, the word-by-word manifesto, the 3D tilt cards, the magnetic buttons, and the count-up numbers."
        >
          <div className="grid md:grid-cols-[1fr_240px] gap-8 items-start">
            <div className="space-y-6">
              <Card title="Palette" tag="used sparingly">
                <p>
                  Warm paper and charcoal, with seal red used sparingly and a thin brass line taken
                  from the brass grill rings.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    ["paper", "#f2efe9"],
                    ["charcoal", "#0e0d0c"],
                    ["seal red", "#d62328"],
                    ["brass", "#c4a46a"],
                  ].map(([name, hex]) => (
                    <div key={name} className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-7 w-7 rounded-md border-[1.5px] border-line"
                        style={{ background: hex }}
                      />
                      <span className="text-[14px]">
                        {name} <span className="text-muted">{hex}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="Fonts" tag="three, each with a job">
                <p>
                  Cormorant Garamond for headings, Jost for body text, and Shippori Mincho for the
                  Japanese slogan line, <span lang="ja">火と旨味の、出会い</span>.
                </p>
              </Card>
              <Card title="Home page order" tag="from the owner's mockup">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 pt-1">
                  {[
                    "video hero",
                    "visit & hours bar",
                    "the menu",
                    "chef-curated sets",
                    "“Our Standard” story",
                    "inside BBQ Land gallery",
                    "Instagram",
                    "closing banner",
                  ].map((step, i, all) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-md border border-line/40 bg-cream-2 px-2 py-0.5 text-ink">
                        {step}
                      </span>
                      {i < all.length - 1 && <span aria-hidden className="text-pink-ink">→</span>}
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
            <div className="mx-auto w-full max-w-[240px]">
              <Screenshot
                dir="images/bbq-land"
                name="home-phone"
                label="(d) phone width"
                size="390 × 844 phone"
                aspect="aspect-[390/844]"
                alt="The BBQ Land home page on a phone: the grilling video behind the slogan, the Open / Closed line, the grand-opening date, and Call to reserve and View menu buttons."
                caption="The home page on a phone."
              />
            </div>
          </div>
        </Section>

        {/* ROUND TWO */}
        <Section
          id="feedback"
          eyebrow="round two"
          title="Round two: client feedback"
          intro="The day after launch, the owner sent written feedback and a mockup of the layout they wanted. I took the site down to a maintenance page and redesigned it the same day. Here's what they asked for, and what I changed."
        >
          <Table
            head={["They asked for", "What I did"]}
            rows={[
              ["A grilling video in the banner", "Built a ~29-second loop from two phone clips of wagyu and kalbi on the grill, with a desktop cut and a phone cut."],
              ["Professional photos only, no phone shots with messy backgrounds", "Swapped in the restaurant's professional food and interior photos."],
              ["The PDF menu instead of photos of the printed menu", "Converted the PDF menus to images, with Open full size and PDF download links."],
              ["No “Journey” section", "Removed it."],
              ["Only a brief mention of their butcher", "Dropped the Savenor's page. Savenor's now comes up briefly in the restaurant's own story, and the old URL points to About."],
              ["The corrected phone number, (508) 719-8105", "Updated it everywhere, including the structured data Google reads."],
              ["An Instagram link", "Added it to the site, and to the structured data along with Facebook."],
              ["A “high-end, minimalist” look", "Removed the effects, and moved to warm paper and charcoal with sparing red, a thin brass line, and serif headings."],
              ["Nothing goes live until they approve", "The site sat on a maintenance page during the redesign."],
            ]}
          />
          <Prose>
            <p>
              <strong>The mockup.</strong>{" "}I followed its structure, but designed my own visual
              style for the &quot;high-end, minimalist&quot; look they asked for.
            </p>
          </Prose>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Screenshot
              dir="images/bbq-land"
              name="v1-home-hero"
              label="before · first version"
              size="1440 × 900 browser window"
              aspect="aspect-[16/10]"
              alt="The first version of the BBQ Land home page: a phone photo of the storefront sign behind a brush-stroke slogan, Where Fire Meets Flavor."
              caption="Before: the first version, with rising embers over a phone photo of the storefront."
            />
            <Screenshot
              dir="images/bbq-land"
              name="home-hero-desktop"
              label="after · redesign"
              size="1440 × 900 browser window"
              aspect="aspect-[16/10]"
              alt="The redesigned BBQ Land home page: a grilling video behind the slogan, with the visit and hours bar beneath it."
              caption="After: the redesign, live since October 12."
            />
          </div>
        </Section>

        {/* LAUNCH */}
        <Section
          id="launch"
          eyebrow="launch"
          title="Getting it online"
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
                <strong>Maintenance page.</strong>{" "}During the redesign, the site sat on a
                maintenance page.
              </>,
              <>
                <strong>Redirects.</strong>{" "}The old Contact, Drinks, and Savenor&apos;s URLs
                redirect to the new pages, so old links and search results still land somewhere
                useful.
              </>,
              <>
                <strong>Search.</strong>{" "}Set up in Google Search Console, with schema.org{" "}
                <Code>Restaurant</Code> structured data, a sitemap, and canonical URLs. After the
                redesign, I updated the sitemap and structured data for the new pages and phone
                number, and added Instagram and Facebook.
              </>,
              <>
                <strong>Reservations.</strong>{" "}The Reservations page offers online booking
                through Toast, alongside the phone number.
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

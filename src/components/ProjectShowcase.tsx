"use client";

import Link from "next/link";
import FeaturedProject from "@/components/FeaturedProject";
import { PlaneBanner } from "@/components/Illustrations";
import {
  AnalyticsCard,
  BbqCard,
  CamelCard,
  EmbeddedCard,
  SongSaverCard,
} from "@/components/ProjectCards";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

const mps = projects.find((p) => p.slug === "mini-plane-system")!;

// The home page's projects: MPS full size, then compact cards three across,
// the SUAS banner, and two more compact cards side by side.
export default function ProjectShowcase() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 mt-8">
        <h2 className="display text-3xl sm:text-4xl pb-6 border-b-[1.5px] border-line">
          Projects
        </h2>
        <Reveal className="py-12">
          <div className="lift">
            <FeaturedProject project={mps} badge="★ my proudest project" />
          </div>
        </Reveal>
        <div className="grid gap-x-8 gap-y-10 pt-2 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <AnalyticsCard />
          <EmbeddedCard />
          <CamelCard />
        </div>
      </section>

      <SuasBanner />

      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 [&>*]:min-w-0">
          <BbqCard />
          <SongSaverCard />
        </div>
      </section>
    </>
  );
}

// SUAS 2026, one line per day. Every entry is from the /suas-2026 page.
const flightLog: [string, string][] = [
  ["MON", "Safety inspection. Passed on the first try, at 34.9 lb."],
  ["TUE", "Our first autonomous takeoff at a competition: 4 laps at 96 mph. Then the tail came off."],
  ["WED", "Setup in 3:00, our record. Then it tipped onto a prop on auto-takeoff."],
  ["THU", "Awards: 4th for website, 11th for design report, 38th in the mission."],
];

// SUAS 2026: a thin banner across the whole page, with a plane towing a flag
// from left to right along the top.
export function SuasBanner() {
  return (
    <Reveal>
      <section aria-labelledby="suas-banner" className="relative my-14 py-5">
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-y-2.5 bg-pink" />
          <div className="surface-dark relative border-y-[1.5px] border-line text-cream">
            <PlaneBanner flag="CUAir · SUAS 2026" />
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-7 lg:grid-cols-[1fr_1.9fr] lg:items-start">
              <div>
                <div className="font-mono text-[14px] opacity-80">Skyway Range, Tulsa · Sep 14–17, 2026</div>
                <h2 id="suas-banner" className="display mt-2 text-3xl sm:text-4xl">
                  On the flightline at SUAS 2026
                </h2>
                <p className="mt-3 max-w-[48ch] font-sans text-[16px] leading-relaxed opacity-90">
                  I was CUAir&apos;s Intelligence operator, the one person running our imaging
                  pipeline during live missions. It didn&apos;t all go well.
                </p>
                <Link
                  href="/suas-2026"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border-[1.5px] border-cream px-4 py-2 font-mono text-sm hover:bg-cream hover:text-ink transition-colors"
                >
                  the whole week →
                </Link>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 font-sans text-[15px] leading-snug sm:grid-cols-4">
                {flightLog.map(([day, entry]) => (
                  <div key={day} className="border-t border-cream/20 pt-3">
                    <dt className="font-mono text-[14px] tracking-widest text-pink">{day}</dt>
                    <dd className="mt-1.5 opacity-90">{entry}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

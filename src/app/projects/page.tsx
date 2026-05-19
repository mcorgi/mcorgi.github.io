"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { projects, featuredProject, otherProjects } from "@/data/projects";

export default function ProjectsPage() {
  const allTags = useMemo(() => {
    const s = new Set<string>();
    otherProjects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, []);

  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!active) return otherProjects;
    return otherProjects.filter((p) => p.tags.includes(active));
  }, [active]);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-24">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
          /projects · {projects.length} entries
        </div>
        <h1 className="display text-5xl sm:text-7xl">things i built.</h1>
        <p className="mt-4 max-w-2xl font-mono text-[14.5px] leading-relaxed text-ink-soft">
          a small archive of projects, papers, and experiments. hover any
          card to bring it forward. click into one for the full case study.
        </p>
      </Reveal>

      {/* FEATURED */}
      <section className="mt-12">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            /featured
          </div>
        </Reveal>
        <FeaturedProject project={featuredProject} />
      </section>

      {/* Tag filter */}
      <section className="mt-16">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
            /more
          </div>
          <h2 className="display text-3xl sm:text-4xl mb-5">other work.</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setActive(null)}
              className={`tag font-mono ${
                active === null ? "bg-ink text-cream" : ""
              }`}
              aria-pressed={active === null}
            >
              all
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t === active ? null : t)}
                className={`tag font-mono transition-transform hover:-translate-y-0.5 ${
                  active === t ? "bg-ink text-cream" : ""
                }`}
                aria-pressed={active === t}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-8 grid sm:grid-cols-2 gap-6 sm:gap-7"
        >
          {filtered.map((p, i) => (
            <div key={p.slug} id={p.slug}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 font-mono text-sm opacity-60">
            no projects matching that filter yet.
          </p>
        )}
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  compact?: boolean;
};

export default function FeaturedProject({ project, compact = false }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* offset color block for retro depth */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-[14px] bg-accent transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"
      />

      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="relative window bg-cream"
      >
        <div className="window-title">
          <span className="window-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="ml-2 font-mono text-[11px] truncate">
            ~/projects/{project.slug}.md
          </span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[10px]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="uppercase tracking-widest">featured</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-0">
          {/* LEFT: content */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-line">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest opacity-70 mb-4">
              <span className="tag !py-0.5 !px-2 text-[10px]">
                {project.status ?? "project"}
              </span>
              {project.org && <span>· {project.org}</span>}
              <span>· {project.year}</span>
            </div>

            <h2 className="display text-[34px] sm:text-[44px] lg:text-[52px] leading-[0.95] mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h2>

            {project.subtitle && (
              <p className="font-display text-lg sm:text-xl text-ink-soft mb-5">
                {project.subtitle}
              </p>
            )}

            <p className="font-mono text-[14.5px] leading-relaxed text-ink-soft max-w-2xl">
              {project.blurb}
            </p>

            {project.role && !compact && (
              <div className="mt-5 border-l-2 border-accent pl-4 py-1 font-mono text-[13px] leading-relaxed">
                <span className="opacity-60 uppercase tracking-widest text-[10.5px] block mb-1">
                  my role
                </span>
                {project.role}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-1.5">
              {(project.stack ?? project.tags).slice(0, 8).map((t) => (
                <span key={t} className="tag font-mono">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="arrow-link text-sm font-mono"
              >
                read the case study <span aria-hidden>↗</span>
              </Link>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="arrow-link text-sm font-mono"
                >
                  source ↗
                </a>
              )}
            </div>
          </div>

          {/* RIGHT: architecture / system panel */}
          <div className="lg:col-span-2 bg-cream-2/40 p-6 sm:p-8 scanlines">
            <div className="font-mono text-[10.5px] uppercase tracking-widest opacity-70 mb-3">
              system diagram
            </div>

            <div className="window-soft bg-ink text-cream">
              <div className="px-3 py-2 border-b border-cream/20 flex items-center gap-2 font-mono text-[10px]">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                <span className="opacity-70">architecture.txt</span>
              </div>
              <pre className="p-4 text-[10px] sm:text-[10.5px] leading-[1.55] font-mono whitespace-pre overflow-x-auto">
                {project.architecture ??
                  "[no architecture diagram available]"}
              </pre>
            </div>

            {/* live status faux-panel */}
            <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="window-soft p-3">
                <div className="opacity-60 uppercase tracking-widest text-[9.5px] mb-1">
                  capture
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="inline-block h-2 w-2 rounded-full bg-accent-2"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <span>continuous</span>
                </div>
              </div>
              <div className="window-soft p-3">
                <div className="opacity-60 uppercase tracking-widest text-[9.5px] mb-1">
                  telemetry
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="inline-block h-2 w-2 rounded-full bg-accent"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.4,
                    }}
                  />
                  <span>MAVLink ok</span>
                </div>
              </div>
              <div className="window-soft p-3">
                <div className="opacity-60 uppercase tracking-widest text-[9.5px] mb-1">
                  pairing
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent-3" />
                  <span>nearest-neighbor</span>
                </div>
              </div>
              <div className="window-soft p-3">
                <div className="opacity-60 uppercase tracking-widest text-[9.5px] mb-1">
                  upload
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="inline-block h-2 w-2 rounded-full bg-accent-2"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: 0.8,
                    }}
                  />
                  <span>geotagged</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

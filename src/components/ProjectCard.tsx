"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  const accent =
    index % 3 === 0
      ? "var(--accent)"
      : index % 3 === 1
        ? "var(--pink)"
        : "var(--accent-2)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025, rotate: -0.4 }}
      className="group relative h-full"
      style={{ transformOrigin: "center" }}
    >
      {/* offset color block behind for retro depth */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-[14px] border-[1.5px] border-line transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"
        style={{ background: accent }}
      />

      <div className="relative window bg-cream h-full flex flex-col !shadow-none">
        {/* Invisible layer so clicking anywhere on the card opens the project.
            The visible "read more" link stays the one keyboard/screen-reader link. */}
        <Link
          href={`/projects/${project.slug}`}
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 z-[5]"
        />
        <div className="window-title">
          <span className="window-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="ml-2 min-w-0 font-mono text-[11px] truncate">
            ~/projects/{project.slug}.md
          </span>
          <span className="ml-auto pl-2 shrink-0 whitespace-nowrap font-mono text-[10px] opacity-70">
            {project.year}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-70 mb-3">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: accent }}
            />
            <span>{project.status ?? "project"}</span>
            <span>·</span>
            <span>{project.readTime}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-[26px] leading-tight tracking-tight mb-2 transition-colors group-hover:text-accent">
            {project.title}
          </h3>

          <p className="text-[14.5px] leading-relaxed text-ink-soft mb-4">
            {project.blurb}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((t) => (
              <span key={t} className="tag font-mono">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="arrow-link text-xs font-mono relative z-10"
            >
              read more <span aria-hidden>↗</span>
            </Link>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="relative z-10 text-xs font-mono opacity-70 hover:opacity-100 hover:text-accent"
              >
                source ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full border-t-[1.5px] border-line pt-4">
      <div className="flex items-baseline justify-between gap-3 font-mono text-[11.5px] opacity-60">
        <span className="truncate">{project.org}</span>
        <span className="shrink-0">{project.year}</span>
      </div>
      <h3 className="mt-2 font-display text-2xl sm:text-[26px] leading-tight tracking-tight">
        <Link
          href={`/projects/${project.slug}`}
          className="hover:text-accent transition-colors"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 font-mono text-[14px] leading-relaxed text-ink-soft">
        {project.blurb}
      </p>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-4 inline-block font-mono text-[13px] underline decoration-pink underline-offset-4 hover:text-accent"
      >
        read more
      </Link>
    </article>
  );
}

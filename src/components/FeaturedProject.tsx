import Link from "next/link";
import type { Project } from "@/data/projects";
import { MpsScene } from "@/components/Illustrations";

// A big project block on a card with an offset shadow (the home page's MPS
// card). The animated sketch sits top right, above the photo; the system
// diagram sits under the text. `badge` adds a pill above the title, colored
// by `badgeClass`.
export default function FeaturedProject({
  project,
  badge,
  badgeClass = "bg-accent text-cream",
}: {
  project: Project;
  badge?: string;
  badgeClass?: string;
}) {
  return (
    <section className="relative">
      <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-accent" />
      <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10 rounded-2xl border-[1.5px] border-line p-6 sm:p-10 bg-white">
        <div>
          {badge && (
            <span className={`mb-5 inline-flex items-center rounded-full px-3 py-1 font-mono text-[14px] ${badgeClass}`}>
              {badge}
            </span>
          )}
          <div className="font-mono text-[14px] text-muted mb-4">
            {project.org} · {project.year}
          </div>

          <h3 className="display text-[34px] sm:text-[44px] lg:text-[52px] leading-[0.95] mb-5">
            <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
              {project.title}
            </Link>
          </h3>

          <p className="prose-text text-ink-soft">
            {project.blurb}
          </p>

          <p className="mt-5 font-mono text-[14px] leading-relaxed text-muted">
            {(project.stack ?? project.tags).slice(0, 8).join(" · ")}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-7 arrow-link text-sm font-mono"
          >
            read the case study
          </Link>

          {project.diagram && (
            <figure className="mt-10">
              <a href={project.diagram} target="_blank" rel="noreferrer noopener" title="Open full size">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.diagram}
                  alt={`${project.title} system architecture`}
                  className="block w-full h-auto bg-white rounded-lg border-[1.5px] border-line"
                />
              </a>
              <figcaption className="mt-2 font-sans text-[14px] text-muted">
                The system diagram. Click for full size.
              </figcaption>
            </figure>
          )}
        </div>

        {/* On wide screens the photo stretches so its bottom lines up with the left column. */}
        <div className="flex flex-col gap-5">
          {project.illustration === "mps" && (
            <figure>
              <MpsScene className="border-[1.5px] border-line" />
              <figcaption className="mt-2 font-sans text-[14px] text-muted">
                Roughly how it works: the GoPro shoots, the Pi pairs each photo with the
                Pixhawk&apos;s position, and the pair goes down to the ground over the radio.
              </figcaption>
            </figure>
          )}

          {project.photo && (
            <figure className="flex flex-col lg:flex-1">
              <div className="relative overflow-hidden rounded-lg border-[1.5px] border-line aspect-[16/9] lg:aspect-auto lg:flex-1 lg:min-h-[180px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.photo.src}
                  alt={project.photo.alt}
                  loading="lazy"
                  className="absolute inset-0 block w-full h-full object-cover scale-[2.2]"
                  style={{ objectPosition: "46% 45%" }}
                />
              </div>
              <figcaption className="mt-2 font-sans text-[14px] text-muted">
                {project.photo.caption}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

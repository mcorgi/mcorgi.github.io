import Link from "next/link";
import type { Project } from "@/data/projects";
import { MpsScene } from "@/components/Illustrations";

// A big project block on a card with an offset shadow (the home page's MPS
// card), kept short: the text on the left, and on the right the animated
// sketch with the system diagram and the photo side by side under it.
// `badge` adds a pill above the title, colored by `badgeClass`.
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
      <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-10 rounded-2xl border-[1.5px] border-line p-6 sm:p-8 bg-white">
        <div>
          {badge && (
            <span className={`mb-4 inline-flex items-center rounded-full px-3 py-1 font-mono text-[14px] ${badgeClass}`}>
              {badge}
            </span>
          )}
          <div className="font-mono text-[14px] text-muted mb-3">
            {project.org} · {project.year}
          </div>

          <h3 className="display text-[34px] sm:text-[40px] lg:text-[44px] leading-[0.95] mb-4">
            <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
              {project.title}
            </Link>
          </h3>

          <p className="font-sans text-[16px] leading-relaxed text-ink-soft">
            {project.blurb}
          </p>

          <p className="mt-4 font-mono text-[14px] leading-relaxed text-muted">
            {(project.stack ?? project.tags).slice(0, 8).join(" · ")}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-6 arrow-link text-sm font-mono"
          >
            read the case study
          </Link>
        </div>

        <div className="space-y-5">
          {project.illustration === "mps" && (
            <figure>
              <MpsScene className="border-[1.5px] border-line" />
              <figcaption className="mt-2 font-sans text-[14px] text-muted">
                Roughly how it works: the GoPro shoots, the Pi pairs each photo with the
                Pixhawk&apos;s position, and the pair goes down to the ground over the radio.
              </figcaption>
            </figure>
          )}

          <div className="grid grid-cols-2 gap-4">
            {project.diagram && (
              <figure>
                <a
                  href={project.diagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Open full size"
                  className="block overflow-hidden rounded-lg border-[1.5px] border-line bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.diagram}
                    alt={`${project.title} system architecture`}
                    className="block aspect-[16/10] w-full object-contain p-1.5"
                  />
                </a>
                <figcaption className="mt-2 font-sans text-[14px] leading-snug text-muted">
                  The system diagram. Click for full size.
                </figcaption>
              </figure>
            )}

            {project.photo && (
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border-[1.5px] border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.photo.src}
                    alt={project.photo.alt}
                    loading="lazy"
                    className="absolute inset-0 block w-full h-full object-cover scale-[2.2]"
                    style={{ objectPosition: "46% 45%" }}
                  />
                </div>
                <figcaption className="mt-2 font-sans text-[14px] leading-snug text-muted">
                  {project.photo.caption}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

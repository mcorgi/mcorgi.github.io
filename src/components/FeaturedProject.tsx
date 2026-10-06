import Link from "next/link";
import type { Project } from "@/data/projects";
import { MpsScene, SatelliteScene } from "@/components/Illustrations";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="border-t-[1.5px] border-line pt-8 grid lg:grid-cols-[1.15fr_1fr] gap-10">
      <div>
        <div className="font-mono text-[12px] opacity-70 mb-4">
          {project.org} · {project.year}
        </div>

        <h3 className="display text-[34px] sm:text-[44px] lg:text-[52px] leading-[0.95] mb-5">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
            {project.title}
          </Link>
        </h3>

        <p className="font-mono text-[14.5px] leading-relaxed text-ink-soft max-w-2xl">
          {project.blurb}
        </p>

        <p className="mt-5 font-mono text-[12px] leading-relaxed opacity-70">
          {(project.stack ?? project.tags).slice(0, 8).join(" · ")}
        </p>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-7 arrow-link text-sm font-mono"
        >
          read the case study
        </Link>

        {project.illustration === "mps" && (
          <figure className="mt-10">
            <MpsScene className="border-[1.5px] border-line" />
            <figcaption className="mt-2 font-mono text-[11.5px] opacity-60 lg:min-h-[3lh]">
              Roughly how it works: the GoPro shoots, the Pi pairs each photo with the
              Pixhawk&apos;s position, and the pair goes down to the ground over the radio.
            </figcaption>
          </figure>
        )}
      </div>

      {/* On wide screens the photo stretches so its bottom lines up with the left column. */}
      <div className="flex flex-col gap-5">
        {project.diagram && (
          <figure>
            <a href={project.diagram} target="_blank" rel="noreferrer noopener" title="Open full size">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.diagram}
                alt={`${project.title} system architecture`}
                className="block w-full h-auto bg-white rounded-lg border-[1.5px] border-line"
              />
            </a>
            <figcaption className="mt-2 font-mono text-[11.5px] opacity-60">
              The system diagram. Click for full size.
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
            <figcaption className={`mt-2 font-mono text-[11.5px] opacity-60 ${project.illustration === "mps" ? "lg:min-h-[3lh]" : ""}`}>
              {project.photo.caption}
            </figcaption>
          </figure>
        )}

        {project.illustration === "satellite" && (
          <SatelliteScene className="border-[1.5px] border-line" />
        )}
      </div>
    </section>
  );
}

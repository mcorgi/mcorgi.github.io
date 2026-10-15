import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProjects, otherProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-24">
      <h1 className="display text-5xl sm:text-7xl">Things I built.</h1>
      <p className="mt-4 max-w-2xl font-sans text-[17px] leading-relaxed text-ink-soft">
        The two big ones first, then the rest, newest first: a personal app, class projects, two restaurant websites, and a paper.
      </p>

      <section className="mt-12 space-y-12">
        {featuredProjects.map((fp) => (
          <FeaturedProject key={fp.slug} project={fp} />
        ))}
      </section>

      <section className="mt-20">
        <h2 className="display text-3xl sm:text-4xl mb-8">Other work.</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12 [&>*]:min-w-0">
          {otherProjects.map((p) => (
            <div key={p.slug} id={p.slug}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

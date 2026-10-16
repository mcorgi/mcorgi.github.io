import ProjectCard from "@/components/ProjectCard";
import {
  AnalyticsCard,
  BbqCard,
  CamelCard,
  EmbeddedCard,
  MpsCard,
  SongSaverCard,
} from "@/components/ProjectCards";
import { visibleProjects, type Project } from "@/data/projects";

// Everything else gets its own card in the grid; these stay as plain cards.
const otherWork = ["mice-video-classification", "hao-shi-guang"]
  .map((slug) => visibleProjects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export default function ProjectsPage() {
  return (
    <div className="pb-24">
      <div className="mx-auto max-w-6xl px-5 pt-14">
        <h1 className="display text-5xl sm:text-7xl">Things I built</h1>
        <p className="mt-4 max-w-2xl font-sans text-[17px] leading-relaxed text-ink-soft">
          The two big ones first, then class labs, a client website, a personal app and a class
          project. A NeurIPS competition model and my first client site are under Other work.
        </p>
      </div>

      {/* every project as a compact card, three to a row */}
      <section className="mx-auto max-w-6xl px-5 mt-10">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <MpsCard />
          <AnalyticsCard />
          <EmbeddedCard />
          <BbqCard />
          <SongSaverCard />
          <CamelCard />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 mt-20">
        <h2 className="display text-3xl sm:text-4xl mb-8">Other work</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12 [&>*]:min-w-0">
          {otherWork.map((p) => (
            <div key={p.slug} id={p.slug}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

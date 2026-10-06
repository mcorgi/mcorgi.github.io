import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import MiniPlaneSystem from "@/components/case-study/MiniPlaneSystem";
import CamelBenchmark from "@/components/case-study/CamelBenchmark";
import AnalyticsPlatform from "@/components/case-study/AnalyticsPlatform";
import BirdsongSynth from "@/components/case-study/BirdsongSynth";
import { LinkList } from "@/components/case-study/Parts";

// Projects with a hand-built long-form page instead of the generic template.
const caseStudies = {
  "mini-plane-system": MiniPlaneSystem,
  "camel-benchmark": CamelBenchmark,
  "automated-analytics": AnalyticsPlatform,
  "birdsong-synthesizer": BirdsongSynth,
} as const;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return { title: "Project — Sandra Tang" };
  return {
    title: `${p.title} — Sandra Tang`,
    description: p.blurb,
  };
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="display text-2xl sm:text-3xl">{children}</h2>;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const CaseStudy = caseStudies[p.slug as keyof typeof caseStudies];
  if (CaseStudy) return <CaseStudy project={p} />;

  const primaryFeatures = (p.features ?? []).filter((f) => f.ownership === "primary");
  const teamFeatures = (p.features ?? []).filter((f) => f.ownership === "team");

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs opacity-70">
        <Link href="/projects" className="hover:text-accent">
          ← projects
        </Link>
        <span>/</span>
        <span>{p.slug}</span>
      </div>

      {/* HERO */}
      <div className="mt-6">
        <div className="font-mono text-[12px] opacity-70 mb-3">
          {[p.org, p.year].filter(Boolean).join(" · ")}
        </div>
        <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">{p.title}</h1>
        {p.subtitle && (
          <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
            {p.subtitle}
          </p>
        )}
        <p className="mt-5 max-w-2xl font-mono text-[15px] leading-relaxed text-ink-soft">
          {p.blurb}
        </p>
      </div>

      {/* Role + stack */}
      <div className="mt-10 grid md:grid-cols-3 gap-8 border-t-[1.5px] border-line pt-6">
        {p.role && (
          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-2">My role</div>
            <p className="font-mono text-[14px] leading-relaxed">{p.role}</p>
          </div>
        )}
        {p.stack && (
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-2">Built with</div>
            <p className="font-mono text-[13px] leading-relaxed text-ink-soft">{p.stack.join(" · ")}</p>
          </div>
        )}
      </div>

      {/* If no rich content, show a simple description */}
      {!p.problem && !p.features && (
        <section className="mt-12">
          <p className="max-w-3xl font-mono text-[14.5px] leading-[1.75]">{p.description}</p>
        </section>
      )}

      {/* Problem / Solution */}
      {(p.problem || p.solution) && (
        <section className="mt-16">
          <H2>The why, then the what.</H2>
          <div className="mt-6 grid md:grid-cols-2 gap-10 font-mono text-[14px] leading-relaxed">
            {p.problem && (
              <div>
                <div className="text-accent text-xs uppercase tracking-widest mb-2">Problem</div>
                <p className="text-ink-soft">{p.problem}</p>
              </div>
            )}
            {p.solution && (
              <div>
                <div className="text-accent text-xs uppercase tracking-widest mb-2">Solution</div>
                <p className="text-ink-soft">{p.solution}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Architecture */}
      {p.architecture && (
        <section className="mt-16">
          <H2>How the pieces fit.</H2>
          <pre className="mt-6 rounded-lg bg-ink text-cream p-6 sm:p-8 text-[11px] sm:text-[13px] leading-[1.65] font-mono whitespace-pre overflow-x-auto">
            {p.architecture}
          </pre>
        </section>
      )}

      {/* Features */}
      {p.features && p.features.length > 0 && (
        <section className="mt-16">
          <H2>What it actually does.</H2>
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {primaryFeatures.map((f) => (
              <div key={f.name} className="border-t-[1.5px] border-line pt-3">
                <dt className="font-display text-lg leading-tight">{f.name}</dt>
                <dd className="mt-1.5 font-mono text-[13px] leading-relaxed text-ink-soft">{f.description}</dd>
              </div>
            ))}
          </dl>
          {teamFeatures.length > 0 && (
            <>
              <div className="mt-10 font-mono text-[12px] opacity-60">Also part of the system, built by teammates:</div>
              <dl className="mt-3 grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {teamFeatures.map((f) => (
                  <div key={f.name} className="border-t border-line/40 pt-3">
                    <dt className="font-display text-lg leading-tight">{f.name}</dt>
                    <dd className="mt-1.5 font-mono text-[13px] leading-relaxed text-ink-soft">{f.description}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </section>
      )}

      {/* Technical highlight */}
      {p.technicalHighlight && (
        <section className="mt-16">
          <H2>The tricky part.</H2>
          <p className="mt-6 max-w-3xl font-mono text-[14.5px] leading-[1.75] text-ink-soft">
            {p.technicalHighlight}
          </p>
        </section>
      )}

      {/* Outcomes + Learnings */}
      {(p.outcomes || p.learnings) && (
        <section className="mt-16 grid md:grid-cols-2 gap-10">
          {p.outcomes && (
            <div>
              <H2>What came of it.</H2>
              <ul className="mt-5 space-y-2.5">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 font-mono text-[13.5px] leading-relaxed">
                    <span className="text-accent shrink-0">›</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {p.learnings && (
            <div>
              <H2>What I learned.</H2>
              <ul className="mt-5 space-y-2.5">
                {p.learnings.map((l) => (
                  <li key={l} className="flex gap-2 font-mono text-[13.5px] leading-relaxed">
                    <span className="text-pink-ink shrink-0">›</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <LinkList links={p.links} />

      {/* Back nav */}
      <div className="mt-20 flex items-center justify-between">
        <Link href="/projects" className="arrow-link text-sm font-mono">
          ← all projects
        </Link>
        <Link href="/" className="arrow-link text-sm font-mono">
          home
        </Link>
      </div>
    </div>
  );
}

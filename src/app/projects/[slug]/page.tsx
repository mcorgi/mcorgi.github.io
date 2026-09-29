import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import { projects } from "@/data/projects";
import MiniPlaneSystem from "@/components/case-study/MiniPlaneSystem";
import Suas2026 from "@/components/case-study/Suas2026";

// Projects with a hand-built long-form page instead of the generic template.
const caseStudies = {
  "mini-plane-system": MiniPlaneSystem,
  "suas-2026": Suas2026,
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

  const primaryFeatures = (p.features ?? []).filter(
    (f) => f.ownership === "primary",
  );
  const teamFeatures = (p.features ?? []).filter(
    (f) => f.ownership === "team",
  );

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
      {/* breadcrumb */}
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-xs opacity-70">
          <Link href="/projects" className="hover:text-accent">
            ← projects
          </Link>
          <span>/</span>
          <span>{p.slug}</span>
        </div>
      </Reveal>

      {/* HERO */}
      <Reveal>
        <div className="mt-6">
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-3 flex flex-wrap items-center gap-2">
            <span className="tag !py-0.5 !px-2 text-[10px]">
              {p.status ?? "project"}
            </span>
            {p.org && <span>· {p.org}</span>}
            <span>· {p.year}</span>
            <span>· {p.readTime}</span>
          </div>
          <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">
            {p.title}
          </h1>
          {p.subtitle && (
            <p className="mt-3 font-display text-xl sm:text-2xl text-ink-soft max-w-3xl">
              {p.subtitle}
            </p>
          )}
          <p className="mt-5 max-w-2xl font-mono text-[15px] leading-relaxed text-ink-soft">
            {p.blurb}
          </p>
        </div>
      </Reveal>

      {/* Role + stack */}
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {p.role && (
          <Reveal className="md:col-span-2">
            <Window title="role.txt" soft>
              <div className="p-5 font-mono text-[13.5px] leading-relaxed">
                <span className="opacity-60 uppercase tracking-widest text-[10.5px] block mb-1">
                  my role
                </span>
                {p.role}
              </div>
            </Window>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <Window title="stack.txt" soft>
            <div className="p-5">
              <div className="opacity-60 font-mono uppercase tracking-widest text-[10.5px] mb-2">
                tech stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(p.stack ?? p.tags).map((t) => (
                  <span key={t} className="tag font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Window>
        </Reveal>
      </div>

      {/* Problem / Solution */}
      {(p.problem || p.solution) && (
        <section className="mt-16">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
              /problem · solution
            </div>
            <h2 className="display text-3xl sm:text-4xl">
              the why, then the what.
            </h2>
          </Reveal>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {p.problem && (
              <Reveal>
                <Window title="problem.md">
                  <div className="p-5 sm:p-6 font-mono text-[14px] leading-relaxed">
                    <div className="text-accent text-xs uppercase tracking-widest mb-2">
                      # problem
                    </div>
                    <p>{p.problem}</p>
                  </div>
                </Window>
              </Reveal>
            )}
            {p.solution && (
              <Reveal delay={0.06}>
                <Window title="solution.md">
                  <div className="p-5 sm:p-6 font-mono text-[14px] leading-relaxed">
                    <div className="text-accent-2 text-xs uppercase tracking-widest mb-2">
                      # solution
                    </div>
                    <p>{p.solution}</p>
                  </div>
                </Window>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Architecture */}
      {p.architecture && (
        <section className="mt-16">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
              /architecture
            </div>
            <h2 className="display text-3xl sm:text-4xl">how the pieces fit.</h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 window scanlines">
              <div className="window-title">
                <span className="window-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                <span className="ml-2 font-mono text-[11px]">
                  architecture.txt
                </span>
              </div>
              <div className="bg-ink text-cream">
                <pre className="p-6 sm:p-8 text-[11px] sm:text-[13px] leading-[1.65] font-mono whitespace-pre overflow-x-auto">
                  {p.architecture}
                </pre>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Features */}
      {p.features && p.features.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
                  /features
                </div>
                <h2 className="display text-3xl sm:text-4xl">
                  what it actually does.
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
                  built by me
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full border border-line bg-cream" />
                  teammate-led
                </span>
              </div>
            </div>
          </Reveal>

          {primaryFeatures.length > 0 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {primaryFeatures.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.04}>
                  <div className="relative group h-full">
                    <div
                      aria-hidden
                      className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] bg-accent transition-transform group-hover:translate-x-2.5 group-hover:translate-y-2.5"
                    />
                    <div className="relative window-soft p-5 h-full">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg leading-tight">
                          {f.name}
                        </h3>
                        <span className="tag font-mono !text-[9.5px] bg-accent text-cream border-line shrink-0">
                          you
                        </span>
                      </div>
                      <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {teamFeatures.length > 0 && (
            <>
              <Reveal>
                <div className="mt-10 mb-3 font-mono text-[11px] uppercase tracking-widest opacity-60">
                  also part of the system — teammate-led
                </div>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-5">
                {teamFeatures.map((f, i) => (
                  <Reveal key={f.name} delay={i * 0.04}>
                    <div className="window-soft p-5 h-full opacity-90 hover:opacity-100 transition-opacity">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg leading-tight">
                          {f.name}
                        </h3>
                        <span className="tag font-mono !text-[9.5px] shrink-0">
                          team
                        </span>
                      </div>
                      <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-soft">
                        {f.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Technical highlight */}
      {p.technicalHighlight && (
        <section className="mt-16">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
              /deep dive
            </div>
            <h2 className="display text-3xl sm:text-4xl">
              the tricky part.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 window">
              <div className="window-title">
                <span className="window-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                <span className="ml-2 font-mono text-[11px]">
                  technical-highlight.md
                </span>
              </div>
              <div className="p-6 sm:p-8 font-mono text-[14.5px] leading-relaxed">
                <p>{p.technicalHighlight}</p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Outcomes + Learnings */}
      {(p.outcomes || p.learnings) && (
        <section className="mt-16 grid md:grid-cols-2 gap-6">
          {p.outcomes && (
            <Reveal>
              <Window title="outcomes.txt">
                <div className="p-5 sm:p-6">
                  <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
                    impact
                  </div>
                  <ul className="space-y-2.5">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex gap-2 font-mono text-[13.5px] leading-relaxed">
                        <span className="text-accent shrink-0">✓</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Window>
            </Reveal>
          )}
          {p.learnings && (
            <Reveal delay={0.06}>
              <Window title="learnings.txt" soft>
                <div className="p-5 sm:p-6">
                  <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
                    what i learned
                  </div>
                  <ul className="space-y-2.5">
                    {p.learnings.map((l) => (
                      <li key={l} className="flex gap-2 font-mono text-[13.5px] leading-relaxed">
                        <span className="text-accent-2 shrink-0">›</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Window>
            </Reveal>
          )}
        </section>
      )}

      {/* If no rich content, show a simple description */}
      {!p.problem && !p.features && (
        <section className="mt-12">
          <Reveal>
            <Window title={`${p.slug}.md`}>
              <div className="p-6 sm:p-8 font-mono text-[14.5px] leading-relaxed">
                <p>{p.description}</p>
              </div>
            </Window>
          </Reveal>
        </section>
      )}

      {/* Links */}
      {p.links && p.links.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
              /links
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.links.map((l) => (
              <Reveal key={l.label}>
                {l.href ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="window-soft p-4 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--line)] transition-all"
                  >
                    <div className="font-display text-lg">
                      {l.label} <span aria-hidden>↗</span>
                    </div>
                    {l.note && (
                      <div className="font-mono text-[12px] opacity-70 mt-1">
                        {l.note}
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="window-soft p-4 opacity-80">
                    <div className="font-display text-lg">{l.label}</div>
                    {l.note && (
                      <div className="font-mono text-[12px] opacity-70 mt-1">
                        {l.note}
                      </div>
                    )}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Back nav */}
      <div className="mt-20 flex items-center justify-between">
        <Link href="/projects" className="arrow-link text-sm font-mono">
          ← all projects
        </Link>
        <Link href="/" className="arrow-link text-sm font-mono">
          home ↗
        </Link>
      </div>
    </div>
  );
}

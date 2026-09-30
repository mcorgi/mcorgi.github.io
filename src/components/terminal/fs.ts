import { visibleProjects } from "@/data/projects";
import {
  camelSections,
  analyticsSections,
  mpsSections,
  suasSections,
  type SectionLink,
} from "@/data/siteMap";

// The site, as a tiny file system. Every directory is a page (or a section
// of one), so `cd` can navigate to it.
export type FsNode = {
  name: string;
  kind: "dir" | "file";
  route?: string; // where `cd` / `open` goes
  label?: string; // human name, shown when navigating
  children?: FsNode[];
  file?: "readme" | "contact" | "resume";
};

const projectSections: Record<string, SectionLink[]> = {
  "mini-plane-system": mpsSections,
  "camel-benchmark": camelSections,
  "automated-analytics": analyticsSections,
};

const sectionDirs = (base: string, sections: SectionLink[]): FsNode[] =>
  sections.map((s) => ({
    name: s.id,
    kind: "dir",
    route: `${base}#${s.id}`,
    label: s.label.replace(/^\d+\s/, ""),
    children: [],
  }));

export const root: FsNode = {
  name: "~",
  kind: "dir",
  route: "/",
  label: "home",
  children: [
    {
      name: "projects",
      kind: "dir",
      route: "/projects",
      label: "projects",
      children: visibleProjects.map((p) => ({
        name: p.slug,
        kind: "dir",
        route: `/projects/${p.slug}`,
        label: p.title,
        children: sectionDirs(`/projects/${p.slug}`, projectSections[p.slug] ?? []),
      })),
    },
    {
      name: "suas-2026",
      kind: "dir",
      route: "/suas-2026",
      label: "SUAS 2026",
      children: sectionDirs("/suas-2026", suasSections),
    },
    { name: "about", kind: "dir", route: "/about", label: "about me", children: [] },
    { name: "music", kind: "dir", route: "/music", label: "music", children: [] },
    { name: "resume", kind: "dir", route: "/resume", label: "resume", children: [] },
    { name: "contact", kind: "dir", route: "/#contact", label: "contact", children: [] },
    { name: "README.md", kind: "file", file: "readme" },
    { name: "contact.txt", kind: "file", file: "contact" },
    { name: "resume.pdf", kind: "file", file: "resume" },
  ],
};

export function nodeAt(parts: string[]): FsNode | null {
  let node: FsNode = root;
  for (const part of parts) {
    const next = node.children?.find((c) => c.name === part);
    if (!next) return null;
    node = next;
  }
  return node;
}

export type Resolved = { parts: string[]; node: FsNode } | null;

// Resolve a path like "..", "~/projects", "/about", "mini-plane-system/hardware".
export function resolve(path: string, cwd: string[]): Resolved {
  let parts = [...cwd];
  let rest = path.trim();
  if (rest === "" || rest === "~") return { parts: [], node: root };
  if (rest.startsWith("~/") || rest.startsWith("/")) {
    parts = [];
    rest = rest.replace(/^~?\//, "");
  }
  for (const seg of rest.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      parts.pop();
      continue;
    }
    parts.push(seg);
  }
  const node = nodeAt(parts);
  return node ? { parts, node } : null;
}

export const pathString = (parts: string[]) => (parts.length ? `~/${parts.join("/")}` : "~");

// Which directory a page URL corresponds to (deepest match).
export function cwdForPathname(pathname: string): string[] {
  const clean = pathname.replace(/\/+$/, "");
  if (clean === "") return [];
  const segs = clean.split("/").filter(Boolean);
  const out: string[] = [];
  for (const s of segs) {
    if (!nodeAt([...out, s])) break;
    out.push(s);
  }
  return out;
}

export const routePath = (route: string) => route.split("#")[0].replace(/\/+$/, "") || "/";

"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { contact } from "@/data/siteMap";
import { cwdForPathname, FsNode, nodeAt, pathString, resolve, routePath } from "./fs";

export type Tone = "dim" | "accent" | "accent2" | "ok" | "err" | "warn" | "bold";
export type Seg = { t: string; tone?: Tone; href?: string };
export type Line = { segs: Seg[]; welcome?: boolean };

const s = (t: string, tone?: Tone, href?: string): Seg => ({ t, tone, href });
const line = (...segs: Seg[]): Line => ({ segs });

export const COMMANDS: { name: string; usage: string; about: string }[] = [
  { name: "help", usage: "help", about: "show this list" },
  { name: "ls", usage: "ls [path]", about: "list what's in a directory" },
  { name: "cd", usage: "cd <path>", about: "go to a page or section (try cd .., cd ~)" },
  { name: "pwd", usage: "pwd", about: "print where you are" },
  { name: "cat", usage: "cat <file>", about: "read a file (README.md, contact.txt)" },
  { name: "open", usage: "open <path|linkedin|github|email>", about: "open a page, file or link" },
  { name: "whoami", usage: "whoami", about: "who is sandra?" },
  { name: "contact", usage: "contact", about: "how to reach me" },
  { name: "play", usage: "play", about: "play my OCaml memory game" },
  { name: "history", usage: "history", about: "commands you've run" },
  { name: "clear", usage: "clear", about: "clear the screen (or ctrl+l)" },
];

const intro: Line[] = [
  line(s("sandra@cornell", "accent2"), s(":"), s("~", "accent"), s("$ ./welcome.sh", "dim")),
  { segs: [s("welcome to my personal website!")], welcome: true },
  line(
    s("this terminal is real. type ", "dim"),
    s("help", "accent"),
    s(" to see commands, or try ", "dim"),
    s("ls", "accent"),
    s(" and ", "dim"),
    s("cd projects", "accent"),
    s(".", "dim"),
  ),
];

type Ctx = {
  lines: Line[];
  cwd: string[];
  history: string[];
  prompt: string;
  run: (input: string) => void;
  print: (l: Line[]) => void;
  complete: (input: string) => string;
  floatingOpen: boolean;
  setFloatingOpen: (v: boolean) => void;
};

const TerminalContext = createContext<Ctx | null>(null);

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used inside TerminalProvider");
  return ctx;
}

function fileLines(node: FsNode): Line[] {
  switch (node.file) {
    case "readme":
      return [
        line(s("# sandra tang", "bold")),
        line(s("cs @ cornell engineering, class of 2028.")),
        line(s("intelligence subteam lead @ CUAir (cornell unmanned air systems).")),
        line(s("summer 2026: flight dynamics software intern @ amazon leo.")),
        line(s("i like systems that touch the real world, and piano + violin duets.")),
        line(s("start with: ", "dim"), s("cd projects/mini-plane-system", "accent")),
      ];
    case "contact":
      return [
        line(s("email     ", "dim"), s(contact.email, "accent", `mailto:${contact.email}`)),
        line(s("phone     ", "dim"), s(contact.phone, "accent", contact.phoneHref)),
        line(s("linkedin  ", "dim"), s(contact.linkedinLabel, "accent", contact.linkedin)),
        line(s("github    ", "dim"), s("github.com/mcorgi", "accent", contact.github)),
      ];
    case "resume":
      return [line(s("cat: resume.pdf is a PDF. try ", "warn"), s("open resume.pdf", "accent"))];
    default:
      return [];
  }
}

export default function TerminalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [lines, setLines] = useState<Line[]>(intro);
  const [history, setHistory] = useState<string[]>([]);
  const [cwd, setCwd] = useState<string[]>(() => cwdForPathname(pathname));
  const [floatingOpen, setFloatingOpen] = useState(false);
  const cwdRef = useRef(cwd);
  cwdRef.current = cwd;

  // Follow the page when the visitor navigates some other way (nav bar, links).
  useEffect(() => {
    const node = nodeAt(cwdRef.current);
    const onThisPage = node?.route && routePath(node.route) === (pathname.replace(/\/+$/, "") || "/");
    if (!onThisPage) setCwd(cwdForPathname(pathname));
  }, [pathname]);

  const print = useCallback((l: Line[]) => setLines((prev) => [...prev, ...l]), []);

  const go = useCallback(
    (parts: string[], node: FsNode) => {
      setCwd(parts);
      if (!node.route) return;
      const [path, hash] = node.route.split("#");
      const here = pathname.replace(/\/+$/, "") || "/";
      const target = path.replace(/\/+$/, "") || "/";
      if (target === here) {
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", `#${hash}`);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      // Keep the terminal with the visitor on the next page.
      setFloatingOpen(true);
      router.push(node.route);
    },
    [pathname, router],
  );

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      const promptLine = line(
        s("sandra@cornell", "accent2"),
        s(":"),
        s(pathString(cwdRef.current), "accent"),
        s("$ "),
        s(input),
      );
      if (!input) {
        print([promptLine]);
        return;
      }
      setHistory((h) => [...h, input]);
      const [cmd, ...args] = input.split(/\s+/);
      const arg = args.join(" ");
      const out: Line[] = [];
      const cwdNow = cwdRef.current;

      switch (cmd.toLowerCase()) {
        case "help":
          out.push(line(s("commands:", "bold")));
          for (const c of COMMANDS) {
            out.push(line(s(`  ${c.usage.padEnd(34)}`, "accent"), s(c.about, "dim")));
          }
          out.push(line(s("tab completes names · ↑/↓ scroll through history · ` toggles this terminal on other pages", "dim")));
          break;
        case "ls": {
          const r = resolve(arg || ".", cwdNow);
          if (!r) {
            out.push(line(s(`ls: no such file or directory: ${arg}`, "err")));
          } else if (r.node.kind === "file") {
            out.push(line(s(r.node.name)));
          } else if (!r.node.children?.length) {
            out.push(line(s("(nothing inside. cd here to open it)", "dim")));
          } else {
            const segs: Seg[] = [];
            r.node.children.forEach((c, i) => {
              if (i) segs.push(s("   "));
              segs.push(c.kind === "dir" ? s(`${c.name}/`, "accent") : s(c.name));
            });
            out.push({ segs });
          }
          break;
        }
        case "cd": {
          const r = resolve(arg || "~", cwdNow);
          if (arg === ".." && cwdNow.length === 0) {
            out.push(line(s("you're already home (~). try ", "dim"), s("ls", "accent")));
          } else if (!r) {
            out.push(line(s(`cd: no such file or directory: ${arg}`, "err")), line(s("try ", "dim"), s("ls", "accent"), s(" to see what's here", "dim")));
          } else if (r.node.kind === "file") {
            out.push(line(s(`cd: not a directory: ${arg}. try `, "err"), s(`cat ${arg}`, "accent")));
          } else {
            out.push(line(s(`→ ${r.node.label ?? r.node.name}`, "ok"), s(`  ${r.node.route ?? ""}`, "dim")));
            print([promptLine, ...out]);
            go(r.parts, r.node);
            return;
          }
          break;
        }
        case "pwd":
          out.push(line(s(pathString(cwdNow))));
          break;
        case "cat": {
          if (!arg) {
            out.push(line(s("cat: which file? try ", "err"), s("cat README.md", "accent")));
            break;
          }
          const r = resolve(arg, cwdNow);
          if (!r) out.push(line(s(`cat: ${arg}: no such file`, "err")));
          else if (r.node.kind === "dir") out.push(line(s(`cat: ${arg}: is a directory. try `, "err"), s(`cd ${arg}`, "accent")));
          else out.push(...fileLines(r.node));
          break;
        }
        case "contact":
          out.push(...fileLines({ name: "contact.txt", kind: "file", file: "contact" }));
          break;
        case "open": {
          const links: Record<string, string> = {
            linkedin: contact.linkedin,
            github: contact.github,
            email: `mailto:${contact.email}`,
          };
          if (links[arg.toLowerCase()]) {
            out.push(line(s(`→ opening ${arg}`, "ok")));
            window.open(links[arg.toLowerCase()], "_blank", "noopener");
            break;
          }
          const r = resolve(arg || ".", cwdNow);
          if (!r) {
            out.push(line(s(`open: can't find ${arg}. try `, "err"), s("open linkedin", "accent")));
          } else if (r.node.file === "resume") {
            out.push(line(s("→ opening resume.pdf", "ok")));
            window.open("/resume.pdf", "_blank", "noopener");
          } else if (r.node.kind === "file") {
            out.push(...fileLines(r.node));
          } else {
            out.push(line(s(`→ ${r.node.label ?? r.node.name}`, "ok"), s(`  ${r.node.route ?? ""}`, "dim")));
            print([promptLine, ...out]);
            go(r.parts, r.node);
            return;
          }
          break;
        }
        case "play": {
          const r = resolve("~/projects/camel-benchmark/play", cwdNow);
          if (r) {
            out.push(line(s("→ loading verbal memory…", "ok")));
            print([promptLine, ...out]);
            go(r.parts, r.node);
            return;
          }
          break;
        }
        case "whoami":
          out.push(line(s("sandra tang", "bold")));
          out.push(line(s("cs @ cornell '28 · intelligence lead @ CUAir · ex-intern @ amazon leo", "dim")));
          break;
        case "history":
          [...history, input].forEach((h, i) => out.push(line(s(`${String(i + 1).padStart(3)}  `, "dim"), s(h))));
          break;
        case "echo":
          out.push(line(s(arg)));
          break;
        case "clear":
          setLines([]);
          return;
        case "sudo":
          out.push(line(s("sandra is not in the sudoers file. this incident will be reported. (jk)", "warn")));
          break;
        case "exit":
          out.push(line(s("there's no escape :) try ", "dim"), s("cd projects", "accent")));
          break;
        default:
          out.push(line(s(`command not found: ${cmd}. type `, "err"), s("help", "accent"), s(" for a list", "err")));
      }
      print([promptLine, ...out]);
    },
    [go, history, print],
  );

  const complete = useCallback(
    (input: string): string => {
      const tokens = input.split(/\s+/);
      if (tokens.length <= 1) {
        const matches = COMMANDS.map((c) => c.name).filter((n) => n.startsWith(tokens[0] ?? ""));
        if (matches.length === 1) return `${matches[0]} `;
        if (matches.length > 1) print([line(s(matches.join("   "), "dim"))]);
        return input;
      }
      const last = tokens[tokens.length - 1];
      const slash = last.lastIndexOf("/");
      const dirPart = slash >= 0 ? last.slice(0, slash + 1) : "";
      const prefix = slash >= 0 ? last.slice(slash + 1) : last;
      const dir = resolve(dirPart || ".", cwdRef.current);
      if (!dir || dir.node.kind !== "dir") return input;
      const matches = (dir.node.children ?? []).filter((c) => c.name.startsWith(prefix));
      if (matches.length === 0) return input;
      const head = tokens.slice(0, -1).join(" ");
      if (matches.length === 1) {
        const m = matches[0];
        return `${head} ${dirPart}${m.name}${m.kind === "dir" ? "/" : ""}`;
      }
      print([line(s(matches.map((m) => (m.kind === "dir" ? `${m.name}/` : m.name)).join("   "), "dim"))]);
      // Fill in the shared prefix.
      let common = matches[0].name;
      for (const m of matches) while (!m.name.startsWith(common)) common = common.slice(0, -1);
      return `${head} ${dirPart}${common}`;
    },
    [print],
  );

  const value = useMemo<Ctx>(
    () => ({
      lines,
      cwd,
      history,
      prompt: pathString(cwd),
      run,
      print,
      complete,
      floatingOpen,
      setFloatingOpen,
    }),
    [lines, cwd, history, run, print, complete, floatingOpen],
  );

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

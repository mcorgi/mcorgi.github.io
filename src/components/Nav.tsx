"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/music", label: "music" },
  { href: "/resume", label: "resume" },
];

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <span className="opacity-0">--:--:--</span>;
  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString([], { hour12: false })}
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-cream border-b border-line">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Sandra Tang — home"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-cream-2 shadow-[2px_2px_0_0_var(--line)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0_0_var(--line)] transition-all">
            <span className="font-display text-[13px] font-bold">st</span>
          </span>
          <span className="hidden sm:inline font-display font-semibold tracking-tight">
            sandra tang
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-1.5 sm:px-3 py-1.5 text-[12px] sm:text-sm font-mono rounded-md transition-colors ${
                  active
                    ? "bg-ink text-cream"
                    : "hover:bg-cream-2"
                }`}
              >
                {active ? `~/${l.label}` : l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
          <span className="inline-block h-2 w-2 rounded-full bg-pink animate-pulse" />
          <Clock />
        </div>
      </div>
    </header>
  );
}

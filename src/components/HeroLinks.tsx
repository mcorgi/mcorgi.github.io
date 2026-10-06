"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

// Clickable bubbles on the right side of the home hero.

export function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 8h3l1.6-2.2A1.5 1.5 0 0 1 9.8 5h4.4a1.5 1.5 0 0 1 1.2.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.6" />
      <circle cx="18" cy="10.6" r="0.4" fill="currentColor" />
    </svg>
  );
}

export function SatelliteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <g transform="rotate(-35 12 12)">
        {/* body */}
        <rect x="9.5" y="9" width="5" height="6" rx="0.8" />
        {/* solar panels with cell lines */}
        <rect x="1.5" y="10" width="6" height="4" rx="0.4" />
        <path d="M3.5 10v4M5.5 10v4" />
        <rect x="16.5" y="10" width="6" height="4" rx="0.4" />
        <path d="M18.5 10v4M20.5 10v4" />
        <path d="M7.5 12h2M14.5 12h2" />
        {/* dish + antenna */}
        <path d="M10 18.5a2.5 2.5 0 0 0 4 0" />
        <path d="M12 15v3" />
      </g>
    </svg>
  );
}

// A northern cardinal, crest and all. For the birdsong synthesizer.
export function BirdIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {/* crest */}
      <path d="M14.6 6.4 13.4 3.6l3.1 2.1" />
      {/* head, back and belly */}
      <path d="M18.5 9.6a3.6 3.6 0 0 0-6.7-1.8L8.2 13.2c-1.6 2.5-.1 5.8 3.1 5.8h2.2a5 5 0 0 0 5-5V9.6Z" />
      {/* beak */}
      <path d="M18.5 9.4 21.2 10.5 18.5 11.6" />
      {/* tail */}
      <path d="M8.4 13 3 15.2l5.4 1.3" />
      {/* wing */}
      <path d="M10.6 13.4c1.4 1.9 4 2.2 5.6.6" />
      {/* eye */}
      <circle cx="15.9" cy="8.9" r="0.5" fill="currentColor" />
      {/* legs */}
      <path d="M12 19v2M14.6 19v2" />
    </svg>
  );
}

// Small label that appears under a bubble on hover / keyboard focus.
function HoverLabel({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-cream opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
      {children}
    </span>
  );
}

export function Bubble({
  href,
  label,
  shadow,
  size,
  round = false,
  children,
}: {
  href: string;
  label: string;
  shadow: string;
  size: string;
  round?: boolean;
  children: ReactNode;
}) {
  const shape = round ? "rounded-full" : "rounded-2xl";
  return (
    <Link href={href} aria-label={label} className="group relative block">
      <div className={`absolute inset-0 translate-x-2 translate-y-2 ${shape} ${shadow} transition-transform group-hover:translate-x-3 group-hover:translate-y-3`} />
      <div
        className={`relative ${size} ${shape} border-[1.5px] border-line bg-cream-2 flex items-center justify-center transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-cream`}
      >
        {children}
      </div>
      <HoverLabel>{label} →</HoverLabel>
    </Link>
  );
}

// Gentle bob so the bubbles feel alive.
export function Float({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

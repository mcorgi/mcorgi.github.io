"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import { videos } from "@/data/music";

export default function MusicPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-14 pb-24">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
          /music · piano + violin
        </div>
        <h1 className="display text-5xl sm:text-7xl">
          duets <span className="text-accent">&amp;</span> solos.
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-[14.5px] leading-relaxed text-ink-soft">
          a small collection of pieces i&apos;ve been playing — piano,
          violin, and the duets i love most. recordings live on my youtube
          channel.
        </p>
      </Reveal>

      {/* Now playing card */}
      <Reveal delay={0.05}>
        <div className="mt-10">
          <Window title="now-playing.mp3" scanlines>
            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative h-16 w-16 rounded-full border-[1.5px] border-line bg-ink flex items-center justify-center text-cream"
                >
                  <span className="font-retro text-2xl">𝄞</span>
                  <span className="absolute h-2 w-2 rounded-full bg-cream top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
                    currently learning
                  </div>
                  <div className="font-display text-xl">
                    a violin + piano duet · in progress
                  </div>
                  <div className="font-mono text-xs opacity-70 mt-1">
                    recordings coming soon
                  </div>
                </div>
              </div>

              {/* fake equalizer */}
              <div className="flex items-end gap-1 h-10">
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="block w-1.5 bg-accent rounded-sm"
                    animate={{
                      height: [
                        `${10 + ((i * 13) % 30)}%`,
                        `${50 + ((i * 17) % 50)}%`,
                        `${20 + ((i * 11) % 30)}%`,
                      ],
                    }}
                    transition={{
                      duration: 1 + (i % 3) * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>
          </Window>
        </div>
      </Reveal>

      {/* Video grid */}
      <section className="mt-16">
        <Reveal>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
                /videos · from my youtube
              </div>
              <h2 className="display text-3xl sm:text-4xl">recordings.</h2>
            </div>
            <span className="font-mono text-xs opacity-60">
              {videos.length} videos
            </span>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((v, i) => {
            const accent =
              i % 3 === 0
                ? "var(--accent)"
                : i % 3 === 1
                  ? "var(--accent-2)"
                  : "var(--accent-3)";
            return (
              <Reveal key={v.youtubeId} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="relative group"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] transition-transform group-hover:translate-x-2.5 group-hover:translate-y-2.5"
                    style={{ background: accent }}
                  />
                  <div className="relative window bg-cream">
                    <div className="window-title">
                      <span className="window-dots" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </span>
                      <span className="ml-2 font-mono text-[11px] truncate">
                        ~/music/
                        {v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                        .mp4
                      </span>
                    </div>

                    {/* YouTube embed */}
                    <div className="relative aspect-video w-full bg-ink">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}`}
                        title={v.title}
                        className="absolute inset-0 w-full h-full"
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>

                    <div className="p-4 sm:p-5 flex items-start justify-between gap-3 border-t border-line">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg leading-tight truncate">
                          {v.title}
                        </h3>
                        {v.subtitle && (
                          <div className="font-mono text-[12px] opacity-70 mt-0.5 truncate">
                            {v.subtitle}
                          </div>
                        )}
                      </div>
                      <a
                        href={`https://youtu.be/${v.youtubeId}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="tag font-mono text-[10.5px] shrink-0 hover:bg-ink hover:text-cream transition-colors"
                        aria-label={`Watch ${v.title} on YouTube`}
                      >
                        youtube ↗
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

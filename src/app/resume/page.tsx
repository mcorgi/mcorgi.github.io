"use client";

import Reveal from "@/components/Reveal";
import Window from "@/components/Window";
import { useEffect, useState } from "react";

// To enable: drop your resume PDF into `public/` and name it `resume.pdf`
// (or any path you want, and update the constant below).
const RESUME_PATH = "/resume.pdf";

export default function ResumePage() {
  const [hasResume, setHasResume] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(RESUME_PATH, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setHasResume(r.ok);
      })
      .catch(() => {
        if (!cancelled) setHasResume(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-14 pb-24">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
          /resume
        </div>
        <h1 className="display text-5xl sm:text-7xl">resume.pdf</h1>
      </Reveal>

      {/* Quick summary */}
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        <Reveal>
          <Window title="education.txt" soft>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              <div className="font-display text-lg mb-1">
                Cornell University
              </div>
              <div className="opacity-70">College of Engineering</div>
              <div className="mt-2">B.S. Computer Science</div>
              <div className="opacity-70">Class of 2028</div>
            </div>
          </Window>
        </Reveal>
        <Reveal delay={0.05}>
          <Window title="contact.txt" soft>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              <div className="grid grid-cols-[70px_1fr] gap-2">
                <span className="opacity-60">email</span>
                <a
                  href="mailto:st2232@cornell.edu"
                  className="underline decoration-accent underline-offset-2 hover:text-accent break-all"
                >
                  st2232@cornell.edu
                </a>
                <span className="opacity-60">phone</span>
                <span>(781) 808-8248</span>
                <span className="opacity-60">linkedin</span>
                <a
                  href="https://www.linkedin.com/in/sandra-tang-651ab1333/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-accent underline-offset-2 hover:text-accent"
                >
                  sandra-tang
                </a>
                <span className="opacity-60">based</span>
                <span>Boston, MA · Ithaca, NY</span>
              </div>
            </div>
          </Window>
        </Reveal>
        <Reveal delay={0.1}>
          <Window title="skills.txt" soft>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              <div className="opacity-60 mb-1"># languages</div>
              <p>Rust · C++ · C · Python · Java · Go · TS · JS · OCaml · SQL</p>
              <div className="opacity-60 mt-3 mb-1"># systems</div>
              <p>
                Real-time + async pipelines · fault-tolerant systems · HW/SW
                interfaces
              </p>
              <div className="opacity-60 mt-3 mb-1"># tools</div>
              <p>Linux · Docker · FastAPI · AWS · PyTorch · OpenCV · React</p>
            </div>
          </Window>
        </Reveal>
      </div>

      {/* PDF embed area */}
      <Reveal>
        <div className="mt-12">
          <Window title="resume.pdf — viewer" scanlines>
            {hasResume === null && (
              <div className="p-10 text-center font-mono text-sm opacity-60">
                checking for resume.pdf…
              </div>
            )}

            {hasResume === false && (
              <div className="p-8 sm:p-10">
                <div className="mx-auto max-w-md text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border-[1.5px] border-line bg-cream-2 font-retro text-3xl mb-4">
                    PDF
                  </div>
                  <h2 className="font-display text-2xl mb-2">
                    no resume uploaded yet
                  </h2>
                  <p className="font-mono text-[13px] leading-relaxed text-ink-soft">
                    drop your PDF file into the{" "}
                    <code className="px-1 bg-cream-2 rounded">public/</code>{" "}
                    folder and name it{" "}
                    <code className="px-1 bg-cream-2 rounded">resume.pdf</code>.
                    it will appear here automatically.
                  </p>

                  <div className="mt-6 inline-flex flex-col gap-2 font-mono text-[12px] text-left bg-cream-2/60 border border-line rounded-lg p-4">
                    <span className="opacity-60">
                      # from your terminal / file explorer:
                    </span>
                    <span>
                      cp ~/Documents/your-resume.pdf{" "}
                      <span className="text-accent">public/resume.pdf</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {hasResume && (
              <div className="bg-cream-2/40">
                <object
                  data={RESUME_PATH}
                  type="application/pdf"
                  className="w-full h-[80vh]"
                >
                  <div className="p-6 text-center font-mono text-sm">
                    your browser can&apos;t display PDFs inline.{" "}
                    <a
                      href={RESUME_PATH}
                      className="underline decoration-accent underline-offset-2"
                    >
                      download instead ↗
                    </a>
                  </div>
                </object>
                <div className="border-t border-line p-3 flex items-center justify-between font-mono text-xs">
                  <span className="opacity-60">resume.pdf</span>
                  <a href={RESUME_PATH} download className="arrow-link text-xs">
                    download ↗
                  </a>
                </div>
              </div>
            )}
          </Window>
        </div>
      </Reveal>
    </div>
  );
}

import fs from "node:fs";
import path from "node:path";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";

// A screenshot from public/<dir>/. Until the file is added, a labeled
// placeholder shows where it goes. Checked at build time, so this only works
// in server components. `phone` gives it rounded, phone-shaped corners.
export default function Screenshot({
  dir,
  name,
  label,
  size,
  aspect,
  alt,
  caption,
  phone = false,
}: {
  dir: string;
  name: string;
  label: string;
  size: string;
  aspect: string;
  alt: string;
  caption: ReactNode;
  phone?: boolean;
}) {
  const file = [".png", ".jpg", ".webp"]
    .map((ext) => `${dir}/${name}${ext}`)
    .find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));
  const corners = phone ? "rounded-[28px]" : "rounded-lg";

  return (
    <Reveal>
      <figure>
        {file ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/${file}`}
            alt={alt}
            loading="lazy"
            className={`block w-full h-auto ${corners} border-[1.5px] border-line bg-white`}
          />
        ) : (
          <div
            className={`${aspect} flex flex-col items-center justify-center gap-2 ${corners} border-2 border-dashed border-accent bg-cream-2 p-4 text-center font-mono`}
          >
            <span className="text-[10.5px] uppercase tracking-widest text-pink-ink">
              screenshot placeholder
            </span>
            <span className="font-display text-lg leading-tight">{label}</span>
            <span className="text-[11.5px] text-ink-soft break-all">
              public/{dir}/{name}.png
            </span>
            <span className="text-[11px] opacity-60">{size}</span>
          </div>
        )}
        <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
